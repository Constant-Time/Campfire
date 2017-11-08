import React from 'react';


const Story = (props) => (
  <div>
    <h4 onClick={() =>{props.handleTitleClick(props.story.story_ID)}}>{props.story.Title}</h4>
  </div>
);

export default Story
