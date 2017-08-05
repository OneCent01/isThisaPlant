var express = require('express');
var bodyParser = require('body-parser');
var images = require('../database-mysql');
var axios = require('axios');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.get('/items', function (req, res) {
  images.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/images', function(req, res) {
  var insertObj = {
    title: req.body.name,
    description: req.body.image.description,
    link: req.body.image.link,
    category: 'plant'
  }
  images.insert(insertObj, function(err, data) {
    if(err) {
      console.log('uh, guess it failed: ', err);
      res.sendStatus(500);
    } else {
      console.log('res from query: ', data);
      res.send(data)
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

