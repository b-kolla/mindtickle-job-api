// fallback middleware when route is not registered
module.exports = function(app) {

    var utilities = require('../helpers/utils');

    app.use(function(req, res) {
        var error = utilities.response.getErrorResponse(404, req.url + ' ' + req.method + ' Not Found');
        res.status(error.status).send(error);
    });

};