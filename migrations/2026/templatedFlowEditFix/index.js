const chalk = require("chalk");
const Client = require("./client");
const { migrateFlowData } = require("./helpers");

const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

(async function go() {
  const url = {
    production: "https://hasura.editor.planx.uk/v1/graphql",
    staging: "https://hasura.editor.planx.dev/v1/graphql",
    local: "http://localhost:7100/v1/graphql",
    pizza: "https://hasura.7974.planx.pizza/v1/graphql",
  };

  const hasuraSecret = process.env["HASURA_SECRET"];
  const env = process.env["HASURA_ENV"];
  console.log(chalk.cyan(`${timestamp} Connecting to Hasura ${env}`));

  // Create GraphQL client
  const client = new Client({
    hasuraSecret,
    targetURL: url[env],
  });

  // Get a queued flow that hasn't been updated yet
  const { id, flow } = await client.getQueuedFlowWithTemplatedFlowEdits();
  const flowSlug = `${flow?.team?.slug}/${flow?.slug}`;
  const templatedFlowEdits = flow?.edits?.data;

  if (!id) return;

  if (id) {
    try {
      // Update live flow data only, *not* the published version in place 
      //   We specifically want to pickup a diff on editor publish action after source template publish has been pushed out
      console.log(`${timestamp} Updating flow ${flowSlug}`);
      const { flowData, logs: liveLogs } = migrateFlowData(flow.data, templatedFlowEdits);

      // Write to database
      const flowResponse = await client.updateQueuedFlow(id, flowData, liveLogs);
      if (
        flowResponse?.update_flows_by_pk?.id &&
        flowResponse?.update_temp_data_migrations_audit_by_pk?.flow_id
      ) {
        console.log(`${timestamp} Successfully updated flow ${flowSlug}`);
      }
    } catch (error) {
      console.log(chalk.red(`Error": ${error}`));
    }
  }
})();
