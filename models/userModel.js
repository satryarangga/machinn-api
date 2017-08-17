var mongoose = require('mongoose');
var db = require('../config/db.js');

mongoose.connect(db.getMongoConnection());
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
    id     : ObjectId,
    name      : String,
    email      : String
});

var UserModel = mongoose.model("user", User);

module.exports = UserModel;
