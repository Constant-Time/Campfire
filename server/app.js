var db = require('../db/db.js');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// Models
var User = require('../db/user.js');
var Messages = require('../db/messages.js');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//insert user
app.post('/campfire/users', (req, res) => {
	User.addUser(req.body);
  res.end();
});
//select all users
app.get('/campfire/users', (req, res) => {
	// db('users').select('*').then(data => res.send(data));
	User.selectAll().then((data) => {res.send(data)})
});
//insert message
app.post('/campfire/messages', (req, res) => {
	Messages.addMessage(req.body);
  res.end();
});

app.get('/campfire/messages', (req, res) => {
		Messages.selectAll().then((data) => {res.send(data)})
		});

app.listen(8000, function(){
	console.log('listening on port 8000')
});


app.get('/', (req, res) => {
	res.end('hello');
});
