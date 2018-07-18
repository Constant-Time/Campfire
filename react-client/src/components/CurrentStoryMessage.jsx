import React from 'react';

const CurrentStoryMessage = (props) => (
  <div>
    <div className='lead storyMessage'>{props.message.message}<span className="extra">-{props.message.username}</span></div>
    </div>
)

export default CurrentStoryMessage;
