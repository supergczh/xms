/**
 * Created by Moudi on 2017/2/23.
 */
"use strict";
let express = require('express');
let router = express.Router();
let Order = require('../models/order');
let User = require('../models/user');
let Return = require('../models/return');
let Shopper = require('../models/shopper');
let Commodity = require('../models/commodity');
let multiparty = require('multiparty');
let fs = require('fs');
let resData;

router.use(function (req, res, next) {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});


router.post('/user/login', (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;
  console.log(username)
  if (username == '' || password == '') {
    resData.code = -1;
    resData.msg = '用户名或密码不能为空';
    res.json(resData);
    return;
  }
  User.findOne({
    username: username,
    password: password,
  }).then((userInfo) => {
    
    if (!userInfo) {
      resData.code = -3;
      resData.msg = '用户不存在或密码错误'
      res.json(resData);
      return;
    }
    resData.msg = '登录成功';
    resData.userInfo = {
      _id: userInfo._id,
      username: userInfo.username,
      onf:userInfo.onf
    };
    res.json(resData);
  })
});
//用户名注册
router.post('/user/register', (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds()
  let title = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
  let onf = true
  let phone = req.body.phone
  let time = +new Date;
  let level = req.body.level
  if (username == '') {
    resData.code = -1;
    resData.msg = '用户名不能为空';

    res.json(resData);
    return;
  }
  if (password == '') {
    resData.code = -2;
    resData.msg = '密码不能为空';
    res.json(resData);
    return;
  }
  console.log(username, '这个就是前端传的name')
  User.findOne({
    username: username
  }).then(function (newUserInfo) {
    console.log(newUserInfo + 'OK');
    if (!newUserInfo) {
      let user = new User({
        username: username,
        password: password,
        level: level,
        time: time,
        title,
        onf,
        phone
      });
      user.save().then(() => {
        resData.code = 0;
        resData.msg = '注册成功！';
        resData.level = level
        resData.time = time
        resData.title = title
        resData.onf = onf
        resData.phone = phone
        res.json(resData);
      });
    } else {
      resData.code = 1;
      resData.msg = '用户名已占用!';
      res.json(resData);
    }
  });
});
//账号全部获取
router.post('/user/findall', (req, res, next) => {
  let username = req.body.username;
  const PAGE_SIZE = 9;
  let page = Number(req.body.page);
  User
    .find({})
    .sort('-time')
    .skip(PAGE_SIZE * (page - 1))
    .limit(PAGE_SIZE)
    .exec((err, data) => {
      let arr = [];
      for (let o of data) {
        let obj = {
          id: o._id,
          username: o.username,
          password: o.password,
          level: o.level,
          time: o.time,
          title: o.title,
          onf: o.onf,
          phone: o.phone

        };
        arr.push(obj);
      }
      res.json(arr);
    });

})

//管理员页码获取
router.post('/user/get_page_count', (req, res, next) => {
  const PAGE_SIZE = 9;
  User
    .count({}, (err, n) => {
      resData.code = 0;
      resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
      resData.count = Math.ceil(n / PAGE_SIZE);
      console.log(resData);

      res.json(resData);
    })
})
//管理员删除
router.post('/user/del', (req, res, next) => {
  const PAGE_SIZE = 9;
  let id = req.body.id
  User
    .remove({ _id: id }, (err) => {
      if (!err) {
        resData.code = 0;
        resData.msg = '删除成功';
        res.json(resData);
      } else {
        resData.code = -1;
        resData.msg = '删除失败';
        res.json(resData);
      }
    })
})

//账号名获取
router.post('/user/find', (req, res, next) => {
  let username = req.body.username;
  User
    .find({ username: username })
    .sort('-time')
    .exec((err, data) => {
      let arr = [];
      for (let o of data) {
        let obj = {
          id: o._id,
          username: o.username,
          password: o.password,
          level: o.level,
          time: o.time,
          title: o.title,
          onf: o.time,
          phone: o.phone
        };
        arr.push(obj);
      }
      res.json(arr);
    });

})
//管理员搜索页码获取
router.post('/user/findcount', (req, res, next) => {
  const PAGE_SIZE = 9;
  let username = req.body.username;
  User
    .find({ username: username })
    .count({}, (err, n) => {
      resData.code = 0;
      resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
      resData.count = Math.ceil(n / PAGE_SIZE);
      console.log(resData);

      res.json(resData);
    })
})
//密码获取
router.post('/user/findpassword', (req, res, next) => {
  let password = req.body.password;
  User
    .find({ password: password })
    .sort('-time')
    .exec((err, data) => {
      let arr = [];
      for (let o of data) {
        let obj = {
          id: o._id,
          username: o.username,
          password: o.password,
          level: o.level,
          time: o.time,
          title: o.title,
          onf: o.time,
          phone: o.phone
        };

        arr.push(obj);

      }
      res.json(arr);
    });

})

