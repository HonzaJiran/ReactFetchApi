import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      show_input: true
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    console.log('123');
    e.preventDefault();

    const userAuth = {
      username: this.state.username,
      password: this.state.password
    }

    fetch('http://192.168.0.199:7000/api-auth/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(userAuth)
    })
      .then(res => res.json())
      .then(token => {
        sessionStorage.setItem('jwtToken', token.token);
        console.log(token);
      })

    this.setState({show_input:false})
  }

  render() {
    return (
      <div className="form">
        { this.state.show_input &&      
          <form className="col 12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input field col s6">
                <input type="text" className="validate" name="username" onChange={this.onChange} value={this.state.username} />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input field col s6">
              <input type="password" className="validate" name="password" onChange={this.onChange} value={this.state.password} />
              <label htmlFor="password">Password</label>
              </div>
              <button className="btn is-primary" type="submit">Submit</button>
            </div>
          </form>
        }
      </div>
    );
  }
}

export default Form;
