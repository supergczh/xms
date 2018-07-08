import React from 'react'
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../icon/iconfont.css'
import axios from 'axios';
class Passlist extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
  //单选开关
    change = (e) => {     
        let { data, onOff, arr, cc, nowpage} = this.props
        e.checked = !e.checked  
        onOff = data.every(e =>  e.checked  ) 
        cc(onOff, nowpage)
        this.setState({data}) 
    }
    //删除
    del = (e, data2) => {
        let { data, nowpage, deltan, i, } = this.props
        
       if(e.checked){
             deltan(e,i)

       }
           
    }

    bjclick=(e)=>{ 
       
        let { edit} = this.props
        edit(e)  
        
    }
    ckclick =(e)=>{ 
       
        let { ckclick} = this.props
        ckclick(e)  
        
    }
    //状态开关
    onShelf = (e) => {
        let { data, adminupdate, administrators,nowpage} = this.props
        console.log(e);
        e.onf = !e.onf
        this.setState({data})
        adminupdate(e)
        administrators(nowpage)

    }
    render() {
        let { data, e, i, nowpage}=this.props
  
      
        
        let imgonOff = e.onf ? "iconfont icon-kaiguan4 active " : "iconfont icon-kaiguan3 ";
        let gl= e.level=='r1' ? "普通管理员 " : "超级管理员 ";

        return (
            <tr key={i}> 
                <td className='checked'>
                    <label>
                        <input type="checkbox"
                            onChange={this.change.bind(this, e)}
                            checked={e.checked}
                        />
                        <span></span>
                    </label>
                </td>
                <td>
                    <p>{e.username}</p>
                    {/* <p>
                        <i>Victoria</i>
                    </p> */}
                </td>
                <td>
                  {e.phone}
                </td>
                <td>
                    {gl}
                  
                </td>
            
                <td> {e.title}</td>
                <td>
                    <img src="" alt="" className={imgonOff}
                        onClick={this.onShelf.bind(this, e)}
                    /></td>
                <td id="icon" className='bj'>
                    <i className="iconfont icon-chakan2"
                        onClick={this.ckclick.bind(this, e)}
                    ></i>
                    <i className="iconfont icon-bianji"
                     onClick={this.bjclick.bind(this,e)}
                    ></i>
                    <i className="iconfont icon-shanchu3"
                        onClick={this.del.bind(this, e, data) }
                    ></i>
                </td>
            </tr>
        );
    }
}

export default connect((state) => {
     
    return { data: state.reducer.content };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(Passlist) 
// export default Share;