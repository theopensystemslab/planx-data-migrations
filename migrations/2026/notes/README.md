## September 2026

This migration converts old Question/Checklist pseudo-note nodes to a new dedicated note type 

See https://trello.com/c/Dhzba2T5/3736-migrate-notes?filter=notes

Production migration ran on 3 September 2026 https://opensystemslab.slack.com/archives/C01E3AC0C03/p1788471956056529

### Running script

Runs on node v24

#### Locally

Ensure your planx-new docker container is running locally.

Populate the table `temp_data_migrations_audit` with all flows, including archived ones.

```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT f.id, f.team_id
FROM flows f;
```

Then run the script, which will fetch & update a flow from the audit table which has not been `updated` yet.

```sh
cd migrations/2026/notes
HASURA_ENV=local HASURA_SECRET=secret node index.js
```

#### Ran via console

Populate the table `temp_data_migrations_audit` on staging or production. Get the total count of rows and replace below

```
for i in {1..$totalRows}; do HASURA_ENV=$env HASURA_SECRET=$secret node index.js; done
``` 

### Tests

Basic unit tests are written with Node's native test runner. The mock data is especially useful to visualise the "old" content conditions in the editor and can be pasted directly in `flows.data` respectively.

```sh
cd migrations/2026/notes
node --test
```
