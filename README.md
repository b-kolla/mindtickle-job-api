# mindtickle-job-api

1. npm install

   * After checking out the project  go to project directory and do `npm install`.

2. Setup local sqlite db

   * Before starting the REST API server we need to setup local sqlite db.
   * Run `npm run setup-db`.
   * Above command will create **jobs_sqlite.db** file in **databases** folder.
   * It also creates the **job** and **job_run** tables. And populates **job** table with sample data.

3. Start REST API server

   * Run `npm run start` which will start the REST API server.
   * This server listens to **3000** port.

4. Endpoint
   * URL: `http://localhost:3000/jobs/update`
   * Method: `POST`
   * Headers:
   ```
   { "Content-Type": "application/json" }
   ```
   * Body:
   ```
    [
        {
            "job": {
                "job_id": "<job_id>",
                "url": "<url>",
                "method": "<method>",
                "body": "<body>",
                "timestamp": "<timestamp>",
                "interval": "<interval>",
                "job_status": "<job_status>",
                "no_of_times": "<no_of_times>",
                "no_of_runs": "<no_of_runs>"
            },
            "job_run": {
                "job_run_id": "<job_run_id>",
                "job_id": "<job_id>",
                "run_timestamp": "<run_timestamp>",
                "run_status": "<run_status>",
                "response": "<response>"
            }
        },
        
        •
        •
        •
    ]
   ```
