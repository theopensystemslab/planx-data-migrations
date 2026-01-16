## January 2026

This migration fixes a number of erroring public file images. See https://opensystemslab.slack.com/archives/C088K9ZL8EA/p1768488239149179

### Running script

Runs on node v18

#### Locally

Ensure your planx-new docker container is running locally.

Populate the table `temp_data_migrations_audit` with flows, for example only flows with "legacy" `planx-temp.s3..` file URLs in their data - 

```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT id, team_id
FROM flows 
WHERE (data)::text like '%planx-temp.s3.%';
```

We'll also need to consider each latest `published_flow` which nests those above flows (which is ~141 more flows total because of PD) - 
```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT DISTINCT ON (pf.flow_id) 
	pf.flow_id,
  f.team_id
FROM published_flows pf
  JOIN flows f on pf.flow_id = f.id
WHERE (pf.data)::text like '%planx-temp.s3.%'
ORDER BY pf.flow_id, pf.created_at DESC;
```

Then run the script, which will fetch & update a flow from the audit table which has not been `updated` yet.

```sh
cd 2026/s3PublicImages
HASURA_ENV=local HASURA_SECRET=secret node index.js
```

#### Scheduled via crontab

Populate the table `temp_data_migrations_audit` on staging or production.

Crontab is a very rudimentary tool but worked smoothly & Hasura remained healthy at this pace!

```sh
# m h  dom mon dow   command
*/1 * * * * HASURA_ENV=local HASURA_SECRET=secret /home/user/.nvm/versions/node/v18.16.1/bin/node /path/to/planx-data-migrations/migrations/2026/s3PublicImages/index.js >> /path/to/Desktop/logs.txt 2>&1
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
cd migrations/2026/s3PublicImages
node --test
```
