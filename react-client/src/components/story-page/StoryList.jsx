import React from 'react';
import Story from './Story.jsx'

const StoryList = (props) => (
  <div>
    <h4>This is storyList component</h4>
    {props.stories.map(story => <Story story={story} />)}
  </div>
)

export default StoryList
