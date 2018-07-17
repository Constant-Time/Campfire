import React from 'react';

class NewStoriesStory extends React.Component {
  render() {
    return (
      <div>
      {(this.props.story.story_ID === this.props.currStoryID) &&
        <li className="list-group-item newStoriesItem newStoriesItemSelected" onClick={() => {this.props.handleTitleClick(this.props.story.story_ID, this.props.story.Title)}}>{this.props.story.Title}</li>
      }
      {!(this.props.story.story_ID === this.props.currStoryID) &&
        <li className="list-group-item newStoriesItem" onClick={() => {this.props.handleTitleClick(this.props.story.story_ID, this.props.story.Title)}}>{this.props.story.Title}</li>
      }
    </div>
    )
  }
}
export default NewStoriesStory;
