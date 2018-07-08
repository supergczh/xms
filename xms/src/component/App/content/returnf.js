import React from 'react';
import '../../css/commodity.css';
import '../../css/add.css';
// import { NavLink } from 'react-router-dom';
import *as actionCreators from '../../actions/action';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ret from '../Share/returnlist';
import ReturnPage from './returnpage';
import axios from 'axios';
import '../../css/fw.css'
import './tan.css'
class ReturndF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            e: '',
            nowpage: 1,
            pagecontent: 9,
            onOff: false,
            record: [],
            error: null,
            isLoaded: false,
            //弹窗数据
            id: "",
            name: '',
            number: '',
            time: '',
            title: '',
            mode: '',
            ly: '',
            zt: '',
            je: '',
            phone: '',
            checked: false,
            yy: '',
            of: '',
            onf:false,
            onf2:false,
            order:'',
            order2:'',
            vue:'全部申请',
            tishi:''
        };
    }

    componentDidMount() {
        this._isMounted = true
        let { oddreturn, returnpagecount } = this.props
        returnpagecount()
        oddreturn(1)
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
        let { data, history, delreturn, returnpagecount, oddreturn } = this.props
        if (data.length === 1) {
            nowpage = nowpage - 1
            this.setState({
                nowpage
            })
            history.push(`/index/return/${nowpage}`);

        }

        delreturn(ID)
        returnpagecount()
        oddreturn(nowpage)

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

        let { data, delallreturn, returnpagecount, oddreturn, history } = this.props
        let { nowpage, onOff } = this.state

        let arr = []
        let a = data.filter(e => {
            return e.checked
        })
        a.forEach(e => {
            arr.push(e.id)
        });
        let p = JSON.stringify(arr);
        delallreturn(p)
        asyncLoadData()
        if (data.length === a.length) {
            onOff = !onOff
            nowpage = nowpage - 1
            this.setState({
                nowpage
                , onOff
            })
            history.push(`/index/return/${nowpage}`);

        }
       

        async function asyncLoadData() {
            let data1 = await returnpagecount()
            let data2 = await oddreturn(nowpage)
        }
        let that = this
        that.setState({ tishi: '删除成功' })
        that.refs.tishi.className = 'tishi1'
        setTimeout(function () {
            that.refs.tishi.className = 'tishi2'
        }, 3000)

    }

    //退货查看
    thclick = (e) => {
        this.setState({ e })
        this.refs.th.style.display = 'block'
        this.refs.thblock.style.display = 'none'
    }

    close = () => {
        this.refs.th.style.display = 'none'
        this.refs.thblock.style.display = 'block'
    }
    //确认退货
    none = () => {
        let { e, nowpage } = this.state
        let { returnupdate, oddreturn } = this.props
        e.of = 1
        let record = {
            ...e
        }
        returnupdate(record)
        oddreturn(nowpage)
        this.refs.th.style.display = 'none'
        this.refs.thblock.style.display = 'block'
        let that = this
        that.setState({ tishi: '退货成功' })
        that.refs.tishi.className = 'tishi1'
        setTimeout(function () {
            that.refs.tishi.className = 'tishi2'
        }, 3000)
    }
    //拒绝退货
    refuse = () => {
        let { e, nowpage } = this.state
        let { returnupdate, oddreturn } = this.props
        e.of = 2
        let record = {
            ...e
        }
        returnupdate(record)
        oddreturn(nowpage)
        this.refs.th.style.display = 'none'
        this.refs.thblock.style.display = 'block'
        let that = this
        that.setState({ tishi: '已拒绝' })
        that.refs.tishi.className = 'tishi1'
        setTimeout(function () {
            that.refs.tishi.className = 'tishi2'
        }, 3000)
    }


    c = (ev) => {
        let { findreturnkeyall, oddreturn, returnpagecount, findreturnpage} = this.props
        this.setState({
            onf: false,
            onf2: false
        })
        switch (ev) {
            case '全部申请':
                this.refs.c1.className = 'active'
                this.refs.c2.className = this.refs.c3.className = this.refs.c4.className = ''
                oddreturn(1), returnpagecount()
                break
            case '待处理':
                this.refs.c2.className = 'active'
                this.refs.c1.className = this.refs.c3.className = this.refs.c4.className = ''
                findreturnkeyall(0, 1)
                findreturnpage(0)
                break
            case '已退货':
                this.refs.c3.className = 'active'
                this.refs.c1.className = this.refs.c2.className = this.refs.c4.className = ''
                findreturnkeyall(1, 1)
                findreturnpage(1)
                break
            case '已拒绝':
                this.refs.c4.className = 'active'
                this.refs.c1.className = this.refs.c3.className = this.refs.c2.className = ''
                findreturnkeyall(2, 1)
                findreturnpage(2)
                break
            default:    
        }
        this.setState({ vue:ev,nowpage: 1 })
    }
    //订单查询
    dd = (ev) => {
        this.setState({ order: ev.target.value })
        this.refs.v2.value = ''
    }

    retrunfind=()=>{
        let { order } = this.state
     
        let { findreturnnumber, findreturnnumberpage } = this.props
        this.refs.v1.value = ''
        findreturnnumber(order)
        findreturnnumberpage(order)
        this.setState({
            onf: true,
            onf2: false
        })
    }
    zh = (ev) => {
        this.setState({ order2: ev.target.value })

    }
    //账号查询确认
    zhfind = (ev) => {
        let { order2 } = this.state

        this.setState({ order: '', onf: false, onf2: true })
        this.refs.v1.value = ''
        let { findreturnphoneall, findreturnphonepage } = this.props
        findreturnphonepage(order2)
        findreturnphoneall(order2)
    }
    //刷新
    break = () => {
        let { oddreturn, returnpagecount } = this.props
        let { nowpage } = this.state

        this.setState({
            nowpage: 1,
            v1: '',
            v2: '',
            onf: false,
            order2: '',
            order: ''
        })
        this.refs.c1.className = 'active'
        this.refs.c2.className = this.refs.c3.className = this.refs.c4.className = ''
  
        this.refs.v1.value = ''
        this.refs.v2.value = ''
        oddreturn(1), returnpagecount()
    }
    render() {

        let { data, count } = this.props

        let { error, isLoaded, nowpage, pagecontent, onOff, e ,onf,onf2,vue,order,order2,tishi} = this.state
        let { number, Name, Stock, article, Price } = this.state
        onOff = data.every(e => { return e.checked === true })
        if (data == 0) {
            isLoaded = true
            onOff = false
        }
        //判断全选开关
        if (isLoaded != data) {
            isLoaded = true
        } else {
            isLoaded = false
        }


        let newArr = data.map((e, i) => {
            let checkedonOff = e.checked ? 'checked' : ''
            return <Ret
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
                    thclick: this.thclick,
                    deltan: this.deltan
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
                    <a >订单管理</a>
                    <span>退货申请处理</span>
                    <div id="bread_r">
                        <div className="remove4">
                            <i id="remove5"
                                onClick={this.break}
                            >刷新</i>
                        </div>
                        <div className=" remove"
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
                                    ref='c1'
                                    onClick={this.c.bind(this, '全部申请')}
                                >
                                    <p>
                                        <span>全部申请(</span>
                                        <span className="cache">1000</span>
                                        <span>)</span>
                                    </p>
                                </div>
                            </li>

                            <li>
                                <div ref='c2'
                                    onClick={this.c.bind(this, '待处理')}
                                >
                                    <p>
                                        <span>待处理(</span>
                                        <span className="cache">1000</span>
                                        <span>)</span>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div ref='c3'
                                    onClick={this.c.bind(this, '已退货')}
                                >
                                    <p>
                                        <span>已退货(</span>
                                        <span className="cache">1000</span>
                                        <span>)</span>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div ref='c4'
                                    onClick={this.c.bind(this, '已拒绝')}
                                >
                                    <p>
                                        <span>已拒绝(</span>
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
                                    onClick={this.retrunfind}
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
                                    <th>申请时间</th>
                                    <th index="price">用户账号</th>
                                    <th>退款金额</th>
                                    <th>联系人</th>
                                    <th>申请状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="tb">
                                {newArr}
                            </tbody>
                        </table>
                    </section>
                    <ReturnPage onlOff={this.onlOff}
                     count={count} 
                     cc={this.cc} 
                     ondata={data}
                      nowpage={nowpage}
                      onf={onf}
                      onf2={onf2}
                    vue={vue}
                    order={order}
                    order2={order2}
                    />
                </div>
            </div>

            );
        }
        return (
            <div>
                <div ref='thblock' >{ar}</div>
                <div ref='th' id='fw'>
                    <div className="breadcrumb">
                        <span>退货信息</span>
                        <div id="bread_r">
                            <div className="remove4">
                                <a id="remove3"
                                    onClick={this.close}
                                >关闭订单</a>
                            </div>
                        </div>
                    </div>


                    <div className="jb">
                        <div className="j-t">
                            <div className="f-img j-img">
                                <img src="" alt="" className="iconfont icon-shuqian" />
                                <span>退货商品</span>
                            </div>
                            <div className="comsearch comsearch_t comsearch_t2">
                                <section className="tBody tbody" id="tb">
                                    <table id="tab" width="600" align="center" border="1">
                                        <thead>
                                            <tr>
                                                <th index="id">商品图片</th>
                                                <th>商品名称</th>
                                                <th index="price">价格</th>
                                                <th>属性</th>
                                                <th>有效订单数</th>
                                                <th>下单金额</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tb">
                                            <tr>
                                                <td>
                                                    <img src={require('../../images/1.png')} alt="" />
                                                </td>
                                                <td>
                                                    <p>银色星芒刺绣网纱底裤</p>
                                                    <p>
                                                        品牌：
                                                    <i>Victoria's Secret</i>
                                                    </p>
                                                </td>
                                                <td>{e.Price}</td>
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
                                                <td>
                                                    <i className="is">￥</i>100</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src={require('../../images/1.png')} alt="" />
                                                </td>
                                                <td>
                                                    <p>银色星芒刺绣网纱底裤</p>
                                                    <p>
                                                        品牌：
                                                    <i>Victoria's Secret</i>
                                                    </p>
                                                </td>
                                                <td>144</td>
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
                                                <td>
                                                    <i className="is">￥</i>100</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>

                    <div className="jb">
                        <div className="j-t">
                            <div className="f-img j-img">
                                <img src="" alt="" className="iconfont icon-shuqian" />
                                <span>退货信息</span>
                            </div>
                            <div className="comsearch comsearch_t comsearch_t2 comsearch_t3">
                                <div className="ch">
                                    <div className="c">
                                        <div className="chh">订单编号</div>
                                        <div className="chr">313860326</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">申请状态</div>
                                        <div className="chr">待处理</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">申请时间</div>
                                        <div className="chr">{e.title}</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">用户账号</div>
                                        <div className="chr">18000000000</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">联系人</div>
                                        <div className="chr">大梨</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">联系电话</div>
                                        <div className="chr">18000000000</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">退货原因</div>
                                        <div className="chr">质量问题</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">问题描述</div>
                                        <div className="chr">描述文字</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh none">凭证照片</div>
                                        <div className="chr none">
                                            <img src="images/1.png" alt="" />
                                            <img src="images/1.png" alt="" />
                                            <img src="images/1.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="ch">
                                    <div className="c">
                                        <div className="chh">订单金额</div>
                                        <div className="chr">¥200.00</div>
                                    </div>
                                    {/* <div className="c">
                                        <div className="chh">确认退款金额</div>
                                        <div className="chr"><input type="text" id="int" /></div>
                                    </div> */}
                                    <div className="c">
                                        <div className="chh">处理备注</div>
                                        <div className="chr"><input type="text" id="ints" /></div>
                                    </div>

                                </div>

                                <div className="c-floor">
                                    <button
                                        onClick={this.none}
                                    >确认退货</button>
                                    <button
                                        onClick={this.refuse}
                                    >拒绝退货</button>
                                </div>
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
        data: state.reducer3.content,
        count: state.reducer3.page

    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(ReturndF))
// export default ReturndF;