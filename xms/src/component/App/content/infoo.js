import React from 'react';
import '../../css/commodity.css';
import '../../css/public.css';
import '../../css/jd.css';

// import { NavLink } from 'react-router-dom';

class InfoO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                 <div className="breadcrumb">
                    <a >消息管理</a>
                    <span>短信消息</span>
                    <div id="bread_r">
                        <div className="remove4">
                            <a href="" id="remove5">发送消息</a>
                        </div>

                    </div>
                </div>


                <div className="search"></div>
                {/* <!-- 表单  -->        */}

                <div className="comsearch comsearch_t">
                
                    <div className="comsearch_h">
                        <ul>
                            <li id="sch">
                                <input type="text" placeholder="关键词" id="searchs"/>
                                <input type="button" value="搜索" id="searchs-btn"/>
                            </li>
                            
                        </ul>               
                    </div>
                    
                  
                
                    <div id="page">
                        <div className="pag">
                            <a href="">上一页</a>
                            <i>1</i>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>...
                            <span>10</span>
                            <a href="">下一页</a> 到 第
                            <input type="text" placeholder="1"/> 页
                            <button>确定</button>
                        </div>
             </div>


                </div>
            </div>
        );
    }
}

export default InfoO;