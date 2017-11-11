import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import StoryList from './components/story-page/StoryList.jsx';
import MessageList from './components/story-page/messageList.jsx';
import InputField from './components/story-page/inputField.jsx';
import Axios from 'axios';
import Modal from './components/story-page/Modal.jsx';
import Login from './components/story-page/login.jsx';
import Signup from './components/story-page/signup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false,
      isNewStoryOpen: false,
      isLoginOpen: false,
      isSignupOpen: false,
      Title:'<--- Welcome To Campfire, select a story to get started',
      story_ID:1,
      user_ID:1,
      stories: [],
      currStory: []
    }
  }

  componentDidMount() {
    this.getTitles()
  }



  getTitles() {
    Axios.get('/campfire/stories')
    .then((data) => {
      this.setState({stories:data.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }


  handleSubmitClick (text) {
    if (text.length === 0 ){
      alert('Cannot submit an empty field');
      return;
    }
    Axios.post('/campfire/messages',{message:text,story_ID:this.state.story_ID,user_ID:this.state.user_ID})
    .then((data) => {
      // console.log('data in axios post', data.config.data);
      Axios.get('/campfire/messages', {params:{story_ID:this.state.story_ID}})
      .then(({data}) =>{
        this.setState({currStory:data});
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleTitleClick(story_ID, Title) {
    this.setState({story_ID:story_ID});
    //update currStory;
    Axios.get('/campfire/messages', {params:{story_ID:story_ID}
  })
    .then(({data}) =>{
      this.setState({currStory:data})
      this.setState({Title:Title})
    })
  .catch((err) => {
    console.log(err);
  });
    console.log(story_ID);
  }

  toggleNewStoryModal () {
    this.setState({isNewStoryOpen: !this.state.isNewStoryOpen});
  }

  handleSignup(username, password) {
    Axios.get('/campfire/checkUserExists', {params:{username: username}
  })
    .then(({data}) => {
      if(data.length !== 0){
        alert('Username is already taken')
      } else {
        Axios.post('/campfire/users', {username:username, password:password})
          .then(({data}) => {
            this.setState({isLoggedIn: true, username: username, isSignupOpen: false})
          })
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleLogin(username, password) {
    Axios.get('/campfire/checkUserExists', {params:{username: username}
  })
    .then(({data}) => {
      if(data.length === 0){
        alert('Username doesn\'t exist');
      } else if(password !== data[0].password){
        alert('Incorrect password');
      } else {
        this.setState({isLoggedIn: true, username: username, isLoginOpen: false})
      }
    })
  }


  handleNewSubmission(title, text) {
    if (title.length === 0 || text.length === 0) {
      alert('You must submit a title and text');
    } else {
      console.log('ready to make new story');
      Axios.post('/campfire/stories',{Title: title})
      .then((data) => {
        Axios.get('/campfire/newStory',{params:{story_ID:this.state.story_ID}})
        .then(({data}) =>{

          var newStory_ID = data[data.length -1].story_ID;
          this.setState({story_ID:newStory_ID});
          //adding comment to database
          Axios.post('/campfire/messages', {message:text,story_ID:newStory_ID,user_ID:this.state.user_ID})
          .then((data) => {

            Axios.get('/campfire/messages', {params:{story_ID:newStory_ID}})
            .then(({data}) =>{
              this.setState({currStory:data});
            })
            .then((data) => {
              this.getTitles();
              this.setState({Title:title})
              this.setState({isNewStoryOpen:false})
            })
          })
        })
      })
    }
  }

  startNewStory() {
    this.toggleNewStoryModal()
  }

  toggleLoginModal () {
    this.setState({isLoginOpen: !this.state.isLoginOpen});
  }

  startLogin() {
    this.toggleLoginModal()
  }

  toggleSignupModal () {
    this.setState({isSignupOpen: !this.state.isSignupOpen});
  }

  startSignup() {
    this.toggleSignupModal()
  }


  render() {
    var title = this.state.Title ? <h2>{this.state.Title}</h2> : <form className='newStoryForm'>
      <h3>Add a title and the first part of the story, then hit submit</h3>
      <input placeholder='Add Title Here'></input>
    </form>
    return (
      <div>
        {!this.state.isLoggedIn ?
        <div className="loginSignup">
          <Login showLogin={this.state.isLoginOpen} handleLogin={this.handleLogin.bind(this)}
          onClose={this.toggleLoginModal.bind(this)} />
          <Signup showSignup={this.state.isSignupOpen} handleSignup={this.handleSignup.bind(this)}
            onClose={this.toggleSignupModal.bind(this)} />
            <button className="loginBtn" onClick={() => this.startLogin.call(this)}>Login</button>
            <button className="signupBtn" onClick={() => this.startSignup.call(this)}>Signup</button>
          </div>
          : <h3 className="welcomeMsg"> Welcome, {this.state.username}!</h3>}
      <div className="container">
        <div className="sidebar">
          <div>
            {this.state.isLoggedIn ? <button onClick={() => this.startNewStory.call(this)}>Start New Story</button> : null}
          </div>
          <div>
            <StoryList handleTitleClick={this.handleTitleClick.bind(this)} stories={this.state.stories} />
          </div>
        </div>

        <Modal show={this.state.isNewStoryOpen} handleNewSubmission={this.handleNewSubmission.bind(this)}
          onClose={this.toggleNewStoryModal.bind(this)} />

        <div className='messageBox'>
          <div>
            {title}
            <MessageList messages={this.state.currStory} />
          </div>
          <div>
            <form onSubmit={(e) => {e.preventDefault(), this.handleSubmitClick(document.getElementById('NewStoryText').value), document.getElementById('NewStoryText').value = ''}}>
              {this.state.isLoggedIn ? <InputField /> : null}
              {this.state.isLoggedIn ? <button onClick={() => console.log('clicked')}>Submit!</button> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
