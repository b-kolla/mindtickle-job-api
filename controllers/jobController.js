var async = require('async');
var sqlite = require('../models/sqlite');
var job = require('../models/sqlite/jobModel');
var jobRun = require('../models/sqlite/jobRunModel');
var utilities = require('../helpers/utils');

exports.updateJobs = function(req, res) {

    var body = req.body || [];
    if (Object.prototype.toString.call(body) === '[object Array]') {
        var connection = new sqlite.Connection();

        connection.serialize(function() {

            async.waterfall([

                function beginTransaction(callback1) {
                    connection.beginTransaction(function(err) {
                        if (err) {
                            console.log(err);
                            callback1(utilities.response.getErrorResponse(500));
                        } else {
                            callback1();
                        }
                    });
                },

                function doDatabaseOperations(callback2) {
                    async.forEachLimit(body, 1, function(jobObj, jobCallback) {
                        if (!jobObj.job || !jobObj.job.job_id || !jobObj.job_run || !jobObj.job_run.job_run_id || !jobObj.job_run.job_id) {
                            jobCallback(utilities.response.getErrorResponse(400, "Each object in request must contain 'job {job_id}' and 'job_run {job_run_id, job_id}' properties"));
                        } else {
                            async.waterfall([
                                function getJob(callbackA) {
                                    job.getJob(jobObj.job.job_id, function(err, jobRow) {
                                        if (err) {
                                            console.log(err);
                                            callbackA(utilities.response.getErrorResponse(500));
                                        } else if (!jobRow) {
                                            callbackA(utilities.response.getErrorResponse(400, 'No job exists with job_id ' + jobObj.job.job_id));
                                        } else {
                                            callbackA();
                                        }
                                    }, connection);
                                },
                                function updateJob(callbackB) {
                                    job.updateJob(jobObj.job, function(err) {
                                        if (err) {
                                            console.log(err);
                                            callbackB(utilities.response.getErrorResponse(500));
                                        } else {
                                            callbackB();
                                        }
                                    }, connection);
                                },
                                function insertJobRun(callbackC) {
                                    jobRun.insertJobRun(jobObj.job_run, function(err) {
                                        if (err) {
                                            console.log(err);
                                            if (err.code === 'SQLITE_CONSTRAINT' && err.errno === 19)
                                                callbackC(utilities.response.getErrorResponse(400, 'Already an entry exists with job_run_id ' + jobObj.job_run.job_run_id));
                                            else
                                                callbackC(utilities.response.getErrorResponse(500));
                                        } else {
                                            callbackC();
                                        }
                                    }, connection);
                                }
                            ], function(error, result) {
                                jobCallback(error, result);
                            });
                        }
                    }, function(error) {
                        callback2(error);
                    });
                }

            ], function(error, result) {
                if (error) {
                    connection.rollbackTransaction();
                    res.status(error.status).send(error);
                } else {
                    connection.commitTransaction();
                    res.status(200).send();
                }

                connection.close();
            });

        });
    } else {
        var error = utilities.response.getErrorResponse(400, 'Request body should be an array');
        res.status(error.status).send(error);
    }

};