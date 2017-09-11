var sqlite3 = require('sqlite3').verbose();

exports.Connection = class Connection extends sqlite3.Database {

    constructor(options) {
        options = options || {};

        super('./databases/jobs_sqlite.db', (options.createIfNotExists ? sqlite3.OPEN_CREATE : 0) | sqlite3.OPEN_READWRITE, function(err) {
            if (err) {
                console.log(err);
                if (err.code === 'SQLITE_CANTOPEN' && err.errno === 14) {
                    console.log("You seem to have not setup the db. Please run 'npm run setup-db' before you start the server.");
                    process.exit(1);
                }
            } else {
                console.log('Connected to the jobs sqlite database.');
            }
        });
    };

    beginTransaction(callback) {
        this.run('BEGIN TRANSACTION', callback);
    };

    commitTransaction(callback) {
        this.run('COMMIT', callback);
    };

    rollbackTransaction(callback) {
        this.run('ROLLBACK', callback);
    };

    // overriding superclass method
    close() {

        super.close(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection to the jobs sqlite database is closed.');
            }
        });

    };

};