import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import GraphicCardsList from './graphicCardsList'

import { connect } from 'react-redux'
import { fetchGpus } from '../../actions/graphicCardActions'
import PropTypes from 'prop-types'

class GraphicCards extends Component {
  constructor(props){
    super(props);
    this.executeGraphicCard = this.executeGraphicCard.bind(this)
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

  componentWillMount(){
    this.props.fetchGpus()
  }
  render() {
    return (
      <div className="cards-wraper">
        <h5 className="text-primary text-left">Graphic cards</h5>
        <br/>
        <button className="btn btn-warning gpu-button float-left" type="button" onClick={this.props.showAll}>Show all</button>
          <div>
            <GraphicCardsList graphicCards={this.props.graphicCards} executeGraphicCard={this.executeGraphicCard}/>
          </div>
      </div>
    );
  }
}

GraphicCards.propTypes = {
  fetchGpus: PropTypes.func.isRequired,
  graphicCards: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  graphicCards: state.graphicCards.items
})

export default connect(mapStateToProps, {fetchGpus})(GraphicCards);
