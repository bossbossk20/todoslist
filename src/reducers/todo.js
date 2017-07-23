import { ADD_TODO } from '../actions/todo'

export default function todo( state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      console.log(action.text)
      return [ ...state, action.todo ]
    default:
      return state
  }
}
