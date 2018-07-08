import React, { Component } from 'react';
import Index from './component/App/routes/index';
import Login from './component/login/login';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies'
import { renderComponent } from './component/App/routes/routers';
let routes = [

  {
    
    path: '/index',
    render: () => {
      if (cookie.load('key', true)) {
      // if (sessionStorage.getItem('key')){
        return <Index  />
      }else{
       return <Redirect to='/' />  
      }
      
    }
  },
   {
    exact: true,
    path: '/',
   
     render: () => {    
      //  if (sessionStorage.getItem('key')) {
       if (cookie.load('key', true)) {
         return <Redirect to='/index' />  
       } else {
         return <Login  />
       }
    // render: (props) => <Login url={props} />
  }
}
]
class App extends Component {
  render() { 
    return (
      <div className="App">
          {/* <Index />   */}
        {renderComponent(routes)}
      </div> 
    );
  }
}
export default App;
