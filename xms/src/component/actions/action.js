import axios from 'axios';
const DEL = 'DEL'
const GET = 'GET'
const GETODD = 'GETODD'
const MODIFY = 'MODIFY'
const ADD = 'ADD'
const ORDER = 'ORDER'
const ADDORDERA = 'ADDORDERA'
const RETURN = 'RETURN'
const RETURNGET = 'RETURNGET'
// const TRADE = 'TRADE'
const PAGE = 'PAGE'
const ODERPAGE = 'ODERPAGE'
const RETURNPAGE = 'RETURNPAGE'
const FIND = 'FIND'
const FINDPG = 'FINDPG'
const FINDS = 'FINDS'
const FINDPGS = 'FINDPGS'
const FINDORDER = 'FINDORDER'
const FINDORDERPG = 'FINDORDERPG'
const FINDORDERNM = 'FINDORDERNM'
const FINDORDERPGNUMBER = 'FINDORDERPGNUMBER'
const FINDORDERPHONE = 'FINDORDERPHONE'
const FINDORDERPGPHONE = 'FINDORDERPGPHONE'
const FINDRETURN = 'FINDRETURN'
const FINDRETURNPG = 'FINDRETURNPG'
const FINDRETURNNM = 'FINDRETURNNM'
const FINDRETURNNUMBERPG = 'FINDRETURNNUMBERPG'
const FINDRETURNPHONENM = 'FINDRETURNPHONENM'
const FINDRETURNPGPHONE = 'FINDRETURNPGPHONE'
const FINDRETURNPHONE = 'FINDRETURNPHONE'
const USER = 'USER'
const USERCOUNT = 'USERCOUNT'
const ADMIN = 'ADMIN'
const ADMINPG = 'ADMINPG'
const FINDUSE ='FINDUSE'
const TRADE = 'TRADE'
export function trade(data) {
    return {
        type: 'TRADE',
        data
    }
}

export function cl(nowpage) {
    return {
        type: 'ADS',
        nowpage
    }
}
//管理员数据获取
export function admin(data) {
    return {
        type: 'ADMIN',
        data
    }
}
//管理员页码获取
export function adminpg(num) {
    return {
        type: 'ADMINPG',
        num
    }
}
//查询管理员账户
export function finduse(data){
    return {
        type: 'FINDUSE',
        data
    }
}
//查询管理员的页码
export function findusepg(num){
    return {
        type: 'FINDUSEPG',
        num
    }
}
export function get(data) {
    return {
        type: GET,
        data: data
    }
}
export function Del(id) {
    return {
        type: DEL,
        id
    }
}
export function getodd(data) {
    return {
        type: GETODD,
        data: data
    }
}
//商品总页数
export function page(num) {
    return {
        type: PAGE,
        num
    }
}


//添加商品
export function add(data) {
    return {
        type: ADD,
        data: data
    }
}
//查询商品
export function find(data) {
    return {
        type: FIND,
        data: data
    }
}
//查询商品的页码
export function findpg(num) {
    return {
        type: FINDPG,
        num
    }
}
//查询商品
export function finds(data) {
    return {
        type: FINDS,
        data: data
    }
}
//查询商品的页码
export function findpgs(num) {
    return {
        type: FINDPGS,
        num
    }
}
//订单总页码
export function oderpage(num) {
    return {
        type: ODERPAGE,
        num
    }
}
//查询订单
export function findorder(data) {
    return {
        type: FINDORDER,
        data: data
    }
}
//查询订单的页码
export function findorderpg(num) {
    return {
        type: FINDORDERPG,
        num
    }
}
//查询订单号数据
export function findordernm(data) {
    return {
        type: FINDORDERNM,
        data
    }
}
//查询订单号页码
export function findordernumberpg(num) {
    return {
        type: FINDORDERPGNUMBER,
        num
    }
}
//查询订单账号数据
export function findorderphone(data) {
    return {
        type: FINDORDERPHONE,
        data
    }
}
//查询账号页码
export function findreturnphonepg(num) {
    return {
        type: FINDRETURNPGPHONE,
        num
    }
}
//退货数据
export function returns(data) {
    return {
        type: ADD,
        data: data
    }
}

//单页订单
export function oderget(data) {
    return {
        type: ORDER,
        data: data
    }
}
//添加订单
export function addoder(data) {
    return {
        type: ADDORDERA,
        data: data
    }
}


//单页退货
export function addreturn(data) {
    return {
        type: RETURN,
        data: data
    }
}

//退货单总页码
export function returnpage(num) {
    return {
        type: RETURNPAGE,
        num
    }
}
//请求退货查询数据
export function findreturn(data) {
    return {
        type: FINDRETURN,
        data
    }
}

//查询退货数据的页码
export function findreturnpg(num) {
    return {
        type: FINDRETURNPG,
        num
    }
}

