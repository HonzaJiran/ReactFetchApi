import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    const userAuth = {
      username: this.state.username,
      password: this.state.password
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(userAuth)
    })
      .then(res => res.json())
      .then(token => {
        this.setState({ token : token})
        sessionStorage.setItem('token', token.password)
      })
  }

  render() {
    const token = this.state.token.password;
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <p>Username</p>
          <input type="text" name="username" onChange={this.onChange} value={this.state.username} />
          <p>Password</p>
          <input type="password" name="password" onChange={this.onChange} value={this.state.password} />
          <br />
          <br />
          <button type="submit">Submit</button>
          <p>{token}</p>
        </form>
      </div>
    );
  }
}

export default Form;
