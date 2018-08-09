import React, { Component } from 'react';

import GraphicCardsList from './graphicCardsList'

import { connect } from 'react-redux'
import { fetchGpus } from '../../actions/graphicCardActions'
import PropTypes from 'prop-types'

class GraphicCards extends Component {
  constructor(props){
    super(props);
  }
/*
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
*/
  componentDidMount(){
    this.props.fetchGpus()
  }
  render() {
    return (
      <div className="cards-wraper">
        <h5 className="text-primary text-left">Graphic cards</h5>
        <br/>
        <button className="btn btn-warning gpu-button float-left" type="button" onClick={this.props.showAll}>Show all</button>
          <div>
            <GraphicCardsList graphicCards={this.props.graphicCards} />
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
