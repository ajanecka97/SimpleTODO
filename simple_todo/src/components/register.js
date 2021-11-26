import React from "react";
import '../styles/Menu.css';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange=this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange=this.handleConfirmPasswordChange.bind(this);
    this.handleNameChange=this.handleNameChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    const repeatpassword = this.state.confirmPassword;

    fetch('https://localhost:44374/api/auth/register?'+
      'username=' + name + '&' +
      'email=' + email + '&' +
      'password=' + password + '&' +
      'repeatpassword=' + repeatpassword , {
      method: "post",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: ''
    }).then((response) => response.text())
    .then((responseText) => {
      alert(responseText);
    });

  }

  handleNameChange(event){
    this.setState({name: event.target.value});
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange(event){
    this.setState({confirmPassword: event.target.value});
  }

  render(){
    return(
      <div>
        <form class="Form" onSubmit={this.handleSubmit}>
          <label class="Form-row">
            <p class="Form-label"> Login: </p>
            <input class="Form-item" type="text" value={this.state.name} onChange={this.handleNameChange} />
          </label>
          <label class="Form-row">
            <p class="Form-label"> E-mail: </p>
            <input class="Form-item" type="text" value={this.state.email} onChange={this.handleEmailChange} />
          </label>
          <label class="Form-row">
            <p class="Form-label"> Password: </p>
            <input class="Form-item" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <label class="Form-row">
            <p class="Form-label"> Confirm password: </p>
            <input class="Form-item" type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
          </label>
          <input class="Form-item Form-button" type="submit" value="Submit" />
        </form>
      </div>
      );
  }
}

export {Register};

