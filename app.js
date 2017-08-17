var restify = require('restify');
var restifyValidator = require('restify-validator');
var server = restify.createServer();
var setup = require("./controllers/setupController.js");
var user = require("./controllers/userController.js");
var room = require("./controllers/roomController.js");

setup(server, restify, restifyValidator);
user(server);
room(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
