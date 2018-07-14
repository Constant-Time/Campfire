import React from 'react';
import ReactDOM from 'react-dom';
declare var $ : any;
import StoryList from './components/StoryList.jsx';
import MessageList from './components/messageList.jsx';
import InputField from './components/inputField.jsx';
import Axios from 'axios';
import Modal from './components/Modal.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import TopBar from './components/TopBar.jsx';
import MainBody from './components/MainBody.jsx';
import NewLogInModal from './components/NewLogInModal.jsx';
import NewSignUpModal from './components/NewSignUpModal.jsx';
import NewStoryModal from './components/NewStoryModal.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      username: '',
      isLoggedIn: false,
      isNewStoryOpen: false,
      isLoginOpen: false,
      isSignupOpen: false,
      Title:'',
      story_ID:1,
      user_ID:0,
      stories: [],
      currStory: [],
      editing: false,
      editingId: 0,
      chars_left: 250
    }
  }

  handleEdit(text, id,story_ID){
    if (text.length === 0){
      alert('Cannot submit empty field');
    }
    else {
    Axios.post('/campfire/updateMessage',{message:text,id:id})
    .then((data)=>{
      console.log('sending');
      Axios.get('/campfire/messages', {params:{story_ID:story_ID}})
      .then(({data}) =>{
        this.setState({currStory:data,editing:false})
      })
    })}
  }

  componentDidMount() {
    //this.getTitles();
    Axios.get('/campfire/stories')
    .then((data) => {
      this.setState({stories:data.data})
    }).then(() => {
      Axios.get('/campfire/messages', {params:{story_ID:this.state.stories[0].story_ID}})
      .then(({data}) =>{
        this.setState({currStory:data, Title:this.state.stories[0].Title})
      })
    })
    setInterval(() =>
    Axios.get('/campfire/messages', {params:{story_ID:this.state.story_ID}})
    .then(({data}) =>{
      this.setState({currStory:data})
    }), 5000);
    //this.setState({counter: (this.state.counter + 1)}), 20000);
  }

  getTitles() {
    Axios.get('/campfire/stories')
    .then((data) => {
      this.setState({stories:data.data})
    })
    .catch((err) => {
      console.error(err)
    })
  }

  displayEditWindow(id){
    this.setState({editing:true, editingId:id});
  }

  handleSubmitClick (text) {
    if (text.length === 0 ){
      alert('Cannot submit an empty field');
      return;
    } else if (text.length > 250){
      alert('Your submission is too long, please shorten it.');
      return;
    } else {
      console.log('Handling Submit');
      document.getElementById('addToStoryForm').value = '';
    }

    if (this.state.currStory[this.state.currStory.length -1].username === this.state.username) {
      alert('Can\'t post twice in a row, wait for another user or check out another story');
      return;
    }

    Axios.post('/campfire/messages',{message:text,story_ID:this.state.story_ID,user_ID:this.state.user_ID})
    .then((data) => {
      Axios.get('/campfire/messages', {params:{story_ID:this.state.story_ID}})
      .then(({data}) =>{
        this.setState({currStory:data});
      })
    })
    .catch((err) => {
      console.error(err);
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
    console.error(err);
  });
  }

  toggleNewStoryModal () {
    this.setState({isNewStoryOpen: !this.state.isNewStoryOpen});
  }

  handleSignUp(username, password) {
    console.log('signing up', username, password)
    Axios.get('/campfire/checkUserExists', {params:{username: username}
  })
    .then(({data}) => {
      if(data.length !== 0){
        alert('Username is already taken')
      } else {
        Axios.post('/campfire/users', {username:username, password:password})
          .then(({data}) => {
            this.setState({isLoggedIn: true, username: username, isSignupOpen: false})
            console.log("closing modal");
            $('#NewSignUpModal').modal('hide');
          })
          .then(Axios.get('campfire/getUserID', {params:{username: username}
        })
        .then(({data}) =>{
          this.setState({user_ID: data[0].user_ID});
        })
      )
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }

  handleLogin(username, password) {
    console.log('handling login');
    Axios.get('/campfire/checkUserExists', {params:{username: username}
  })
    .then(({data}) => {
      if(data.length === 0){
        alert('Username doesn\'t exist');
      } else if(password !== data[0].password){
        alert('Incorrect password');
      } else {
        this.setState({isLoggedIn: true, username: username, isLoginOpen: false});
        Axios.get('campfire/getUserID', {params:{username: username}
      })
      .then(({data}) =>{
        this.setState({user_ID: data[0].user_ID});
        $('#NewLogInModal').modal('hide');
      })
      }
    })
  }


  handleNewSubmission(title, text) {
    if (title.length === 0 || text.length === 0) {
      alert('You must submit a title and text');
    } else if (text.length > 250){
      alert('Your submission is too long please shorten it.')
    }
    else {
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
              this.setState({Title:title});
              $('#NewStoryModal').modal('hide');
            })
          })
        })
      })
    }
  }

  handleInputFieldChange(event) {
    var max_chars = 250;
  	var input = event.target.value;
    this.setState({
    	chars_left: max_chars - input.length
    });
  }

  toggleLogin(){
    this.setState({isLoggedIn:!this.state.isLoggedIn, username: ''});
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
        <TopBar toggleLogout={this.toggleLogin.bind(this)} isLoggedIn={this.state.isLoggedIn} userName={this.state.username}
        logOut={this.toggleLogin.bind(this)}/>
        <div>
          <div>
          <MainBody stories={this.state.stories} handleTitleClick={this.handleTitleClick.bind(this)} title={this.state.Title} messages={this.state.currStory} charsLeft={this.state.chars_left} handleInputFieldChange={this.handleInputFieldChange.bind(this)} handleSubmitClick={this.handleSubmitClick.bind(this)} userName={this.state.username} isLoggedIn={this.state.isLoggedIn}/>
        </div>
        </div>
      <NewLogInModal handleLogin={this.handleLogin.bind(this)}/>
      <NewSignUpModal handleSignUp={this.handleSignUp.bind(this)} />
      <NewStoryModal handleNewSubmission={this.handleNewSubmission.bind(this)}/>
    </div>

    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
