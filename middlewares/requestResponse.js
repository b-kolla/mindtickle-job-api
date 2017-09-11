// request/response middleware
module.exports = function(app) {

    var bodyParser = require('body-parser');

    var logRequest = function(req) {
        console.log('Request', {
            url: req.url,
            method: req.method,
            headers: req.headers,
            query: req.query,
            body: req.body
        });
    };

    var logResponse = function(req, res) {
        console.log('Response', {
            url: req.url,
            method: req.method,
            statusCode: res.statusCode,
            statusMessage: res.statusMessage
        });
    };

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(function(req, res, next) {
        logRequest(req);

        var afterResponse = function() {
            res.removeListener('close', afterResponse);
            res.removeListener('finish', afterResponse);

            logResponse(req, res);
        };

        res.on('close', afterResponse);
        res.on('finish', afterResponse);

        next();
    });

};