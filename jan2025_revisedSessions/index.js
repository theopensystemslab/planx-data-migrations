const chalk = require("chalk");
const Client = require("./client");
const { migrateSessionData } = require("./helpers");

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
  if (id && flow) {
    try {
      const flowSlug = `${flow.team?.slug}/${flow.slug}`;
      console.log(`${timestamp} Fetching flow ${flowSlug}`);

      const hasSessions = flow.sessions?.length > 0;
      if (hasSessions) {
        // Iterate through sessions and update them individually if they have FindProperty or PlanningConstraints breadcrumb
        for (const session of flow.sessions) {
          const findPropertyNodeId = Object.entries(flow.data).find(([_nodeId, nodeData]) => nodeData.type === 9)?.[0];
          const hasFindPropertyBreadcrumb = Object.keys(session.data?.breadcrumbs).includes(findPropertyNodeId);
          const planningConstraintsNodeId = Object.entries(flow.data).find(([_nodeId, nodeData]) => nodeData.type === 11)?.[0];
          const hasPlanningConstraintsBreadcrumb = Object.keys(session.data?.breadcrumbs).includes(planningConstraintsNodeId);

          if (hasFindPropertyBreadcrumb || hasPlanningConstraintsBreadcrumb) {
            console.log(`${timestamp} Updating session ${session.id} (${flowSlug})`);
            const sessionData = migrateSessionData(session.data);

            // Write session data to database
            const sessionDataResponse = await client.updateSessionData(session.id, sessionData);
            if (
              sessionDataResponse?.update_lowcal_sessions_by_pk?.id
            ) {
              console.log(`${timestamp} Successfully updated session ${session.id} (${flowSlug})`);
            }
          } else {
            console.log(`${timestamp} Skipping session without FindProperty or PlanningConstraints breadcrumb ${session.id} (${flowSlug})`);
          }
        };
      } else {
        console.log(`${timestamp} Skipping flow without active sessions ${flowSlug}`);
      }

      // Mark the audit table as "updated" once we've checked a flow regardless of finding sessions
      const _auditTableResponse = await client.updateAuditTable(id);
    } catch (error) {
      console.log(chalk.red(`Error": ${error}`));
    }
  }
})();
