import React from 'react'
import '../../css/user.css'
class Usercontent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <div class="breadcrumb breadcrumb2">
                    <div class="user">用户详情</div>
                    
                </div>
                <div class="search search2"></div>
                <div class="user-t">
                    <div class="u-l">
                        <p class="p1">
                            <img class="iconfont icon-morentouxiang" src="" alt=""/>
                        </p>
                            <p>18000000000</p>
                            <p>
                                <span>黄金会员</span>
                            </p>
                    </div>
                        <div class="u-lef">
                            <div class="info">用户ID</div>
                            <div class="info">昵称</div>
                            <div class="info">性别</div>
                            <div class="info">生日</div>
                            <div class="info none">城市</div>
                        </div>
                        <div class="u-r">
                            <div class="info2">8447466</div>
                            <div class="info2">Windir</div>
                            <div class="info2">男</div>
                            <div class="info2">1984年6月22日</div>
                            <div class="info2 none">广东省深圳市</div>
                        </div>
                        <div class="u-lef">
                            <div class="info">职业</div>
                            <div class="info">个性签名</div>
                            <div class="info">喜欢的分类</div>
                            <div class="info">注册时间</div>
                            <div class="info none">用户来源</div>
                        </div>
                        <div class="u-r  u-none">
                            <div class="info2">学生</div>
                            <div class="info2">无</div>
                            <div class="info2">服装、餐厨</div>
                            <div class="info2">2017-07-24 17:25:38</div>
                            <div class="info2 none">PC端</div>
                        </div>
                    </div>

                    <div class="jb">
                        <div class="j-t">
                            <div class="f-img j-img">
                                <img src="" alt="" class="iconfont icon-shuqian"/>
                                    <span>统计信息</span>
                        </div>
                                <div class="comsearch comsearch_t comsearch_t2">
                                    <section class="tBody tbody" id="td">
                                        <table id="tab" width="600" align="center" border="1">
                                            <thead>
                                                <th index="id">消费金额</th>
                                                <th>订单数量</th>
                                                <th index="price">退货记录</th>
                                                <th>联系方式</th>
                                                <th>收货地址</th>
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


                        <div class="jb">
                            <div class="j-t">
                                <div class="f-img j-img">
                                    <img src="" alt="" class="iconfont icon-shuqian"/>
                                        <span>订单记录</span>
                        </div>
                                    <div class="comsearch comsearch_t comsearch_t2">
                                        <section class="tBody tbody" id="td">
                                            <table id="tab" width="600" align="center" border="1">
                                                <thead>
                                                    <th index="id">订单编号</th>
                                                    <th>提交时间</th>
                                                    <th index="price">用户账号</th>
                                                    <th>订单金额</th>
                                                    <th>支付方式</th>
                                                    <th>订单来源</th>
                                                    <th>订单状态</th>
                                                    <th>操作</th>
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
                                                        <td><i>查看订单</i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>201707196398345</td>
                                                        <td>2017-07-19 14:48:38</td>
                                                        <td>18000000000</td>
                                                        <td>¥200.00</td>
                                                        <td>支付宝</td>
                                                        <td>APP订单</td>
                                                        <td>已发货</td>
                                                        <td>
                                                            <i>查看订单</i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>201707196398345</td>
                                                        <td>2017-07-19 14:48:38</td>
                                                        <td>18000000000</td>
                                                        <td>¥200.00</td>
                                                        <td>支付宝</td>
                                                        <td>APP订单</td>
                                                        <td>已发货</td>
                                                        <td>
                                                            <i>查看订单</i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>201707196398345</td>
                                                        <td>2017-07-19 14:48:38</td>
                                                        <td>18000000000</td>
                                                        <td>¥200.00</td>
                                                        <td>支付宝</td>
                                                        <td>APP订单</td>
                                                        <td>已发货</td>
                                                        <td>
                                                            <i>查看订单</i>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </section>
                                       
                                            </div>
                                        </div>
                                    </div>
                                </div>

        );
    }
}

export default Usercontent;