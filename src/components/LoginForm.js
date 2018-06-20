import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()
      const userAuth = {
        username: this.state.username,
        password: this.state.password
      }

      fetch('http://monpick.thinkeasy.cz:7000/api-auth/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(userAuth)
      })
        .then(res => {
          if (!res.ok) {
            this.setState({ show_error: true })
          }else {
            return res.json()
            .then(token => {
              sessionStorage.setItem('jwtToken', token.token)
              sessionStorage.setItem('username', this.state.username)
              sessionStorage.setItem('password', this.state.password)
              // window.location.reload()
            })
          }

        })
  }

  render() {
    return (
        <div className="form">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input name="username" type="text" onChange={this.onChange} value={this.state.username} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" required />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input name="password" type="password" onChange={this.onChange} value={this.state.password} className="form-control" id="exampleInputPassword1" placeholder="Password" required />
            </div>
            <button type="submit" className="btn btn-primary"><Link to="/Dashboard">Login</Link></button>
          </form>
        </div>
    )
  }
}

export default LoginForm
