import React from "react";
import Cookies from "js-cookie"
import {Redirect} from "react-router-dom"

class Logout extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      logoutComplete: false
    }
  }

  componentDidMount(){
    fetch("https://localhost:44374/api/auth/logout", {
      method: "post",
      credentials: "include"
    })
    .then(Cookies.remove('User'))
    .then(() => this.props.onLogOut())
    .then(() => this.setState({logoutComplete: true}));
  }


  render(){
    if(this.state.logoutComplete){
      return(
        <Redirect to="/" />
      );
    }
    return(<p>Redirecting</p>)
  }
}

export {Logout};