import React, { Component } from 'react';
import '../App.css';

class Cards extends Component {
  constructor(props){
    super(props);
    this.state = {
      graphicCards: [],
      showAll: 'hide'
    };
    this.showAll = this.showAll.bind(this);
  }

  showAll(){
    if (this.state.showAll === 'hide') {
      this.setState({ showAll: 'show' })
    }else {
      this.setState({ showAll: 'hide' })
    }
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
    })

  }
  render() {
    console.log(this.state.graphicCards);
    const graphicCards = this.state.graphicCards.map(graphicCard => {
      return (
        <div className="tableCell" key={graphicCard.id}>
          <div id="accordion">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <p>{graphicCard.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</p><p>{graphicCard.graphic_card.id}</p>
                  <p>{graphicCard.graphic_card.name}</p>
                  <button className="btn btn-link" data-toggle="collapse" data-target={ "#collapse" + graphicCard.id} aria-expanded="false" aria-controls={ "collapse" + graphicCard.id}>
                    <i className="medium material-icons">arrow_downward</i>
                  </button>
                </h5>
              </div>

              <div id={ "collapse" + graphicCard.id} className={"collapse " + this.state.showAll} aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                <h5 className="text-primary">Miner performance</h5>
                    {
                      graphicCard.gpu_performance.map(performance => {
                        return(
                          <div key={performance.coin.id} className="GraphicCard_coin_info">
                            <h5 className="text-secondary">{performance.coin.shortcut}</h5>
                            <p><b>Hashrate: </b>{performance.hashrate}</p>
                            <p><b>Invalid shares: </b>{performance.invalid_shares}</p>
                            <p><b>Rejected shares: </b>{performance.rejected_shares}</p>
                            <p><b>Shares: </b>{performance.shares}</p>
                          </div>
                        );
                      })
                    }
                    <h5 className="text-primary">Relationships</h5>
                    <p><b>Miner name: </b>{ graphicCard.graphic_card.miner.miner_name }</p>
                    <p><b>Miner ip_address: </b>{ graphicCard.graphic_card.miner.ip_address }</p>
                    <p><b>Runtime: </b>{ graphicCard.graphic_card.miner.runtime }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
    return (
      <div className="cards-wraper">
        <button className="btn btn-warning" type="button" onClick={this.showAll}>Show all</button>
        <div className="row">
          <div className="container">
            { graphicCards }
          </div>
        </div>
      </div>
    );
  }
}


export default Cards;
