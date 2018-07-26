import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editGpu, getSingleGpu } from './../../actions/graphicCardActions'

class EditGraphicCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      graphicCardInfo: {
        name: '',
        is_disabled: true
      }
    }
    this.postEditGraphicCard = this.postEditGraphicCard.bind(this)
    this.handleDisable = this.handleDisable.bind(this)
    this.onChange  = this.onChange.bind(this)
    this.editGraphicCard = this.editGraphicCard.bind(this)
  }

  editGraphicCard(){
    this.props.getSingleGpu(this.props.id)
  }

  postEditGraphicCard(){
    const graphicCardInfo = {
      name: this.state.graphicCardInfo.name,
      is_disabled: this.state.graphicCardInfo.is_disabled
    }

    this.props.editGpu(graphicCardInfo, this.props.id)

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
        <button onClick={this.editGraphicCard} type="button" className="btn btn-info" data-toggle="modal" data-target={'#exampleModalLong' + this.props.id}>Edit</button>
        <div className="modal fade" id={'exampleModalLong' + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.props.singleGpu.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <div className="form-group">
                  <label htmlFor="exampleInputName">Name</label>
                  <input name="name" type="text" className="form-control" onChange={this.onChange} value={this.state.graphicCardInfo.name} id="exampleInputName" aria-describedby="nameHelp" placeholder={this.props.singleGpu.name} />
                </div>
                <button
                      className={ this.state.graphicCardInfo.is_disabled ? "btn btn-danger nohover" : "btn btn-outline-danger nohover" }
                      onClick={this.handleDisable}>{this.props.singleGpu.is_disabled ? "DISABLED" : "ENABLED"}
                </button>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={this.postEditGraphicCard} className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleGpu: state.graphicCards.singleGpu
})

EditGraphicCard.propTypes = {
  editGpu: PropTypes.func.isRequired,
  getSingleGpu: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { editGpu, getSingleGpu })(EditGraphicCard);