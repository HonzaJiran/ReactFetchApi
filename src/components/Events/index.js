import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Events extends Component {
  constructor(props){
    super(props);
    this.state = {
      events: []
    }
    this.authUser = this.authUser.bind(this);
  }

  authUser(){
    axios.post(`https://monpick.thinkeasy.cz/api-auth/`, {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')
    })
    .then (res => {
      console.log(res.data.token);
      
      sessionStorage.setItem('jwtToken', res.data.token)
    })
    .catch(error => {
      console.log(error);
      return( <Redirect to="/" />)
    })
  }

  componentDidMount(){
    fetch('https://monpick.thinkeasy.cz/api/v1/event/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(events => {
      this.setState({events})
    })
    .catch(error => {
      console.log(error);
      return(this.authUser())
    })
  }

  render(){
    
    return(
      <div>
        {this.state.events.map(event => {
          return(
            <div className="tableCell" key={event.date}>
              <div id="accordion">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                      <p>{event.date}</p>
                      <button className="btn btn-link" data-toggle="collapse" data-target={ "#collapse" + event.date } aria-expanded="false" aria-controls={ "collapse" + event.date}>
                        <i className="medium material-icons">arrow_downward</i>
                      </button>
                    </h5>
                  </div>

                  <div id={ "collapse" + event.date} className={"collapse " + this.state.showAll} aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                      <h4 className="text-primary"><b>Description</b></h4>
                      <p>{event.description}</p>
                      <span className="text-primary"><b>User: </b></span>
                      <span>{event.user || "No user id"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Events;