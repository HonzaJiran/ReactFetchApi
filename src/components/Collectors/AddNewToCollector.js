import React, { Component } from 'react'

export default class AddNewToCollector extends Component {
  constructor(props){
    super(props)
    this.state = {
      miner_name: '',
      ip_address: '',
      mining_password: '',
      collector: 1,
      is_disabled: true,
      collectors: []
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
    fetch('http://monpick.thinkeasy.cz:7000/api/v1/collector', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(collectors => {
      this.setState({ collectors: collectors })
    })
  }

  handleAdd(){
    const minerInfo = {
      miner_name: this.state.miner_name,
      ip_address: this.state.ip_address,
      mining_password: this.state.mining_password,
      collector: this.state.collector,
      is_disabled: this.state.is_disabled
    }

    fetch('http://monpick.thinkeasy.cz:7000/api/v1/miner/add/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      },
      body: JSON.stringify(minerInfo)
    })
    .then(res => {
      if (!res.ok) {
        console.log('Something went wrong..');
      }else {
        return res.json()
        .then(token => {
          console.log('Miner added');
        })
      }
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
                    <input type="text" name="miner_name" className="form-control" onChange={this.onChange} value={this.state.miner_name} id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter miner name" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword">IP address</label>
                    <input name="ip_address" onChange={this.onChange} value={this.state.ip_address} type="text" className="form-control" id="exampleInputPassword" placeholder="Enter miner ip address" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputMiningPassword">Mining password</label>
                    <input name="mining_password" onChange={this.onChange} value={this.state.mining_password} type="text" className="form-control" id="exampleInputMiningPassword" placeholder="Enter mining password" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="selectCollector">Collector's name: </label>
                    <select name="collector" value={this.state.collector} onChange={this.onChange}>
                      {
                        this.state.collectors.map(collector => {
                          return <option value={collector.id} key={collector.id}>{collector.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <button
                      className={ this.state.is_disabled ? "btn btn-outline-warning" : "btn btn-warning" + " nohover" }
                      onClick={this.state.handleClick}>{this.state.is_disabled ? "DISABLED" : "ENABLED"}
                  </button>
                </form>
                <button type="button" onClick={this.handleAdd} className="btn btn-primary">Add miner</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}
