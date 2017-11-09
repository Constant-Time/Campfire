import React from 'react';

var Login = React.createClass({

  render: function() {
    return (
      <div className="login">
        <form>
          <input type="text" placeholder="username">Username: </input>
          <input type="text" placeholder="password">Password: </input>
          <input type="button">Login</input>
        </form>
      </div>
    )
  }
})
