## October 2026

This migration moves the leading H1 element (or leading H2, in older content) in content components to their new dedicated title field, and promotes H2 elements to H1 elements respective of the header element incrementor introduced here: https://github.com/theopensystemslab/planx-new/pull/815

### Running script

Runs on node v24

#### Locally

Ensure your planx-new docker container is running locally.

Populate the table `temp_data_migrations_audit` with flows that have Content components (type `250`) containing an H1 or H2 -

```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT DISTINCT f.id, f.team_id
FROM flows f, jsonb_each(f.data) AS node(key, value)
WHERE (node.value->>'type')::int = 250
  AND (node.value->'data'->>'content' LIKE '%<h1%' OR node.value->'data'->>'content' LIKE '%<h2%');
```

We'll also need to consider each latest `published_flow` which nests Content components from other flows -
```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT DISTINCT ON (pf.flow_id)
  pf.flow_id,
  f.team_id
FROM published_flows pf
  JOIN flows f on pf.flow_id = f.id
WHERE ((pf.data)::text like '%<h1%' OR (pf.data)::text like '%<h2%')
  AND pf.flow_id NOT IN (SELECT flow_id FROM temp_data_migrations_audit)
ORDER BY pf.flow_id, pf.created_at DESC;
```

Then run the script, which will fetch & update a flow from the audit table which has not been `updated` yet.

```sh
cd migrations/2026/contentTitles
HASURA_ENV=local HASURA_SECRET=secret node index.js
```

#### Scheduled via crontab

Populate the table `temp_data_migrations_audit` on staging or production.

Crontab is a very rudimentary tool but worked smoothly & Hasura remained healthy at this pace!

```sh
# m h  dom mon dow   command
*/1 * * * * HASURA_ENV=local HASURA_SECRET=secret /home/user/.nvm/versions/node/v18.16.1/bin/node /path/to/planx-data-migrations/migrations/2026/contentTitles/index.js >> /path/to/Desktop/logs.txt 2>&1
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

Basic unit tests are written with Node's native test runner. The mock data is especially useful to visualise the "old" content conditions in the editor and can be pasted directly in `flows.data`.

```sh
cd migrations/2026/contentTitles
node --test
```
