import React from "react";
import '../styles/LoginForm.css';
import Cookies from 'js-cookie';
import {Redirect} from "react-router-dom"

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: ''
    };

    this.handleSubmit=this.handleSubmit.bind(this);

    this.handlePasswordChange=this.handlePasswordChange.bind(this);
    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

    const name = this.state.name;
    const password = this.state.password;

    let onLogIn = this.props.onLogIn;

    fetch('https://localhost:44374/api/auth/login?'+
      'username=' + name + '&' +
      'password=' + password + '&' , {
      method: "post",
      credentials: "include",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: ''
    })
    .then(function(response){
      if(!response.ok){
        if(response.status == 401) alert("Username or password doesn't match");
        else alert("Something went wrong");

        return;
      }
      Cookies.set('User', 'loggedIn');
      onLogIn();
    })

  }

  handleNameChange(event){
    this.setState({name: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  render(){
    if(this.props.isLoggedIn){
      return( <Redirect to="/" />)
    }
    return(
      <div>
        <form class="Form" onSubmit={this.handleSubmit}>
          <label class="Form-row">
            <p class="Form-label"> Login: </p>
            <input class="Form-item" type="text" value={this.state.name} onChange={this.handleNameChange} />
          </label>
          <label class="Form-row">
            <p class="Form-label"> Password: </p>
            <input class="Form-item" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <input class="Form-item Form-button" type="submit" value="Submit" />
        </form>
      </div>
      );
  }

}

export {Login};

