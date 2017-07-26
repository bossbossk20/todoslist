import { ADD_TODO, DELETE_TODO } from '../actions/todo'

export default function todo( state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [ ...state, { name: action.name, completed: action.completed } ]
    case DELETE_TODO:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
    default:
      return state
  }
}
