import React, { Component } from 'react';
import '../../css/commodity.css';
import '../../css/add.css';
import '../../css/public.css';
import ODLIST from '../Share/orderelist';
import { withRouter } from 'react-router-dom';
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OrderePage from './orderePage';
import axios from 'axios';
import '../../css/jd.css';
import './tan.css'
class OrderE extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowpage: 1,
            pagecontent: 9,
            onOff: false,
            record: [],
            error: null,
            isLoaded: false,
            vue: '全部订单',
            order:'',
            //弹窗数据
            ID: '',
            i: '',
            number: '',
            Name: '',
            Stock: '',
            article: '',
            checked: '',
            id: "",
            ids: '',
            Price: '',
            e: '',
            time: '',
            title: '',
            mode: '',
            dh: '',
            name: '',
            phone: '',
            lsh: '',
            ps: '',
            dz: '',
            je: '',
            tz: '',
            hh: '',
            sl: '',
            xj: '',
            sp: '',
            ly: '',
            zt: '',
            onf:false,//判断接口开关
            order2:'',
            onf2:false,
            tishi:''
        };
    }

    componentDidMount() {
        this._isMounted = true
        let { oddorder, oderpagecount } = this.props


        oderpagecount()
        oddorder(1)


    }


    componentWillUnmount() {
        this._isMounted = false
    }

    cc = (onOff, nowpage) => {
        this.setState({
            onOff: onOff,
            nowpage: nowpage
        })
    }
    changeall = () => {
        let { data } = this.props


        let { onOff, record } = this.state
        onOff = !onOff
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            if (data[i]) {
                data[i].checked = onOff
            }
        }
        this.setState(
            { onOff, record }
        )

    }
    //删除弹窗打开
    deltan = (e, i) => {
        this.setState({ ID: e.id, e: e, i: i })
        this.refs.del.style.display = 'block'

    }
    //删除弹窗取消
    cancelclick = () => {
        this.refs.del.style.display = 'none'
    }

    //弹窗确认删除
    delclick = () => {
        let { ID, nowpage, i } = this.state
        let { oddorder, deloder, oderpagecount, data, history } = this.props
        if (data.length === 1) {
            nowpage = nowpage - 1
            this.setState({
                nowpage
            })
            history.push(`/index/order/${nowpage}`);

        }

        deloder(ID)
        oderpagecount()
        oddorder(nowpage)

        this.refs.del.style.display = 'none'
        let that = this
        that.setState({ tishi: '删除成功' })
        that.refs.tishi.className = 'tishi1'
        setTimeout(function () {
            that.refs.tishi.className = 'tishi2'
        }, 3000)
    }

    //批量删除
    delAll = () => {

        let { data, delallorder, oddorder, oderpagecount, history } = this.props
        let { nowpage,onOff } = this.state

        let arr = []
        let a = data.filter(e => {
            return e.checked
        })
        a.forEach(e => {
            arr.push(e.id)
        });
        let p = JSON.stringify(arr);
        delallorder(p)

        asyncLoadData()
        if (data.length === a.length && nowpage > 1) {
            nowpage = nowpage - 1
            onOff = !onOff
            this.setState({
                nowpage, onOff
            })
            history.push(`/index/order/${nowpage}`);

        }
        async function asyncLoadData() {
            let data3 = await oderpagecount()
            let data2 = await oddorder(nowpage)
        }
        let that = this
        that.setState({ tishi: '添加成功' })
        that.refs.tishi.className = 'tishi1'
        setTimeout(function () {
            that.refs.tishi.className = 'tishi2'
        }, 3000)

    }

    xq = (e) => {

        this.setState({ e })
        this.refs.xq.style.display = 'block'
        this.refs.ct.style.display = 'none'
    }

    close = () => {
        this.setState({ e: '' })
        this.refs.xq.style.display = 'none'
        this.refs.ct.style.display = 'block'
    }
    //打开修改订单状态弹窗
    zt = (e) => {
        this.setState({ e })

        this.refs.xiugaitan.style.display = 'block'
    }
    sure = () => {
        this.refs.xiugaitan.style.display = 'none'
        let { orderxiugai, oddorder } = this.props
        let { e, nowpage } = this.state
        orderxiugai(e)
        oddorder(nowpage)
        this.refs.vue1.value = ''
        let that = this
        that.setState({ tishi: '状态修改成功' })
        that.refs.tishi.className = 'tishi1'
        setTimeout(function () {
            that.refs.tishi.className = 'tishi2'
        }, 3000)
    }
    nonesure = () => {
        this.refs.xiugaitan.style.display = 'none'
        this.refs.vue1.value = ''
    }

    //修改弹窗状态
    xiugai = (ev) => {
        let { e } = this.state
        e.zt = ev.target.value
        this.setState({
            e
        })


    }
