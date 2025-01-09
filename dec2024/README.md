## December 2024

Unlike previous scripts in this directory, this script updates a number of unrelated variables across flow data at the same time. These are outlined in this googlesheet: https://docs.google.com/spreadsheets/d/1Vtxp5BLweDPDooQoNhgOCYjCIBPRYIcOuyArGJRqOkI/edit?gid=0#gid=0

It also facilitates updating _every_ flow across PlanX rather than first prompting for a team or service slug.

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

Populate the table `temp_data_migrations_audit` on staging or production.

Crontab is a very rudimentry tool but worked smoothly & Hasura remained healthy at this pace!

```sh
# m h  dom mon dow   command
*/1 * * * * HASURA_ENV=staging HASURA_SECRET=secret /home/user/.nvm/versions/node/v18.16.1/bin/node /path/to/planx-data-migrations/dec2024/index.js >> /path/to/Desktop/logs.txt 2>&1
*/1 * * * * sleep 10; <repeat command above>
*/1 * * * * sleep 20; <repeat command above>
*/1 * * * * sleep 30; <repeat command above>
*/1 * * * * sleep 40; <repeat command above>
*/1 * * * * sleep 50; <repeat command above>
```

Console logs in the script are written to `/path/to/Desktop/logs.txt` for basic monitoring.

```sh
tail -f /path/to/Desktop/logs.txt
``` 

### Tests

Basic unit tests are written with Node's native test runner. The mock data is especially useful to visualise the "old" content conditions in the editor and can be pasted directly in `flows.data` or `lowcal_sessions.data` respectively.

```sh
cd dec2024
node --test
```
