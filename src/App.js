import React, { Component } from 'react'

export default class App extends Component {
  state = {
    num1: 0,
    num2: 0
  }
  handleNum1 = (e) => {
    let num1 = parseInt(e.target.value)
    this.setState({
      num1:  num1
    })
  }
  handleNum2 = (e) => {
    let num2 = parseInt(e.target.value)
    this.setState({
      num2:  num2
    })
  }
  render () {
    let { num1, num2 } = this.state
    return (
      <div>
        num1 <input type="text" onChange={this.handleNum1} />
        num2  <input type="text" onChange={this.handleNum2} />
      <h1>
        result : {num1+num2}
      </h1>
      </div>
    )
  }
}
