## October 2026

This migration converts all deprecated Notice components (type `8`) to Content components (type `250`) with `styleAsNotice: true`.

The Notice `description` becomes the Content `content`. All other props carry over as-is: `title`, `color`, `resetButton`, `info`, `policyRef`, `howMeasured`, `definitionImg`, `notes`, `tags` and templated node settings (`isTemplatedNode`, `templatedNodeInstructions`, `areTemplatedNodeInstructionsRequired`). 

Analytics records and mock data referencing the Notice type need to be handled outside of this migration.

## Known edge cases

Notices without a `color` (of which there are 8) are given the default Notice colour `#EFEFEF`.

Notices without a `title` (of which there are 30) remain title-less, and title is enforced on next editor modal validation.

In both cases node count (primarily) includes archived or otherwise unused flows.

### Running script

Runs on node v24

#### Locally

Ensure your planx-new docker container is running locally.

Populate the table `temp_data_migrations_audit` with flows that have Notice components (type `8`) -

```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT id, team_id
FROM flows
WHERE jsonb_path_exists(data, '$.* ? (@.type == 8)');
```

We'll also need to consider each latest `published_flow` which nests Notice components from other flows -
```psql
INSERT INTO temp_data_migrations_audit (flow_id, team_id)
SELECT DISTINCT ON (pf.flow_id)
  pf.flow_id,
  f.team_id
FROM published_flows pf
  JOIN flows f on pf.flow_id = f.id
WHERE jsonb_path_exists(pf.data, '$.* ? (@.type == 8)')
  AND pf.flow_id NOT IN (SELECT flow_id FROM temp_data_migrations_audit)
ORDER BY pf.flow_id, pf.created_at DESC;
```

Then run the script, which will fetch & update a flow from the audit table which has not been `updated` yet.

```sh
cd migrations/2026/noticeToContent
HASURA_ENV=local HASURA_SECRET=secret node index.js
```

For all records in the queue, replace `100` with the result of `SELECT count(*) FROM temp_data_migrations_audit` -

```sh
for i in {1..100}; do HASURA_ENV=local HASURA_SECRET='secret' node index.js; done
```

### Verify migration

Both component counts should be `0` once migration is done

```psql
SELECT
  (SELECT count(*) FROM flows WHERE jsonb_path_exists(data, '$.* ? (@.type == 8)')) AS live_notices,
  (SELECT count(*) FROM (
    SELECT DISTINCT ON (flow_id) data
    FROM published_flows
    ORDER BY flow_id, created_at DESC
  ) pf WHERE jsonb_path_exists(pf.data, '$.* ? (@.type == 8)')) AS published_notices;
```

### Tests

Basic unit tests are written with Node's native test runner. The mock data is especially useful to visualise the "old" content conditions in the editor and can be pasted directly in `flows.data`.

```sh
cd migrations/2026/noticeToContent
node --test
```
