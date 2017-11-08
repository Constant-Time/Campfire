import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import StoryList from './components/story-page/StoryList.jsx';
import MessageList from './components/story-page/messageList.jsx';
import InputField from './components/story-page/inputField.jsx';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story_ID:0,
      user_ID:0,
      stories: [{'Title': '1st Title', 'ID': '1st ID'}, {Title: '2nd Title', ID: '2nd ID'}],
      currStory: [{'user_ID': 1, 'story_ID':1, 'message': 'This is a sample message. I hope that it is long enough to force my flexbox to perform. Maybe it will do the job.'},  {'user_ID': '2', 'story_ID':2, 'message': 'If not, perhaps this one will. I am counting on one of the two to solve the issue, or at least to highlight how I can solve it.'}, {'username': 'calebkress', 'message': 'Now I\'m trying to set the scrollbar, so I need to write a sample message long enough to make the scroll work. I\'m not sure how long this needs to be to make that happen, so I\'m just typing random nonsense until I hit that point.'}]
    }
  }

  handleSubmitClick (text) {
    console.log(text);
    if (text.length === 0 ){
      alert('Cannot submit an empty field');
      return;
    }
    Axios.post('http://127.0.0.1:8000/campfire/messages',{message:text,story_ID:this.state.story_ID,user_ID:this.state.user_ID})
    .then(({data}) => {
      console.log('data', data);
      Axios.get('http://127.0.0.1:8000/campfire/messages')
      .then(({data}) =>{
        console.log('data inside of get', data);
        this.setState({currStory:data})
      })
    })
    .catch((err) => {
      console.log(err);
    });
    // console.log(text);
    // var mes = {mes: text}
    // $.ajax({
    //   url: "http://127.0.0.1:8000/campfire/messages",
    //   data: mes,
    //   type: 'post',
    //   success: function(data){
    //     console.log(data);
    //   },
    //   error: function(xhr, status, err){
    //     console.log(err);
    //   }
    // })
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
            <h2>The Legend of Trying to Make this App Work</h2>
            <MessageList messages={this.state.currStory} />
          </div>
          <div>
            <form onSubmit={(e) => {e.preventDefault(), this.handleSubmitClick(document.getElementById('NewStoryText').value)}}>
              <InputField />
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
