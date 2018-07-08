import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    goBack=()=>{
        let { history}=this.props
        console.log(history);
      
        this.props.history.goBack();
    }
    
    render() {

        
        
        return (
           <div></div>
        );
    }
}

export default Order;