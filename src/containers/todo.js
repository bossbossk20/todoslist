import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import App  from './../App'
import * as CounterActions from '../actions/todo'

function mapStateToProps (state) {
  return {
    todo: state.todo
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
