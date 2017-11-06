import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import StoryList from './components/story-page/StoryList.jsx';
import MessageList from './components/story-page/messageList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [{'Title': '1st Title', 'ID': '1st ID'}, {Title: '2nd Title', ID: '2nd ID'}],
      currStory: [{'ID': 1, 'message': 'Hello'},  {'ID': 2, 'message': 'Good-Bye'}]
    }
  }

  render() {
    return (
      <div>
        <div className="Sidebar">
          <div>
            <button>Start New Story</button>
          </div>
          <div>
            <StoryList stories={this.state.stories} />
          </div>
        </div>
        <div className='MessageBox'>
          <div>
            <h2>Messages</h2>
            <MessageList messages={this.state.currStory} />
          </div>
          <div>
            <input type='text' maxLength="250" placeholder="Add to the story"></input>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
