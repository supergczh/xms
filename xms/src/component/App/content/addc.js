import React from 'react'
import '../../css/commodity.css';
import '../../css/add.css';
import { NavLink} from 'react-router-dom';
import './tan.css'
class Addc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                arr:{
                    fl:'',

                }
        };
    }

    fl=(ev)=>{
            console.log(ev.target.value);
            
    }

    render() {

        return (
            <div>
                <div className="breadcrumb">
                    <i href="#">商品管理</i>
                    <span>添加商品</span>
                    <div id="bread_r">
                    </div>
                </div>
                <div id="list">
                    <div className="l-h">
                        <div className="lis">
                            <span>1</span>
                            <i>填写商品信息</i>
                        </div>
                        <div className="lis">
                            <span>2</span>
                            <i>填写商品属性</i>
                        </div>
                        <span id="uimg"></span>
                    </div>
                </div>

                <div className="default">
                    <div className="de-f" id="de-f">

                    </div>

                    <div className="de-r">
                        <div className="de-rr">
                            <div className="f-img">
                                <img src="" alt="" className="iconfont icon-shuqian"/>
                                    <span>基本信息</span>
                            </div>
                                <div className="sort">
                                    <div className="s-l">
                                        <i className="dl">*</i>
                                        <span>商品分类：</span>
                                    </div>

                                    <select name="" id="" 
                                    onClick={this.fl}
                                    >
                                        <option value="0">服装</option>
                                      
                                    </select>
                                    <select name="" id="" >
                                        <option value="0">男装</option>
                                        <option value="1">女装</option>
                        
                                    </select>
                                </div>

                                <div className="sort">
                                    <div className="s-l">
                                        <i className="dl">*</i>
                                        <span>商品名称：</span>
                                    </div>

                                    <input type="text"/>
                            </div>

                                    <div className="sort">
                                        <div className="s-l">
                                            <i className="dl">*</i>
                                            <span>商品品牌：</span>

                                        </div>
                                        <select name="" id="" >
                                            <option value="">请选择品牌</option>
                                    <option value="G-STAR">G-STAR</option>
                                    <option value="Barbour">Barbour</option>
                                    <option value="Dickies">Dickies</option>
                                        </select>
                                    </div>

                                    <div className="sort">
                                        <div className="s-l">
                                            <i className="dl">*</i>
                                            <span>商品介绍：</span>
                                        </div>
                                        <textarea name="" id="" cols="40" rows="10" style={{resize:"none"}} placeholder="请输入内容"></textarea>
                                    </div>

                                    <div className="sort">
                                        <div className="s-l">
                                            <i className="dl">*</i>
                                            <span>运费：</span>
                                        </div>

                                        <input type="text"/>
                            </div>

                                        <div className="sort">
                                            <div className="s-l">
                                                <i className="dl">*</i>
                                                <span>商品编号：</span>
                                            </div>

                                            <input type="text"/>
                            </div>

                                            <div className="sort">
                                                <div className="s-l">
                                                    <i className="dl">*</i>
                                                    <span>商品售价：</span>
                                                </div>

                                                <input type="text"/>
                            </div>

                                   <div className="sort">
                                      <div className="s-l">
                                            <i className="dl">*</i>
                                             <span>商品库存：</span>
                                     </div>

                                   <input type="text" />
                            </div>


                                                    <div className="sort">
                                                        <div className="s-l">
                                                            <span>服务保证：</span>
                                                        </div>
                                                        <label>
                                                            <input type="checkbox" className="ip"/>
                                                                <span className="ck"></span>
                                                                <span>无忧退换</span>
                                </label>
                                                            <label>
                                                                 <input type="checkbox" className="ip"/>
                                                                    <span className="ck"></span>
                                                                    <span>快速退款</span>
                                </label>
                                                                <label>
                                                                    <input type="checkbox" className="ip"/>
                                                                        <span className="ck"></span>
                                                                        <span>免费包邮</span>
                                </label>
                            </div>

                                          <NavLink to='d' id="next">下一步，填写商品属性</NavLink>

                        </div>
                    </div>

                                                    </div>
                

            </div>
        );
    }
}

export default Addc;