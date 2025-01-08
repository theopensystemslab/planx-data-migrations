## December 2024

https://docs.google.com/spreadsheets/d/1Vtxp5BLweDPDooQoNhgOCYjCIBPRYIcOuyArGJRqOkI/edit?gid=0#gid=0

### Running script

Runs on node v18

#### Locally

Ensure your planx-new docker container is running locally.

Populate the table `temp_data_migrations_audit` with flows, for example:

```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT id, team_id
FROM flows 
WHERE team_id IN (1,2,3); 
```

Then run the script, which will fetch & update a flow from the audit table which has not been `updated` yet.

```sh
cd dec2024
HASURA_ENV=local HASURA_SECRET=secret node index.js
```

#### Scheduled via crontab

### Tests

Basic unit tests are written with Node's native test runner

```sh
cd dec2024
node --test
```
