Messagevar db = require('./db.js');

var Messages = {};

// add a new message to the DB
Messages.addMessage = (data) => {
  db('messages')
    .insert({
      message: data.message,
      story_ID: data.story_ID,
      user_ID: data.user_ID
    })
    .catch(error => {
      console.error(error)
    })
}

// update an existing message
Messages.updateMessage = (data) => {
  return db('messages').update('message', 'data.message')
  .where({'id': data.id})
}

// return all messages from a story
Messages.selectAll = (data) => {
  return db('messages')
    .join('users', 'messages.user_ID', 'users.user_ID')
    .where({story_ID: data.story_ID})
    .select('messages.message', 'users.username', 'messages.id')
    .catch(error => {
      console.error(error)
    })
}

module.exports = Messages
