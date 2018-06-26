import React from 'react';
import Message from './message.jsx'

const MessageList = (props) => (
  <div className="message-list">
   {props.messages.map((message, index) => <Message state={props.state} handleEdit={props.handleEdit} displayEditWindow={props.displayEditWindow} message={message} key={index} username={props.username}/>)}
  </div>
);

export default MessageList;
