import React from 'react';

const Message = (props) => (
  <div>
   <h4 className="message">{props.message.message}</h4>
   <h4 className="username">-{props.message.username} </h4>
   {props.username === props.message.username ? <button onClick={()=>{props.displayEditWindow(props.message.id)}}>edit</button> : ""}
   {props.state.editing && props.state.editingId === props.message.id ? <div> <input id="editText"/> <button onClick={()=> props.handleEdit(document.getElementById('editText').value, props.message.id,props.state.story_ID)}>Edit</button> </div> : null}
  </div>
)

export default Message;

//window.Message = Message;
//comment to fix stuff
//
