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
      Title:'A Title',
      story_ID:1,
      user_ID:1,
      stories: [{Title: '1st Title', story_ID: 1}, {Title: '2nd Title', story_ID: 2}],
      currStory: [{'user_ID': 1, 'story_ID':1, 'message': 'This is a sample message. I hope that it is long enough to force my flexbox to perform. Maybe it will do the job.'},  {'user_ID': '2', 'story_ID':2, 'message': 'If not, perhaps this one will. I am counting on one of the two to solve the issue, or at least to highlight how I can solve it.'}, {'username': 'calebkress', 'message': 'Now I\'m trying to set the scrollbar, so I need to write a sample message long enough to make the scroll work. I\'m not sure how long this needs to be to make that happen, so I\'m just typing random nonsense until I hit that point.'}]
    }
  }

  componentDidMount() {
    this.getTitles()
  }



  getTitles() {
    Axios.get('http://127.0.0.1:8000/campfire/stories')
    .then((data) => {
      console.log('data inside of getTitles', data);
      this.setState({stories:data.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }


  handleSubmitClick (text) {
    console.log(text);
    if (text.length === 0 ){
      alert('Cannot submit an empty field');
      return;
    }
    Axios.post('http://127.0.0.1:8000/campfire/messages',{message:text,story_ID:this.state.story_ID,user_ID:this.state.user_ID})
    .then((data) => {
      // console.log('data in axios post', data.config.data);
      Axios.get('http://127.0.0.1:8000/campfire/messages', {params:{story_ID:this.state.story_ID}})
      .then(({data}) =>{
        console.log('data inside of get', data);
        this.setState({currStory:data})
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleTitleClick(story_ID, Title) {
    this.setState({story_ID:story_ID});
    //update currStory;
    Axios.get('http://127.0.0.1:8000/campfire/messages', {params:{story_ID:story_ID}
  })
    .then(({data}) =>{
      console.log('data inside of handleTitleClick', data);
      this.setState({currStory:data})
      this.setState({Title:Title})
    })
  .catch((err) => {
    console.log(err);
  });
    console.log(story_ID);
  }


  render() {
    return (
      <div className="container">
        <div className="sidebar">
          <div>
            <button>Start New Story</button>
          </div>
          <div>
            <StoryList handleTitleClick={this.handleTitleClick.bind(this)} stories={this.state.stories} />
          </div>
        </div>
        <div className='messageBox'>
          <div>
            <h2>{this.state.Title}</h2>
            <MessageList messages={this.state.currStory} />
          </div>
          <div>
            <form onSubmit={(e) => {e.preventDefault(), this.handleSubmitClick(document.getElementById('NewStoryText').value), document.getElementById('NewStoryText').value = ''}}>
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