//修改账号密码
router.post('/user/update', (req, res, next) => {
  console.log(req.body);

  let id = req.body.id;
  let username = req.body.username;
  let password = req.body.password;
  let level = req.body.level
  let phone = req.body.phone
  let onf=req.body.onf
  let obj = {
    username,
    password,
    level,
    phone,
    onf
  }
  console.log(obj)
  User.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data._id;
      resData.time = data.time;
      resData.username = data.username;
      resData.password = data.password;
      resData.onf=data.onf
      res.json(resData);
    }
  });
});


router.post('/upload', (req, res, next) => {
  //生成对象，配置上传目标路径
  let form = new multiparty.Form({
    uploadDir: './public/files/',
    encoding: 'utf-8'
  });
  form.parse(req, function (err, fields, files) {
    fs.rename(files.file[0].path, './public/files/' + files.file[0].originalFilename, function (err) {
      if (err) {
        console.log('重命名失败');
      } else {
        resData.code = 0;
        resData.msg = '上传成功！';
        res.json(resData);
      }
    })
  });
});

//修改商品数据
router.post('/commodity/update', (req, res, next) => {
  console.log(req.body);

  let id = req.body.id;
  let Name = req.body.Name;
  let article = Number(req.body.article);
  let onOFF = req.body.onOFF;
  let Stock = Number(req.body.Stock);
  let checked = false;
  let Price = Number(req.body.Price)
  let number = req.body.number
  let time = req.body.time
  let vue1 = req.body.vue1
  let vue2 = req.body.vue2
  let obj = {
    Name,
    number,
    article,
    onOFF,
    Stock,
    checked,
    time,
    Price,
    vue1,
    vue2
  }
  console.log(obj)
  Commodity.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data._id;
      // resData.time = data.time;
      resData.Name = data.Name;
      resData.number = data.number;
      resData.Stock = data.Stock;
      resData.Price = data.Price;
      resData.onOFF = data.onOFF;
      resData.article = data.article;
      resData.vue1 = data.vue1;
      resData.vue2 = data.vue2;
      res.json(resData);
    }
  });
});

