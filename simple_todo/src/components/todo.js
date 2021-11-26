import React from "react";
import '../styles/Todo.css';
import {TaskForm} from './taskForm.js';
import { UpdateTaskForm } from "./updateTaskForm";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import styles from '../styles/DraggableTodo.module.css';
import arrayMove from '../utils/arrayMove.js';
import {compareByPosition, compareByName, savePosition, save} from '../utils/sorting.js';

//Drag handler
const DragHandle = sortableHandle(() => (
  <span className={styles.dragHandler}>
    <div class="icon"></div>
  </span>
));

const SortableItem = sortableElement(({item, onItemChange }) => (
  <div className={styles.dragElement}>
    <DragHandle />
    <TodoItem item={item} onItemChange={onItemChange}/>
  </div>
));

const SortableItemWithoutSorting = sortableElement(({item, onItemChange }) => (
  <div className={styles.dragElement}>
    <TodoItem item={item} onItemChange={onItemChange}/>
  </div>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <div className={styles.dragContainer}>{children}</div>;
});


class Todo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }

    this.handleNewTask = this.handleNewTask.bind(this);
    this.matchSearchBar = this.matchSearchBar.bind(this);
    this.sortItems = this.sortItems.bind(this);
  }

  componentDidMount(){
    fetch("https://localhost:44374/api/todoitems", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            todos: Array.from(result).sort(compareByPosition)
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }
/*
  componentDidUpdate(){
    for(var i = 0; i < this.state.todos.length; i++){
      savePosition(this.state.todos[i], i);
    }
  }*/

  handleNewTask() {
    fetch("https://localhost:44374/api/todoitems", {
      credentials: "include"
    })
    .then(res => res.json())
    .then(
      result => {
        this.setState({
          todos: Array.from(result).sort(compareByPosition)
        });
      },
      error => {
        this.setState({
          error
        });
      }
    );
  }

  sortItems(){
    const todos = this.state.todos.sort(compareByName);

    console.log("todos:" + todos.toString());
    console.log("todo: " + todos[0].name);

    save(todos);

    this.setState({todos: todos});
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ todos }) => ({
      todos: arrayMove(todos, oldIndex, newIndex)
    }));

    var from = oldIndex > newIndex ? newIndex : oldIndex;
    var to = oldIndex > newIndex ? oldIndex : newIndex;

    for(var i = from; i <= to; i++){
      savePosition(this.state.todos[i], i);
    }
  };

  matchSearchBar(value){
    var searchBarString = this.props.searchBarValue.toLowerCase().trim();
    var arrayString = value.props.item.name.toLowerCase().toString();

    if(searchBarString.length == 0) return true;

    return arrayString.includes(searchBarString);
  }

  render(){
    console.log("Component was rendered");

    let todoItems;

    if(this.props.searchBarValue == ''){
      todoItems = this.state.todos.map((item, index) =>
    <SortableItem key={`item-${index}`} index={index} item={item} onItemChange={this.handleNewTask}/>);
    }
    else{
      todoItems = this.state.todos.map((item, index) =>
      <SortableItemWithoutSorting key={`item-${index}`} index={index} item={item} onItemChange={this.handleNewTask}/>).filter(this.matchSearchBar);
    }


    return(
      <div>
        <div class="Todo-header"><b>TODO:</b> <button class="TODOButton" onClick={this.sortItems}>Sort</button></div>
        <div class="Todo-content">
        <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
          {todoItems}
          </SortableContainer>
        </div>
        <TaskForm onTaskAdded={this.handleNewTask}/>
      </div>
    );
  }
} 

class TodoItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      showDescription: false
    }

    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleShowDescription = this.handleShowDescription.bind(this);
  }

  handleDeleteItem(){
    fetch('https://localhost:44374/api/todoitems/' + this.props.item.id, {
      method: "delete"}).then(() => this.props.onItemChange());
      this.setState({showDescription: !this.state.showDescription});
  }

  handleEdit(){
    this.setState({edit: !this.state.edit, showDescription: false});
  }

  handleShowDescription(){
    this.setState({showDescription: !this.state.showDescription});
  }

  render(){
    let editForm;
    if(this.state.edit){
      editForm = <UpdateTaskForm id={this.props.item.id} name={this.props.item.name}
       description={this.props.item.description} onItemChange={this.props.onItemChange}/>;
    }
    else{
      editForm = null;
    }

    let descriptionBox;
    if(this.state.showDescription){
      descriptionBox = <div>{this.props.item.description}</div>
    }
    else{
      descriptionBox = null;
    }


    return(
        <div class="Todo-item-general">
          <div class="Todo-item">
            <p onClick={this.handleShowDescription}> {this.props.item.name} </p>
            <button class="TODOButton" onClick={this.handleEdit}>Edit</button>
            <button class="TODOButton" onClick={this.handleDeleteItem} >Delete</button>
          </div>
          {descriptionBox}
          {editForm}
        </div>
    );
  }
}

export {Todo};