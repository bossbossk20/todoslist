import React, { Component } from 'react'

export default class App extends Component {
  state = {
    todo: '',
    edit: false,
    editIndex: 0,
    editTodo: ''
  }

  handdleChangeAdd = (e) => {
    this.setState({
      todo: e.target.value
    })
  }
  hanndleClickAdd = () => {
    this.props.addTodo(this.state.todo)
  }
  handdleDelete = (index) => {
    this.props.deleteTodo(index)
  }

  showEdit = (todo, index) => {
    this.setState({
      edit: true,
      editTodo: todo,
      editIndex: index
    })
  }
  handdleChangeEdit = (e) => {
    this.setState({
      editTodo: e.target.value
    })
  }
  handdleClickEdit = () => {
    let todos = this.state.todos
    let { editTodo, editIndex} = this.state
    todos[editIndex].name = editTodo
    this.setState({
      todos: todos,
      edit: false
    })
  }
  handdleCompleted = (index) => {}
  render () {
    let { edit, editTodo } = this.state
    let todos = this.props.todo
    let remaining = todos.filter(todo => !todo.completed).length
    return (
      <center>
        <div style={{marginTop:'70px'}}>
          <div style={{marginBottom:'20px'}}> {remaining} Remaining </div>
          <input type='text' onChange={this.handdleChangeAdd} value={this.state.todo} />
          <button onClick={this.hanndleClickAdd} >Add</button>
          <div>
          <br/>
            {
              todos.map((todo,index) => (
                <div key={todo+index}
                  style={{
                    backgroundColor: todo.completed ? 'green': null,
                    width: '320px',
                    color: todo.completed ? '#FFF': '#000'
                  }}>
                  <span style={{paddingRight:'20px'}}>
                    {todo.name}
                  </span>
                  <button onClick={ () => this.handdleDelete(index) }>delete</button>
                  <button onClick={ () => this.showEdit(todo, index) } >edit</button>
                  <button onClick={ () => this.handdleCompleted(index) } >completed</button>
                </div>
              ))
          }
          </div>
          {
            edit ? <div style={{marginTop: '40px'}}>
            Edit<input type="text" value={editTodo.name} onChange={this.handdleChangeEdit} />
            <button onClick={this.handdleClickEdit}>confirm</button>
            </div>: null
          }
        </div>
      </center>
    )
  }
}
