import React from 'react';
import Story from './Story.jsx'

const StoryList = (props) => (
  <div>
    {props.stories.map(story => <Story handleTitleClick={props.handleTitleClick} story={story} />)}
  </div>
)

export default StoryList
