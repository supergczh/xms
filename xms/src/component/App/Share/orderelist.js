import React from 'react'
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
class ODLIST extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //单选开关
    change = (e) => {
        let { data, onOff, arr, cc, nowpage } = this.props
        e.checked = !e.checked
        // onOff = data.every(e => { return e.checked ===true }) 
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

    bjclick = (e) => { 
        let { edit } = this.props
        edit(e)
    }

    //上架开关
    onShelf = (e) => { 
        let { data } = this.props
        e.onOff = !e.onOff
        this.setState({ data })
        let record = {
            onOff: e.onOff
        }
        axios.put("https://5b260e1cc39cbf00140ef61b.mockapi.io/goodsdata/" + e.id, record).then(
            response => {

            }

        ).catch(
            // error => console.log(error.message)
        )
    }

    click=()=>{
        let {e,xq}=this.props
        xq(e)
    }

    xiugai=(e)=>{
        let {zt}=this.props
        zt(e)
    }
    render() {
        let { data, e, i, nowpage} = this.props
        let str = '待发货'
        if (e.zt == 0) {
            str = '待发货'
        } else if (e.zt === 1) {
            str = '已发货'
        } else if (e.zt === 2) {
            str = '已完成'
        } 
        return (
            <tr>
                <td>
                    <label>
                        <input type="checkbox"
                            checked={e.checked}
                            onChange={this.change.bind(this, e)}
                        />
                        <span></span>
                    </label>
                </td>
                <td>{e.number}</td>
                <td>{e.title}</td>
                <td>{e.phone}</td>
                <td>{e.je}</td>
                <td>{e.mode}</td>
                <td>{e.ly}</td>
                <td>{str}</td>
                <td>

                    <i className="iconfont icon-chakan2"
                        onClick={this.click}
                     ></i>
                     
                    <i className="iconfont icon-shezhi"
                    onClick={this.xiugai.bind(this,e)}
                    ></i>
                    <i className="iconfont icon-shanchu3"
                        onClick={this.del.bind(this, e, data)}
                    ></i>
                </td>
            </tr>

        );
    }
}

export default connect((state) => {
    return { data: state.reducer2.content };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(ODLIST)
// export default Share;