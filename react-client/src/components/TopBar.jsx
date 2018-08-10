import React from 'react';
import md5 from 'md5';

class TopBar extends React.Component {

  render() {

  var buttons = this.props.isLoggedIn ?
  <div>
  <a id="welcomeMessage" className="btn btn-outline-light py-2 mx-1 disabled">Welcome {this.props.userName}!</a>
  <button onClick={() => this.props.toggleLogout()} className="btn btn-outline-light py-0 mx-2 mainHeaderButton" type="button">Log Out</button>
  <img className="profilePic" src={`https://www.gravatar.com/avatar/${md5('joshawesome12@yahoo.com')}`} alt='profilePic'/>
  </div> :
  <div>
  <button data-toggle="modal" data-target="#NewLogInModal" className="btn btn-outline-light py-0 mr-2 mainHeaderButton" type="button">Login</button>
  <button data-toggle="modal" data-target="#NewSignUpModal" className="btn btn-outline-light py-0 mx-2 mx-1 mainHeaderButton" type="button">Sign Up</button>
  </div>


  return (
    <header className="py-2 bg-danger text-white" id="main-header">
      <div className="container">
        <div className="row align-items-center headerContainer">
          <div className="col-sm-6 left_col">
            <div className="row align-items-center justify-content-center" id="CampfireHeader">
            <a id="campfireBrand">
              <h1 className="d-inline align-middle">Campfire</h1>
              <img id="campfireLogo" src="http://moziru.com/images/campfire-clipart-animated-gif-20.gif" width="50" height="50"></img>
            </a>
          </div>
        </div>
          <div className="col-sm-6 right_col">
            <div className="row align-items-center justify-content-center">
              {buttons}
          </div>
          </div>
        </div>
      </div>
    </header>
    )
  }
}

export default TopBar;
