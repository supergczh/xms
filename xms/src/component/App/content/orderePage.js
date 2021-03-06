
import React, {Component} from 'react'
import '../../css/Pagecomponent.css'
import *as actionCreators from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink, Link} from 'react-router-dom';

class OrderePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1, //当前页码
            groupCount: 5, //页码分组，显示7个页码，其余用省略号显示
            startPage: 1,  //分组开始页码
            // totalPage: this.props.count,//总页数
            Pagect:9
        }
        this.createPage = this.createPage.bind(this)
    }
    componentWillReceiveProps() {
        let { nowpage } = this.props       
        this.setState({
            currentPage: nowpage
        })
    }
   
    createPage(totalPage, currentPage) {
        
        let { groupCount, startPage} = this.state;
      
        let pages = []
        //上一页
        pages.push(<Link  onClick={this.prePageHandeler.bind(this)}
            to={{
                state: { id: currentPage-1 },
                pathname: `/index/order/${currentPage-1}`
            }} 
                       key={0}>
            <li className={currentPage === 1 ? "nomore" : null}>上一页</li></Link>)
        
        if (totalPage <= 5) {
            /*总页码小于等于10时，全部显示出来*/
            for (let i = 1; i <= totalPage; i++) {
                pages.push(<Link key={i} onClick={this.pageClick.bind(this, i)}
                    to={{
                        state: { id: i },
                        pathname: `/index/order/${i}`
                    }} 
                ><li className={currentPage === i ? "activePage" : null}>{i}</li></Link>)
            }
        } else {
            /*总页码大于10时，部分显示*/

            //第一页
            pages.push(<Link key={1}
                to={{
                    state: { id: 1 },
                    pathname: `/index/order/1`
                }} 
                onClick={this.pageClick.bind(this, 1)}>
                <li className={currentPage === 1 ? "activePage" : null} >1</li></Link>)

            let pageLength = 0;
            if (groupCount + startPage > totalPage) {
                pageLength = totalPage
            } else {
                pageLength = groupCount + startPage;
            }
            //前面省略号(当当前页码比分组的页码大时显示省略号)
            if (currentPage >= groupCount) {
                pages.push(<li className="" key={-1}>···</li>)
            }
            //非第一页和最后一页显示
            for (let i = startPage; i < pageLength; i++) {
                if (i <= totalPage - 1 && i > 1) {
                    pages.push(<Link key={i}
                        to={{
                            state: { id: i },
                            pathname: `/index/order/${i}`
                        }} 
                        onClick={this.pageClick.bind(this, i)} ><li className={currentPage === i ? "activePage" : null} >{i}</li></Link>)
                }
            }
            //后面省略号
            if (totalPage - startPage >= groupCount + 1) {
                pages.push(<li className="" key={-2}>···</li>)
            }
            //最后一页
            pages.push(<Link  key={totalPage}
                to={{
                    state: { id: totalPage },
                    pathname: `/index/order/${totalPage}`
                }} 
                onClick={this.pageClick.bind(this, totalPage)}>
                <li className={currentPage === totalPage ? "activePage" : null}>{totalPage}</li></Link>)
        }
        //下一页
        pages.push(<Link 
            to={{
                state: { id: currentPage + 1 },
                pathname: `/index/order/${currentPage + 1}`
            }} 
                       onClick={this.nextPageHandeler.bind(this)}
            key={totalPage + 1}><li className={currentPage === totalPage ? "nomore" : null}>下一页</li></Link>)
        return pages;

    }

    //页码点击
    pageClick(currentPage) {
       
        let { oddorder, oderpagecount, data, vue, findorderkeyall,
             findorderkeypage, order, onf, findordernumber, findordernumberpage,
            order2, findorderphoneall, findorderphonepage,onf2
            } = this.props
       
        
        if (vue === '全部订单' && !onf && !onf2){
            oddorder(currentPage)
        } else if (vue === '待发货' && !onf && !onf2){
            findorderkeyall(0, currentPage)
            findorderkeypage(0)
        } else if (vue === '已发货' && !onf && !onf2) {
            findorderkeyall(1, currentPage)
            findorderkeypage(1)
        }
        else if (vue === '已完成' && !onf && !onf2) {
            findorderkeyall(2, currentPage)
            findorderkeypage(2)
        }
        if(order&&onf){
            findordernumber(order)
            findordernumberpage(order)
        } else if(order2&&onf2){
            findorderphoneall(order2)
            findorderphonepage(order2)
        }
        
        let  { groupCount} = this.state
      
        //当 当前页码 大于 分组的页码 时，使 当前页 前面 显示 两个页码
        if (currentPage >= groupCount) {
            this.setState({
                startPage: currentPage - 2,
            })
        }
        if (currentPage < groupCount) {
            this.setState({
                startPage: 1,
            })
        }
        //第一页时重新设置分组的起始页
        if (currentPage === 1) {
            this.setState({
                startPage: 1,
            })
        }
        this.setState({
            currentPage
        })
        
        
        
        let { cc } = this.props
        // //判断全选开关


        // let onOff = data.every(e => { return e.checked == false })
        let onOff = false

        cc(onOff, currentPage)
    }

    //上一页事件
    prePageHandeler() {
        let {currentPage} = this.state
        if (--currentPage === 0) {
            return false
        }
        this.pageClick(currentPage)
    }

    //下一页事件
    nextPageHandeler() {
        let {currentPage,totalPage} = this.state
        let { count } = this.props
        
        if (++currentPage > count) {
            return false
        }
        this.pageClick(currentPage)
    }
    render() {
        let { totalPage, currentPage}=this.state
        let {count}=this.props
          
        const pageList = this.createPage(count, currentPage);
        return (
            <div className="page-container" id="page-container">
            <ul id="pag">
                {pageList}
            </ul>
            </div>
        )
    }
}
export default connect((state) => {
    return { 
        data: state.reducer2.content,
    
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(OrderePage) 
// export default Pagecomponent