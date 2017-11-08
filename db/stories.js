var db = require('./db.js');

var Stories = {};

Stories.addStory = (data) => {
  db('stories')
  .insert({
    Title: data.Title,
  })
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

module.exports = Stories;
