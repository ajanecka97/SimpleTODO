import React from "react";
import '../styles/Todo.css';

class UpdateTaskForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: this.props.name,
      description: this.props.description,
      user: 1
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = this.state.name;
    const description = this.state.description;
    const todoItemId = this.props.todoItemId;
    const deadline = '';
    const userid = 1;
    const data = {todoItemId, name, description};

    console.log(data);
    console.log(JSON.stringify(data));

    fetch('https://localhost:44374/api/todoitems/' + this.props.todoItemId, {
      method: "put",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(() => this.props.onItemChange());
  }

  handleNameChange(event){
    this.setState({name: event.target.value});
  }

  handleDescriptionChange(event){
    this.setState({description: event.target.value});
  }


  render(){
    return(
      <form class="TODOForm" onSubmit={this.handleSubmit}>
        <label class="TODOForm-label-box">
          <p class="TODOForm-label"> Name: </p>
          <input class="TODOForm-item" type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label class="TODOForm-label-box">
        <p class="TODOForm-label"> Description: </p>
          <textarea class="TODOForm-item" value={this.state.description} onChange={this.handleDescriptionChange} />
        </label>
        <input class="TODOForm-item TODOButton" type="submit" value="Submit" />
      </form>
    );
  }
}

export {UpdateTaskForm}