//commodity
router.get('/commodity', (req, res, next) => {
  let act = req.query.act;
  let id, content;

  const PAGE_SIZE = 9;

  switch (act) {
    case 'add':
      let Name = req.query.Name;
      let article = req.query.article;
      let onOFF = req.query.onOFF;
      let Stock = req.query.Stock;
      let checked = false;
      let Price = req.query.Price
      let vue1 = req.query.vue1
      let vue2 = req.query.vue2
      let time = +new Date;
      let number = +new Date

      if (!Name) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        let time = +new Date();
        Name = Name.replace('\n', '');
        let new_Commodity = new Commodity({
          Name,
          number,
          article,
          onOFF,
          Stock,
          checked,
          time,
          Price,
          vue1,
          vue2
        });
        new_Commodity.save((err, data) => {
          console.log('这是我的err：' + err);
          if (err) {
            resData.code = -1;
            resData.msg = '提交失败！';
            res.json(resData);
          } else {
            resData.code = 0;
            resData.msg = '提交成功！';
            resData.id = data._id;
            resData.Name = data.Name;
            resData.number = data.number;
            resData.Stock = data.Stock;
            resData.onOFF = data.onOFF;
            resData.checked = data.checked;
            resData.Price = data.Price
            resData.time = data.time;
            resData.article = data.article;
            resData.vue1 = data.vue1;
            resData.vue2 = data.vue2;
            res.json(resData);
          }
        });

      }
      break;
    case 'total':
      Commodity.count({}, (err, n) => {
        res.json(n);
      });
      break;

    case 'find':
      let page2 = Number(req.query.page);
      let v1 = req.query.v1
      let v2 = req.query.v2
      if (v1 && v2) {
        Commodity.find({ vue1: v1, vue2: v2 })
          .sort('-time')
          .skip(PAGE_SIZE * (page2 - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            console.log(data);
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                Name: o.Name,
                number: o.number,
                Stock: o.Stock,
                onOFF: o.onOFF,
                checked: o.checked,
                Price: o.Price,
                time: o.time,
                article: o.article,
                rvue1: o.vue1,
                vue2: o.vue2,
              };
              arr.push(obj);
            }

            res.json(arr);
          });
      }
      else if (v1 && !v2) {
        ;

        Commodity.find({ vue1: v1 })
          .sort('-time')
          .skip(PAGE_SIZE * (page2 - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            console.log(data);
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                Name: o.Name,
                number: o.number,
                Stock: o.Stock,
                onOFF: o.onOFF,
                checked: o.checked,
                Price: o.Price,
                time: o.time,
                article: o.article,
                rvue1: o.vue1,
                vue2: o.vue2,
              };
              arr.push(obj);
            }

            res.json(arr);
          });
      } else if (!v1 && v2) {

        Commodity.find({ vue2: v2 })
          .sort('-time')
          .skip(PAGE_SIZE * (page2 - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            console.log(data);
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                Name: o.Name,
                number: o.number,
                Stock: o.Stock,
                onOFF: o.onOFF,
                checked: o.checked,
                Price: o.Price,
                time: o.time,
                article: o.article,
                rvue1: o.vue1,
                vue2: o.vue2,
              };
              arr.push(obj);
            }

            res.json(arr);
          });
      }

      break;
    case 'findcount':
      let v11 = req.query.v1
      let v22 = req.query.v2
      if (v11 && v22) {
        Commodity.find({ vue1: v11, vue2: v22 }).count({}, (err, n) => {
          resData.code = 0;
          resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
          resData.count = Math.ceil(n / PAGE_SIZE);
          res.json(resData);
        })
      } else if (v11 && !v22) {
        Commodity.find({ vue1: v11 }).count({}, (err, n) => {
          resData.code = 0;
          resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
          resData.count = Math.ceil(n / PAGE_SIZE);
          res.json(resData);
        })
      } else if (!v11 && v22) {
        Commodity.find({ vue2: v22 }).count({}, (err, n) => {
          resData.code = 0;
          resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
          resData.count = Math.ceil(n / PAGE_SIZE);
          res.json(resData);
        })
      }

      break;
    case 'findkey':
      let page3 = Number(req.query.page);
      let name = req.query.name;
      Commodity.find({ Name: name })
        .sort('-time')
        .skip(PAGE_SIZE * (page3 - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              Name: o.Name,
              number: o.number,
              Stock: o.Stock,
              onOFF: o.onOFF,
              checked: o.checked,
              Price: o.Price,
              time: o.time,
              article: o.article,
              rvue1: o.vue1,
              vue2: o.vue2,
            };
            arr.push(obj);
          }

          res.json(arr);
        });
      break;
    case 'findcountkey':
      let ls = req.query.name;
      Commodity.find({ Name: ls }).count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;

    case 'get_page_count2':
      Commodity.count({ Name: ll }, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get_page_count':
      Commodity.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Commodity
          .find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                Name: o.Name,
                number: o.number,
                Stock: o.Stock,
                onOFF: o.onOFF,
                checked: o.checked,
                article: o.article,
                Price: o.Price,
                time: o.time,
                vue1: o.vue1,
                vue2: o.vue2
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
    case 'del':
      id = req.query.id;
      Commodity.remove({ _id: id }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
    case 'delAll':
      console.log(req.query);

      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);

      for (let i = 0; i < all.length; i++) {
        Commodity.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
          }
        });
      }
      res.json(resData);
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});

module.exports = router;



//订单区

