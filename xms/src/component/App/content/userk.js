import React from 'react';
import '../../css/commodity.css';
import '../../css/public.css';
// import { NavLink } from 'react-router-dom';
import *as actionCreators from '../../actions/action';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Userlist from '../Share/userlist';
import UserPage from './userpage';
import Usercontent from './usercontent';
import '../../css/user.css'
class UserK extends React.Component {
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
        };
    }
    componentDidMount() {
        this._isMounted = true
        let { oddreturn, returnpagecount } = this.props
        returnpagecount()
        oddreturn(1)
    }

    cc = (onOff, nowpage) => {
        this.setState({
            onOff: onOff,
            nowpage: nowpage
        })
    }

    //用户查看
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
            return <Userlist
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
                {/* <!-- 主体 --> */}
                <div className="contents">
                    <div className="breadcrumb">
                        <a href="">用户管理</a>
                        <span>用户列表</span>
                        <div id="bread_r">
                            <div className="remove4">
                                <a href="" id="remove5">刷新</a>
                            </div>

                        </div>
                    </div>


                    <div className="search"></div>
                    {/* <!-- 表单  --> */}
                    <div className="comsearch comsearch_t">
                        <div className="comsearch_h comsearch_h1">
                            <ul id="order">
                                <li>
                                    <div className="active">
                                        <p>
                                            <span>全部用户(</span>
                                            <span className="cache">10000</span>
                                            <span>)</span>
                                        </p>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className="comsearch_h">
                            <ul>
                                <li id="sch">
                                    <input type="text" placeholder="用户账号" id="searchs" />
                                    <input type="button" value="搜索" id="searchs-btn" />
                                </li>
                                <li id="sch">
                                    <select name="" id="set">
                                        <option value="">查看等级</option>
                                        <option value="">普通会员</option>
                                        <option value="">黄金会员</option>
                                        <option value="">白金会员</option>
                                        <option value="">钻石会员</option>
                                    </select>
                                    <input type="button" value="搜索" id="searchs-btn" />
                                </li>
                            </ul>
                        </div>
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
                                        <th index="id">用户ID</th>
                                        <th>用户账户</th>
                                        <th index="price">用户昵称</th>
                                        <th>会员等级</th>
                                        <th>消费金额</th>
                                        <th>订单数量</th>
                                        <th>账号启用状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody id="tb">
                                   {newArr}
                                </tbody>
                            </table>
                        </section>
                        <UserPage onlOff={this.onlOff} count={count} cc={this.cc} ondata={data} nowpage={nowpage} />

                    </div>
                </div>
            </div>
            );
        }
        return (
            <div>
                <div ref='thblock' >{ar}</div>
                <div ref='th' id='fw'>
                    <div className="breadcrumb breadcrumb2">
                        <div className="user">用户详情</div>
                        <div id="bread_r">
                            <div className="remove4">
                                <a id="remove3"
                                    onClick={this.close}
                                >关闭</a>
                            </div>
                        </div>
                    </div>
                    <div className="search search2"></div>
                    <div className="user-t">
                        <div className="u-l">
                            <p className="p1">
                                <img className="iconfont icon-morentouxiang" src="" alt="" />
                            </p>
                            <p>18000000000</p>
                            <p>
                                <span>黄金会员</span>
                            </p>
                        </div>
                        <div className="u-lef">
                            <div className="info">用户ID</div>
                            <div className="info">昵称</div>
                            <div className="info">性别</div>
                            <div className="info">生日</div>
                            <div className="info none">城市</div>
                        </div>
                        <div className="u-r">
                            <div className="info2">8447466</div>
                            <div className="info2">Windir</div>
                            <div className="info2">男</div>
                            <div className="info2">1984年6月22日</div>
                            <div className="info2 none">广东省深圳市</div>
                        </div>
                        <div className="u-lef">
                            <div className="info">职业</div>
                            <div className="info">个性签名</div>
                            <div className="info">喜欢的分类</div>
                            <div className="info">注册时间</div>
                            <div className="info none">用户来源</div>
                        </div>
                        <div className="u-r  u-none">
                            <div className="info2">学生</div>
                            <div className="info2">无</div>
                            <div className="info2">服装、餐厨</div>
                            <div className="info2">2017-07-24 17:25:38</div>
                            <div className="info2 none">PC端</div>
                        </div>
                    </div>

                    <div className="jb">
                        <div className="j-t">
                            <div className="f-img j-img">
                                <img src="" alt="" className="iconfont icon-shuqian" />
                                <span>统计信息</span>
                            </div>
                            <div className="comsearch comsearch_t comsearch_t2">
                                <section className="tBody tbody" id="tb">
                                    <table id="tab" width="600" align="center" border="1">
                                        <thead>
                                            <tr>
                                            <th index="id">消费金额</th>
                                            <th>订单数量</th>
                                            <th index="price">退货记录</th>
                                            <th>联系方式</th>
                                            <th>收货地址</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tb">
                                            <tr>
                                                <td>¥2000.00</td>
                                                <td>10</td>
                                                <td>10</td>
                                                <td>18012541849</td>
                                                <td>广东省深圳市南山区科兴科学园</td>
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
                                <span>订单记录</span>
                            </div>
                            <div className="comsearch comsearch_t comsearch_t2">
                                <section className="tBody tbody" id="td">
                                    <table id="tab" width="600" align="center" border="1">
                                        <thead>
                                            <tr>
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
                                            <tr>
                                                <td>201707196398345</td>
                                                <td>2017-07-19 14:48:38</td>
                                                <td>18000000000</td>
                                                <td>¥200.00</td>
                                                <td>支付宝</td>
                                                <td>APP订单</td>
                                                <td>已发货</td>                                              
                                            </tr>                                               
                                        </tbody>
                                    </table>
                                </section>

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
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(UserK))
// export default UserK;