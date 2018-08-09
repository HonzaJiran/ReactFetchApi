import React from 'react';
import { Alert as BootstrapAlert } from 'reactstrap';

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <BootstrapAlert color={this.props.color} isOpen={this.state.visible} toggle={this.onDismiss}>
        { this.props.innerText }
      </BootstrapAlert>
    );
  }
}

export default Alert;