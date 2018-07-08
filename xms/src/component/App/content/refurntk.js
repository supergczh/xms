import React from 'react'
import '../../css/fw.css'

class Refurntk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
   

    render() {

        console.log(this.props)
        
        return (
            <div >
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
               
        );
    }
}

export default Refurntk;