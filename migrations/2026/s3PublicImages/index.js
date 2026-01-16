const chalk = require("chalk");
const Client = require("./client");
const { migrateFlowData } = require("./helpers");

const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

(async function go() {
  const url = {
    production: "https://hasura.editor.planx.uk/v1/graphql",
    staging: "https://hasura.editor.planx.dev/v1/graphql",
    local: "http://localhost:7100/v1/graphql",
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
  const { id, flow } = await client.getQueuedFlow();
  const flowSlug = `${flow?.team?.slug}/${flow?.slug}`;

  if (!id) return;
  
  if (id) {
    try {
      // Public image URLs only impact flow data, not sessions, so account for unpublished & published flows here
      const isPublished = flow.publishedFlows?.length > 0;

      // All scenarios update live flow data
      console.log(`${timestamp} Updating flow ${flowSlug}`);
      const { flowData, logs: liveLogs } = migrateFlowData(flow.data);

      if (isPublished) {
        // Update published flow data
        console.log(`${timestamp} Updating published flow ${flowSlug}`);
        const { flowData: publishedFlowData, logs: publishedLogs } = migrateFlowData(flow.publishedFlows?.[0]?.data);

        // Write flow data to database (single mutation for transaction-like rollback behavior)
        const publishedFlowResponse = await client.updateQueuedPublishedFlow(id, flowData, flow.publishedFlows?.[0]?.id, publishedFlowData, liveLogs.concat(publishedLogs));
        if (
          publishedFlowResponse?.update_flows_by_pk?.id &&
          publishedFlowResponse?.update_published_flows_by_pk?.id &&
          publishedFlowResponse?.update_temp_data_migrations_audit_by_pk?.flow_id
        ) {
          console.log(`${timestamp} Successfully updated flow and published flow ${flowSlug}`);
        }
      } else {
        // Write to database
        const flowResponse = await client.updateQueuedFlow(id, flowData, liveLogs);
        if (
          flowResponse?.update_flows_by_pk?.id &&
          flowResponse?.update_temp_data_migrations_audit_by_pk?.flow_id
        ) {
          console.log(`${timestamp} Successfully updated unpublished flow ${flowSlug}`);
        }
      }
    } catch (error) {
      console.log(chalk.red(`Error": ${error}`));
    }
  }
})();
