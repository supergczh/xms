import React from 'react'
import './tan.css'
import cookie from 'react-cookies'
class Pass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a: cookie.load('key', true),
            password: '',
            title:'',
            tishi:''
        };
    }
    handleChange(event) {
        let name, obj;
        name = event.target.name;
        // this.setState((
        //     obj = {},
        //     obj["" + name] = event.target.value,
        //     obj
        // ))
    }

    sure = () => {
        let { password } = this.state
        let arr = []
        let that = this
        //     function a(num) {
        //         arr.push(num)
        //     }

        if (!this.refs.password.value || !this.refs.password2.value || !this.refs.password3.value) {
            that.refs.cue.style.display = 'block'
            that.setState({ title: '请输入密码' })
            return
        }
        setTimeout(function () {
            fetch('http://127.0.0.1:88/api/user/findpassword', {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "post",
                body: new URLSearchParams({
                    password: that.refs.password.value,
                }).toString()
            }).then(e => e.json())
                .then(e => {
                    console.log(e);

                    that.setState({ password: e })
                })
        }, 50)
        setTimeout(function () {
            let { password, title } = that.state
            if (password[0]) { 
                // if (that.refs.password2.value === password[0].password) {
                //     console.log(1);
                //     // that.refs.password2.value = that.refs.password3.value = that.refs.password.value = ''                
                //     that.setState({ title:'12' }) 
                //     that.refs.tishi.className = 'tishi1'
                //     setTimeout(function () {
                //         that.refs.tishi.className = 'tishi2'
                //     }, 3000)  
                //     return  
                // }
            if (that.refs.password2.value == that.refs.password3.value) {
                    password[0].password = that.refs.password3.value
                    let a = password[0]
                    fetch('http://127.0.0.1:88/api/user/update', {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "post",
                        body: new URLSearchParams({
                            ...a
                        }).toString()
                    }).then(e => e.json())
                        .then(e => {

                        })
                    that.refs.password.value=that.refs.password2.value =that.refs.password3.value=''
                     that.setState({ tishi: '更改成功' })
                    that.refs.tishi.className = 'tishi1'
                     setTimeout(function(){
                         that.refs.tishi.className='tishi2'
                     },2000)
                   
                }
                else{
                
                   
                         that.refs.cue.style.display='block'
                    that.refs.password2.value = that.refs.password3.value =''
                    that.setState({title:'两次密码不一致,请重新输入'})
                   
                }

            }else{
                that.refs.cue.style.display = 'block'
                that.refs.password.value=''
                that.setState({ title: '旧密码错误，请重新输入' })
            }
        }, 200)
          
    }
    none=()=>{
        this.refs.cue.style.display = 'none'
    }
    render() {
        let { a,title,tishi} = this.state
        let c = cookie.load('key', true)
        let d = c.substr(-2)
        let e = c.substring(0, c.length - 2)
        return (
            <div>
                <div className="breadcrumb">
                    <a >系统管理</a>
                    <span>账户设置</span>
                    <div id="bread_r">
                    </div>
                </div>

                <div className="jb">
                    <div className="j-t">


                        <div className="bg"></div>
                        <div >
                            <div className="tan_title clear">

                            </div>

                            <div className="input_content" >
                                <div className="input_info cds">
                                    <div className='iconfont icon-touxiang-kong'></div>
                                </div>
                                <div className="input_info cds">
                                    <i>*</i>
                                    <span className='s1'>用户名 ：</span>
                                    <input type="text" className='i1'
                                        onChange={this.nameChange}
                                        disabled
                                        value={e}
                                    />
                                </div>
                                <div className="input_info cds">
                                    <i>*</i>
                                    <span className='s1'>旧密码 ：</span>
                                    <input type="password" className='i1' ref='password'
                                        onChange={this.handleChange.bind(this)} name="password"
                                    />
                                </div>
                                <div className="input_info cds">
                                    <i>*</i>
                                    <span className='s1'>新密码 ：</span>
                                    <input type="password" className='i1' ref='password2'
                                        onChange={this.handleChange.bind(this)} name="password"
                                    />
                                </div>
                                <div className="input_info cds">
                                    <i>*</i>
                                    <span className='s1'>确认密码 ：</span>
                                    <input type="password" className='i1' ref='password3'
                                        onChange={this.handleChange.bind(this)} name="password"
                                    />
                                </div>

                                <div className="btn_sure" style={{ marginLeft: '260px' }}>
                                    <a className="sure"
                                        onClick={this.sure.bind(this)}
                                    >提交</a>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="tan_content" id='del' ref='cue'>
                    <div className="bg"></div>
                    <div className="tan_box delete_box ">
                        <div className="tan_title clear">
                            <span>提示</span>
                            <i
                                onClick={this.none}
                            >×</i>
                        </div>
                        <div className="text_box " id="d_box">
                            <i></i>
                            <span>{title}</span>
                        </div>
                        <div className="input_content">
                            <div className="btn_sure btn_two btn_two2">
                                <a  className="sure"
                                    onClick={this.none}
                                >确定</a>
                                {/* <a href="javascript:;" className="replay"
                                    onClick={this.none}
                                >取消</a> */}
                            </div>
                        </div>
                    </div>
                </div>      
                <div  className='tishi'ref='tishi'>
                        <i className='iconfont icon-zhengquetishitianchong'></i>
                        <span>{tishi}</span>
                </div>
            </div>
        );
    }
}

export default Pass;