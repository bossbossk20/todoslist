import React, { Component } from 'react'
import db from './firebase'

export default class App extends Component {
  state = {
    todo: '',
    todos: [],
    edit: false,
    editIndex: 0,
    editTodo: ''
  }

  componentDidMount = () => {
    db.ref('todos').on('child_added', data => {
      this.setState({
        todos: [ ...this.state.todos, { id: data.key,  name: data.val().name, completed: data.val().completed }]
      })
    })
  }

  handdleChangeAdd = (e) => {
    this.setState({
      todo: e.target.value
    })
  }
  hanndleClickAdd = () => {
    let todos = [ ...this.state.todos, { name: this.state.todo, completed: false }  ]
    db.ref(`todos/${Date.now()}`).set({ name: this.state.todo, completed: false })
    this.setState({
      todos: todos,
      todo: '',
    })
  }
  handdleDelete = (index, id) => {
    console.log(id)
    db.ref(`todos/${id}`).remove()
    let todos = this.state.todos
    todos.splice(index, 1)
    this.setState({
      todos: todos
    })
  }

  showEdit = (todo, index, id) => {
    console.log(`todo and index ${todo} ${index}`)
    this.setState({
      edit: true,
      editTodo: todo,
      editIndex: index,
      editId: id
    })
  }
  handdleChangeEdit = (e) => {
    this.setState({
      editTodo: e.target.value
    })
  }
  handdleClickEdit = () => {
    let todos = this.state.todos
    let { editTodo, editIndex, editId} = this.state
    todos[editIndex].name = editTodo
    db.ref(`todos/${editId}`).update({ id:editId, name: editTodo, completed: false})
    this.setState({
      todos: todos,
      edit: false
    })
  }
  handdleCompleted = (index, todo) => {
    let todos = this.state.todos
    todos[index].completed = true
    todos[index].color = 'green'
    db.ref(`todos/${todo.id}`).update({ id: todo.id, name: todo.name, completed: true, color: 'green'  })
    this.setState({
      todos: todos
    })
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
                  <button onClick={ () => this.handdleDelete(index,todo.id) }>delete</button>
                  <button onClick={ () => this.showEdit(todo, index, todo.id) } >edit</button>
                  <button onClick={ () => this.handdleCompleted(index, todo) } >completed</button>
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
