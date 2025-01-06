const chalk = require("chalk");
const Client = require("./client");

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

  // Get a flow that hasn't been updated yet and its' published version if applicable
  //   TODO handle related `lowcal_session.data` when applicable?
  const { id, flow } = await client.getQueuedFlow();
  const flowSlug = `${flow?.team?.slug}/${flow?.slug}`;

  if (id) {
    try {
      // Update live flow data
      console.log(`${timestamp} Updating flow ${flowSlug}`);
      const { flowData, logs: liveLogs } = updateFlowData(flow.data);

      // If published, update latest published version
      if (flow.publishedFlows?.length > 0) {
        console.log(`${timestamp} Updating published flow ${flowSlug}`);
        const { flowData: publishedFlowData, logs: publishedLogs } = updateFlowData(flow.publishedFlows?.[0]?.data, true);
        
        // Update in a single mutation block for postgres transaction-like rollback behavior on error
        const publishedFlowResponse = await client.updateQueuedPublishedFlow(id, flowData, flow.publishedFlows?.[0]?.id, publishedFlowData, liveLogs.concat(publishedLogs));
        if (
          publishedFlowResponse?.update_flows_by_pk?.id &&
          publishedFlowResponse?.update_published_flows_by_pk?.id &&
          publishedFlowResponse?.update_temp_data_migrations_audit_by_pk?.flow_id
        ) {
          console.log(`${timestamp} Successfully updated ${flowSlug} - live flow, published flow, and audit table`);
        }
      } else {
        const flowResponse = await client.updateQueuedFlow(id, flowData, liveLogs);
        if (
          flowResponse?.update_flows_by_pk?.id &&
          flowResponse?.update_temp_data_migrations_audit_by_pk?.flow_id
        ) {
          console.log(`${timestamp} Successfully updated ${flowSlug} - live flow and audit table only, not published`);
        }
      }

      // If has associated active sessions, update breadcrumb data
      if (flow.lowcalSessions?.length > 0) {
        console.log(`${timestamp} TODO Update ${flow.lowcalSessions?.length} session breadcrumbs`);
      }
    } catch (error) {
      console.log(chalk.red(`Error: ${error}`));
    }
  }
})();

// Follows details outlined in gsheet here https://docs.google.com/spreadsheets/d/1Vtxp5BLweDPDooQoNhgOCYjCIBPRYIcOuyArGJRqOkI/edit?gid=0#gid=0
const updateFlowData = (flowData, published = false) => {
  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    // Project type schema
    if (nodeData?.["data"]?.["val"] === "changeofUse.annexe") {
      newFlowData[nodeId]["data"]["val"] = "changeOfUse.annexe";
      logs += `${timestamp} Updated project type value (${published ? 'published flow node' : 'node'} ${nodeId}); `;
    }

    // Help text
    const policyRef = nodeData?.["data"]?.["policyRef"];
    if (policyRef?.includes("legislation.gov.uk") && policyRef?.endsWith("/made")) {
      newFlowData[nodeId]["data"]["policyRef"] = nodeData["data"]["policyRef"].replaceAll("/made", "");
      logs += `${timestamp} Updated help text policy reference link (node ${nodeId}); `;
    }

    // About the property
    if (nodeData?.["type"] === 12) {
      newFlowData[nodeId]["data"] = defaultPropertyInformationNodeData;
      logs += `${timestamp} Updated PropertyInformation content (node ${nodeId}); `;
    }

    // Calculate prop
    if (nodeData?.["type"] === 700 && nodeData?.["data"]?.["output"]) {
      newFlowData[nodeId]["data"]["fn"] = nodeData["data"]["output"];
      delete newFlowData[nodeId]["data"]["output"];
      logs += `${timestamp} Updated Calculate prop (node ${nodeId}); `;
    }

    // DrawBoundary props
    if (nodeData?.["type"] === 10 && nodeData?.["data"]?.["dataFieldBoundary"]) {
      newFlowData[nodeId]["data"]["fn"] = "proposal.site";
      delete newFlowData[nodeId]["data"]["dataFieldBoundary"];
      delete newFlowData[nodeId]["data"]["dataFieldArea"];      
      logs += `${timestamp} Updated DrawBoundary props (node ${nodeId}); `;
    }

    // Filter Options / Answers flag prop
    if (nodeData?.["type"] === 200 && nodeData?.["data"]?.["flag"]) {
      const currentFlagValue = nodeData["data"]["flag"];
      if (typeof currentFlagValue === "string") {
        // Legacy nodes are still string values
        newFlowData[nodeId]["data"]["flags"] = [currentFlagValue];
        delete newFlowData[nodeId]["data"]["flag"];
      } else {
        // New nodes are already arrays, but prop name needs to be made plural
        newFlowData[nodeId]["data"]["flags"] = currentFlagValue;
        delete newFlowData[nodeId]["data"]["flag"];
      }
      logs += `${timestamp} Updated Answer flags prop (node ${nodeId}); `;
    }
  });

  return {
    flowData: newFlowData, 
    logs: logs 
  };
}

const defaultPropertyInformationNodeData = {
  "title": "About the property",
  "description": "<p>This is the information we currently have about the property.</p><p>The blue line shows the <strong>outline</strong> of the property (known as the title boundary). If this looks incorrect, go back a step and <strong>check you have selected the correct address</strong>.</p><p>We use this outline to create the site boundary where the project will take place. If your project covers a different area, you can change or redraw the site boundary on the next page.</p>",
  "showPropertyTypeOverride": true
};
