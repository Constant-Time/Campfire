require('dotenv').config();
var db = require('../db/db.js');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// Models
var User = require('../db/user.js');
var Messages = require('../db/messages.js');
var Stories = require('../db/stories.js');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//
//insert user
app.post('/campfire/users', (req, res) => {
	User.addUser(req.body);
  res.end();
});
//select all users
app.get('/campfire/users', (req, res) => {
	User.selectAll().then((data) => {res.send(data)})
});
//insert message
app.post('/campfire/messages', (req, res) => {
	Messages.addMessage(req.body);
  res.send(req.body.message);
  // res.end();
});
//select messages
app.get('/campfire/messages', (req, res) => {
  var param = req.query.story_ID
	Messages.selectAllWithNames({story_ID:param}).then((data) => {res.send(data)})
		});


app.post('/campfire/stories', (req, res) => {
  Stories.addStory(req.body);
  res.end();
})

app.listen(8000, function(){
	console.log('listening on port 8000')
});


app.get('/', (req, res) => {
	res.end('hello');
});

//get all titles
app.get('/campfire/stories', (req, res) => {
  let param = req.query.sortBy;
  console.log(param);
  if (param === 'Newest') {
    Stories.selectAllNewest().then((data) => {res.send(data)})
  } else {
    Stories.selectAll().then((data) => {res.send(data)})
  }
});


/*
app.get('/campfire/storiesNewest', (req, res) => {
  Stories.selectAllNewest().then((data) => {res.send(data)});
})
*/

//get new story_ID
app.get('/campfire/newStory', (req, res) => {
  //var param = req.query.story_ID; //is the title
	Stories.selectStory_ID()
  .then((data) => {
    console.log(data, 'data');
    res.send(data)})
		});

app.get('/campfire/checkUserExists', (req, res) => {
  var user = req.query.username;
  User.findUser(user)
  .then((data) => {res.send(data)})
})

app.get('/campfire/getUserID', (req, res) => {
  var param = req.query.username;
  User.findUser(param)
  .then((data) => {res.send(data)});
  //res.end()
})


app.post('/campfire/updateMessage', (req, res) => {
  Messages.updateMessage(req.body).then(data =>{
    res.sendStatus(200);
  })
})


app.get('/campfire/title', (req,res) =>{
  console.log(req.query)
  Stories.selectTitle(req.query).then(data =>{
    res.send(data)
  })
})
