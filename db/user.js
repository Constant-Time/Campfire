var db = require('./db.js');

var User = {};

User.addUser = (data) => {
  db('users')
  .insert({
    username: data.username,
    password: data.password
  })
  .catch(err => {
    console.error(err);
  });
};


//db and choose table
// then start query
//
User.selectAllUsers = (data) => {
    db('users').select('*')
  .then(data => {
    return data;
  })
}

module.exports = User;
