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
      username: '',
      email: '',
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
      chars_left: 250,
      sortBy: 'Newest',
      favorites: [],
      overCharLimit: false,
      noFavoritesFound: false
    }
  }
  componentDidMount() {
    Axios.get('/campfire/stories', {params:{sortBy:this.state.sortBy, favorites:'hello'}})
    .then((data) => {
      this.setState({stories:data.data})
    })
    .then(() => {
      Axios.get('/campfire/messages', {params:{story_ID:this.state.stories[0].story_ID}})
      .then(({data}) =>{
        this.setState({currStory:data, Title:this.state.stories[0].Title, story_ID:this.state.stories[0].story_ID})
      })
    })
    setInterval(() =>
    Axios.get('/campfire/messages', {params:{story_ID:this.state.story_ID}})
    .then(({data}) =>{
      this.setState({currStory:data})
    }), 5000);
  }

  getTitles() {
    Axios.get('/campfire/stories', {params:{sortBy:this.state.sortBy, favorites:this.state.favorites}})
    .then((data) => {
      this.setState({stories:data.data})
      if (this.state.favorites.length < 1 && this.state.sortBy === "My Favorites") {
        this.setState({noFavoritesFound: true});
      } else {
        this.setState({noFavoritesFound: false});
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }

  displayEditWindow(id){
    this.setState({editing:true, editingId:id});
  }

  handleNewFavorite(user_ID, story_ID){
    this.setState({favorites:[...this.state.favorites, story_ID], noFavoritesFound: false});
    Axios.post('/campfire/favorites',{user_ID:user_ID,story_ID:story_ID})
  }

  getFavorites(user_ID){
    Axios.get('/campfire/favorites', {params:{user_ID:user_ID}})
    .then(({data}) =>{
      var favArray = data.map(item => item.story_ID);
      this.setState({favorites:favArray});
    })
  }

  handleSubmitClick (text) {
    if (text.length === 0 ){
('Cannot submit an empty field');
      return;
    } else if (text.length > 250){
('Your submission is too long, please shorten it.');
      return;
    } else {
      this.clearAddToStoryForm();
    }

    if (this.state.currStory.length > 0 && this.state.currStory[this.state.currStory.length -1].username === this.state.username) {
('Can\'t post twice in a row, wait for another user or check out another story');
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
      this.clearAddToStoryForm();
    })
  .catch((err) => {
    console.error(err);
  });
  }

  selectRandomStory() {
    var copy = this.state.stories.slice();
    var copyWithoutCurrent = copy.filter(story => story.story_ID !== this.state.story_ID);
    var random = Math.floor(Math.random() * copyWithoutCurrent.length)
    var newStoryID = copyWithoutCurrent[random].story_ID;
    this.setState({story_ID:newStoryID});
    //update currStory;
    Axios.get('/campfire/messages', {params:{story_ID:newStoryID}
  })
    .then(({data}) =>{
      this.setState({currStory:data})
    })
  .catch((err) => {
    console.error(err);
    })
    Axios.get('/campfire/title', {params:{story_ID: newStoryID}})
    .then(({data})=>{
      this.setState({Title:data[0].Title});
      this.clearAddToStoryForm();
    })
  }


  toggleNewStoryModal () {
    this.setState({isNewStoryOpen: !this.state.isNewStoryOpen});
  }

  handleSignUp(username, password, email) {
    if (username.length < 6){
('Username not long enough');
    } else if (password.length < 6) {
('Password not long enough')
    } else {
      /////////////////////////////////// Return if username taken
    Axios.get('/campfire/checkUserExists', {params:{username: username}
  })
    .then(({data}) => {
      if(data === "taken"){
  ('Username is already taken')
      } else {
        Axios.post('/campfire/users', {username:username, password:password, email:email})
        .then(({data}) => {
          this.setState({isLoggedIn: true, username: username, isSignupOpen: false})
          $('#NewSignUpModal').modal('hide');
          Axios.get('campfire/getUserID', {params:{username: username}})
          .then(({data}) =>{
            this.setState({user_ID: data[0].user_ID});
          })
        })
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }
}

  handleLogin(username, password) {
    Axios.get('/campfire/checkUserExists', {params:{username: username}
  })
    .then(({data}) => {
      if(data === "open"){
  ('Username doesn\'t exist');
      } else {
        Axios.get('/campfire/checkPassword', {params:{username:username, password:password}
      })
        .then(({data}) => {
          if (data.match === false) {
      ('Incorrect password');
          } else if (data.match === true) {
            this.setState({isLoggedIn: true, username: username, email: data.email, isLoginOpen: false, user_ID: data.user_ID, noFavoritesFound:false});
            $('#NewLogInModal').modal('hide');
            this.getFavorites(data.user_ID);
          }
        })
      }
    })
  }

  handleNewSubmission(title, text) {
    if (title.length === 0 || text.length === 0) {
('You must submit a title and text');
    } else if (text.length > 250){
('Your submission is too long please shorten it.')
    }
    else {
      Axios.post('/campfire/stories',{Title: title})
      .then((data) => {
        Axios.get('/campfire/newStory')
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
    var overLimit = input.length > max_chars ? true : false;
    this.setState({
    	chars_left: max_chars - input.length,
      overCharLimit: overLimit
    });
  }

  handleSortSelect(e) {
    this.setState({sortBy: e.target.value});
  }

  clearAddToStoryForm(){
    if (document.getElementById('addToStoryForm')) {
      document.getElementById('addToStoryForm').value = '';
      this.setState({chars_left: 250, overCharLimit: false});
    }
  }

  handleEdit(text, id,story_ID){
    if (text.length === 0){
('Cannot submit empty field');
    }
    else {
    Axios.post('/campfire/updateMessage',{message:text,id:id})
    .then((data)=>{
      Axios.get('/campfire/messages', {params:{story_ID:story_ID}})
      .then(({data}) =>{
        this.setState({currStory:data,editing:false})
      })
    })}
  }

  toggleLogin(){
    this.setState({isLoggedIn:!this.state.isLoggedIn, username: ''});
  }

  startNewStory() {
    this.toggleNewStoryModal()
  }

  handleLogout () {
    this.setState({isLoggedIn: false, username: "", user_ID: 0, sortBy:"Newest", favorites:[]});
    Axios.get('/campfire/stories', {params:{sortBy:"Newest", favorites:'hello'}})
    .then((data) => {
      this.setState({stories:data.data, noFavoritesFound: false});
    })
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
        <TopBar toggleLogout={this.handleLogout.bind(this)} isLoggedIn={this.state.isLoggedIn} userName={this.state.username} email={this.state.email}/>
        <div>
          <div>
          <MainBody stories={this.state.stories} handleTitleClick={this.handleTitleClick.bind(this)} title={this.state.Title} getTitles={this.getTitles.bind(this)}
            messages={this.state.currStory} charsLeft={this.state.chars_left} handleInputFieldChange={this.handleInputFieldChange.bind(this)} sortBy={this.state.sortBy} noFavoritesFound={this.state.noFavoritesFound}
            handleSubmitClick={this.handleSubmitClick.bind(this)} userName={this.state.username} isLoggedIn={this.state.isLoggedIn} handleSortSelect={this.handleSortSelect.bind(this)} overCharLimit={this.state.overCharLimit}
            currStoryID={this.state.story_ID} selectRandomStory={this.selectRandomStory.bind(this)} handleNewFavorite={this.handleNewFavorite.bind(this)} userID={this.state.user_ID} favorites={this.state.favorites}/>

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
