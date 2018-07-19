import React, { Component } from 'react'
import Alert from 'react-s-alert';

export default class AddNewToCollector extends Component {
  constructor(props){
    super(props)
    this.state = {
      miner_name: '',
      ip_address: '',
      mining_password: '',
      is_disabled: true
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleClick(e){
    e.preventDefault()
    this.state.is_disabled
      ? this.setState({ is_disabled: false })
      : this.setState({ is_disabled: true })
  }

  handleAdd(e){
    e.preventDefault()
    const minerInfo = {
      miner_name: this.state.miner_name,
      ip_address: this.state.ip_address,
      mining_password: this.state.mining_password,
      collector: this.props.id,
      is_disabled: this.state.is_disabled
    }

    fetch('https://monpick.thinkeasy.cz/api/v1/miner/add/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      },
      body: JSON.stringify(minerInfo)
    })
    .then(res => res.json())
    .then(response => {
      Alert.success(`Miner "${response.miner_name}" Added`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    })
    .catch(error =>{
      Alert.error(`${error}`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    })
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {
    return (
      <div className="tableCell">
        <div id="accordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0 text-primary">
                <b>Add new</b>
                <button className="btn btn-link" data-toggle="collapseAdd" data-target="#collapseAdd" aria-expanded="false" aria-controls="collapseAdd">
                </button>
              </h5>
            </div>

            <div id="collapseAdd" className="collapseAdd" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="card-body">
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
                    <span><b>{' ' + this.props.collName}</b></span>
                  </div>
                  <button
                      className={ this.state.is_disabled ? "btn btn-outline-warning nohover" : "btn btn-warning nohover" }
                      onClick={this.handleClick}>{this.state.is_disabled ? "DISABLED" : "ENABLED"}
                  </button>
                </form>
                <button
                  type="button"
                  onClick={this.handleAdd}
                  className="btn btn-primary">
                  Add miner
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}