//订单各状态查询
    c = (ev) => {
        let { findorderkeyall, findorderkeypage, oddorder, oderpagecount, nowpage } = this.props

        this.setState({
            
            onf: false,
            onf2: false
        })
        switch (ev) {
            case '全部订单':
                this.refs.c1.className = 'active'
                this.refs.c2.className = this.refs.c3.className = this.refs.c4.className = ''
                oderpagecount()
                oddorder(1)
                break
            case '待发货':
                this.refs.c2.className = 'active'
                this.refs.c1.className = this.refs.c3.className = this.refs.c4.className = ''
                findorderkeyall(0, 1)
                findorderkeypage(0)
                break
            case '已发货':
                this.refs.c3.className = 'active'
                this.refs.c1.className = this.refs.c2.className = this.refs.c4.className = ''
                findorderkeyall(1, 1)
                findorderkeypage(1)
                break
            case '已完成':
                this.refs.c4.className = 'active'
                this.refs.c1.className = this.refs.c3.className = this.refs.c2.className = ''
                findorderkeyall(2, 1)
                findorderkeypage(2)
                break
            default:

        }
        this.setState({ vue: ev, nowpage: 1 })
    }
    //订单查询
    dd = (ev) => {
            this.setState({order:ev.target.value})
    }
    //刷新
    break = () => {
        let { oddorder, oderpagecount } = this.props
        let { nowpage } = this.state
        this.refs.c1.className = this.refs.c1.className = 'active'
        this.refs.c2.className = this.refs.c3.className = this.refs.c4.className = ''
       
        this.setState({
            nowpage: 1,
            v1: '',
            v2: '',
            onf: false,
            order2:'',
            order:''
        })
        this.refs.v1.value=''
        this.refs.v2.value = ''
        oddorder(1), 
        oderpagecount()
    }

    //订单查询确认
    orderfind=()=>{
        let {order}=this.state
        let { findordernumber, findordernumberpage}=this.props
        this.refs.v2.value = ''
        findordernumber(order)
        findordernumberpage(order)
        this.setState({
            // order:'',
            onf:true,
            onf2: false
        })
    }
    //账号查询
    zh = (ev) => {
        this.setState({ order2: ev.target.value })
        
    }
    //账号查询确认
    zhfind=(ev)=>{
        let {order2}=this.state
   
        this.setState({ order: '',onf:false,onf2:true})
        this.refs.v1.value = ''
        let { findorderphoneall, findorderphonepage}=this.props
        findorderphoneall(order2)
        findorderphonepage(order2)
    }


    render() {
        let { data, count } = this.props
        let { error, isLoaded, nowpage, pagecontent, onOff, e, vue, order, onf, order2,onf2,tishi} = this.state


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


        let newArr = data.map((e, i) => {
            let checkedonOff = e.checked ? 'checked' : ''
            return <ODLIST
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
                    xq: this.xq,
                    deltan: this.deltan,
                    addsure: this.addsure,
                    zt: this.zt,

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
            ar = (
                <div>

                    <div className="breadcrumb">
                        <a >订单管理</a>
                        <span>订单列表</span>
                        <div id="bread_r">
                            <div className="remove4">
                                <i id="remove5"
                                    onClick={this.break}
                                >刷新</i>
                            </div>

                            <div className="remove"
                                onClick={this.delAll}
                            >
                                <a id="remove">批量删除</a>
                            </div>
                        </div>
                    </div>



                    {/* <!-- 表单  --> */}
                    <div className="comsearch comsearch_t">
                        <div className="comsearch_h comsearch_h1">
                            <ul id="order">
                                <li>
                                    <div className="active"
                                        ref='c1'>
                                        <p onClick={this.c.bind(this, '全部订单')}

                                        >
                                            <span>全部订单(</span>
                                            <span className="cache">1000</span>
                                            <span>)</span>
                                        </p>
                                    </div>
                                </li>


                                <li>
                                    <div ref='c2'>
                                        <p onClick={this.c.bind(this, '待发货')}

                                        >
                                            <span>待发货(</span>
                                            <span className="cache">1000</span>
                                            <span>)</span>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div ref='c3'>

                                        <p onClick={this.c.bind(this, '已发货')}
                                            ref='c3'
                                        >
                                            <span>已发货(</span>
                                            <span className="cache">1000</span>
                                            <span>)</span>
                                        </p>

                                    </div>
                                </li>
                                <li>
                                    <div ref='c4'>
                                        <p onClick={this.c.bind(this, '已完成')}>
                                            <span 
                                                ref='c4'
                                            >已完成(</span>
                                            <span className="cache">1000</span>
                                            <span>)</span>
                                        </p>

                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className="comsearch_h">
                            <ul>
                                <li id="sch">
                                    <input type="text" placeholder="订单号" id="searchs"
                                        onChange={this.dd.bind(this)}
                                        ref='v1'
                                    />
                                    <input type="button" value="搜索" id="searchs-btn" 
                                    onClick={this.orderfind}
                                    />
                                </li>

                                <li id="sch">
                                    <input type="text" placeholder="请输入账号" id="searchs"
                                        ref='v2' onChange={this.zh.bind(this)}
                                        />
                                    <input type="button" value="搜索" id="searchs-btn"
                                        onClick={this.zhfind}
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="search"></div>
                        <section className="tBody">
                            <table id="tab" width="600" align="center" border="1">
                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox"
                                                    onChange={this.changeall}
                                                    checked={onOff ? 'checked' : ''}
                                                />

                                                <span></span>
                                            </label>
                                        </th>
                                        <th index="id">订单编号</th>
                                        <th>提交时间</th>
                                        <th index="price">用户账号</th>
                                        <th>订单金额</th>
                                        <th>支付方式</th>
                                        <th>订单来源</th>
                                        <th>订单状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody id="tb">
                                    {newArr}
                                </tbody>
                            </table>
                        </section>
                        <OrderePage onlOff={this.onlOff}
                            cc={this.cc}
                            ondata={data}
                            count={count}
                            nowpage={nowpage}
                            vue={vue}
                            order={order}
                            onf={onf}
                            order2={order2}
                            onf2={onf2}
                        />

                    </div>
                </div>
            );
        }
        return (
            <div>
                <div ref="ct">{ar}</div>
                <div id="xq" ref='xq'>
                    <div className="breadcrumb">
                        <span>订单详情</span>
                        <div id="bread_r">
                            <div className="remove4">
                                <a id="remove3"
                                    onClick={this.close}
                                >关闭订单</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- 1 --> */}
                    <div className="jb">
                        <div className="j-t">
                            <div className="f-img j-img">
                                <img src="" alt="" className="iconfont icon-shuqian" />
                                <span>基本信息</span>
                            </div>
                            <div className="comsearch comsearch_t comsearch_t2">
                                <section className="tBody tbody" id="tb">
                                    <table id="tab" width="600" align="center" border="1">
                                        <thead>
                                            <tr>
                                                <th index="id">订单编号</th>
                                                <th>发货单流水号</th>
                                                <th index="price">用户账号</th>
                                                <th>支付方式</th>
                                                <th>配送方式</th>
                                                <th>物流单号</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tb">
                                            <tr>
                                                <td>{e.number}</td>

                                                <td>201707196398345</td>
                                                <td>{e.phone}</td>
                                                <td>支付宝</td>
                                                <td>顺丰快递</td>
                                                <td>123456</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>

                    {/* <!-- 2 --> */}
                    <div className="jb">
                        <div className="j-t">
                            <div className="f-img j-img">
                                <img src="" alt="" className="iconfont icon-shuqian" />
                                <span>收货人信息</span>
                            </div>
                            <div className="comsearch comsearch_t comsearch_t2">
                                <section className="tBody tbody" id="tb">
                                    <table id="tab" width="600" align="center" border="1">
                                        <thead>
                                            <tr>
                                                <th index="id">收货人</th>
                                                <th>手机号码</th>
                                                <th index="price">邮政编码</th>
                                                <th>收货地址</th>
                                                <th>支付金额</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tb">
                                            <tr>
                                                <td>大鸭梨</td>
                                                <td>{e.phone}</td>
                                                <td>518000</td>
                                                <td>广东省深圳市南山区科兴科学园</td>
                                                <td>{e.je}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                    {/* <!-- 3 --> */}
                    <div className="jb">
                        <div className="j-t">
                            <div className="f-img j-img">
                                <img src="" alt="" className="iconfont icon-shuqian" />
                                <span>商品信息</span>
                            </div>
                            <div className="comsearch comsearch_t comsearch_t2">
                                <section className="tBody tbody" id="tb">
                                    <table id="tab" width="600" align="center" border="1">
                                        <thead>
                                            <tr>
                                                <th index="id">商品图片</th>
                                                <th>商品名称</th>
                                                <th index="price">货号</th>
                                                <th>属性</th>
                                                <th>数量</th>
                                                <th>小计</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tb">
                                            <tr>
                                                <td>
                                                    <img src="images/shop1.jpg" alt="" />
                                                </td>

                                                <td>
                                                    <p>银色星芒刺绣网纱底裤</p>
                                                    <p>
                                                        品牌：
                    <i>Victoria's Secret</i>
                                                    </p>
                                                </td>
                                                <td>No86577</td>
                                                <td>
                                                    <p>尺寸：
                         <i>X</i>
                                                    </p>
                                                    <p> 颜色：<i>黑色</i>
                                                    </p>
                                                </td>
                                                <td>1</td>
                                                <td>123456</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="images/shop1.jpg" alt="" />
                                                </td>
                                                <td>
                                                    <p>银色星芒刺绣网纱底裤</p>
                                                    <p>
                                                        品牌：
                              <i>Victoria's Secret</i>
                                                    </p>
                                                </td>
                                                <td>No86577</td>
                                                <td>
                                                    <p>尺寸：
                                 <i>X</i>
                                                    </p>
                                                    <p>
                                                        颜色：
                               <i>黑色</i>
                                                    </p>
                                                </td>
                                                <td>1</td>
                                                <td>123456</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="images/shop1.jpg" alt="" />
                                                </td>

                                                <td>
                                                    <p>银色星芒刺绣网纱底裤</p>
                                                    <p>
                                                        品牌：
                                        <i>Victoria's Secret</i>
                                                    </p>
                                                </td>
                                                <td>No86577</td>
                                                <td>
                                                    <p>尺寸：
                                 <i>X</i>
                                                    </p>
                                                    <p>颜色：<i>黑色</i>
                                                    </p>
                                                </td>
                                                <td>1</td>
                                                <td>123456</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 修改状态 */}
                <div className="tan_content" ref="xiugaitan">
                    <div className="bg"></div>
                    <div className="tan_box tan_box2">
                        <div className="tan_title clear">
                            <span>修改</span>
                            <i
                                onClick={this.nonesure.bind(this)}

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
                                    onClick={this.xiugai.bind(this)}
                                    ref='vue1'
                                >
                                    <option value="">所有分类</option>
                                    <option value="0">待发货</option>
                                    <option value="1">已发货</option>
                                    <option value="2">已完成</option>
                                </select>

                            </div>


                            <div className="btn_sure">
                                <a href="javascript:;" className="sure"
                                    onClick={this.sure.bind(this)}
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
        )
    }
}
export default connect((state) => {

    return {
        data: state.reducer2.content,
        count: state.reducer2.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(OrderE))
// export default OrderE;