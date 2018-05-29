import React, { Component } from 'react';
import '../App.css';

class Collectors extends Component {
  constructor(props){
    super(props);
    this.state = {
      collectors: []
    };
  }

  componentDidMount(){
    const userAuth = {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')
    }

    fetch('http://monpick.thinkeasy.cz:7000/api-auth/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(userAuth)
    })
      .then(res => {
        if (!res.ok) {
          this.setState({ show_error: true })
        }else {
          return res.json()
          .then(token => {
            sessionStorage.setItem('jwtToken', token.token);
          })
        }
      })

      const jwtToken = sessionStorage.getItem('jwtToken');

      fetch('http://monpick.thinkeasy.cz:7000/api/v1/collector', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + jwtToken
        }
      })
      .then(res => res.json())
      .then(collectors => {
        console.log(collectors);
        this.setState({ collectors:collectors })
      })
    }

  render() {
    const collectors = this.state.collectors.map(collector => {
      return (
          <div key={collector.id} className="card collector">
            <div className="card-body">
              <h5 className="card-title">{collector.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{collector.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</h6>
              <button onClick={this.props.listMiners} className="btn btn-success">Show miners</button>
              <br/>
              <a href="#" className="btn btn-primary">Show graphic cards</a>
            </div>
          </div>
      );
    })

    return (
      <div className="row">
        { collectors }
      </div>
    );
  };
}


export default Collectors;
