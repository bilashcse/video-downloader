var async = require('async')

, mongoose = require('mongoose')

module.exports = function (app,passport,auth,io) {

  var index = require('../app/controllers/index');

  var users = require('../app/controllers/users');

  app.get('/', index.render);
  app.post('/video/grabeYoutube',users.grabeYoutube);
  app.get('/download',users.download);



}