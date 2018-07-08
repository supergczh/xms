/**
 * Created by Moudi on 2017/2/23.
 */
"use strict";
let express = require('express');
let router = express.Router();
let Order = require('../models/order');
let multiparty = require('multiparty');
let fs = require('fs');
let resData;


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


//order
router.get('/order', (req, res, next) => {
    let act = req.query.act;
    let id
    console.log(req.query.act);

    const PAGE_SIZE = 9;

    switch (act) {
        case 'add':
            let name = req.query.name
            let mode = req.query.mode
            let dh = req.query.dh
            let phone = req.query.phone
            let lsh = req.query.lsh           
            let ps=req.query.ps   
            let dz = req.query.dz  
            let je = req.query.je  
            let tz = req.query.tz 
            let hh = req.query.hh 
            let sl = req.query.sl
            let xj = req.query.xj
             let sp=req.query.sp
             let d = new Date();
             let year = d.getFullYear();
             let month = d.getMonth() + 1;
             let day = d.getDate();
            let title = year + '-' + month + '-' + day;
            let number = +new Date

            if (!name) {
                resData.code = -1;
                resData.msg = '参数错误';
                res.json(resData);
            } else {
                let time = +new Date();
                Name = Name.replace('\n', '');
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
                        res.json(resData);
                    }
                });

            }
            break;
      
        default:
            resData.code = -1;
            resData.msg = '参数错误';
            res.json(resData);
    }

});

module.exports = router;