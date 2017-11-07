var db = require('../db/db.js');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// Models
var User = require('../db/user.js');
var Messages = require('../db/messages.js');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../src/dist'));

app.post('/campfire/users', (req, res) => {
	User.addUser(req.body);
  res.end();
});

app.get('/campfire/users', (req, res) => {
	// db('users').select('*').then(data => res.send(data));
	User.selectAll().then((data) => {res.send(data)})
});

app.post('/campfire/messages', (req, res) => {
	Messages.addMessage(req.body);
  res.end();
});

// var config      = require('./knexfile.js');
// var knex        = require('knex')(config);

app.get('/campfire/messages', (req, res) => {
		Messages.selectAll().then((data) => {res.send(data)})
		});

app.listen(8000, function(){
	console.log('listening on port 8000')
});


//was merge conflict
// var bodyParser = require ('body-parser');
// app.use(express.static(__dirname + '/../react-client/dist'));
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
/*
app.get('/', (req, res){
	res.end();
})
*/
