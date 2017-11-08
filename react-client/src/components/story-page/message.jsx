import React from 'react';

const Message = (props) => (
  <div className="message">
   <h4>{props.message.message}</h4>
   <h4> {props.message.username} </h4>
  </div>
)

export default Message;

//window.Message = Message;
//comment to fix stuff
//
