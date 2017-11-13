var db = require('./db.js');

var Messages = {};

Messages.addMessage = (data) => {
  console.log('data in messages.js', data);
  db('messages')
  .insert({
    message: data.message,
    story_ID:data.story_ID,
    user_ID:data.user_ID
  })
  .catch(err => {
    console.error(err);
  });
};


//db and choose table
// then start query

Messages.selectAll = (data) => {
  return db('messages').where({story_ID:data.story_ID}).select('*')
}

Messages.selectAllWithNames = (data) => {
  return db('messages')
  .join('users','messages.user_ID','users.user_ID')
  .where({story_ID:data.story_ID})
  .select('messages.message', 'users.username')
  .catch(err => {
    console.log('err',err);
  })

}


module.exports = Messages;
