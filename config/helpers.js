function _respond(res, next, status, data, http_code) {
    var response = {
        "status" : status,
        "data"   : data
    };

    res.setHeader('content-type', 'application/json');
    res.writeHead(http_code);
    return res.end(JSON.stringify(response));
}

module.exports.success = function (res, next, data){
    _respond(res, next, 'success', data, 200);
}

module.exports.failure = function (res, next, data, http_code){
    _respond(res, next, 'failure', data, http_code);
}