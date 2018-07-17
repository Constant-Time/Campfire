var db = require('./db.js');

var Stories = {};

// add a new story
Stories.addStory = (data) => {
  db('stories')
    .insert({
      Title: data.Title,
    })
    .catch(err => {
      console.error(err)
    })
}

// find all story data
Stories.selectAll = (data) => {
  return db('stories').select('*')
}
//Find all story data, sorted newest
Stories.selectAllNewest = (data) => {
  return db('stories').select('*').orderBy('story_ID', 'desc')
}
//Find all Favorited stories
Stories.selectFavorites = (data) => {
  return db('stories')
    .whereIn('story_ID', data.ids)
    .orderBy('story_ID', 'desc')
    .catch(error => {
      console.error(error)
    })
}

// find story IDs
Stories.selectStory_ID = (data) => {
  return db('stories').select('story_ID')
}

module.exports = Stories
