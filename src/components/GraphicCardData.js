import React, { Component } from 'react';
import '../App.css';

class GraphicCards extends Component {
  constructor(props){
    super(props);
    this.state = {
      graphicCards: []
    };
  }

  componentDidMount(){
    const jwtToken = sessionStorage.getItem('jwtToken');

    fetch('http://monpick.thinkeasy.cz:7000/api/v1/status/graphiccards', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwtToken
      }
    })
    .then(res => res.json())
    .then(graphicCards => {
      this.setState({graphicCards:graphicCards})
      console.log(this.state.graphicCards)
    })
  }
  render() {
    const graphicCards = this.state.graphicCards.map(graphicCard => {
      //console.log(graphicCard.graphicCard_performance[0].coin.shortcut);
      return (
        <div key={graphicCard.id} className="col s12 m12 l6">
          <div className="card">
            <div className="card-title">
            <br />
            <h5>{graphicCard.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</h5><h5>{graphicCard.temperature}°C</h5>
            </div>
            <div className="card-content">
              <p>{graphicCard.fan_speed} RPM</p>
              <br/>
              {
                graphicCard.gpu_performance.map(performance => {
                  return(
                    <div key={performance.coin.id} className="GraphicCard_coin_info">
                      <h5>{performance.coin.shortcut}</h5>
                      <p><b>Hashrate: </b>{performance.hashrate}</p>
                      <p><b>Invalid shares: </b>{performance.total_invalid_shares}</p>
                      <p><b>Rejected shares: </b>{performance.total_rejected_shares}</p>
                      <p><b>Shares: </b>{performance.shares}</p>
                    </div>
                  );
                })
              }
            </div>
            <div className="card-action">

            </div>
          </div>
        </div>
      );
    })
    return (
      <div className="row">
        { graphicCards }
      </div>
    );
  }
}


export default GraphicCards;
