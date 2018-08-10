require('dotenv').config();
var db = require('../db/db.js');
var express = require('express');
var app = express();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyParser = require('body-parser');

// Models
var User = require('../db/user.js');
var Messages = require('../db/messages.js');
var Stories = require('../db/stories.js');
var Favorites = require('../db/favorites.js');

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
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  User.addUser({password: hash, username: req.body.username, email: req.body.email})
  res.end();
  });
});
//select all users
app.get('/campfire/users', (req, res) => {
	User.selectAll().then((data) => {res.send(data)})
});
//insert message
app.post('/campfire/messages', (req, res) => {
	Messages.addMessage(req.body);
  res.send(req.body.message);
});

app.post('/campfire/favorites', (req, res) => {
  Favorites.addFavorites(req.body);
  res.end();
})
//select messages
app.get('/campfire/messages', (req, res) => {
  var param = req.query.story_ID;
	Messages.selectAllWithNames({story_ID:param}).then((data) => {res.send(data)})
});

//get favorites
app.get('/campfire/favorites', (req, res) => {
  var param = req.query.user_ID;
  Favorites.selectAllWithID({user_ID:param}).then((data) => {res.send(data)})
});


app.post('/campfire/stories', (req, res) => {
  Stories.addStory(req.body);
  res.end();
})

app.listen(8000, function(){
});


app.get('/', (req, res) => {
	res.end('hello');
});

//get all titles
app.get('/campfire/stories', (req, res) => {
  let param = req.query.sortBy;
  let favorites = req.query.favorites;
  if (param === 'Newest') {
    Stories.selectAllNewest().then((data) => {res.send(data)})
  }
  else if (param === 'My Favorites' && favorites) {
    let numFavorites = favorites.map(string => parseInt(string));
    Stories.selectFavorites({ids:numFavorites}).then((data) => {res.send(data)});
  } else {
    Stories.selectAll().then((data) => {res.send(data)})
  }
});



//get new story_ID
app.get('/campfire/newStory', (req, res) => {
	Stories.selectStory_ID()
  .then((data) => {
    res.send(data)})
		});

app.get('/campfire/checkUserExists', (req, res) => {
  var user = req.query.username;
  User.findUser(user)
  .then((data) => {
    status = data.length > 0 ? "taken": "open";
    res.send(status)})
})

app.get('/campfire/checkPassword', (req, response) => {
  var user = req.query.username;
  var submittedPassword = req.query.password;
  User.findUser(user)
  .then((data) => {
    var pass = data[0].password;
    var id = data[0].user_ID
    var email = data[0].email
    bcrypt.compare(submittedPassword, pass, function(err, res) {
        response.send({match: res, user_ID: id, email:email })
    });

  })
})

app.get('/campfire/getUserID', (req, res) => {
  var param = req.query.username;
  User.findUser(param)
  .then((data) => {res.send([{user_ID: data[0].user_ID}])});
})


app.post('/campfire/updateMessage', (req, res) => {
  Messages.updateMessage(req.body).then(data =>{
    res.sendStatus(200);
  })
})


app.get('/campfire/title', (req,res) =>{
  Stories.selectTitle(req.query).then(data =>{
    res.send(data)
  })
})
