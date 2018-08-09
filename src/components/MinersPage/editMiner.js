import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editMiner } from './../../actions/minerActions'
import { getCurrentMiner } from './../../actions/minerActions'

class EditMiner extends Component {
  constructor(props){
    super(props)
    this.state = {
      is_disabled: this.props.currentMiner.is_disabled,
      rb_cable: undefined,
      miner_name: undefined,
      rb: undefined
    }
    this.handleName = this.handleName.bind(this)
    this.handleRb = this.handleName.bind(this)
    this.handleRbCable = this.handleRbCable.bind(this)
    this.handleDisable = this.handleDisable.bind(this)
    this.postEditedMiner = this.postEditedMiner.bind(this)
    this.fetchCurrentMiner = this.fetchCurrentMiner.bind(this)
  }

  fetchCurrentMiner(){
    this.props.getCurrentMiner(this.props.id)
  }

  postEditedMiner(){
    const minerInfo = {
      miner_name: this.state.miner_name,
      rb: this.state.rb,
      is_disabled: this.state.is_disabled,
      rb_cable: this.state.rb_cable
    }

    const id = this.props.id;
    console.log(minerInfo, id);
    
    this.props.editMiner(id,JSON.stringify(minerInfo))
  }

  handleName(e) {
    this.setState({miner_name: e.target.value})
  }

  handleRb(e) {
    this.setState({rb: e.target.value})
  }

  handleDisable(){
    this.setState({is_disabled: !this.state.is_disabled})
  }

  handleRbCable(){
    this.setState({rb_cable: !this.state.rb_cable})
  }


  render() {
    return (
      <div className="edit-miner">
        <button type="button" onClick={this.fetchCurrentMiner} className="btn btn-info" data-toggle="modal" data-target={'#exampleModalLong' + this.props.id}>Edit</button>
        <div className="modal fade" id={'exampleModalLong' + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.props.currentMiner.miner_name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <div className="form-group">
                  <label htmlFor="exampleInputName">Name</label>
                  <input
                    name="miner_name"
                    type="text"
                    className="form-control"
                    onChange={this.handleName}
                    value={this.state.miner_name}
                    id="miner_name"
                    placeholder={this.props.currentMiner.miner_name || 'null' }
                    aria-describedby="nameHelp" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputName">Rb</label>
                  <input
                  name="rb"
                  type="text"
                  className="form-control"
                  onChange={this.handleRb}
                  value={this.state.rb || ""}
                  id="rb"
                  placeholder={this.props.currentMiner.rb || 'null'}
                  aria-describedby="nameHelp"
                  disabled
                  />
                </div>
                <button
                      className="btn btn-warning btn-disabled"
                      id="rb_cable"
                      onClick={this.handleRbCable}
                      disabled>
                      {this.state.rb_cable ? "CONNECTED" : "DISCONNECTED" }
                </button>
           
                <button
                      className="btn btn-danger"
                      onClick={this.handleDisable}>
                      {this.state.is_disabled ? "DISABLED" : "ENABLED" }
                </button>
               

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={this.postEditedMiner} className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditMiner.propTypes = {
  editMiner: PropTypes.func.isRequired,
  getCurrentMiner: PropTypes.func.isRequired,
  currentMiner: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentMiner: state.miners.currentMiner
})

export default connect(mapStateToProps, { editMiner, getCurrentMiner })(EditMiner)