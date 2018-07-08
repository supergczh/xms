import React from 'react'
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Userlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //单选开关
    change = (e) => {
        let { data, onOff, arr, cc, nowpage } = this.props
        e.checked = !e.checked
        onOff = data.every(e => { return e.checked === true })
        cc(onOff, nowpage)
        this.setState({ data })
    }
    //删除
    del = (e, data2) => {
        let { data, nowpage, deltan, i } = this.props

        if (e.checked) {
            deltan(e, i)

        }

    }

    click = (e) => {
        let { thclick } = this.props
        thclick(e)
    }


    render() {
        let { data, e, i, nowpage } = this.props
      
        return (<tr key={i}>
                <td>
                    <label>
                        <input type="checkbox"
                        onChange={this.change.bind(this, e)}
                        checked={e.checked}
                        />
                        <span></span>
                    </label>
                </td>
                <td>8447466</td>
                <td>18000000000</td>
                <td>Windir</td>
                <td>黄金会员</td>
                <td>¥2000.00</td>
                <td>10</td>
                <td>
                    <img src="" alt="" className="iconfont icon-kaiguan4 active" />
                </td>
                <td>
                <i className="iconfont icon-chakan2"
                    onClick={this.click.bind(this, e)}
                ></i>
                {/* <i className="iconfont icon-bianji"
                    onClick={this.bjclick.bind(this, e)}
                ></i> */}
                <i className="iconfont icon-shanchu3"
                    onClick={this.del.bind(this, e, data)}
                ></i>
                </td>
            </tr>

        )

    }
}
export default connect((state) => {

    return {
        data: state.reducer3.content,
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(Userlist)
