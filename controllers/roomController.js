var helper = require("../config/helpers.js");
var roomModel = require('../models/roomModel.js');

module.exports = function (server) {
  server.get('/room/list', function (req, res, next) {
      roomModel.query('SELECT * from room_plans', function (error, results, fields) {
        if(error){
            return helper.failure(res, next, error, 500);
        }
        return helper.success(res, next, results);
      });
  });
}
