import React from 'react';

var Signup = React.createClass({

  render: function() {
    return (
      <div className="signup">
        <form>
          <input type="text" placeholder="username">Username: </input>
          <input type="text" placeholder="password">Password: </input>
          <input type="button">Sign Up</input>
        </form>
      </div>
    )
  }
})
