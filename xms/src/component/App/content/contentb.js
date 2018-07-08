import React from 'react';
import '../../css/commodity.css';
// import Page from './page';
import '../../css/indexmin400max870.css';
import '../../css/indexmin870.css';
import Pagecomponent from './Pagecomponent';
import { NavLink, withRouter } from 'react-router-dom';
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Share from '../Share/share';
import axios from 'axios';
import './tan.css'

class Contentb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tishi:'',
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
            Name: '',
            Stock: '',
            article: '',
            checked: '',
            id: "",
            ids: '',
            Price: '',
            onOFF: false,
            time: '',
            vue1: '',
            vue2: '', 
            order2: '',
            order: '',
            onf: false,
            onf2:false
        };
    }

    //异步请求返回数据之前，组件可能就已经被卸载了，
    //等数据回来再使用setState就会报出上面的警告，
    //所以我们应该手动在componentWillUnmount里去取消callback在它被unmounting之前



    componentDidMount() {
        this._isMounted = true
        let { odd, pagecount } = this.props

        odd(1)
        pagecount()

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
        let { odd, del, pagecount, data, history } = this.props
        console.log(data.length);

        if (data.length === 1) {
            nowpage = nowpage - 1
            this.setState({
                nowpage
            })
            history.push(`/index/b/${nowpage}`);

        }

        del(ID)
        odd(nowpage)
        this.refs.del.style.display = 'none'
        pagecount()
        let that=this
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
        let that = this
        that.setState({ tishi: '删除成功' })
        that.refs.tishi.className = 'tishi1'
        setTimeout(function () {
            that.refs.tishi.className = 'tishi2'
        }, 3000)


    }

    //编辑弹窗数值修改
    edit = (e) => {
        this.refs.tan.style.display = 'block'

        this.setState({
            // e:e,
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
            time: e.time,

        })

    }

    bjfl2 = (ev) => {
        this.setState({ vue2: ev.target.value })
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

        let { number, Name, Stock, article, Price, nowpage, id, checked, onOFF, time, vue1, vue2 } = this.state
        if (!vue1) {
            return
        }
        let records = {
            id,
            Name,
            number,
            Stock,
            article,
            checked,
            onOFF,
            Price,
            time,
            vue1,
            vue2
        }
        let { Modify, odd, update } = this.props
        if (Name && Stock && article && Price) {
            update(records)
            setTimeout(e => {
                odd(nowpage)
                this.refs.tan.style.display = 'none'
            }, )

            let that = this
            that.setState({ tishi: '修改成功' })
            that.refs.tishi.className = 'tishi1'
            setTimeout(function () {
                that.refs.tishi.className = 'tishi2'
            }, 3000)

        } else {
 
        }

        this.setState({
            vue1: '',
            vue2: ''
        })
        this.refs.bjvue1.value = ''
        this.refs.bjvue2.value = ''
    }
    //添加分类点击
    fladd1 = (ev) => {
        this.setState({
            vue1: ev.target.value
        })
    }
    fladd2 = (ev) => {

        this.setState({
            vue2: ev.target.value
        })
    }
    //添加确认
    addsure = () => {

        let { number, Name, Stock, article, Price, nowpage, onOFF, vue1, vue2 } = this.state
        if (!vue1 && !vue2) {
            return
        }
        let records = `&Name=${Name}&Stock=${Stock}&article=${article}&Price=${Price}&onOFF=${onOFF}&vue1=${vue1}&vue2=${vue2}`
        let { creat, odd, axiosData, pagecount } = this.props
        // async function asyncLoadData() {
        //     let data1 = await creat(records)
        //     let data3 = await pagecount()
        //     let data2 = await odd(nowpage)
        // }
        // asyncLoadData()
        setTimeout(function () {
            creat(records)
            pagecount()
            odd(nowpage)
        }, 20)

        setTimeout(e => {

            this.refs.addtan.style.display = 'none'
            this.setState({
                number: '',
                Name: '',
                Stock: '',
                article: '',
                checked: '',
                id: "",
                ids: '',
                Price: '',
                vue1: '',
                vue2: ''
            })
        }, 50)
        this.refs.vue1.value = ''
        this.refs.vue2.value = ''
        this.setState({
            vue1: '',
            vue2: ''
        })
        let that = this
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
            // e:e,
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
            time: e.time,
            vue1: e.vue1,
            vue2: e.vue2,
        })
    }
    //查看确认
    cksure = () => {
        this.refs.cktan.style.display = 'none'
    }
    //搜索确认
    searchsure = (ev) => { 
      
        let { search, nowpage } = this.state
        let { findkeyall, findkeypage } = this.props
        if (search) {
            nowpage = 1
            this.setState({
                nowpage
            })
            this.refs.search.value = ''
            async function asyncLoadData() {
                let data2 = await findkeypage(search)
                let data1 = await findkeyall(search, nowpage)
            }
            asyncLoadData()
            // findall(search, nowpage)
            // findpage(search)
        }
        this.refs.v1.value = ''
        this.refs.v2.value = ''

        this.setState({
            order:'',
            nowpage: 1,
            v1: '',
            v2: '',
            onf: false,
            onf2:true
        })

    }

    //刷新
    break = () => {
        let { odd, pagecount } = this.props
        let { nowpage } = this.state
       
        this.refs.v1.value = ''
        this.refs.v2.value = ''
        
        this.setState({
            nowpage: 1,
            v1: '',
            v2: '',
            onf: false,
            onf:false,
            search: '',
            order2: '',
            order: ''
        })
        odd(nowpage)
        pagecount()
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

        let { error, isLoaded, nowpage, pagecontent, onOff, search, v1, v2, vue1, vue2, onf,onf2,tishi } = this.state
        let { number, Name, Stock, article, Price } = this.state
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
            return <Share
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
                    <i>商品管理</i>
                    <span>商品列表</span>
                    <div id="bread_r">
                        <div className="remove4">
                            <i id="remove5"
                                onClick={this.break}
                            >刷新</i>
                        </div>
                        <div className="add" onClick={this.addclick}>
                            <a><i id="add"

                            >添加商品</i></a>
                        </div>
                        <div className="remove">
                            <i id="remove"
                                onClick={this.delAll}
                            >批量删除</i>
                        </div>
                    </div>
                </div>

                <div className="search"></div>
                <div className="comsearch comsearch_t">
                    <div className="comsearch_h">
                        <ul>
                            <li>
                                <select name="" id="" ref='v1'
                                    onClick={this.flclick.bind(this)}
                                >
                                    <option value="">所有分类</option>
                                    <option value="男装">男装</option>
                                    <option value="女装">女装</option>
                                </select>
                            </li>
                            <li >
                                <select name="" id="" ref='v2'
                                    onClick={this.flclick2.bind(this)}
                                >
                                    <option value="">所有分类</option>
                                    <option value="上装">上装</option>
                                    <option value="下装">下装</option>
                                </select>
                            </li>
                            <li id="seah">
                                <input type="button" value="搜索" id="search-btn"
                                    onClick={this.fenleisure.bind(this,'搜索')}
                                />
                            </li>
                            <li id="sch">
                                <input type="text" placeholder="请输入商品名称" id="searchs"
                                    ref='search'
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
                                    <th index="id">商品编号</th>
                                    <th>商品名称</th>
                                    <th index="price">商品图片</th>
                                    <th>货号</th>
                                    <th>价格</th>
                                    <th>状态</th>
                                    <th>库存</th>
                                    <th className='bj'>操作</th>
                                </tr>
                            </thead>
                            <tbody id="tb" ref='tb'>
                                {newArr}
                            </tbody>
                        </table>
                    </section>
                    < Pagecomponent
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
                    <div className="tan_box">
                        <div className="tan_title clear">
                            <span>编辑</span>
                            <i
                                onClick={this.bjnone}
                            >×</i>
                        </div>
                        <div className="input_content">
                            {/* <div className="input_info">
                                <span>商品编号:</span>
                                <input type="text"
                                    value={number}
                                    onChange={this.handleChange.bind(this)} name="number"
                                />
                            </div> */}
                            <div className="input_info">
                                <span>分类名称:</span>
                                <select name="" id=""
                                    onClick={this.bjfl.bind(this)}
                                    ref='bjvue1'
                                >
                                    <option value="">所有分类</option>
                                    <option value="男装">男装</option>
                                    <option value="女装">女装</option>
                                </select>
                                <select name="" id=""
                                    onClick={this.bjfl2.bind(this)}
                                    ref='bjvue2'
                                >
                                    <option value="">所有分类</option>
                                    <option value="上装">上装</option>
                                    <option value="下装">下装</option>
                                </select>
                            </div>

                            <div className="input_info">
                                <span>商品名称</span>
                                <input type="text"

                                    onChange={this.handleChange.bind(this)} name="Name"
                                    value={Name}
                                />
                            </div>
                            <div className="input_info">
                                <span>商品库存:</span>

                                <input type="text"
                                    value={Stock}
                                    onChange={this.handleChange.bind(this)} name="Stock"
                                />
                            </div>
                            <div className="input_info">
                                <span>商品货号:</span>
                                <input type="text"
                                    value={article}
                                    onChange={this.handleChange.bind(this)} name="article"
                                />
                            </div>
                            <div className="input_info">
                                <span>商品价格:</span>
                                <input type="text"
                                    value={Price}
                                    onChange={this.handleChange.bind(this)} name="Price"
                                />
                            </div>


                            <div className="btn_sure">
                                <a href="javascript:;" className="sure"
                                    onClick={this.sure.bind(this)}
                                >确定</a>

                            </div>
                        </div>
                    </div>
                </div>


                {/*添加弹窗*/}
                <div className="tan_content" ref="addtan">
                    <div className="bg"></div>
                    <div className="tan_box">
                        <div className="tan_title clear">
                            <span>添加</span>
                            <i
                                onClick={this.none}
                            >×</i>
                        </div>
                        <div className="input_content">
                            {/* <div className="input_info">
                                <span>商品编号:</span>
                                <input type="text"
                                    value={number}

                                    onChange={this.handleChange.bind(this)} name="number"
                                />
                            </div> */}
                            <div className="input_info">
                                <span>分类名称:</span>
                                <select name="" id=""
                                    onClick={this.fladd1.bind(this)}
                                    ref='vue1'
                                >
                                    <option value="">所有分类</option>
                                    <option value="男装">男装</option>
                                    <option value="女装">女装</option>
                                </select>
                                <select name="" id=""
                                    onClick={this.fladd2.bind(this)}
                                    ref='vue2'
                                >
                                    <option value="">所有分类</option>
                                    <option value="上装">上装</option>
                                    <option value="下装">下装</option>
                                </select>
                            </div>

                            <div className="input_info">
                                <span>商品名称</span>
                                <input type="text"

                                    onChange={this.handleChange.bind(this)} name="Name"
                                    value={Name}
                                />
                            </div>
                            <div className="input_info">
                                <span>商品库存:</span>

                                <input type="text"
                                    value={Stock}
                                    onChange={this.handleChange.bind(this)} name="Stock"
                                />
                            </div>
                            <div className="input_info">
                                <span>商品货号:</span>
                                <input type="text"
                                    value={article}
                                    onChange={this.handleChange.bind(this)} name="article"
                                />
                            </div>
                            <div className="input_info">
                                <span>商品价格:</span>
                                <input type="text"
                                    value={Price}
                                    onChange={this.handleChange.bind(this)} name="Price"
                                />
                            </div>


                            <div className="btn_sure">
                                <a href="javascript:;" className="sure"
                                    onClick={this.addsure.bind(this)}
                                >确定</a>
                                <a href="javascript:;" className="replay"
                                    onClick={this.reset}
                                >重置</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 查看弹窗 */}
                <div className="tan_content" ref="cktan">
                    <div className="bg"></div>
                    <div className="tan_box">
                        <div className="tan_title clear">
                            <span>查看</span>
                            <i
                                onClick={this.cksure.bind(this)}
                            >×</i>
                        </div>
                        <div className="input_content">
                            <div className="input_info">
                                <span>商品编号:</span>
                                <input type="text"
                                    value={number}
                                    disabled
                                    onChange={this.handleChange.bind(this)} name="number"
                                />
                            </div>
                            <div className="input_info">
                                <span>分类名称:</span>
                                <select name="" id="" disabled value={vue1}>
                                    <option value="男装">男装</option>
                                    <option value="女装">女装</option>
                                </select>
                                <select name="" id="" disabled value={vue2}>
                                    <option value="上装">上装</option>
                                    <option value="下装">下装</option>
                                </select>
                            </div>

                            <div className="input_info">
                                <span>商品名称</span>
                                <input type="text"
                                    disabled
                                    onChange={this.handleChange.bind(this)} name="Name"
                                    value={Name}
                                />
                            </div>
                            <div className="input_info">
                                <span>商品库存:</span>

                                <input type="text"
                                    value={Stock}
                                    disabled
                                    onChange={this.handleChange.bind(this)} name="Stock"
                                />
                            </div>
                            <div className="input_info">
                                <span>商品货号:</span>
                                <input type="text"
                                    value={article}
                                    disabled
                                    onChange={this.handleChange.bind(this)} name="article"
                                />
                            </div>
                            <div className="input_info">
                                <span>商品价格:</span>
                                <input type="text"
                                    value={Price}
                                    disabled
                                    onChange={this.handleChange.bind(this)} name="Price"
                                />
                            </div>


                            <div className="btn_sure">
                                <a href="javascript:;" className="sure"
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
        data: state.reducer.content,
        count: state.reducer.page

    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(Contentb)) 