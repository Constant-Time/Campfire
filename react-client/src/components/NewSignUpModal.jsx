import React from 'react';

const NewSignUpModal = (props) => (
  <div className="modal" id="NewSignUpModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h5 className="modal-title text-white" >Sign Up</h5>
            <button className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="sign-up-username"type="text" placeholder="Username" className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="sign-up-password"type="password" placeholder="Password" className="form-control"/>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => props.handleSignUp(document.getElementById('sign-up-username').value, document.getElementById('sign-up-password').value)}>Submit</button>
          </div>
        </div>
      </div>
    </div>
)

export default NewSignUpModal;
