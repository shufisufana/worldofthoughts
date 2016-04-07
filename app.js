var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');

var util = require('util');
var languageDetector = new ( require('languagedetect'));

//app.get('/', function(req, res){
  app.use(express.static(__dirname + '/public'));
//});

//app.get('/', function (req, res) {
  //res.send(__dirname + '/public2/1.html');
//});

var T = new Twit({
  consumer_key: 'D2pD6K5LZnV54z6b0I69Of3mL',
  consumer_secret: 'fhMOI9YdYso5jjXrbjfzKe83UHch6igk9jXxy7WGLIXrTFcdmn',
  access_token:  '1617749736-gYq7Bbe6dQi2q6ViClZQQAYNTdxQOziN2RrVXn5',
  access_token_secret: 'n0RfPdNmgO7gsKpSRI0Ol1gEgmCNppPb3gUBnxtdSSh4I'
});


io.on('connection', function(socket){
  console.log('A user logged in');

  T.get('search/tweets', {q: '"#happy" OR "#excited" OR "#sad" OR "#angry" OR "#anxious" OR "#calm"', count:30, lang: 'en', result_type: 'recent' },
    function(err, data, response){

        io.emit('tweets', data);

    });
    });

http.listen(3000, function() {
  console.log('listening on *:3000');
});
