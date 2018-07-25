import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchCollectors } from './../../actions/collectorActions'
import { fetchEvents } from './../../actions/eventActions'
import { fetchMiners } from './../../actions/minerActions'
import { fetchGpus } from './../../actions/graphicCardActions'

import Collectors from './collectors'
import Events from './events'

class Dashboard extends Component {
  componentWillMount(){
    this.props.fetchCollectors()
    this.props.fetchEvents(6)
    this.props.fetchMiners()
    this.props.fetchGpus()
  }

  render() {
    return (
      <div className="Dashboard">
        <h5 className="text-left text-primary">Collectors</h5>
          <Collectors collector={this.props.collectors} miners={this.props.miners} graphicCards={this.props.graphicCards} />
        <br/>
        <h5 className="text-left text-primary">Latest events</h5>
        <div className="row">
          <Events events={this.props.events} />
        </div>
      </div>
    );
  };
}

Dashboard.propTypes = {
  fetchCollectors: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchGpus: PropTypes.func.isRequired,
  fetchMiners: PropTypes.func.isRequired,
  collectors: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  miners: PropTypes.array.isRequired,
  graphicCards: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  collectors: state.collectors.items,
  events: state.events.items,
  miners: state.miners.items,
  graphicCards: state.graphicCards.items
})

export default connect(mapStateToProps, { fetchCollectors, fetchEvents, fetchGpus, fetchMiners })(Dashboard)