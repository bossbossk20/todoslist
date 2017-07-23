import { ADD_TODO } from '../actions/todo'

export default function todo( state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      // console.log(action.completed)
      return [ ...state, { name: action.name, completed: action.completed } ]
    default:
      return state
  }
}
