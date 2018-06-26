var db = require('./db.js');

var User = {};

// add a user
User.addUser = (data) => {
  db('users')
    .insert({
      username: data.username,
      password: data.password
    })
    .catch(err => {
      console.error(err)
    })
}

// select all users
User.selectAll = (data) => {
  db('users').select('*')
}

// select a user by username
User.findUser = (data) => {
  return db('users').where({username: data}).select('*')
}

// find a username based on user id
User.findUsername = (data) => {
  return db('users').where({user_ID: data.user_ID}).select('username')
}

module.exports = User;
