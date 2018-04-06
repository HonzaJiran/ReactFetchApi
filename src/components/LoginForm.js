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

    fetch('http://monpick.thinkeasy.cz:7000/api-auth/', {
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
          <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input name="username" type="text" onChange={this.onChange} value={this.state.username} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input name="password" type="password" onChange={this.onChange} value={this.state.password} class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        }
      </div>
    );
  }
}

export default Form;
