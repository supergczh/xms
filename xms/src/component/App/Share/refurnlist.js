import React from 'react'
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../css/fw.css'
import '../../css/jd.css'
class Refurnlist extends React.Component {
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
        let { Del, data, odd, nowpage } = this.props
        let num = 0
        if (e.checked) {
            //发起dispatch删除
            Del(e.id)
            console.log(e);
            setTimeout(e => {
                odd(nowpage)

            }, 1000)
            this.setState({ data })
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
                    <input type="checkbox" />
                    <span></span>
                </label>
            </td>
            <td>201707196398345</td>
            <td>2018-02-12 14:48:38</td>
            <td>18000000000</td>
            <td>{e.Price}</td>
            <td>大梨</td>
            <td>待处理</td>
            <td>
                <i className="iconfont icon-chakan2"
                    onClick={this.click.bind(this, e)}
                ></i>
            </td>
        </tr>
        )

    }
}
export default connect((state) => {

    return {
        data: state.reducer6,
        data1: state.reducer7
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(Refurnlist)
// export default Ret ;