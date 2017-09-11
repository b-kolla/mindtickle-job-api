var sqlite = require('.');

exports.insertJobRun = function(jobRun, callback, transactionConnection) {
    if (!jobRun || !jobRun.job_run_id || !jobRun.job_id)
        return callback(true);

    var connection = transactionConnection || new sqlite.Connection();

    connection.run(`INSERT INTO job_run VALUES (?, ?, ?, ?, ?)`, [jobRun.job_run_id, jobRun.job_id, jobRun.run_timestamp || null, jobRun.run_status || null, jobRun.response || null], callback);

    if (!transactionConnection)
        connection.close();
};