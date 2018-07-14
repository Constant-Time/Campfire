import React from 'react';

const NewStoriesStory = (props) => (
  <li className="list-group-item newStoriesItem" onClick={() => {props.handleTitleClick(props.story.story_ID, props.story.Title)}}>{props.story.Title}</li>
)

export default NewStoriesStory;
