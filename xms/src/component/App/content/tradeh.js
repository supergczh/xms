import React from 'react';
import '../../css/commodity.css';
import '../../css/add.css';
import '../../css/jd.css';
import '../../css/user.css';
import '../../css/public.css';
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';

class TradeH extends React.Component {
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
componentDidMount(){
    let { gettrade}=this.props
    gettrade(0)
}

    click=(ev)=>{
        let { gettrade } = this.props
            if(ev=='昨天'){
                this.refs.r1.className='active'
                this.refs.r2.className= this.refs.r3.className = ''
                gettrade(0)
            }else if(ev=='最近7天'){
                this.refs.r2.className = 'active'
                this.refs.r1.className = this.refs.r3.className = ''
                gettrade(1)
            }else if(ev=='最近30天'){
                this.refs.r3.className = 'active'
                this.refs.r2.className = this.refs.r1.className = ''
                gettrade(2)
            }
    }
    render() {

        let { data, data1 } = this.props
        console.log(data);
        
        let { error, isLoaded, nowpage, pagecontent, onOff, e } = this.state
        let { number, Name, Stock, article, Price } = this.state
      
        // let count = Math.ceil(data1.length / pagecontent)

        //判断全选开关
        if (isLoaded != data) {
            isLoaded = true
        } else {
            isLoaded = false
        }

        // onOff = data.every(e => { return e.checked === true })
        // let newArr = data.map((e, i) => {
        //     let checkedonOff = e.checked ? 'checked' : ''
        //     return <div
        //         {...{
        //             key: i,
        //             onOff,
        //             e,
        //             i,
        //             nowpage,
        //             onlOff: this.onlOff,
        //             del: this.del,
        //             cc: this.cc,
        //             checkedonOff,
        //             edit: this.edit,
        //             deltan: this.deltan,
        //             thclick: this.thclick
        //         }}
        //     />

        // })

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
                    <a >交易管理</a>
                    <span>交易统计</span>
                    <div id="bread_r">
                    </div>
                </div>

                <div className="jb">
                    <div className="j-t">
                        <div className="f-img j-img">
                            <img src="" alt="" className="iconfont icon-shuqian" />
                                <span>交易数据</span>
                                <div className="jt-r">
                                    <button className="active" 
                                    onClick={this.click.bind(this,'昨天')}
                                    ref='r1'
                                    >昨天</button>
                                    <button
                                        onClick={this.click.bind(this,'最近7天')}
                                        ref='r2'
                                    >最近7天</button>
                                    <button
                                        onClick={this.click.bind(this, '最近30天')}
                                        ref='r3'
                                    >最近30天</button>
                                </div>
                        </div>
                            <div className="comsearch comsearch_t comsearch_t2  comsearch_t comsearch_t3">
                                <section className="tBody tbody" id="td2">
                                    <table id="tab" width="600" align="center" border="1">
                                        <thead>
                                            <tr>
                                            <th index="id">浏览人数</th>
                                            <th>下单人数</th>
                                            <th index="price">订单数</th>
                                            <th>下单件数</th>
                                            <th>有效订单数</th>
                                            <th>下单金额</th>
                                           </tr>
                                            
                                        </thead>
                                        <tbody id="tb">
                                            <tr>
                                                <td>{data[0].ll}</td>
                                                <td>{data[0].xd}</td>
                                                <td>{data[0].dd}</td>
                                                <td>{data[0].xydd}</td>
                                                <td>{data[0].xdje}</td>
                                                <td><i className="is">￥</i>{data[0].tkje}</td>
                                            </tr>
                                        </tbody>
                                        <thead>
                                            <tr>
                                            <th index="id">退款金额</th>
                                            <th>付款人数</th>
                                            <th index="price">付款订单数</th>
                                            <th>付款件数</th>
                                            <th>付款金额</th>
                                            <th>客单价</th>
                                        </tr>
                                        </thead>
                                        <tbody id="tb">
                                            <tr>
                                                <td><i className="is">￥</i>{data[0].tkje}</td>
                                                <td>{data[0].fkrs}</td>
                                                <td>{data[0].fkdd}</td>
                                                <td>{data[0].fkjs}</td>
                                                <td><i className="is">￥</i>{data[0].fkje}</td>
                                                <td><i className="is">￥</i>{data[0].kdj}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                                <div style={{margin: "0 auto" ,width: "100%"}}>
                                <img src={require('./img/u15877.png')}alt="" />
                            </div>
                                </div>
                            </div>

                        </div>
            </div>
        );
    }
        return (
            <div>{ar}</div>
        )
}
}

export default connect((state) => {

    return {
        data: state.reducer6.content,
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(TradeH)
// export default TradeH;