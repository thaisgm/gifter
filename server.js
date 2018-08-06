const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json())

app.get('/ping', function (req, res) {
 return res.send('pong');
});

var twilio = require('twilio');

var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

var client = new twilio(accountSid, authToken);

app.post('/sendMessage', function(req, res){

  client.messages.create({
      body: req.body.message + ' From ' + req.body.name,
      to: '+1' + req.body.phone,  // Text this number
      from: '+15612207639' // From a valid Twilio number
  })
  .then((message) => res.send(message))
  .done();
})

// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
