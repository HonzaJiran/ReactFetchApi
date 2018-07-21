import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import GraphicCardsList from './graphicCardsList'

class GraphicCards extends Component {
  constructor(props){
    super(props);
    this.state = {
      graphicCards: [],
      showAll: 'hide'
    };
    this.showAll = this.showAll.bind(this);
    this.executeGraphicCard = this.executeGraphicCard.bind(this)
    this.authUser = this.authUser.bind(this);
  }

  showAll(){
    if (this.state.showAll === 'hide') {
      this.setState({ showAll: 'show' })
    }else {
      this.setState({ showAll: 'hide' })
    }
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

  executeGraphicCard(graphicCard){
    if (window.confirm('Do you really want to delete this graphic card?'))
    {
      fetch(`https://monpick.thinkeasy.cz/api/v1/graphiccard/${graphicCard.graphic_card.id}/`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
        }
      })
      .then(response => {
        if (response.ok) {
            console.log('Graphic card deleted..');
        }
      })
    }
  }

  componentDidMount(){
    fetch('https://monpick.thinkeasy.cz/api/v1/status/graphiccards', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(graphicCards => {
      this.setState({graphicCards})
    })
    .catch(error => {
      console.log(error);
      return(this.authUser())
    })

  }
  render() {
    return (
      <div className="cards-wraper">
        <h5 className="text-primary text-left">Graphic cards</h5>
        <br/>
        <button className="btn btn-warning gpu-button float-left" type="button" onClick={this.showAll}>Show all</button>
          <div>
            <GraphicCardsList graphicCards={this.state.graphicCards} className={this.state.showAll} executeGraphicCard={this.executeGraphicCard}/>
          </div>
      </div>
    );
  }
}


export default GraphicCards;
