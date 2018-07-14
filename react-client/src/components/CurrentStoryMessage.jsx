import React from 'react';

const CurrentStoryMessage = (props) => (
  <div>
    <div className='lead storyMessage'>{props.message.message}<span className="extra">-{props.message.username}</span></div>
    </div>
)

export default CurrentStoryMessage;

/*
<div className='lead storyMessage'>There once were three coders - one was awesome, one a ghost, and the other named Caleb. One fateful week in the kingdom of HackReactia, they deigned to build an application.<span className="extra">-Ghostcoder</span></div>
<div className='lead storyMessage'>In their last moments of crafting, they were presented with a challenge...the challenge of challenges. Out of the three coders one surpassed, but by a string. The other two had only one chance at redemption, to finish their application.</div>
*/