//查询退货订单号的数据
export function findreturnnm(data) {
    return {
        type: FINDRETURNNM,
        data
    }
}
//查询退货订单号的页码
export function findreturnnumberpg(num) {
    return {
        type: FINDRETURNNUMBERPG,
        num
    }
}
//获取用户数据
export function user(num) {
    return {
        type: USER,
        num
    }
}
//获取用户数据总页码
export function usercount(num) {
    return {
        type: USERCOUNT,
        num
    }
}
export function findreturnphone(data) {
    return {
        type: FINDRETURNPHONE,
        data
    }
}
//thunk   请求商品数据
export const axiosData = () => {
    return dispatch => {


        fetch('http://127.0.0.1:88/commodity/getlist').then(e => e.json())
            .then(e => {
                dispatch(get(e))
            })
    };
};

//请求商品页码数量

export const pagecount = () => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/commodity?act=get_page_count').then(e => e.json())
            .then(e => {

                dispatch(page(e.count))
            })
    };
};
//thunk   请求单页商品数据
export const odd = (num) => {
    return dispatch => {
        axios.get("http://127.0.0.1:88/api/commodity?act=get&page=" + num).then(
            response => {
                dispatch(getodd(response.data))
            }
        )

    };
};
//管理员账号全部获取

export const administrators = (num) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/user/findall', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams({
                page: num
            }).toString()
        }).then(e => e.json())
            .then(e => {
                dispatch(admin(e))
            })
    }
};
//管理员账号页码获取
export const adminpage = (num) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/user/get_page_count', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams({

            }).toString()
        }).then(e => e.json())
            .then(e => {

                dispatch(adminpg(e.count))
            })
    }
};

//删除管理员
export const admindel = (id) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/user/del', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams({
                id
            }).toString()
        }).then(e => e.json())
            .then(e => {
                console.log(e);

            })
    }
};
//修改账号密码

export const adminupdate = (a) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/user/update', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams({
                ...a
            }).toString()
        }).then(e => e.json())
            .then(e => {

            })
    }
}
//搜索账号
export const finduser = (e) => {
    return dispatch => {
    fetch('http://127.0.0.1:88/api/user/find', {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post",
        body: new URLSearchParams({
            username: e
        }).toString()
        }).then(e => e.json())
        .then(e => {
            dispatch(finduse(e))

        })
    }
}
//搜索账号页码
export const finduserpage = (e) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/user/findcount', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams({
                username: e
            }).toString()
        }).then(e => e.json())
            .then(e => {
                dispatch(findusepg(e.count))

            })
    }
}
//添加账号密码
export const adminadd = (a) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/user/register', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams({
                ...a
            }).toString()
        }).then(e => e.json())
            .then(e => {

            })
    }
}
//添加商品
export const creat = (records) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/commodity?act=add' + records).then(e => e.json())
            .then(e => {
                
            })

    };
};
//删除数据
export const del = (id) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/commodity?act=del&id=' + id).then(e => e.json())
            .then(e => {
                

            })

    };
};
//查询名称数据
export const findkeyall = (name, num) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/commodity?act=findkey&name=' + name + '&page=' + num).then(e => e.json())
            .then(e => {
                dispatch(find(e))
            })

    }
};
//查询名称数据的总页码
export const findkeypage = (val) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/commodity?act=findcountkey&name=' + val).then(e => e.json())
            .then(e => {
                dispatch(findpg(e.count))
            })

    }
};
//查询分类数据
export const findall = (v1, v2, num) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/commodity?act=find&v1=' + v1 + '&v2=' + v2 + '&page=' + num).then(e => e.json())
            .then(e => {
                dispatch(finds(e))
            })

    }
};
//查询分类数据的总页码
export const findpage = (v1, v2) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/commodity?act=findcount&v1=' + v1 + '&v2=' + v2).then(e => e.json())
            .then(e => {
                dispatch(findpgs(e.count))
            })

    }
};
//批量删除
export const delall = (ids) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/commodity?act=delAll&all=' + ids).then(e => e.json())
            .then(e => {

            })

    };
};

//修改数据
export const update = (e) => {
    console.log(e);

    return dispatch => {
        fetch('http://127.0.0.1:88/api/commodity/update', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams(e).toString()
        }).then(e => e.json())
            .then(res => {
            })

    };
};

//上架开关
export const shelf = (e) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/commodity/update', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams(e).toString()
        }).then(e => e.json())
            .then(res => {
            })

    };
};

//订单添加
export const creat2 = (records) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/order?acr=add' + records).then(e => e.json())
            .then(e => {

            })

    };
};

//订单修改状态
export const orderxiugai = (e) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/order/update', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams(e).toString()
        }).then(e => e.json())
            .then(res => {
            })

    };
};

//thunk   请求单页订单数据
export const oddorder = (num) => {
    return dispatch => {
        axios.get("http://127.0.0.1:88/api/order?acr=get&page=" + num).then(
            response => {
                dispatch(addoder(response.data))
            }
        )

    };
};

//请求订单总页码
export const oderpagecount = () => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/order?acr=get_page_count').then(e => e.json())
            .then(e => {

                dispatch(oderpage(e.count))
            })
    };
};

