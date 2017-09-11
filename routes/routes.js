module.exports = function(app) {

    var job = require('../controllers/jobController');

    app.route('/jobs/update').post(job.updateJobs);

};