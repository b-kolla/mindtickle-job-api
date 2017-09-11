var sqlite = require('./models/sqlite');

var connection = new sqlite.Connection({
    createIfNotExists: true
});

connection.serialize(function() {

    connection.run(`CREATE TABLE job (
                job_id TEXT PRIMARY KEY,
                url TEXT,
                method TEXT,
                body TEXT,
                timestamp INTEGER,
                interval INTEGER,
                job_status TEXT,
                no_of_times INTEGER,
                no_of_runs INTEGER
              )`,
        function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Created job table');
            }
        });

    connection.run(`INSERT INTO job VALUES
              ('1', 'http://localhost:8081/api/job-1', 'GET', NULL, 1504895400000, 60000, 'ACTIVE', 10, 0),
              ('2', 'http://localhost:8081/api/job-2', 'GET', NULL, 1504896120000, 120000, 'ACTIVE', 5, 0),
              ('3', 'http://localhost:8081/api/job-3', 'POST', '{"data":[]}', 1504895400000, 60000, 'ACTIVE', 15, 0),
              ('4', 'http://localhost:8081/api/job-4', 'GET', NULL, 1504896120000, 120000, 'INACTIVE', 10, 0),
              ('5', 'http://localhost:8081/api/job-5', 'GET', NULL, 1504895400000, 60000, 'INACTIVE', 2, 0),
              ('6', 'http://localhost:8081/api/job-6', 'POST', '{"data":[]}', 1504896120000, 120000, 'INACTIVE', 20, 0),
              ('7', 'http://localhost:8081/api/job-7', 'GET', NULL, 1504895400000, 60000, 'ACTIVE', 25, 0),
              ('8', 'http://localhost:8081/api/job-8', 'GET', NULL, 1504896120000, 120000, 'ACTIVE', 1, 0),
              ('9', 'http://localhost:8081/api/job-9', 'POST', '{"data":[]}', 1504895400000, 60000, 'ACTIVE', 3, 0)`,
        function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Populated job table with data');
            }
        });

    connection.run(`CREATE TABLE job_run (
                job_run_id TEXT PRIMARY KEY,
                job_id TEXT,
                run_timestamp INTEGER,
                run_status TEXT,
                response TEXT
              )`,
        function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Created job_run table');
            }
        });

});

connection.close();