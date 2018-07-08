import React from 'react';
import '../../css/commodity.css';
import cookie from 'react-cookies'

// import Page from './page';
import '../../css/indexmin400max870.css';
import '../../css/indexmin870.css';
import Passwordpage from './passwordpage';
import { NavLink, withRouter } from 'react-router-dom';
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Passlist from '../Share/passlist';
import axios from 'axios';
import './tan.css'

class Passgl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            v1: '',
            v2: '',
            i: '',
            search: '',
            e: '',
            nowpage: 1,
            pagecontent: 9,
            onOff: false,
            record: [],
            error: null,
            isLoaded: false,
            //弹窗数据
            number: '',

            checked: '',
            id: "",
            ids: '',
            onOFF: false,
            time: '',
            vue1: '',
            vue2: '',
            order2: '',
            order: '',
            onf: false,
            onf2: false,
            username: '',
            password: '',
            phone: '',
            of: true,
            level: '',
            onfs: true,
            tishi: ''
        };
    }

    //异步请求返回数据之前，组件可能就已经被卸载了，
    //等数据回来再使用setState就会报出上面的警告，
    //所以我们应该手动在componentWillUnmount里去取消callback在它被unmounting之前



    componentDidMount() {
        this._isMounted = true
        let { administrators, adminpage } = this.props

        administrators(1)
        adminpage()

    }


    componentWillUnmount() {
        this._isMounted = false
    }

    //删除时判断全选开关
    cc = (onOff, nowpage) => {
        this.setState({
            onOff: onOff,
            nowpage: nowpage
        })
    }

    //删除弹窗

    deltan = (e, i) => {
        console.log(i);

        this.setState({ ID: e.id, e: e, i: i })
        this.refs.del.style.display = 'block'
    }
    //弹窗确认删除
    delclick = () => {
        let { ID, nowpage, i } = this.state
        let { odd, del, pagecount, data, history, admindel, administrators, adminpage } = this.props
        console.log(data.length);

        if (data.length === 1) {
            nowpage = nowpage - 1
            this.setState({
                nowpage
            })
            history.push(`/index/userpass/${nowpage}`);

        }

        admindel(ID)
        administrators(nowpage)
        adminpage()
        this.refs.del.style.display = 'none'
        let that = this
        that.setState({ tishi: '删除成功' })
        that.refs.tishi.className = 'tishi1'
        setTimeout(function () {
            that.refs.tishi.className = 'tishi2'
        }, 3000)


    }
    //取消弹窗删除
    cancelclick = () => {
        this.refs.del.style.display = 'none'
    }
    //全选
    changeall = () => {
        let { data } = this.props

        let { onOff, record } = this.state
        onOff = !onOff

        for (let i = 0; i < data.length; i++) {
            if (data[i]) {
                data[i].checked = onOff
            }
        }
        this.setState(
            { onOff, record }
        )

    }
    //批量删除
    delAll = () => {

        let { data, delall, odd, pagecount, history } = this.props
        let { nowpage, onOff } = this.state

        let arr = []
        let a = data.filter(e => {
            return e.checked
        })
        a.forEach(e => {
            arr.push(e.id)
        });
        let p = JSON.stringify(arr);
        delall(p)
        async function asyncLoadData() {
            let data3 = await pagecount()
            let data2 = await odd(nowpage)
        }
        asyncLoadData()
        if (data.length === a.length && nowpage > 1) {
            nowpage = nowpage - 1
            onOff = !onOff

            this.setState({
                nowpage, onOff
            })
            history.push(`/index/content/${nowpage}`);

        }


    }

    //编辑弹窗数值修改
    edit = (e) => {
        this.refs.tan.style.display = 'block'

        this.setState({

            e: e,
            username: e.username,
            password: e.password,
            phone: e.phone,
            id: e.id,

        })

    }



    bjfl = (ev) => {

        this.setState({ vue1: ev.target.value })

    }
    //添加弹窗消失
    none = () => {
        this.refs.addtan.style.display = 'none'
    }
    //编辑弹窗消失
    bjnone = () => {
        this.refs.tan.style.display = 'none'
    }

    reset = () => {

        this.setState({
            number: '',
            Name: '',
            Stock: '',
            article: '',
            checked: '',
            id: "",
            ids: '',
            Price: '',
        })

    }
    handleChange(event) {
        this.refs.use.style.borderColor = ''
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ))
    }
    //编辑弹窗确认
    sure = () => {

        let { number, username, nowpage, password, id, phone, checked, onOFF, time, vue1, vue2, } = this.state
        if (!vue1) {
            alert('请选择分类')
            return
        }


        let records = {
            id,
            username,
            password,
            phone,
            level: vue1,
        }
        console.log(records);
        let { Modify, adminupdate, administrators } = this.props
        if (username && password && phone && vue1) {
            adminupdate(records)
            setTimeout(e => {
                administrators(nowpage)
                this.refs.tan.style.display = 'none'
            }, )
        } else {
            console.log('请输入内容');
        }

        this.setState({
            vue1: '',
        })
        this.refs.bjvue1.value = ''
        let that = this
        that.setState({ tishi: '更改成功' })
        that.refs.tishi.className = 'tishi1'
        setTimeout(function () {
            that.refs.tishi.className = 'tishi2'
        }, 3000)
    }
    //添加分类点击
    fladd1 = (ev) => {
        this.setState({ 
            vue1: ev.target.value
        })
    }
    fn = (ev) => {
        this.setState({ onfs: ev })
    }
    
    //添加确认
    addsure = () => {
        let { nowpage, onOFF, vue1, vue2, username, password, phone, of } = this.state
        let { data } = this.props
        console.log(username);

        let a = data.filter(e => {
            return e.username == username
        })

        let that = this

        if (!vue1) {
            return
        }
        if (a[0]) {
            console.log(1);
            that.refs.use.style.borderColor = 'red'
            return
        } 
            let obj = {
                username,
                password,
                phone,
                level: vue1
            }
            let { administrators, adminpage, adminadd } = that.props
            adminadd(obj)
            setTimeout(function () {
                administrators(nowpage)
                adminpage()
            }, 20)

            setTimeout(e => {

                that.refs.addtan.style.display = 'none'
                that.setState({
                    username: '',
                    password: '',
                    vue1: '',
                    phone: ''

                })
            })
            that.refs.vue2.value = ''
            that.setState({ tishi: '添加成功' })
            that.refs.tishi.className = 'tishi1'
            setTimeout(function () {
                that.refs.tishi.className = 'tishi2'
            }, 3000)
        

    }

    addclick = () => {
        this.setState({
            number: '',
            Name: '',
            Stock: '',
            article: '',
            checked: '',
            id: "",
            ids: '',
            Price: ''
        })
        this.refs.addtan.style.display = 'block'
    }


    //查看弹窗
    ckclick = (e) => {
        console.log(e);

        this.refs.cktan.style.display = 'block'
        this.setState({
            e: e,
            number: e.number,
            Name: e.Name,
            Stock: e.Stock,
            article: e.article,
            checked: e.checked,
            id: e.id,
            ids: e.ids,
            onOff: e.onOff,
            Price: e.Price,
            onOFF: e.onOFF,
            title: e.title,
            username: e.username,
            password: e.password,
            phone: e.phone,
            time: e.time,
            vue1: e.vue1,
        })
    }
    //查看确认
    cksure = () => {
        this.refs.cktan.style.display = 'none'
    }
    //搜索确认
    searchsure = (ev) => {

        let { v1, nowpage,search } = this.state
        let { finduser, finduserpage } = this.props
 
        if (search) {
            nowpage = 1
            this.setState({
                nowpage
            })
            async function asyncLoadData() {
                let data2 = await finduserpage(search)
                let data1 = await finduser(search)
            }
            asyncLoadData()
            // findall(search, nowpage)
            // findpage(search)
        }
        this.refs.v1.value = ''

        this.setState({
            order: '',
            nowpage: 1,
            v1: '',
            onf: false,
            onf2: true,
        })

    }

    //刷新
    break = () => {
        let { odd, adminpage, administrators } = this.props
        let { nowpage } = this.state

        this.refs.v1.value = ''

        this.setState({
            nowpage: 1,
            v1: '',
            v2: '',
            onf: false,
            onf2: false,
            search: '',
            order2: '',
            order: ''
        })
        administrators(1)
        adminpage()
    }

    flclick = (ev) => {
        this.setState({
            v1: ev.target.value,
        })

    }
    flclick2 = (ev) => {
        this.setState({
            v2: ev.target.value,
        })

    }

    fenleisure = () => {
        let { v1, v2, nowpage } = this.state
        let { findall, findpage } = this.props
        this.setState({ onf: true })
        nowpage = 1
        this.setState({
            nowpage
        })
        this.refs.search.value = ''
        async function asyncLoadData() {
            let data2 = await findpage(v1, v2)
            let data1 = await findall(v1, v2, nowpage)
        }
        asyncLoadData()
        this.setState({
            search: '',
            onf2: false,
            onf: true
        })


    }
    render() {

        let { data, count } = this.props

        let { error, isLoaded, nowpage, pagecontent, onOff, search, v1, v2, vue1, vue2, onf, onf2,
            username, password, phone, of, e, tishi
        } = this.state
        onOff = data.every(e => { return e.checked === true })
        if (data == 0) {
            isLoaded = true
            onOff = false
        }
        if (isLoaded != data) {
            isLoaded = true
        } else {
            isLoaded = false
        }

        //判断全选开关
        if (isLoaded != data) {
            isLoaded = true
        } else {
            isLoaded = false
        }
        let newArr = data.map((e, i) => {
            let checkedonOff = e.checked ? 'checked' : ''
            return <Passlist
                {...{
                    key: i,
                    onOff,
                    e,
                    i,
                    nowpage,
                    onlOff: this.onlOff,
                    del: this.del,
                    cc: this.cc,
                    checkedonOff,
                    edit: this.edit,
                    deltan: this.deltan,
                    delclick: this.delclick,
                    ckclick: this.ckclick,
                    of: of
                }}
            />

        })

        let ar
        if (error) { //请求失败 报错
            ar = <div>Error: {error.message}</div>;
        } else if (!isLoaded) { //loading页面
            ar = <div>Loading...</div>;
        }
        else {
            ar = (<div>
                <div className="breadcrumb">
                    <i>系统管理</i>
                    <span>账户设置</span>
                    <div id="bread_r" >
                        <div className="remove4" onClick={this.break}>
                            <i id="remove5"

                            >刷新</i>
                        </div>
                        <div className="add" onClick={this.addclick}>
                            <a><i id="add"

                            >添加账号</i></a>
                        </div>

                    </div>
                </div>

                <div className="search"></div>
                <div className="comsearch comsearch_t">
                    <div className="comsearch_h">
                        <ul>

                            <li id="sch">
                                <input type="text" placeholder="请输入管理员账号" id="searchs"
                                    ref='v1'
                                    onChange={this.handleChange.bind(this)} name="search"
                                />
                                <input type="button" value="搜索" id="searchs-btn"
                                    onClick={this.searchsure}
                                />
                            </li>
                        </ul>
                    </div>
                    <section className="tBody" ref="td" >
                        <table id="tab" width="600" align="center" border="1" >
                            <thead>
                                <tr>
                                    <th className='checked'>
                                        <label>
                                            <input type="checkbox"
                                                onChange={this.changeall}
                                                checked={onOff ? 'checked' : ''}
                                            />
                                            <span></span>
                                        </label>
                                    </th>
                                    {/* <th index="id">商品编号</th> */}
                                    <th>登录名</th>
                                    <th index="price">联系方式</th>
                                    <th>权限</th>
                                    <th>加入时间</th>
                                    <th>状态</th>
                                    <th className='bj'>操作</th>
                                </tr>
                            </thead>
                            <tbody id="tb" ref='tb'>
                                {newArr}
                            </tbody>
                        </table>
                    </section>
                    < Passwordpage
                        onlOff={this.onlOff}
                        count={count}
                        cc={this.cc}
                        ondata={data}
                        nowpage={nowpage}
                        search={search}
                        v1={v1}
                        v2={v2}
                        onf={onf}
                        onf2={onf2}
                    />
                </div>


                {/* 编辑弹窗 */}
                <div className="tan_content" ref="tan">
                    <div className="bg"></div>
                    <div className="tan_box" style={{ width: '550px' }}>
                        <div className="tan_title clear">
                            <span>编辑</span>
                            <i
                                onClick={this.bjnone.bind(this)}
                            >×</i>
                        </div>
                        <div className="input_content">

                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span>分类名称:</span>
                                <select name="" id=""
                                    onClick={this.bjfl.bind(this)}

                                    style={{ width: '150px' }}
                                    ref='bjvue1'
                                >
                                    <option value="">权限设置</option>
                                    <option value="r1">普通管理员</option>
                                    <option value="r2">超级管理员</option>
                                </select>

                            </div>

                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span> 登录名 ：</span>
                                <input type="text"

                                    style={{ width: '150px' }}
                                    onChange={this.handleChange.bind(this)} name="username"
                                    value={username}

                                />
                            </div>
                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span> 登录密码:</span>
                                <input type="text"
                                    style={{ width: '150px' }}
                                    onChange={this.handleChange.bind(this)} name="password"
                                    value={password}

                                />
                            </div>
                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span>联系方式:</span>

                                <input type="text"
                                    style={{ width: '150px' }}
                                    value={phone}

                                    onChange={this.handleChange.bind(this)} name="phone"
                                />
                            </div>


                            <div className="btn_sure" style={{ paddingLeft: '240px' }}>
                                <a className="sure"
                                    onClick={this.sure.bind(this)}
                                >确定</a>
                            </div>
                        </div>
                    </div>
                </div>


                {/*添加弹窗*/}
                <div className="tan_content" ref="addtan">
                    <div className="bg"></div>
                    <div className="tan_box" style={{ width: '550px' }}>
                        <div className="tan_title clear">
                            <span>添加</span>
                            <i
                                onClick={this.none}
                            >×</i>
                        </div>
                        <div className="input_content">

                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span>分类名称:</span>
                                <select name="" id=""
                                    onClick={this.fladd1.bind(this)}
                                    ref='vue2'
                                    style={{ width: '150px' }}
                                >
                                    <option value="">权限设置</option>
                                    <option value="r1">普通管理员</option>
                                    <option value="r2">超级管理员</option>
                                </select>

                            </div>

                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span> 登录名 ：</span>
                                <input type="text"
                                    ref='use'
                                    style={{ width: '150px' }}
                                    onChange={this.handleChange.bind(this)} name="username"
                                    value={username}
                                />
                            </div>
                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span> 登录密码:</span>
                                <input type="text"
                                    style={{ width: '150px' }}
                                    onChange={this.handleChange.bind(this)} name="password"
                                    value={password}
                                />
                            </div>
                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span>联系方式:</span>

                                <input type="text"
                                    style={{ width: '150px' }}
                                    value={phone}
                                    onChange={this.handleChange.bind(this)} name="phone"
                                />
                            </div>


                            <div className="btn_sure" style={{ paddingLeft: '240px' }}>
                                <a href="javascript:;" className="sure"
                                    onClick={this.addsure.bind(this)}
                                >确定</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 查看弹窗 */}
                <div className="tan_content" ref="cktan">
                    <div className="bg"></div>
                    <div className="tan_box" style={{ width: '550px' }}>
                        <div className="tan_title clear">
                            <span>查看</span>
                            <i
                                onClick={this.cksure.bind(this)}
                            >×</i>
                        </div>
                        <div className="input_content">

                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span>分类名称:</span>
                                <select name="" id=""
                                    value={e.level == 'r1' ? 'r1' : 'r2'}
                                    ref='vue1'
                                    style={{ width: '150px' }}
                                    disabled
                                >
                                    <option value="">权限设置</option>
                                    <option value="r1">普通管理员</option>
                                    <option value="r2">超级管理员</option>
                                </select>

                            </div>

                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span> 登录名 ：</span>
                                <input type="text"
                                    style={{ width: '150px' }}
                                    onChange={this.handleChange.bind(this)} name="username"
                                    value={username}
                                    disabled
                                />
                            </div>
                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span> 登录密码:</span>
                                <input type="text"
                                    style={{ width: '150px' }}
                                    onChange={this.handleChange.bind(this)} name="password"
                                    value={password}
                                    disabled
                                />
                            </div>
                            <div className="input_info" style={{ paddingLeft: '150px' }}>
                                <span>联系方式:</span>

                                <input type="text"
                                    style={{ width: '150px' }}
                                    value={phone}
                                    disabled
                                    onChange={this.handleChange.bind(this)} name="phone"
                                />
                            </div>


                            <div className="btn_sure" style={{ paddingLeft: '240px' }}>
                                <a className="sure"
                                    onClick={this.cksure.bind(this)}
                                >确定</a>
                            </div>
                        </div>
                    </div>
                </div>


                {/* 删除弹窗 */}
                <div className="tan_content" id='del' ref='del'>
                    <div className="bg"></div>
                    <div className="tan_box delete_box ">
                        <div className="tan_title clear">
                            <span>删除</span>
                            <i
                                onClick={this.cancelclick}
                            >×</i>
                        </div>
                        <div className="text_box " id="d_box">
                            <i></i>
                            <span>确定删除此项？</span>
                        </div>
                        <div className="input_content">
                            <div className="btn_sure btn_two">
                                <a href="javascript:;" className="sure"
                                    onClick={this.delclick}
                                >确定</a>
                                <a href="javascript:;" className="replay"
                                    onClick={this.cancelclick}
                                >取消</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tishi' ref='tishi'>
                    <i className='iconfont icon-zhengquetishitianchong'></i>
                    <span>{tishi}</span>
                </div>
            </div>
            );
        }

        return (
            <div>
                {ar}
            </div>
        )
    }
}

// export default Contentb;
export default connect((state) => {
    return {
        data: state.reducer5.content,
        count: state.reducer5.page

    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(Passgl)) 