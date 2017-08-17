var helper = require("../config/helpers.js");
var userModel = require('../models/userModel.js');

function list(req, res, next){
    userModel.find({}, function (err, users) {
        if(err){
            return helper.failure(res, next, err, 500);
        }
        return helper.success(res, next, users);
    });
}

function detail (req, res, next){

}

module.exports = function (server) {

    server.get('/user/list', function (req, res, next) {
        userModel.find({}, function (err, users) {
            if(err){
                return helper.failure(res, next, err, 500);
            }
            return helper.success(res, next, users);
        });
    });

    server.get('/user/detail/:id', function (req, res, next) {
        var id = req.params.id;
        if(id == ''){
            return helper.failure(res, next, {"message":"Id is not presented"}, 400);
        }
        userModel.findOne({ _id: id}, function (err, user) {
            if(err){
                return helper.failure(res, next, err, 500);
            }
            if(user === null){
                return helper.failure(res, next, {"message":"User with ID "+id+" is not existed"}, 404);
            }
            return helper.success(res, next, user);
        });
    });

    server.post('/user/create', function (req, res, next) {
        req.assert('name', 'Name is required').notEmpty();
        req.assert('email', 'Email is required').notEmpty();

        var errors = req.validationErrors();

        if(errors){
            return helper.failure(res, next, errors, 400);
        }
        var user = new userModel();
        user.name = req.params.name;
        user.email = req.params.email;

        user.save(function (error) {
           if(error){
               return helper.failure(res, next, errors, 500);
           }
            return helper.success(res, next, user);
        });
    });

    server.del('/user/delete/:id', function (req, res, next) {
        var id = req.params.id;
        if(id == ''){
            return helper.failure(res, next, {"message":"Id is not presented"}, 400);
        }
        userModel.findOne({ _id: id}, function (err, user) {
            if(err){
                return helper.failure(res, next, err, 500);
            }
            if(user === null){
                return helper.failure(res, next, {"message":"User with ID "+id+" is not existed"}, 404);
            }
            user.remove(function (err) {
                if(err){
                    return helper.failure(res, next, err, 500);
                }
                return helper.success(res, next, {"message":"User "+user.name+" successfully deleted"});
            });
        });
    });

    server.put('/user/update/:id', function (req, res, next) {
        var user = req.params;
        var id = req.params.id;

        if(id == ''){
            return helper.failure(res, next, {"message":"Id is not presented"}, 400);
        }

        userModel.findOne({ _id: id}, function (err, user) {
            if(err){
                return helper.failure(res, next, err, 500);
            }
            if(user === null){
                return helper.failure(res, next, {"message":"User with ID "+id+" is not existed"}, 404);
            }

            var update = req.params;
            delete update.id;
            for(var field in update){
                user[field] = update[field];
            }

            user.save(function (err) {
                if(err){
                    return helper.failure(res, next, errors, 500);
                }
                return helper.success(res, next, user);
            });
        });
    });
};