import React from 'react';
import NewStories from './NewStories.jsx';
import CurrentStory from './CurrentStory.jsx';

const MainBody = (props) => (

  <div className="row" id="MainBody">
    <div className="col-md-8">
      <CurrentStory title={props.title} messages={props.messages} charsLeft={props.charsLeft} handleChange={props.handleInputFieldChange} handleSubmitClick={props.handleSubmitClick} userName={props.userName} isLoggedIn={props.isLoggedIn}/>
    </div>
    <div className="col-md-4">
      <NewStories stories={props.stories} handleTitleClick={props.handleTitleClick} isLoggedIn={props.isLoggedIn} sortBy={props.sortBy} handleSortSelect={props.handleSortSelect}/>
    </div>
  </div>
)

export default MainBody;
