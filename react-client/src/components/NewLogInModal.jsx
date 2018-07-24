import React from 'react';

class NewLogInModal extends React.Component {

  checkKeyPress (keycode) {
    if (keycode === 13) {
      this.props.handleLogin(document.getElementById('login-username').value, document.getElementById('login-password').value)
    }
  }
  render() {
    return (
      <div className="modal" id="NewLogInModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger">
                <h5 className="modal-title text-white">Log in</h5>
                <button className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="login-username"type="text" placeholder="Username" className="form-control"/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input id="login-password"type="password" placeholder="Password" className="form-control" onKeyUp={(e) => this.checkKeyPress(e.keyCode)}/>
                  </div>
              </div>
              <div className="modal-footer">
                <button onClick={(e) => {e.preventDefault(), this.props.handleLogin(document.getElementById('login-username').value, document.getElementById('login-password').value)}} className="btn btn-secondary">Log in</button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}




export default NewLogInModal;

/*
(
   <div className="modal" id="loginModal">
       <div className="modal-dialog">
         <div className="modal-content">
           <div className="modal-header">
             <h5 className="modal-title">Login</h5>
             <button className="close" data-dismiss="modal">&times;</button>
           </div>
           <div className="modal-body">
           </div>
           <div className="modal-footer">
             <button className="btn btn-primary" data-dismiss="modal">Login</button>
           </div>
         </div>
       </div>
     </div>
)*/
