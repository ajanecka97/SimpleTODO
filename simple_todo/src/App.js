import logo from './logo.svg';
import './styles/App.css';
import './styles/Todo.css';
import {Todo} from './components/todo.js';
import {TopMenu} from './components/topMenu.js';
import {Login} from './components/login.js';
import {Register} from './components/register.js';
import {Logout} from './components/logout.js';
import React from 'react';
import Cookies from 'js-cookie';
import {
  Route,
  Redirect
} from "react-router-dom";
import Labels from './components/labels';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      searchBarValue: ''
    }
    this.handleLoginLogout = this.handleLoginLogout.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleSortStart = this.handleSortStart.bind(this);
  }

componentDidMount(){
  let cookie = false;
  cookie = Cookies.get("User")
  if(cookie == "loggedIn"){
    this.setState({isLoggedIn: true});
  }
}

handleLoginLogout(){
  this.setState({isLoggedIn: !this.state.isLoggedIn});
}

handleSearchBarChange(value){
  this.setState({searchBarValue: value});
}

handleSortStart(){
  this.setState({searchBarValue: ''});
}

render(){
    return (
        <div class="MainContainer">
            <TopMenu isLoggedIn={this.state.isLoggedIn} onSearchBarChange={this.handleSearchBarChange} searchBarValue={this.state.searchBarValue}/>
            <div class="Todo">
              <Route exact path="/"> <Todo searchBarValue={this.state.searchBarValue} onSortStart={this.handleSortStart}/></Route>
              <Route path="/Login"> <Login onLogIn={this.handleLoginLogout} isLoggedIn={this.state.isLoggedIn}/></Route>
              <Route path="/Logout"> <Logout onLogOut={this.handleLoginLogout}/></Route>
              <Route path="/Register" component={Register}/>
            </div>
            <Labels />
        </div>
    );
}
}

export default App;
