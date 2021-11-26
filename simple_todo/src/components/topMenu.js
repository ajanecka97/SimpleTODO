import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/Menu.css';

class TopMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchBarValue: this.props.searchBarValue
    }

   this.searchBarUpdated =  this.searchBarUpdated.bind(this);
  }

searchBarUpdated(event){
  this.setState({searchBarValue: event.target.value});
  this.props.onSearchBarChange(event.target.value);
}


  render(){
    console.log(this.state.searchBarValue);
    let isLoggedIn = this.props.isLoggedIn;
    
    let searchBar = 
      <div class="Menu-item" id="Search-bar">
        <form class="Input">
          <input class="Input" type="text" value={this.state.searchBarValue} onChange={this.searchBarUpdated}/>
          </form>
        </div>;

    if(isLoggedIn){
      return(
      <div class="Menu">
        <div class="Menu-item"><NavLink to="/Logout">Logout</NavLink></div>
        <div class="Menu-item"><NavLink to="/">Home</NavLink></div>
        {searchBar}
    </div>
      );
    }
    else{
      return(
        <div class="Menu">
          <div class="Menu-item"><NavLink to="/Login">Login</NavLink></div>
          <div class="Menu-item"><NavLink to="/Register">Register</NavLink></div>
          <div class="Menu-item"><NavLink to="/">Home</NavLink></div>
          {searchBar}
      </div>
      );
    }
  }

}

export {TopMenu};


