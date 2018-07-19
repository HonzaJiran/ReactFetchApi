import React, { Component } from 'react'

export const MinerContext = React.createContext();

export class MinerProvider extends Component {
  state = {
    miners: []
  }

  fetchMiners(){
    fetch('https://monpick.thinkeasy.cz/api/v1/status/miners/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(miners => {
      this.setState({miners})
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  render() {
    return (
      <MinerContext.Provider value={{
        ...this.state,
        fetchMiners: this.fetchMiners
      }}>
        {this.props.children}
      </MinerContext.Provider>
    )
  }
}
