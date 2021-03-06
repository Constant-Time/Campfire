import React from 'react';
import Story from './Story.jsx'

const StoryList = (props) => (
  <div>
    {props.stories.map((story,index) => <Story handleTitleClick={props.handleTitleClick} story={story} key={index}/>)}
  </div>
)

export default StoryList
