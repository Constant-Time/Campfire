var db = require('./db.js');

var Favorites = {};

Favorites.addFavorites = (data) => {
  db('favorites')
    .insert({
      user_ID: data.user_ID,
      story_ID: data.story_ID
    })
    .catch(error => {
      console.error(error)
    })
}

/*
Messages.selectAllWithNames = (data) => {
  return db('messages')
    .join('users', 'messages.user_ID', 'users.user_ID')
    .where({story_ID: data.story_ID})
    .select('messages.message', 'users.username', 'messages.id')
    .catch(error => {
      console.error(error)
    })
}
*/

// return all storyIDs matching userID
Favorites.selectAllWithID = (data) => {
  return db('favorites')
    .where({user_ID: data.user_ID})
    .select('favorites.story_ID')
    .catch(error => {
      console.error(error)
    })
}


module.exports = Favorites
