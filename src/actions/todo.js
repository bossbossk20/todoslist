export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'

export const addTodo = (todo) => ({
  type: ADD_TODO,
  name: todo,
  completed: false
})

export const deleteTodo = (index) => ({
  type: DELETE_TODO, index
})
