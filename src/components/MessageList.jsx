import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
  
  render() {
    return (
      <div>
        { this.props.seeds.map(seed => <Message messageFunctions={ this.props.messageFunctions } key={ seed.id } seed={ seed } />) }
      </div>
    )
  }
}

export default MessageList;