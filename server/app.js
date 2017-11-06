var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
app.use(express.static(__dirname + '/../src/dist'));
app.listen(8000, function(){
	console.log('listening on port 8000')
});