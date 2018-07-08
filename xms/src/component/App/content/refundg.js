import React from 'react';
import '../../css/commodity.css';
import '../../css/add.css';
// import { NavLink } from 'react-router-dom';
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Refurnlist from '../Share/refurnlist';
import RefurnPage from './RefurnPage';
import '../../css/fw.css'
import './tan.css'
class RefundG extends React.Component {
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

    delAll = () => {
        let { record, onOff } = this.state;
        let newrecord = record.filter(e => {
            return e.checked === true
        })
        let newrecord2 = record.filter(e => {
            return e.checked === false
        })
   
        onOff = !onOff
        this.setState({
            record: newrecord2,
            onOff
        })
    }
    //退款查看
    thclick = (e) => {
        this.setState({ e })
        this.refs.th.style.display = 'block'
        this.refs.thblock.style.display = 'none'
    }
    close = () => {
        this.refs.th.style.display = 'none'
        this.refs.thblock.style.display = 'block'
    }

    render() {



        let { data, count } = this.props

        let { error, isLoaded, nowpage, pagecontent, onOff, e } = this.state
        let { number, Name, Stock, article, Price } = this.state     
        //判断全选开关
        if (isLoaded != data) {
            isLoaded = true
        } else {
            isLoaded = false
        }

        onOff = data.every(e => { return e.checked === true })
        let newArr = data.map((e, i) => {
            let checkedonOff = e.checked ? 'checked' : ''
            return <Refurnlist
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
            ar =  (
            <div>
                <div className="breadcrumb">
                    <a href="">订单管理</a>
                    <span>退款申请处理</span>
                    <div id="bread_r">
                            <div className=" remove"
                                onClick={this.delAll}
                            >
                                <a id="remove">批量删除</a>
                            </div>?
                    </div>
                </div>


                
                {/* <!-- 表单  --> */}
                <div className="comsearch comsearch_t">
                    <div className="comsearch_h comsearch_h1">
                        <ul id="order">
                            <li>
                                <div className="active">
                                    <p>
                                        <span>全部申请(</span>
                                        <span className="cache">1000</span>
                                        <span>)</span>
                                    </p>
                                </div>
                            </li>

                            <li>
                                <div>
                                    <p>
                                        <span>待处理(</span>
                                        <span className="cache">1000</span>
                                        <span>)</span>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <p>
                                        <span>退货中(</span>
                                        <span className="cache">1000</span>
                                        <span>)</span>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div>

                                    <p>
                                        <span>已处理(</span>
                                        <span className="cache">1000</span>
                                        <span>)</span>
                                    </p>

                                </div>
                            </li>
                            <li>
                                <div>
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
                                <input type="text" placeholder="订单号" id="searchs" />
                                <input type="button" value="搜索" id="searchs-btn" />
                            </li>

                            <li id="sch">
                                <input type="text" placeholder="收货人姓名/手机号码" id="searchs" />
                                <input type="button" value="搜索" id="searchs-btn" />
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
                                        <input type="checkbox" />
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

                        <RefurnPage onlOff={this.onlOff} count={count} cc={this.cc} ondata={data} nowpage={nowpage} />
                </div>
            </div>
        );
    }
        return (
            <div>
                <div ref='thblock'>{ar}</div>
                <div ref='th' id='fw'>
                    <div className="breadcrumb">

                        <span>退款信息</span>
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
                                <span>退款订单信息</span>
                            </div>
                            <div className="comsearch comsearch_t comsearch_t2 comsearch_t3" >
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
                                        <div className="chr">2017-07-19 14:48:38</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">用户账号</div>
                                        <div className="chr">18000000000</div>
                                    </div>

                                </div>
                                <div className="ch">
                                    <div className="c">
                                        <div className="chh">订单金额</div>
                                        <div className="chr">¥200.00</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">确认退款金额</div>
                                        <div className="chr">
                                            ¥200.00
                                    </div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">退款类型</div>
                                        <div className="chr">取消订单</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">退款原因</div>
                                        <div className="chr">原因描述 </div>
                                    </div>
                                </div>
                                <div className="ch">
                                    <div className="c">
                                        <div className="chh">处理时间</div>
                                        <div className="chr">2017-07-19 14:48:38</div>
                                    </div>
                                    <div className="c">
                                        <div className="chh">备注</div>
                                        <div className="chr"> </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
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
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(RefundG)
// export default ReturndF;
// export default RefundG;