import React from 'react';
class TAN extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div class="tan_content" ref="tan">
                <div class="bg"></div>
                <div class="tan_box">
                    <div class="tan_title clear">
                        <span>添加</span>
                        <i
                            onClick={this.none}
                        >×</i>
                    </div>
                    <div class="input_content">
                        <div class="input_info">
                            <span>商品编号:</span>
                            <input type="text" />
                        </div>
                        <div class="input_info">
                            <span>分类名称:</span>
                            <select name="" id="" >
                                <option value="0">男装</option>
                                <option value="1">女装</option>
                            </select>
                            <select name="" id="" >
                                <option value="0">上衣</option>
                                <option value="1">裤子</option>
                            </select>
                        </div>

                        <div class="input_info">
                            <span>商品名称</span>
                            <input type="text"
                                onChange={this.nameChange}
                            />
                        </div>
                        <div class="input_info">
                            <span>商品库存:</span>
                            <input type="text" />
                        </div>
                        <div class="input_info">
                            <span>商品货号:</span>
                            <input type="text" />
                        </div>
                        <div class="input_info">
                            <span>商品价格:</span>
                            <input type="text" />
                        </div>

                        <div class="input_info">
                            <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
                            <input type="checkbox" class="radio_btn" />
                            <span>正常</span>
                            <input type="checkbox" class="radio_btn" />
                            <span>隐藏</span>
                        </div>
                        <div class="btn_sure">
                            <a href="javascript:;" class="sure">确定</a>
                            <a href="javascript:;" class="replay">重置</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TAN;