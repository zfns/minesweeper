'use strict';

var path = require('path');
var http = require('http');
var express = require('express');
var serverStatic = require('serve-static');

var app = express();

app.set('view engine', 'ejs');
app.use(serverStatic(path.join(__dirname, '.tmp')));
app.use(serverStatic(path.join(__dirname, 'frontend')));

app.get('/', function(req, res) {
  res.render(path.join(__dirname, 'frontend/views/index'));
});

http.globalAgent.maxSockets = 30;

http.createServer(app)
  .listen(3000, function() {
    console.log('OK: Express http server start');
  });
