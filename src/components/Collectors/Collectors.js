import React, { Component } from 'react';

class Collectors extends Component {
  constructor(props){
    super(props);
    this.state = {
      collectors: []
    }
  }

  componentDidMount(){
    // USER AUTH
    const jwtToken = sessionStorage.getItem('jwtToken');
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
          console.log('Something went wrong..');
          window.location.reload();
        }else {
          return res.json()
          .then(token => {
            sessionStorage.setItem('jwtToken', token.token);
            console.log(token);
          })
        }
      })

    // FETCH COLLECTORS
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
        this.setState({ collectors: collectors })
      })
  }

  render(){
    const collectors = this.state.collectors.map(collector => {
      return (
        <li key={collector.id} className="list-group-item d-flex justify-content-between align-items-center">
          {collector.name}
          <span className="btn btn-primary" data-toggle={'modal' + collector.id} data-target={'#exampleModal' + collector.id}>
              Collector's detail
          </span>
          <div className="modal fade" id={'exampleModal' + collector.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  ...
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
          <span className="btn btn-warning">
              Edit Collector
          </span>
          <span className="btn btn-danger">
              Delete Collector
          </span>
          {collector.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}
        </li>
      );
    })

    return(
      <div>
        <h5>Collectors</h5>
        <button className="btn btn-success">Add new collector</button>
        <ul className="list-group collectors">
          { collectors }
        </ul>
      </div>
    )
  }
}

export default Collectors;
// Rozkouskovat!!!
  // <button className="btn btn-primary">Collector's detail</button>
  // <button className="btn btn-warning">Edit collector</button>
  // <button className="btn btn-success">Add new collector</button>
  // <button className="btn btn-danger">Delete collector</button>
// Rozkouskovat!!!{collector.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}
// <button className="btn btn-primary">Collector's detail</button>
// <button className="btn btn-warning">Edit collector</button>
// <button className="btn btn-danger">Delete collector</button>
