import React, { Component } from 'react';
import '../../icon/iconfont.css';
import '../../css/font-awesome.min.css';
import '../../css/reset.css';
import Head from './head'
import { NavLink, Link, withRouter } from 'react-router-dom';
import Routesidebar from './Routesidebar';
import Login from '../../login/login'
import '../../css/login.css'
import '../../css/fw.css'
import cookie from 'react-cookies';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

            arr: [
                {
                    k: '商品管理',
                    onOff: false,
                    icon: 'icon-desktop',
                    child: [
                        {

                            title: "商品列表",
                            rs: '/index/content/1',
                            onOff: false,
                        },
                    ]
                },
                // {
                //     k: '图片管理',
                //     onOff: false,
                //     icon: 'icon-picture',
                //     child: [
                //         {
                //             title: "图片库管理",
                //             rs: '/index/d',

                //         },

                //     ]
                // },
                {
                    k: '订单管理',
                    onOff: false,
                    icon: 'icon-list',
                    child: [
                        {
                            title: "订单列表",
                            rs: '/index/order/1',
                        },
                        {
                            title: "退货申请处理",
                            rs: '/index/return/1',
                        },
                        // {
                        //     title: "退款申请处理",
                        //     rs: '/index/refurn/1',
                        // }
                    ]
                },
                {
                    k: '交易管理',
                    onOff: false,
                    icon: 'icon-credit-card',
                    child: [
                        {
                            title: "交易统计",
                            rs: '/index/trade',

                        },
                        // {
                        //     title: "商品统计",
                        //     rs: '/index/i',
                        // },
                        // {
                        //     title: "会员统计",
                        //     rs: '/index/j',
                        // }
                    ]
                },
                {
                    k: '用户管理',
                    onOff: false,
                    icon: 'icon-user',
                    child: [
                        {

                            title: "用户列表",
                            rs: '/index/users/1',
                        },
                        // {
                        //     title: "会员等级设置",
                        //     rs: '/index/l',
                        // },

                    ]
                },
                // {
                //     k: '消息管理',
                //     onOff: false,
                //     icon: 'icon-comments-alt',
                //     child: [
                //         {
                //             title: "短信消息",
                //             rs: '/index/o',
                //         },
                //         {
                //             title: "系统消息",
                //             rs: '/index/p',
                //         }
                //     ]
                // },
                {
                    k: '系统管理',
                    onOff: false,
                    icon: 'icon-cogs',
                    child: [
                        {
                            title: "账户设置",
                            rs: '/index/userpass/1',
                        },

                    ]
                }
            ],
            off: false,
            onf:true
        }

    }

    componentDidMount = () => {
        let { location: { pathname } } = this.props
        let {arr}=this.state
        let ar2 = pathname.split('/index/')
        let str
        if (ar2[1]) {
            let ar3 = ar2[1].split('/')
            str = new RegExp(ar3[0]);
        } else {
            str = new RegExp(2113);
        }
        arr.forEach((e, i) => {
            if (e.child){
               
                
                if (str.test(e.child[0].rs)){                
                        e.onOff=true 
                       
                    }      
            }
        })

        this.setState({ arr })
        
    }
    none = () => {
        this.refs.a1.className = 'active'
        let { arr } = this.state
        arr.forEach((ev, i) => {

            ev.onOff = false

        })
    }
    click = (e) => {
        this.refs.a1.className = ''
        let { arr } = this.state
        arr.forEach((ev, i) => {
            if (i !== e) {
                ev.onOff = false
            }
        })
        arr[e].onOff = !arr[e].onOff
        this.setState({arr})
      
    }

    // onOffchange=(e)=>{
    //     let {off}=this.state
    //      off=e
    //  this.setState({off})
    // }

    render() {
        let { arr, off, onf } = this.state
        let { location: { pathname } } = this.props
        let ar2 = pathname.split('/index/')
        let str
        if (ar2[1]) {
            onf = false
            let ar3 = ar2[1].split('/')
            str = new RegExp(ar3[0]);

        } else {
            onf=true
            str = new RegExp(2113);
        }


        let a = null
        let b = null
        let e = null
        let c = null
        let num = 0;
        let new2 = []
        arr.forEach((e, i) => {
            if (e.child) {
                let arr4 = e.child.map(e => {
                    num++

                    return (
                        // <li className="add" key={+new Date() + num}  >
                        <li className={str.test(e.rs) == true ? 'add active' : 'add'} key={+new Date() + num}  >

                            {/* < NavLink activeClassName="active" to={e.rs} > */}
                            < NavLink activeClassName="" to={e.rs} >
                                <span className="add">{e.title}</span>
                            </NavLink>
                        </li>
                    )
                })
                new2.push(arr4)
            }
        })

        let newArr = arr.map((e, i) => {
            a = e.onOff ? 'down' : 'ndown'
            // b = e.onOff ? 'dds active':'dds'

            c = e.onOff ? 'iconfont icon-shangjiantou' : 'iconfont icon-xiangxiajiantou'
            let newArr3 = new2[i]
            return (
                <li key={i}>
                    <div className={b}>
                        <i className="dli" onClick={this.click.bind(this, i)}>
                            <i className={e.icon}></i>
                            <span className="add">{e.k}</span>
                            <i className={c}></i>
                        </i>
                    </div>
                    <ul className={a}>

                        {newArr3}

                    </ul>
                </li>

            )
        })
        let ar
        ar = <div className="main-container">
            <div className="sidebar" id="sidebar">
                <div className="ce">
                    <div className="shortcuts  iconfont icon-aislogo"></div>
                </div>

                <ul id="oUl">
                    <li id="dli2" onClick={this.none} ref='a1' className={onf==true?'active':''}>
                        <Link to='/index'  >
                            <i className="icon-home " id="home"></i>
                            <span className="add">首页</span>
                            <i className="iconfont ic"></i>
                        </Link>

                    </li>
                    {newArr}
                </ul>
            </div>
            <div className="content">
                <div className="cont">
                    <Head />
                </div>
                <div className="contents">
                    <Routesidebar />
                </div>
            </div>
        </div>

        return (

            <div className="route_box">{ar}</div>
        )
    }
}
// export default connect((state) => {
//     console.log(state.reducer1)
//     return { arr: state.reducer1 };
// })(Index) 
export default withRouter(Index); 