//查询订单数据
export const findorderkeyall = (name, num) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/order?acr=findkey&zt=' + name + '&page=' + num).then(e => e.json())
            .then(e => {
                dispatch(findorder(e))
            })

    }
};
//查询订单数据的总页码
export const findorderkeypage = (val) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/order?acr=findcountkey&zt=' + val).then(e => e.json())
            .then(e => {
                dispatch(findorderpg(e.count))
            })

    }
};

//查询订单号数据
export const findordernumber = (name) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/order?acr=findnumber&number=' + name).then(e => e.json())
            .then(e => {
                dispatch(findordernm(e))
            })

    }
};
//查询订单号的总页码
export const findordernumberpage = (val) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/order?acr=findcountnumber&number=' + val).then(e => e.json())
            .then(e => {
                dispatch(findordernumberpg(e.count))
            })

    }
};
//查询账号数据
export const findorderphoneall = (name) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/return?act=findphone&phone=' + name).then(e => e.json())
            .then(e => {


                dispatch(findreturnphone(e))
            })

    }
};
//查询账号的总页码
export const findorderphonepage = (val) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/return?act=findcountphone&phone=' + val).then(e => e.json())
            .then(e => {
                dispatch(findreturnphonepg(e.count))
            })

    }
};
//删除订单数据
export const deloder = (id) => {
    console.log(id);

    return dispatch => {

        fetch('http://127.0.0.1:88/api/order?acr=del&id=' + id).then(e => e.json())
            .then(e => {

            })

    };
};
//批量删除订单
export const delallorder = (ids) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/order?acr=delAll&all=' + ids).then(e => e.json())
            .then(e => {

            })

    };
};

//单页退货订单
export const oddreturn = (num) => {
    return dispatch => {
        axios.get("http://127.0.0.1:88/api/return?act=get&page=" + num).then(
            response => {
                dispatch(addreturn(response.data))
            }
        )

    };
};
//请求退货总页码
export const returnpagecount = () => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api//return?act=get_page_count').then(e => e.json())
            .then(e => {

                dispatch(returnpage(e.count))
            })
    };
};
//查询退货的数据
export const findreturnkeyall = (name, num) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/return?act=findkey&of=' + name + '&page=' + num).then(e => e.json())
            .then(e => {
                dispatch(findreturn(e))
            })

    }
};
//查询退货数据的页码
export const findreturnpage = (val) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/return?act=findcountkey&of=' + val).then(e => e.json())
            .then(e => {
                dispatch(findreturnpg(e.count))
            })

    }
};
//查询退货订单号数据
export const findreturnnumber = (name) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/return?act=findnumber&number=' + name).then(e => e.json())
            .then(e => {
                dispatch(findreturnnm(e))
            })

    }
};
//查询退货订单号的总页码
export const findreturnnumberpage = (val) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/return?act=findcountnumber&number=' + val).then(e => e.json())
            .then(e => {
                dispatch(findreturnnumberpg(e.count))
            })

    }
};
//查询退货账号数据
export const findreturnphoneall = (name) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/return?act=findphone&phone=' + name).then(e => e.json())
            .then(e => {


                dispatch(findreturnphone(e))
            })

    }
};
//查询退货账号的总页码
export const findreturnphonepage = (val) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/return?act=findcountphone&phone=' + val).then(e => e.json())
            .then(e => {
                dispatch(findreturnphonepg(e.count))
            })

    }
};

//删除退货数据
export const delreturn = (id) => {
    console.log(id);

    return dispatch => {

        fetch('http://127.0.0.1:88/api/return?act=del&id=' + id).then(e => e.json())
            .then(e => {
            })

    };
};

//批量删除退货单
export const delallreturn = (ids) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/return?act=delAll&all=' + ids).then(e => e.json())
            .then(e => {

            })

    };
};
//修改退货状态数据
export const returnupdate = (e) => {
    console.log(e);

    return dispatch => {
        fetch('http://127.0.0.1:88/api/return/update', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams(e).toString()
        }).then(e => e.json())
            .then(res => {
            })

    };
};
//统计数据
// export function Trade(data) {
//     return {
//         type: TRADE,
//         data
//     }
// }

// //交易数据中间件
// export const Trades = () => {
//     return dispatch => {
//         axios.get("https://5b2f6ad6db0f5e001465b5e0.mockapi.io/trade").then(
//             response => {
//                 dispatch(Trade(response.data))
//             }
//         )

//     };
// };

//请求用户信息
export const shopper = (num) => {
    return dispatch => {
        axios.get("http://127.0.0.1:88/api/shopper?act=get&page=" + num).then(
            response => {
                dispatch(user(response.data))
            }
        )

    };
};

//请求用户信息总页码
export const shoppercount = (num) => {
    return dispatch => {
        axios.get("http://127.0.0.1:88/api/shopper?act=get_page_count").then(
            response => {
                dispatch(usercount(response.count))
            }
        )

    };
};




//查找交易记录
export const gettrade= (num) => {
    return dispatch => {
        axios.get("http://127.0.0.1:88/api/jy?act=findkey&of=" + num).then(
            response => {
                console.log(response.data);
                dispatch(trade(response.data))
            }
        )

    };
};