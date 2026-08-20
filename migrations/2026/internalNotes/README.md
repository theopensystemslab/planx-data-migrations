## August 2026

This migration replaces the "Internal notes" prop on every editor component with a new "attached" flow note. Unlike flow data, notes are not a public data structure and only accessible to users with applicable roles. 

### Running script

Runs on node v24

#### Locally

Ensure your planx-new docker container is running locally.

Populate the table `temp_data_migrations_audit` with all flows on the platform (including 'archived' flows).

Then run the script, which will fetch & update a flow from the audit table which has not been `updated` yet.

```sh
cd migrations/2026/internalNotes
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
cd migrations/2026/internalNotes
node --test
```
