import React from 'react';
import CurrentStoryMessage from './CurrentStoryMessage.jsx';

class CurrentStory extends React.Component {
  render () {
    var loggedInActions = (this.props.messages.length !== 0 && this.props.userName === this.props.messages[this.props.messages.length -1].username) ?
    <div className="alert alert-warning" role="alert">
      Cannot post consecutively on the same story. Try adding to another story!
    </div> :
    <div>
      <form className="addToStory">
        <div className="form-group pt-2">
          <label htmlFor="addToStoryForm">Add To Story:</label>
          <textarea className="form-control" id="addToStoryForm" rows="3" onChange={this.props.handleChange}></textarea>
        </div>
      </form>
      <p>Characters Left: {this.props.charsLeft}</p>
      <div className="container">
        <div className="addToStoryButton">
          <button className="btn mt-0" onClick={() => this.props.handleSubmitClick(document.getElementById('addToStoryForm').value)}>Submit</button>
        </div>
      </div>
    </div>

    var loggedOutActions =
      <div className="loggedOutActions">
        <div className="alert alert-danger" role="alert">
          Must be logged in to post to a story. Login or sign up with the buttons below!
        </div>
        <div>
          <button className="btn btn-danger mr-2" data-toggle="modal" data-target="#NewSignUpModal">Sign Up</button>
          <button className="btn btn-danger" data-toggle="modal" data-target="#NewLogInModal">Login</button>
        </div>
      </div>


    return (
      <div className="py-4 px-4">
      <div className="card bg-light currentStoryCard">

        <div className="card-header text-center py-2 currentStoryHeader bg-danger text-white" >
          <h3>{this.props.title}</h3>
        </div>
        <div className="card-body currentStoryBody">
          <div id='testMessage'>
            {this.props.messages.map((message, index) => <CurrentStoryMessage message={message} key={index} />)}
          </div>
          <br></br>
          {this.props.isLoggedIn && loggedInActions}
          {!this.props.isLoggedIn && loggedOutActions}
        </div>
      </div>
    </div>
    )
  }
}
export default CurrentStory;
/*

<p>Characters Left: {this.props.chars_left}</p>
<div className='lead storyMessage'>There once were three coders - one was awesome, one a ghost, and the other named Caleb. One fateful week in the kingdom of HackReactia, they deigned to build an application.<span className="extra">-Ghostcoder</span></div>
<div className='lead storyMessage'>In their last moments of crafting, they were presented with a challenge...the challenge of challenges. Out of the three coders one surpassed, but by a string. The other two had only one chance at redemption, to finish their application.</div>
</div>
*/
/*
<ul className="list-group list-group-flush">
  <li className="list-group-item pb-2">There once were three coders - one was awesome, one a ghost, and the other named Caleb. One fateful week in the kingdom of HackReactia, they deigned to build an application.</li>
  <li className="list-group-item">In their last moments of crafting, they were presented with a challenge...the challenge of challenges. Out of the three coders one surpassed, but by a string. The other two had only one chance at redemption, to finish their application.
</li>
  <li className="list-group-item">These three coders faced this daunting task with all of their might. Many things tried to interfere with their progress, but our young heroes were steadfast in pursuit of their common goal.</li>
  <li className="list-group-item">one app to bring them all into darkness and BIND THEM!!!</li>
  <li className="list-group-item">fdsafjdkslafjdksjfkldsajfkdlsajfkldsajfkldsajfklsdafkdsajf;dslajfkld;sajfklsd;ajfkdsa;jfkldsa;jfkdsal;fjkdsla;fjkdlsa;jfklds;ajfkldsa;jflkdsa;jfkl;dsajfkldsjafkl;dsajfkldsajflkdsajdsjkfjdsal;fadsijfsadfdsafdsafdsafdsafdsajfdsakf;adslfjdsal;fjdslkafjfsadkl
</li>
  <li className="list-group-item">Cras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in Vestibulum at eros</li>
  <li className="list-group-item">Cras justo odio VestCras justo odio Vestibulum at eros Dapibus ac facilisis in ibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilCras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in isis in Dapibus ac facilisis in</li>
  <li className="list-group-item">VestibulumCras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in  at eros</li>
  <li className="list-group-item">Vestibulum Cras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in at eros</li>
  <li className="list-group-item">Cras jusCras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in to odio</li>
  <li className="list-group-item">Dapibus ac facilisisCras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in  in Dapibus ac facilisis in</li>
  <li className="list-group-item">VestiCras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in bulum at eros</li>
  <li className="list-group-item">VestibulumCras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in  at eros</li>
</ul>


<ul className="list-group list-group-flush pb-2 storyText">
  <li className="list-group-item pb-2 storyText">There once were three coders - one was awesome, one a ghost, and the other named Caleb. One fateful week in the kingdom of HackReactia, they deigned to build an application.</li>
</ul>
<ul className="list-group list-group-flush pb-2">
  <li className="list-group-item pb-2">In their last moments of crafting, they were presented with a challenge...the challenge of challenges. Out of the three coders one surpassed, but by a string. The other two had only one chance at redemption, to finish their application.</li>
</ul>
<ul className="list-group list-group-flush pb-2">
  <li className="list-group-item pb-2">These three coders faced this daunting task with all of their might. Many things tried to interfere with their progress, but our young heroes were steadfast in pursuit of their common goal.</li>
</ul>
<ul className="list-group list-group-flush pb-2">
  <li className="list-group-item pb-2">Tone app to bring them all into darkness and BIND THEM!!!</li>
</ul>
<ul className="list-group list-group-flush pb-2">
  <li className="list-group-item pb-2">Dapibus ac facilCras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in isis in Dapibus ac facilisis in</li>
</ul>
<h6 id="TestingFont">In their last moments of crafting, they were presented with a challenge...the challenge of challenges. Out of the three coders one surpassed, but by a string. The other two had only one chance at redemption, to finish their application.</h6>


<br></br>
<div className='lead'>These three coders faced this daunting task with all of their might. Many things tried to interfere with their progress, but our young heroes were steadfast in pursuit of their common goal.</div>
<hr></hr>
<div className='lead'>Tone app to bring them all into darkness and BIND THEM!!!</div>
<hr></hr>
<div className='lead'>Dapibus ac facilCras justo odio Vestibulum at eros Dapibus ac facilisis in Cras justo odio Vestibulum at eros Dapibus ac facilisis in isis in Dapibus ac facilisis in.</div>
<hr></hr>
<div className='lead'>There once were three coders - one was awesome, one a ghost, and the other named Caleb. One fateful week in the kingdom of HackReactia, they deigned to build an application.</div>
<hr></hr>
*/
