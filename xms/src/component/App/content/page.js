import React from 'react'
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
class Page extends React.Component {
    constructor(props) { 
        super(props);
        this.state = { 
            nowNum: 1, //当前在哪页
            pagecontent:9,
            // count: 15,//总共有多少页
            pageNum: 5, //总共显示多少条
         

         };
    }

    //点击页码是改变当前点击的页码  传给父级改变数据 
    //传递全选开关 让父级触发
    changPage = (e) => {
      
        let {onlOff,cc,data}=this.props
        let {pagecontent} = this.state;
        this.setState({ nowNum:e});
        let arr = []
        for (let i = (e - 1) * pagecontent; i < e * pagecontent; i++) {
            if (data[i]) {
                arr.push(data[i])
            }
        }
        //点击页码判断全选开关  
    //    let onOff = arr.every(e => { return e.checked === true }) 
        onlOff(e)
        cc(onOff)
    }
    // componentDidUpdate(){
    //     let {  data } = this.props
    //     console.log(data);
        
    // }

    render() {
        let { pageNum, nowNum } = this.state;
        let { count} = this.props;
        if (count < pageNum){
            pageNum=count
            nowNum=count
        } 
        if (nowNum > count) {
            nowNum--
        } 
       
        let center = pageNum % 2 ? Math.ceil(pageNum / 2) : Math.ceil(pageNum / 2) + 1;
        let newA = [];
        console.log(center);
        console.log(count);
        if (nowNum <= center) {
            for (let i = 1; i <= pageNum; i++) {
                newA.push(          
                    <span key={i}
                        className={nowNum === i? 'active' : ''}
                        onClick={() => { this.changPage(i) }}>{i}</span>);
            }

        }
        else {
            for (let i = 1; i <= pageNum; i++) {
                if ((count - center + 1) < nowNum) {
                    newA.push(
                        
                        <span key={count - pageNum + i}
                            className={nowNum===(count - pageNum + i) ? 'active' : ''}
                            onClick={() => { this.changPage(count - pageNum + i) }}>{count - pageNum + i}</span>);
                } else {
                    newA.push(
                        <span key={nowNum - center + i}
                            className={nowNum===(nowNum - center + i) ? 'active' : ''}
                            onClick={() => { this.changPage(nowNum - center + i) }}>{nowNum - center + i}</span>);
                }
            }
        }
        return (
            <div id="page">
                <div className="pag">
                    <a href="javascript:;"className="pages">上一页</a>
                    {newA}  
                    共
                  <span className="count">{count}</span>页
                    <a href="javascript:;" className="pages">下一页</a> 到 第
                                <input type="text" placeholder="1" /> 页
                                <button>确定</button>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return { data: state.reducer2 };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(Page) 
// export default Page;