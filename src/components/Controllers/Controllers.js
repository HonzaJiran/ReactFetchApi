import React, { Component } from 'react'

export default class Controllers extends Component {
  componentDidMount(){
    fetch('http://monpick.thinkeasy.cz:7000/api/v1/status/controller/', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
        }
      })
      .then(res => res.json())
      .then(controllers => {
        console.log(controllers);
      })
  }

  render() {
    return (
      <div>
        <h2>controllers</h2>
      </div>
    )
  }
}
