import React, { Component } from 'react'

export default class App extends Component {
  state = {
    todo: '',
    todos: [],
    edit: false,
    editIndex: 0,
    editTodo: ''
  }

  componentDidMount = () => {
    // console.log(localStorage.getItem('todos'))
    if (!localStorage.getItem('todos')) {
      console.log('not')
      this.setState({
        todos: []
      })
    } else {
      let todos = JSON.parse(localStorage.getItem('todos'))
      this.setState({
        todos: todos
      })
    }
  }

  handdleChangeAdd = (e) => {
    this.setState({
      todo: e.target.value
    })
  }
  hanndleClickAdd = () => {
    let todos = [ ...this.state.todos, { name: this.state.todo, completed: false }  ]
    localStorage.setItem('todos', JSON.stringify(todos))
    this.setState({
      todos: todos,
      todo: '',
    })
  }
  handdleDelete = (index) => {
    let todos = this.state.todos
    todos.splice(index, 1)
    this.setState({
      todos: todos
    })
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  showEdit = (todo, index) => {
    console.log(`todo and index ${todo} ${index}`)
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
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  handdleCompleted = (index) => {
    let todos = this.state.todos
    todos[index].completed = true
    todos[index].color = 'green'
    this.setState({
      todos: todos
    })
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  render () {
    let { todos, edit, editTodo } = this.state
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
