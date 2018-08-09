import React, { Component } from 'react'

import MinersList from './minersList'
import AddMiner from './addMiner'

import { connect } from 'react-redux'
import { fetchMiners } from '../../actions/minerActions'
import PropTypes from 'prop-types'

class minerContainer extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchMiners()
  }

  render() {
    return (
      <div className="miners-wrapper">
        <h5 className="text-primary text-left">Miners</h5>
        <div className="row">          
          <AddMiner />
        </div>
          <MinersList miners={this.props.miners}/>
      </div>
    );
  }
}

minerContainer.propTypes = {
  fetchMiners: PropTypes.func.isRequired,
  miners: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  miners: state.miners.items
})

export default connect(mapStateToProps, {fetchMiners})(minerContainer);
