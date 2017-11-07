var db = require('../db/db.js');
var express = require('express');
var app = express();

// var bodyParser = require('body-parser');

// // Models
// var User = require('../db/user.js');

// app.use(bodyParser.json());
// app.use(express.static(__dirname + '/../src/dist'));

// app.post('/campfire', (req, res) => {
// 	User.addUser(req.body);
//   res.end();

var bodyParser = require ('body-parser');
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
/*
app.get('/', (req, res){
	res.end();
})
*/
app.get('/', function(req, res){
	res.end('hello');

});

app.listen(8000, function(){
	console.log('listening on port 8000')
});
