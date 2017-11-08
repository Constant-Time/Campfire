import React from 'react';

const Message = (props) => (
  <div>
   <h4 className="message">{props.message.message}</h4>
   <h4 className="username"> --  {props.message.username} </h4>
  </div>
)

export default Message;

//window.Message = Message;
//comment to fix stuff
//
