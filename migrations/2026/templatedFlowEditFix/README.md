## 23 November 2026

See https://opensystemslab.slack.com/archives/C088K9ZL8EA/p1795087209371679 & https://github.com/theopensystemslab/planx-new/pull/7974

### Running script

Runs on node v24

#### Locally

Ensure your planx-new docker container is running locally.

Populate the table `temp_data_migrations_audit` with all templated flows that have been edited/customised.

```sql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT DISTINCT ON (tfe.flow_id)
  tfe.flow_id,
  f.team_id
FROM templated_flow_edits tfe
  JOIN flows f on tfe.flow_id = f.id
WHERE f.templated_from IS NOT NULL;
```

We specifically do _not_ want to query nor update their published versions for this migration.

Then run the script, which will fetch & update a flow from the audit table which has not been `updated` yet.

```sh
cd migrations/2026/templatedFlowEditFix
HASURA_ENV=local HASURA_SECRET=secret node index.js
```

For all records in the queue, replace `100` with the result of `SELECT count(*) FROM temp_data_migrations_audit` -

```sh
for i in {1..100}; do HASURA_ENV=local HASURA_SECRET='secret' node index.js; done
```

### Tests

Basic unit tests are written with Node's native test runner. The mock data is especially useful to visualise the "old" content conditions in the editor and can be pasted directly in `flows.data`.

```sh
cd migrations/2026/templatedFlowEditFix
node --test
```
