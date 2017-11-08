var db = require('./db.js');

var Messages = {};

Messages.addMessage = (data) => {
  console.log('data in messages.js', data);
  db('messages')
  .insert({
    message: data.message,
  })
  .catch(err => {
    console.error(err);
  });
};


//db and choose table
// then start query

Messages.selectAll = (data) => {
  return db('messages').select('*')
}

module.exports = Messages;
