var helper = require('../config/helpers.js');
module.exports = function (req, res, next) {
    var apiKeys = {
        'user1' : 'asdasdasdgghijk'
    };

    if(req.authorization.basic == undefined || !apiKeys[req.authorization.basic.username]
        || req.authorization.basic.password !==  apiKeys[req.authorization.basic.username])
    {
        return helper.failure(res, next, 'Please use authentication', 403);
    }
    return next();
};