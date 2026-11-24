## 9 November 2026

This migration is in response to all Planning Data APIs being unavailable and offline since 6 Nov and lasting until at least Wednesday, 11 November. While PlanX service content _mostly_ handles gentle fallbacks, there are a number of services which have misconfigured the early question "Is this property in {council}?" using the "Never show to the user" automation toggle, which will be a hard-block users during this downtime.

We originally asked councils to make and publish this change themselves, but due to lack of response and inability to easily do a "full publish" to all services that have other sequenced queued change (eg LDC source template), a content migration is the most straightforward and targeted solution given current timeframes. 

This is also a change which should _stay_ applied when Planning Data APIs are restored, as it's "correct" behaviour regardless.

## Known edge cases

We're only handling: 
- Questions (type 100)
- fn = `property.localAuthorityDistrict`
- cases where the toggle is currently _set to_ incorrectly automate through the blank instead of put to user

### Running script

Runs on node v24

#### Locally

Ensure your planx-new docker container is running locally.

Populate the table `temp_data_migrations_audit` with flows that use `property.localAuthorityDistrict` -

```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT DISTINCT f.id, f.team_id
FROM flows f, jsonb_each(f.data) AS node(key, value)
WHERE (node.value->'data'->>'fn' = 'property.localAuthorityDistrict');
```

We'll also need to consider each latest `published_flow` which nests this data field from other flows -
```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT DISTINCT ON (pf.flow_id)
  pf.flow_id,
  f.team_id
FROM published_flows pf
  JOIN flows f on pf.flow_id = f.id
WHERE ((pf.data)::text like 'property.localAuthorityDistrict')
  AND pf.flow_id NOT IN (SELECT flow_id FROM temp_data_migrations_audit)
ORDER BY pf.flow_id, pf.created_at DESC;
```

Then run the script, which will fetch & update a flow from the audit table which has not been `updated` yet.

```sh
cd migrations/2026/planningDataOutage
HASURA_ENV=local HASURA_SECRET=secret node index.js
```

For all records in the queue, replace `100` with the result of `SELECT count(*) FROM temp_data_migrations_audit` -

```sh
for i in {1..100}; do HASURA_ENV=local HASURA_SECRET='secret' node index.js; done
```

### Tests

Basic unit tests are written with Node's native test runner. The mock data is especially useful to visualise the "old" content conditions in the editor and can be pasted directly in `flows.data`.

```sh
cd migrations/2026/planningDataOutage
node --test
```
