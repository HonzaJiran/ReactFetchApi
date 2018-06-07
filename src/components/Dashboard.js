import React, { Component } from 'react';
import '../App.css';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      collectors: [],
      miners: [],
      eventik: [],
      showminers: false,
      graphicCards: [],
      showGraphicCards: false
    };
    this.listMiners = this.listMiners.bind(this);
    this.listGraphicCards = this.listGraphicCards.bind(this);
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
          this.setState({ show_error: true })
        }else {
          return res.json()
          .then(token => {
            sessionStorage.setItem('jwtToken', token.token);
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
        this.setState({ collectors:collectors })
      })

      // FETCH EVENTS
      fetch('http://monpick.thinkeasy.cz:7000/api/v1/event/6/', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + jwtToken
        }
      })
      .then(res => res.json())
      .then(events => {
        this.setState({ eventik: events })
        console.log(this.state.eventik);
      })

    }

    listMiners(){
      fetch('http://monpick.thinkeasy.cz:7000/api/v1/status/miners', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
        }
      })
      .then(res => res.json())
      .then(miners => {
        this.setState({ miners: miners })
      })

      this.setState({ showminers: true })
    }

    listGraphicCards(){
      fetch('http://monpick.thinkeasy.cz:7000/api/v1/status/graphiccards', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
        }
      })
      .then(res => res.json())
      .then(graphicCards => {
        this.setState({graphicCards:graphicCards})
      })

      this.setState({ showGraphicCards: true })
    }

  render() {

    const collectors = this.state.collectors.map(collector => {
      return (
          <div key={collector.id} className="card collector">
            <div className="card-body">
              <h5 className="card-title"><b>{collector.name}</b></h5>
              <h6 className="card-subtitle mb-2 text-muted">{collector.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</h6>
                <a onClick={this.listMiners} className="btn btn-success" data-toggle="collapse" href={'#miner-collapse' + collector.id} role="button" aria-expanded="false" aria-controls={'miner-collapse' + collector.id}>Show miners</a>
                <div className="collapse multi-collapse" id={'miner-collapse' + collector.id}>
                  <div className="card card-body">
                    {
                      this.state.miners.map(miner => {
                        if (collector.id === miner.miner.collector.id) {
                          return <a key={miner.id} className="list-group-item list-group-item-action">{miner.miner.miner_name}, <b>{miner.miner.id}</b><div>{miner.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</div></a>
                        }

                      })
                    }
                  </div>
                </div>
              <a onClick={this.listGraphicCards} className="btn btn-primary" data-toggle="collapse" href={'#graphicCard-collapse' + collector.id} role="button" aria-expanded="false" aria-controls={'graphicCard-collapse' + collector.id}>Show graphic cards</a>
              <div className="col">
                <div className="collapse multi-collapse" id={'graphicCard-collapse' + collector.id}>
                  <div className="card card-body">
                    {
                      this.state.graphicCards.map(graphicCard => {
                        if (collector.id === graphicCard.graphic_card.miner.collector.id) {
                          return <a key={graphicCard.id} className="list-group-item list-group-item-action">{graphicCard.graphic_card.name}<b>{graphicCard.graphic_card.id}</b><div>{graphicCard.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</div></a>
                        }

                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
    })

    const events = this.state.eventik.map(eventik => {
      return(
        <div key={eventik.date} className="card events-card">
          <div className="card-body">
            <h5 className="card-title">{eventik.date}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{eventik.user}</h6>
            <p className="card-text">{eventik.description}</p>
          </div>
        </div>
      )
    })

    return (
      <div className="Collectors&Events">
        <h5>Collectors</h5>
        <div className="Collectors row">
          { collectors }
        </div>
        <br/>
        <h5>Last events(5 --dodelat filtr)</h5>
        <div className="Events row">
          { events }
        </div>
      </div>
    );
  };
}


export default Dashboard;
