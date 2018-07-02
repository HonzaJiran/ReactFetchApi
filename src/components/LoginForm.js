import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: false
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
      console.log('submitted');
      

      fetch('http://monpick.thinkeasy.cz:7000/api-auth/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(userAuth)
      })
        .then(res => {
          if (!res.ok) {
            console.log('idk');
            
          }else {
            return res.json()
            .then(token => {
              sessionStorage.setItem('jwtToken', token.token)
              sessionStorage.setItem('username', this.state.username)
              sessionStorage.setItem('password', this.state.password)
              this.setState({ redirect: true })
            })
          }

        })
  }

  render() {
    if (this.state.redirect) {
      return ( <Redirect key="from-login" to={'/Dashboard'} /> )
    }

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
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
    )
  }
}

export default LoginForm
