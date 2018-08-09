import React, { Component } from 'react'
import '../../App.css'

import MinerList from './minerList'

import { connect } from 'react-redux'
import { fetchMinerStatus } from '../../actions/minerActions'
import PropTypes from 'prop-types'

class MinerStatus extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchMinerStatus()
    console.log(this.props.minerStatus);
  }

  render() {
    return (
      <div className="miners-wrapper">
        <h5 className="text-primary text-left">Miners</h5>
          <MinerList minerStatus={this.props.minerStatus} />
      </div>
    );
  }
}

MinerStatus.propTypes = {
  fetchMinerStatus: PropTypes.func.isRequired,
  minerStatus: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  minerStatus: state.miners.minerStatus
})

export default connect(mapStateToProps, {fetchMinerStatus})(MinerStatus);