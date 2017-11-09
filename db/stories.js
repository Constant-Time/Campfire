var db = require('./db.js');

var Stories = {};

Stories.addStory = (data) => {
  db('stories')
  .insert({
    Title: data.Title,
  })
  .select('*')
  .catch(err => {
    console.error(err);
  });
};


//db and choose table
// then start query
//
Stories.selectAll = (data) => {
  return db('stories').select('*')
}

Stories.selectStory_ID = (data) => {
  console.log('data in selectStory_ID',data)
  return db('stories').where({story_ID:data.story_ID}).select('story_ID')
}

module.exports = Stories;
