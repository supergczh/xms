import React from 'react'
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Ret extends React.Component {
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
        let str = '待处理'
        if (e.of ==0) {
            str = '待处理'
        } else if (e.of === 1) {
            str = '已退货'
        } else if (e.of === 2) {
            str = '已拒绝'
        } 
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
            <td>{e.number}</td>
            <td>{e.title}</td>
            <td>{e.phone}</td>
            <td>{e.je}</td>
            <td>{e.name}</td>
            <td>{str}</td>
            <td>
                <i className="iconfont icon-chakan2"
                    onClick={this.click.bind(this, e)}
                ></i>
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
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(Ret)
// export default Ret ;