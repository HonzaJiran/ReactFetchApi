import React, { Component } from 'react';

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      showAll: false
    };
    this.showAll = this.showAll.bind(this);
  }

  showAll(){
    this.setState({showAll: !this.state.showAll});
  }

  render(){
    const { items, elementType: ElementType } = this.props;
    return(
      <React.Fragment>
        <button className="btn btn-warning" type="button" onClick={this.showAll} >Show all</button>
        {items.map((item, index) => (
          <ElementType
            key={index}
            item={item}
            show={this.state.showAll}
          />
        ))}
      </React.Fragment>
    )
  }
}

export default List