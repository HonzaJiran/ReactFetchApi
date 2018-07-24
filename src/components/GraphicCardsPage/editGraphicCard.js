import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editGpu } from './../../actions/graphicCardActions'

class EditGraphicCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      graphicCardInfo: {
        name: '',
        is_disabled: true
      }
    }
  }

  editGraphicCard(){
    fetch(`https://monpick.thinkeasy.cz/api/v1/graphiccard/${this.props.id}/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(graphicCardInfo => {
      this.setState({ graphicCardInfo })
    })

  }

  postEditGraphicCard(){
    const graphicCardInfo = {
      name: this.state.graphicCardInfo.name,
      is_disabled: this.state.graphicCardInfo.is_disabled
    }

    const id = this.props.id

    this.props.editGpu(graphicCardInfo, id)

  }

  onChange(e) {
    this.setState(prevState => ({
      graphicCardInfo: {
          ...prevState.graphicCardInfo,
          name: document.getElementById('exampleInputName').value
      }
      }))
  }

  handleDisable(){
    this.state.graphicCardInfo.is_disabled
      ? this.setState(prevState => ({
        graphicCardInfo: {
            ...prevState.graphicCardInfo,
            is_disabled: false
        }
        }))
      : this.setState(prevState => ({
        graphicCardInfo: {
            ...prevState.graphicCardInfo,
            is_disabled: true
        }
        }))
  }

  render() {
    return (
      <div className="edit-graphiccard">
        <button onClick={this.editGraphicCard.bind(this)} type="button" className="btn btn-info" data-toggle="modal" data-target={'#exampleModalLong' + this.props.id}>Edit</button>
        <div className="modal fade" id={'exampleModalLong' + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <div className="form-group">
                  <label htmlFor="exampleInputName">Name</label>
                  <input name="name" type="text" className="form-control" onChange={this.onChange.bind(this)} value={this.state.graphicCardInfo.name} id="exampleInputName" aria-describedby="nameHelp" placeholder={this.state.graphicCardInfo.name} />
                </div>
                <button
                      className={ this.state.graphicCardInfo.is_disabled ? "btn btn-outline-danger nohover" : "btn btn-danger nohover" }
                      onClick={this.handleDisable.bind(this)}>{this.state.graphicCardInfo.is_disabled ? "DISABLED" : "ENABLED"}
                </button>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={this.postEditGraphicCard.bind(this)} className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditGraphicCard.propTypes = {
  editGpu: PropTypes.func.isRequired
}

export default connect(null, {editGpu})(EditGraphicCard);