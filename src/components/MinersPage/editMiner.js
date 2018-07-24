import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editMiner } from './../../actions/minerActions'

class EditMiner extends Component {
  constructor(props){
    super(props)
    this.state = {
      minerInfo: {
        is_disabled: undefined,
        rb_cable: false
      },
      miner_name: '',
      rb: '',
    }
    this.FetchEditMiner = this.FetchEditMiner.bind(this)
  }

  FetchEditMiner(){
    fetch(`https://monpick.thinkeasy.cz/api/v1/miner/${this.props.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(minerInfo => {
      this.setState({ minerInfo })
    })

  }

  postEditedMiner(){
    const minerInfo = {
      miner_name: this.state.miner_name,
      rb: this.state.rb,
      is_disabled: this.state.minerInfo.is_disabled,
      rb_cable: this.state.minerInfo.rb_cable
    }

    const id = this.props.id;

    this.props.editMiner(minerInfo, id)
  }

  handleName(e) {
    console.log(e.target.value);
    this.setState({miner_name: e.target.value})
  }

  handleRb(e) {
    console.log(e);
    this.setState({rb: e.target.value})
  }

  handleDisable(){
    this.state.minerInfo.is_disabled
      ? this.setState(prevState => ({
        minerInfo: {
            ...prevState.minerInfo,
            is_disabled: false
        }
        }))
      : this.setState(prevState => ({
        minerInfo: {
            ...prevState.minerInfo,
            is_disabled: true
        }
        }))
  }

  handleRbCable(){
    this.state.minerInfo.rb_cable
      ? this.setState(prevState => ({
        minerInfo: {
            ...prevState.minerInfo,
            rb_cable: false
        }
        }))
      : this.setState(prevState => ({
        minerInfo: {
            ...prevState.minerInfo,
            rb_cable: true
        }
        }))
  }


  render() {
    return (
      <div className="edit-miner">
        <button onClick={this.FetchEditMiner} type="button" className="btn btn-info" data-toggle="modal" data-target={'#exampleModalLong' + this.props.id}>Edit</button>
        <div className="modal fade" id={'exampleModalLong' + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.state.minerInfo.miner_name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <div className="form-group">
                  <label htmlFor="exampleInputName">Name</label>
                  <input name="miner_name" type="text" className="form-control" onChange={this.handleName.bind(this)} value={this.state.miner_name} id="miner_name" aria-describedby="nameHelp" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputName">Rb</label>
                  <input name="rb" type="text" className="form-control" onChange={this.handleRb.bind(this)} value={this.state.rb || ""} id="rb" aria-describedby="nameHelp"  />
                </div>
                <button
                      className={ this.state.minerInfo.rb_cable ? "btn btn-outline-warning nohover" : "btn btn-warning nohover" }
                      id="rb_cable"
                      onClick={this.handleRbCable.bind(this)}>{this.state.minerInfo.rb_cable ? "CONNECTED" : "DISCONNECTED" || ""}
                </button>
           
                <button
                      className={ this.state.minerInfo.is_disabled ? "btn btn-outline-danger nohover" : "btn btn-danger nohover" }
                      onClick={this.handleDisable.bind(this)}>{this.state.minerInfo.is_disabled ? "DISABLED" : "ENABLED" || ""}
                </button>
               

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={this.postEditedMiner.bind(this)} className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditMiner.propTypes = {
  editMiner: PropTypes.func.isRequired
}

export default connect(null, { editMiner })(EditMiner)