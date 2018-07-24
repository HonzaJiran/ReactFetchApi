import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CollectorsList from './collectorsList'

import { fetchCollectors } from './../../actions/collectorActions'
import { fetchMiners } from './../../actions/minerActions'

class Collectors extends Component {
  componentWillMount(){
    this.props.fetchCollectors()
    this.props.fetchMiners()
  }

  render(){
    return(
      <div>
        <h5 className="text-primary text-left">Collectors</h5>
        <ul className="list-group collectors">
          <CollectorsList collectors={this.props.collectors} miners={this.props.miners} />
        </ul>
      </div>
    )
  }
}

Collectors.propTypes = {
  fetchCollectors: PropTypes.func.isRequired,
  collectors: PropTypes.array.isRequired,
  fetchMiners: PropTypes.func.isRequired,
  miners: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  collectors: state.collectors.items,
  miners: state.miners.items
})

export default connect(mapStateToProps, {fetchCollectors, fetchMiners})(Collectors);