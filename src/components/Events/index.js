import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchEvents } from './../../actions/eventActions'
import EventList from './eventList'

class Events extends Component {
  componentWillMount(){
    this.props.fetchEvents()
  }

  render(){
    return(
      <div>
        <h5 className="text-primary text-left">Events</h5>
        <br/>
        <EventList events={this.props.events} />
      </div>
    )
  }
}

Events.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  events: state.events.items
})

export default connect(mapStateToProps, { fetchEvents })(Events);