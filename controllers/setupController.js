var auth = require('../config/auth.js');
module.exports = function (server, restify, validator){

    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.bodyParser());
    server.use(restify.queryParser());
    server.use(validator);
    server.use(restify.authorizationParser());

    server.use(function (req, res, next) {
        return auth(req, res, next);
    });

    server.use(restify.throttle({
        rate : 1,
        burst: 2,
        xff:true
    }));
};