import React from 'react';
import Message from './message.jsx'

const MessageList = (props) => (
  <div className="message-list">
   {props.messages.map(message => <Message message={message} />)}
  </div>
);

export default MessageList;
/*
MessageList.propTypes = {
  messages: React.PropTypes.object.isRequired
}

import message from (./message);

window.MessageList = MessageList;
*/
//comment to fix stuff
//
