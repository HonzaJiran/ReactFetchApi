import React from 'react'
import logo from '../../logo.svg'
import { Button } from 'react-bootstrap';

export default (props) => {
  return (
    <React.Fragment>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <br/>
      <div className="login-form container">
        <h5 className="text-left text-primary">Login</h5>
        <form onSubmit={props.onSubmit}>
          <div className="form-group">
            <label htmlFor="usernameInput">Username</label>
            <input
              name="usernameInput"
              type="text"
              onChange={props.onChange}
              value={props.usernameInput}
              className="form-control"
              id="usernameInput"
              placeholder="Enter username"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input
              name="passwordInput"
              type="password"
              onChange={props.onChange}
              value={props.passwordInput}
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              required />
          </div>
          <Button
            bsStyle="success"
            type="submit">
            Login
          </Button>
        </form>
      </div>
    </React.Fragment>
  )
}
