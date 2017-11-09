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
  console.log('req.body', req.body);
	User.addUser(req.body);
  res.end();
});
//select all users
app.get('/campfire/users', (req, res) => {
  console.log('req.body',req.body);
	// db('users').select('*').then(data => res.send(data));
	User.selectAll().then((data) => {res.send(data)})
});
//insert message
app.post('/campfire/messages', (req, res) => {
  console.log('req.body', req.body);
	Messages.addMessage(req.body);
  res.send(req.body.message);
  // res.end();
});
//select messages
app.get('/campfire/messages', (req, res) => {
  var param = req.query.story_ID
  console.log(param);
	Messages.selectAll({story_ID:param}).then((data) => {res.send(data)})
		});


app.post('/campfire/stories', (req, res) => {
  console.log('req.body',req.body);
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
  Stories.selectAll().then((data) => {res.send(data)})
  //res.send('hello');
})

//get new story_ID
app.get('/campfire/newStory', (req, res) => {
  var param = req.query.story_ID; //is the title
  console.log('param in get new story_ID',param);
	Stories.selectStory_ID({story_ID:param})
  .then((data) => {res.send(data)})
		});
