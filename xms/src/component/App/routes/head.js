import React from 'react'
import { withRouter } from 'react-router-dom';
import cookie from 'react-cookies'
// import './reset.css'
class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onf: false,
            title:''
        };
    }

    out = () => {
        let { history } = this.props
        console.log(history);
        // setTimeout(() => {
        history.push('/');
            cookie.remove('key', true);
            // history.push('/');
        // }, 400);
        // setTimeout(() => {
           
        //     history.push('/');
        // }, 1000);
    }
    over = () => {
        this.setState({ onf: false })
        this.refs.down.style.display = 'block';
    }
    mouseout2 = () => {
        let that = this
        let { onf } = this.state

        if (onf == false) {
            setTimeout(function () {
                that.refs.down.style.display = 'none';
            }, )
        }


    }
    over2 = () => {
        let that = this
        setTimeout(function () {
            that.setState({ onf: true })
            let { onf } = that.state
            if (onf) {
                that.refs.down.style.display = 'block';
            }
        }, )
        //    this.setState({onf:true})

    }
    mouseout = () => {
        this.setState({ onf: false })
        let { onf } = this.state
        // if(onf==false){
        this.refs.down.style.display = 'none';
        // }

    }
    tool = (n) => {
        return n < 10 ? '0' + n : '' + n;
    }

    componentWillMount() {
        var func = function () {
            //获取当前时间
            let d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            let h = d.getHours();
            let m = d.getMinutes();
            let s = d.getSeconds()

            let title = this.tool(year) + '-' + this.tool(month) + '-' + this.tool(day) + ' ' + this.tool(h) + ':' + this.tool(m) + ':' + this.tool(s);
            this.setState({
               title
            })
        }.bind(this)
        func()
        //每间隔1s执行一次func()方法
        setInterval(func, 1000)
    }
    render() {
       let {title}=this.state

        let use = cookie.load('key', true)
            let u=use.split('r')
        let user = u[0]
        return (
            <div className="cont-r">

                <div className="xiaoxigonggao">
                    <span className="iconfont icon-xiaoxigonggao "></span>
                    <div className="notify">
                        <span className="heartbit"></span>
                        <span className="point"></span>
                    </div>
                </div>

                <div className="xinfeng">
                    <span className="iconfont icon-icon-p_xinfeng "></span>
                    <div className="notify">
                        <span className="heartbit"></span>
                        <span className="point"></span>
                    </div>
                </div>


                <div id="user" onMouseOver={this.over.bind(this)}
                    onMouseLeave={this.mouseout2.bind(this)}
                >
                    <div className="user-icon" ><i className='iconfont icon-touxiang-kong'> </i></div>

                </div>
                <div id='down2' ref='down' onMouseLeave={this.mouseout.bind(this)} onMouseOver={this.over2.bind(this)} >
                    <div className='cd'>管理员:{user}</div>
                    <div className='cd3'>{title}</div>
                    <div className='cd2'
                        onClick={this.out}
                    >退出</div>

                </div>
            </div>
        );
    }
}

export default withRouter(Head);