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
  console.log('adding new user', req.body);
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  console.log('pass, err, hash', req.body.password, err, hash);
  User.addUser({password: hash, username: req.body.username})
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
  // res.end();
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
  console.log('param in get favorites', param);
  Favorites.selectAllWithID({user_ID:param}).then((data) => {res.send(data)})
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
  console.log(param, 'param', req.query, 'req.query');
  let favorites = req.query.favorites;
  console.log(favorites, 'favorites');
  if (param === 'Newest') {
    Stories.selectAllNewest().then((data) => {res.send(data)})
  }
  else if (param === 'My Favorites' && favorites) {
    console.log('trying to get favorites', favorites);
    let numFavorites = favorites.map(string => parseInt(string));
    console.log('trying to get favorites', numFavorites);
    Stories.selectFavorites({ids:numFavorites}).then((data) => {res.send(data)});
  } else {
    Stories.selectAll().then((data) => {res.send(data)})
  }
});



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
  .then((data) => {
    console.log(data, 'data in checkuserExists serverside');
    status = data.length > 0 ? "taken": "open";
    res.send(status)})
})

app.get('/campfire/checkPassword', (req, response) => {
  console.log('got to checkPassword serverside');
  var user = req.query.username;
  var submittedPassword = req.query.password;
  User.findUser(user)
  .then((data) => {
    var pass = data[0].password;
    var id = data[0].user_ID
    console.log(user, submittedPassword, pass, id, 'all in server');
    bcrypt.compare(submittedPassword, pass, function(err, res) {
        console.log(err, res, 'err, res');
        response.send({match: res, user_ID: id})
    });

  })
})

app.get('/campfire/getUserID', (req, res) => {
  var param = req.query.username;
  console.log(param, 'param');
  User.findUser(param)
  .then((data) => {console.log(data); res.send([{user_ID: data[0].user_ID}])});
  //res.end()
  //user_ID: data[0].user_ID
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