router.get('/order', (req, res, next) => {
  let acr = req.query.acr;
  let id
  console.log(req.query.acr);
  const PAGE_SIZE = 9;

  switch (acr) {
    case 'add':
      let name = req.query.name
      let mode = req.query.mode
      let dh = req.query.dh
      let phone = req.query.phone
      let lsh = req.query.lsh
      let ps = req.query.ps
      let dz = req.query.dz
      let je = req.query.je
      let tz = req.query.tz
      let hh = req.query.hh
      let sl = req.query.sl
      let xj = req.query.xj
      let sp = req.query.sp
      let zt = '0'
      let ly = req.query.ly
      let checked = false
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let h = d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds()
      let title = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
      let number = +new Date

      if (!name) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        let time = +new Date();
        name = name.replace('\n', '');
        let new_Order = new Order({
          number,
          time,
          title,
          mode,
          dh,
          name,
          phone,
          lsh,
          ps,
          dz,
          je,
          tz,
          hh,
          sl,
          xj,
          sp,
          zt,
          ly,
          checked,
        });
        new_Order.save((err, data) => {
          console.log('这是我的err：' + err);
          if (err) {
            resData.code = -1;
            resData.msg = '提交失败！';
            res.json(resData);
          } else {
            resData.code = 0;
            resData.msg = '提交成功！';
            resData.id = data._id;
            resData.name = data.name;
            resData.number = data.number;
            resData.time = data.time;
            resData.title = data.title;
            resData.mode = data.mode;
            resData.ly = data.ly;
            resData.zt = data.zt;
            resData.je = data.je;
            resData.phone = data.phone;
            resData.checked = data.checked
            res.json(resData);
          }
        });

      }
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Order
          .find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                number: o.number,
                time: o.time,
                name: o.name,
                number: o.number,
                time: o.time,
                title: o.title,
                mode: o.mode,
                ly: o.ly,
                zt: o.zt,
                je: o.je,
                phone: o.phone,
                checked: o.checked,
                of: o.of
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
    case 'findkey':
      let page3 = Number(req.query.page);
      let zt2 = req.query.zt;
      Order.find({ zt: zt2 })
        .sort('-time')
        .skip(PAGE_SIZE * (page3 - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              number: o.number,
              time: o.time,
              name: o.name,
              number: o.number,
              time: o.time,
              title: o.title,
              mode: o.mode,
              ly: o.ly,
              zt: o.zt,
              je: o.je,
              phone: o.phone,
              checked: o.checked,
              of: o.of
            };
            arr.push(obj);
          }

          res.json(arr);
        });
      break;
    case 'findcountkey':
      let ls = req.query.zt;
      Order.find({ zt: ls }).count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'findnumber':
      let page4 = Number(req.query.page);
      let number2 = req.query.number;
      Order.find({ number: number2 })
        .sort('-time')
        .skip(PAGE_SIZE * (page4 - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              number: o.number,
              time: o.time,
              name: o.name,
              number: o.number,
              time: o.time,
              title: o.title,
              mode: o.mode,
              ly: o.ly,
              zt: o.zt,
              je: o.je,
              phone: o.phone,
              checked: o.checked,
              of: o.of
            };
            arr.push(obj);
          }

          res.json(arr);
        });
      break;
    case 'findcountnumber':
      let number3 = req.query.number;
      Order.find({ number: number3 }).count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;

    case 'findphone':
      let page5 = Number(req.query.page);
      let phone2 = req.query.phone;
      Order.find({ phone: phone2 })
        .sort('-time')
        .skip(PAGE_SIZE * (page5 - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              number: o.number,
              time: o.time,
              name: o.name,
              number: o.number,
              time: o.time,
              title: o.title,
              mode: o.mode,
              ly: o.ly,
              zt: o.zt,
              je: o.je,
              phone: o.phone,
              checked: o.checked,
              of: o.of
            };
            arr.push(obj);
          }

          res.json(arr);
        });
      break;
    case 'findcountphone':
      let phone4 = req.query.phone;
      Order.find({ phone: phone4 }).count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get_page_count':
      Order.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;

    case 'del':
      id = req.query.id;
      Order.remove({ _id: id }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
    case 'delAll':
      let all = req.query.all;
      let l = JSON.parse(all);
      for (let i = 0; i < all.length; i++) {
        Order.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
          }
        });
      }
      res.json(resData);
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});




