var sqlite = require('.');

exports.getJob = function(jobId, callback, transactionConnection) {
    if (!jobId)
        return callback(true);

    var connection = transactionConnection || new sqlite.Connection();

    connection.get(`SELECT * FROM job WHERE job_id = ?`, [jobId], callback);

    if (!transactionConnection)
        connection.close();
};

exports.updateJob = function(job, callback, transactionConnection) {
    if (!job || !job.job_id)
        return callback(true);

    var connection = transactionConnection || new sqlite.Connection();

    connection.run(`UPDATE job SET
					url = ?, method = ?, body = ?, timestamp = ?, interval = ?, job_status = ?, no_of_times = ?, no_of_runs = ?
					WHERE job_id = ?`, [job.url || null, job.method || null, job.body || null, job.timestamp || null, job.interval || null, job.job_status || 'INACTIVE', job.no_of_times || 0, job.no_of_runs || 0, job.job_id], callback);

    if (!transactionConnection)
        connection.close();
};