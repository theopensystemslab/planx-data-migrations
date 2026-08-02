## August 2026

This migration fixes a number of new trial teams which have inconsistent names and Article 4 data values. See https://github.com/theopensystemslab/planx-new/pull/7114

### Running script

Runs on node v18

#### Locally

Ensure your planx-new docker container is running locally.

Populate the table `temp_data_migrations_audit` with flows for the impacted teams. Assumes that PR to update slugs has merged first!

```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT f.id, f.team_id
FROM flows f
  JOIN teams t on t.id = f.team_id
WHERE t.slug IN ('adur-worthing', 'bristol', 'greater-cambridge-shared-planning', 'liverpool', 'stoke-on-trent');
```

Then run the script, which will fetch & update a flow from the audit table which has not been `updated` yet.

```sh
cd 2026/teamSlugs
HASURA_ENV=local HASURA_SECRET=secret node index.js
```

#### Scheduled via crontab

Populate the table `temp_data_migrations_audit` on staging or production.

Crontab is a very rudimentary tool but worked smoothly & Hasura remained healthy at this pace!

```sh
# m h  dom mon dow   command
*/1 * * * * HASURA_ENV=local HASURA_SECRET=secret /home/user/.nvm/versions/node/v18.16.1/bin/node /path/to/planx-data-migrations/migrations/2026/teamSlugs/index.js >> /path/to/Desktop/logs.txt 2>&1
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

Basic unit tests are written with Node's native test runner. The mock data is especially useful to visualise the "old" content conditions in the editor and can be pasted directly in `flows.data` respectively.

```sh
cd migrations/2026/teamSlugs
node --test
```