//退货区
router.get('/return', (req, res, next) => {
  let act = req.query.act;
  let id
  console.log(req.query.acr);

  const PAGE_SIZE = 9;

  switch (act) {
    case 'add':
      let name = req.query.name
      let mode = req.query.mode
      let dh = req.query.dh
      let phone = req.query.phone
      let lsh = req.query.lsh
      let ps = req.query.ps
      let dz = req.query.dz
      let je = req.query.je
      let tz = req.query.tz
      let hh = req.query.hh
      let sl = req.query.sl
      let xj = req.query.xj
      let sp = req.query.sp
      let zt = req.query.zt
      let ly = req.query.ly
      let yy = req.query.yy
      let ms = req.query.ms
      let qr = req.query.qr
      let bz = req.query.bz
      let of = 0
      let checked = false
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let h = d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds()
      let title = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
      // let title = year + '-' + month + '-' + day;
      let number = +new Date

      if (!name) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        let time = +new Date();
        name = name.replace('\n', '');
        let new_Return = new Return({
          number,
          time,
          title,
          mode,
          dh,
          name,
          phone,
          lsh,
          ps,
          dz,
          je,
          tz,
          hh,
          sl,
          xj,
          sp,
          zt,
          ly,
          checked,
          yy,
          ms,
          qr,
          bz,
          of
        });
        new_Return.save((err, data) => {
          console.log('这是我的err：' + err);
          if (err) {
            resData.code = -1;
            resData.msg = '提交失败！';
            res.json(resData);
          } else {
            resData.code = 0;
            resData.msg = '提交成功！';
            resData.id = data._id;
            resData.name = data.name;
            resData.number = data.number;
            resData.time = data.time;
            resData.title = data.title;
            resData.mode = data.mode;
            resData.ly = data.ly;
            resData.zt = data.zt;
            resData.je = data.je;
            resData.phone = data.phone;
            resData.checked = data.checked
            resData.yy = data.yy
            resData.ms = data.ms
            resData.qr = data.qr
            resData.bz = data.bz
            resData.of = data.of
            resData.ps = data.ps
            res.json(resData);
          }
        });

      }
      break;
    case 'findkey':
      let page3 = Number(req.query.page);
      let of2 = req.query.of;
      Return.find({ of: of2 })
        .sort('-time')
        .skip(PAGE_SIZE * (page3 - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              number: o.number,
              time: o.time,
              name: o.name,
              number: o.number,
              time: o.time,
              title: o.title,
              mode: o.mode,
              ly: o.ly,
              zt: o.zt,
              je: o.je,
              phone: o.phone,
              checked: o.checked,
              yy: o.yy,
              of: o.of,
              ps: o.ps
            };
            arr.push(obj);
          }

          res.json(arr);
        });
      break;
    case 'findcountkey':
      let ls = req.query.of;
      Return.find({ of: ls }).count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'findnumber':
      let page4 = Number(req.query.page);
      let number2 = req.query.number;
      Return.find({ number: number2 })
        .sort('-time')
        .skip(PAGE_SIZE * (page4 - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              number: o.number,
              time: o.time,
              name: o.name,
              number: o.number,
              time: o.time,
              title: o.title,
              mode: o.mode,
              ly: o.ly,
              zt: o.zt,
              je: o.je,
              phone: o.phone,
              checked: o.checked,
              of: o.of
            };
            arr.push(obj);
          }

          res.json(arr);
        });
      break;
    case 'findcountnumber':
      let number3 = req.query.number;
      Return.find({ number: number3 }).count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;

    case 'findphone':
      let page5 = Number(req.query.page);
      let phone2 = req.query.phone;
      Return.find({ phone: phone2 })
        .sort('-time')
        .skip(PAGE_SIZE * (page5 - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              number: o.number,
              time: o.time,
              name: o.name,
              number: o.number,
              time: o.time,
              title: o.title,
              mode: o.mode,
              ly: o.ly,
              zt: o.zt,
              je: o.je,
              phone: o.phone,
              checked: o.checked,
              of: o.of
            };
            arr.push(obj);
          }

          res.json(arr);
        });
      break;
    case 'findcountphone':
      let phone4 = req.query.phone;
      Return.find({ phone: phone4 }).count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Return
          .find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                number: o.number,
                time: o.time,
                name: o.name,
                number: o.number,
                time: o.time,
                title: o.title,
                mode: o.mode,
                ly: o.ly,
                zt: o.zt,
                je: o.je,
                phone: o.phone,
                checked: o.checked,
                yy: o.yy,
                of: o.of,
                ps: o.ps
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
    case 'get_page_count':
      Return.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'del':
      id = req.query.id;
      Return.remove({ _id: id }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
    case 'delAll':
      let all = req.query.all;
      let l = JSON.parse(all);
      for (let i = 0; i < all.length; i++) {
        Return.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
          }
        });
      }
      res.json(resData);
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});
//修改订单信息
router.post('/order/update', (req, res, next) => {

  let name = req.body.name
  let mode = req.body.mode
  let dh = req.body.dh
  let phone = req.body.phone
  let lsh = req.body.lsh
  let ps = req.body.ps
  let id = req.body.id
  let dz = req.body.dz
  let je = req.body.je
  let tz = req.body.tz
  let hh = req.body.hh
  let sl = req.body.sl
  let xj = req.body.xj
  let sp = req.body.sp
  let zt = Number(req.body.zt)
  let ly = req.body.ly
  let checked = false
  let title = req.body.title
  let number = req.body.number
  let time = req.body.time
  let yy = req.body.yy
  let ms = req.body.ms
  let qr = req.body.qr
  let bz = req.body.bz

  let obj = {
    number,
    time,
    title,
    mode,
    dh,
    name,
    phone,
    lsh,
    ps,
    dz,
    je,
    tz,
    hh,
    sl,
    xj,
    sp,
    zt,
    ly,
    checked,
  }

  Order.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData); 
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data.id;
      resData.name = data.name;
      resData.number = data.number;
      resData.time = data.time;
      resData.title = data.title;
      resData.mode = data.mode;
      resData.ly = data.ly;
      resData.zt = data.zt;
      resData.je = data.je;
      resData.phone = data.phone;
      resData.checked = data.checked
      resData.yy = data.yy
      resData.ms = data.ms
      resData.qr = data.qr
      resData.bz = data.bz
      res.json(resData);
    }
  });
});

