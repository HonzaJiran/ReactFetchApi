import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addMiner } from '../../actions/minerActions'
import { fetchCollectors } from './../../actions/collectorActions'

class AddMiner extends Component {
  constructor(props){
    super(props)
    this.state = {
      miner_name: '',
      ip_address: '',
      mining_password: '',
      collector: 1,
      is_disabled: true
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleClick(){
    this.state.is_disabled
      ? this.setState({ is_disabled: false })
      : this.setState({ is_disabled: true })
  }

  componentDidMount(){
    this.props.fetchCollectors()
  }

  handleAdd(e){
    e.preventDefault();
    
    const minerInfo = {
      miner_name: this.state.miner_name,
      ip_address: this.state.ip_address,
      mining_password: this.state.mining_password,
      collector: this.state.collector,
      is_disabled: this.state.is_disabled
    }

    this.props.addMiner(minerInfo)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render(){
    return(
      <div className="add-miner">
        <div className="add-minner-modal">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add miner</button>

          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add new miner</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">  

                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleInputName">Name</label>
                      <input type="text" name="miner_name" className="form-control" onChange={this.onChange} value={this.state.miner_name} id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter miner name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword">IP address</label>
                      <input name="ip_address" onChange={this.onChange} value={this.state.ip_address} type="text" className="form-control" id="exampleInputPassword" placeholder="Enter miner ip address" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputMiningPassword">Mining password</label>
                      <input name="mining_password" onChange={this.onChange} value={this.state.mining_password} type="text" className="form-control" id="exampleInputMiningPassword" placeholder="Enter mining password" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="selectCollector">Collector's name: </label>
                      <select name="collector" value={this.state.collector} onChange={this.onChange}>
                        {
                          this.props.collectors.map(collector => {
                            return <option value={collector.id} key={collector.id}>{collector.name}</option>
                          })
                        }
                      </select>
                    </div>
                    <button
                        className={ this.state.is_disabled ? "btn btn-outline-warning nohover" : "btn btn-warning nohover" }
                        onClick={this.state.handleClick}>
                        {this.state.is_disabled ? "DISABLED" : "ENABLED"}
                    </button>
                  </form>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" onClick={this.handleAdd} className="btn btn-primary">Add miner</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddMiner.propTypes = {
  addMiner: PropTypes.func.isRequired,
  fetchCollectors: PropTypes.func.isRequired,
  collectors: PropTypes.array.isRequired
}

const mapPropsToState = state => ({
  collectors: state.collectors.items
})

export default connect(mapPropsToState, {addMiner, fetchCollectors})(AddMiner);
