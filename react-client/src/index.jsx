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
      currStory: [{'ID': 1, 'message': 'This is a sample message. I hope that it is long enough to force my flexbox to perform. Maybe it will do the job.'},  {'ID': 2, 'message': 'If not, perhaps this one will. I am counting on one of the two to solve the issue, or at least to highlight how I can solve it.'}]
    }
  }
  handleSubmitClick (text) {
    console.log(text);
    var mes = {mes: text}
    $.ajax({
      url: "http://127.0.0.1:8000/campfire/messages",
      data: mes,
      type: 'post',
      success: function(data){
        console.log(data);
      },
      error: function(xhr, status, err){
        console.log(err);
      }
    })
  }
  render() {
    return (
      <div className="container">
        <div className="sidebar">
          <div>
            <button>Start New Story</button>
          </div>
          <div>
            <StoryList stories={this.state.stories} />
          </div>
        </div>
        <div className='messageBox'>
          <div>
            <h2>Messages</h2>
            <MessageList messages={this.state.currStory} />
          </div>
          <div>
            <form onSubmit={(e) => {e.preventDefault(), this.handleSubmitClick(document.getElementById('NewStoryText').value)}}>
              <input className="inputField" id='NewStoryText' type='text' maxLength="250" placeholder="Add to the story"></input>
              <button onClick={() => console.log('clicked')}>Submit!</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