//修改退货信息
router.post('/return/update', (req, res, next) => {

  let id = req.body.id;
  let name = req.body.name
  let mode = req.body.mode
  let dh = req.body.dh
  let phone = req.body.phone
  let lsh = req.body.lsh
  let ps = req.body.ps
  let dz = req.body.dz
  let je = req.body.je
  let tz = req.body.tz
  let hh = req.body.hh
  let sl = req.body.sl
  let xj = req.body.xj
  let sp = req.body.sp
  let zt = req.body.zt
  let ly = req.body.ly
  let yy = req.body.yy
  let ms = req.body.ms
  let qr = req.body.qr
  let bz = req.body.bz
  let of = req.body.of
  let checked = false
  let title = req.body.title;
  let number = req.body.number;
  let time = req.body.time
  let obj = {

    number,
    time,
    title,
    mode,
    dh,
    name,
    phone,
    lsh,
    ps,
    dz,
    je,
    tz,
    hh,
    sl,
    xj,
    sp,
    zt,
    ly,
    checked,
    yy,
    ms,
    qr,
    bz,
    of
  }

  Return.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data.id;
      resData.name = data.name;
      resData.number = data.number;
      resData.time = data.time;
      resData.title = data.title;
      resData.mode = data.mode;
      resData.ly = data.ly;
      resData.zt = data.zt;
      resData.je = data.je;
      resData.phone = data.phone;
      resData.checked = data.checked
      resData.yy = data.yy
      resData.of = data.of
      res.json(resData);
    }
  });
});



