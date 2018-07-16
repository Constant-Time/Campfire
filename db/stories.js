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

Stories.selectAllNewest = (data) => {
  return db('stories').select('*').orderBy('story_ID', 'desc')
}

// find story IDs
Stories.selectStory_ID = (data) => {
  return db('stories').select('story_ID')
}

module.exports = Stories