//用户区
router.get('/shopper', (req, res, next) => {
  let act = req.query.act;
  let id

  const PAGE_SIZE = 9;

  switch (act) {
    case 'add':
      let name = req.query.name
      let of = 0
      let mode = req.query.mode
      let dh = req.query.dh
      let phone = req.query.phone
      let lsh = req.query.lsh
      let ps = req.query.ps
      let dz = req.query.dz
      let je = req.query.je
      let tz = req.query.tz
      let hh = req.query.hh
      let sl = req.query.sl
      let xj = req.query.xj
      let sp = req.query.sp
      let zt = req.query.zt
      let ly = req.query.ly
      let dd = req.query.dd

      let onOFF = true
      let checked = false
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let h = d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds()
      let title = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
      let number = +new Date

      if (!name) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        let time = +new Date();
        name = name.replace('\n', '');
        let new_Shopper = new Shopper({
          number,
          time,
          title,
          mode,
          dh,
          name,
          phone,
          lsh,
          ps,
          dz,
          je,
          tz,
          hh,
          sl,
          xj,
          sp,
          ly,
          zt,
          checked,
          onOFF,
          of,
          dd
        });
        new_Shopper.save((err, data) => {
          console.log('这是我的err：' + err);
          if (err) {
            resData.code = -1;
            resData.msg = '提交失败！';
            res.json(resData);
          } else {
            console.log(data);

            resData.code = 0;
            resData.msg = '提交成功！';
            resData.id = data.id;
            resData.name = data.name;
            resData.number = data.number;
            resData.time = data.time;
            resData.title = data.title;
            resData.mode = data.mode;
            resData.ly = data.ly;
            resData.zt = data.zt;
            resData.je = data.je;
            resData.phone = data.phone;
            resData.checked = data.checked
            resData.yy = data.yy
            resData.ms = data.ms
            resData.qr = data.qr
            resData.bz = data.bz
            resData.of = data.of
            resData.ps = data.ps
            resData.onOFF = data.onOFF
            resData.dd = data.dd
            res.json(resData);
          }
        });

      }
      break;
    case 'findkey':
      let page3 = Number(req.query.page);
      let of2 = req.query.of;
      Shopper.find({ of: of2 })
        .sort('-time')
        .skip(PAGE_SIZE * (page3 - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              number: o.number,
              time: o.time,
              name: o.name,
              number: o.number,
              time: o.time,
              title: o.title,
              mode: o.mode,
              ly: o.ly,
              zt: o.zt,
              je: o.je,
              phone: o.phone,
              checked: o.checked,
              yy: o.yy,
              of: o.of,
              ps: o.ps,
              onOFF: o.onOFF,
              dd: o.dd
            };
            arr.push(obj);
          }

          res.json(arr);
        });
      break;
    case 'findcountkey':
      let ls = req.query.of;
      Shopper.find({ of: ls }).count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'findnumber':
      let page4 = Number(req.query.page);
      let number2 = req.query.number;
      Shopper.find({ number: number2 })
        .sort('-time')
        .skip(PAGE_SIZE * (page4 - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              number: o.number,
              time: o.time,
              name: o.name,
              number: o.number,
              time: o.time,
              title: o.title,
              mode: o.mode,
              ly: o.ly,
              zt: o.zt,
              je: o.je,
              phone: o.phone,
              checked: o.checked,
              of: o.of,
              onOFF: o.onOFF,
              dd: o.dd
            };
            arr.push(obj);
          }

          res.json(arr);
        });
      break;
    case 'findcountnumber':
      let number3 = req.query.number;
      Shopper.find({ number: number3 }).count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;

    case 'findphone':
      let page5 = Number(req.query.page);
      let phone2 = req.query.phone;
      Shopper.find({ phone: phone2 })
        .sort('-time')
        .skip(PAGE_SIZE * (page5 - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              number: o.number,
              time: o.time,
              name: o.name,
              number: o.number,
              time: o.time,
              title: o.title,
              mode: o.mode,
              ly: o.ly,
              zt: o.zt,
              je: o.je,
              phone: o.phone,
              checked: o.checked,
              of: o.of,
              onOFF: o.onOFF,
              dd: o.dd
            };
            arr.push(obj);
          }

          res.json(arr);
        });
      break;
    case 'findcountphone':
      let phone4 = req.query.phone;
      Shopper.find({ phone: phone4 }).count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Shopper
          .find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                number: o.number,
                time: o.time,
                name: o.name,
                number: o.number,
                time: o.time,
                title: o.title,
                mode: o.mode,
                ly: o.ly,
                zt: o.zt,
                je: o.je,
                phone: o.phone,
                checked: o.checked,
                yy: o.yy,
                of: o.of,
                ps: o.ps,
                onOFF: o.onOFF,
                dd: o.dd
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
    case 'get_page_count':
      Shopper.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'del':
      id = req.query.id;
      Shopper.remove({ _id: id }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
    case 'delAll':
      let all = req.query.all;
      let l = JSON.parse(all);
      for (let i = 0; i < all.length; i++) {
        Shopper.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
          }
        });
      }
      res.json(resData);
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});

