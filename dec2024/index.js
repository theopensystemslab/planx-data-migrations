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
      console.log(`${timestamp} Updating flow ${flowSlug}`);
      let flowData;
      flowData = updateFlowData(flow.data);

      if (flow.publishedFlows?.length > 0) {
        console.log(`${timestamp} Updating published flow ${flowSlug}`);
        let publishedFlowData;
        publishedFlowData = updateFlowData(flow.publishedFlows?.[0]?.data);
        
        // Update in a single mutation block for postgres transaction-like rollback behavior on error
        const publishedFlowResponse = await client.updateQueuedPublishedFlow(id, flowData, flow.publishedFlows?.[0]?.id, publishedFlowData);
        if (
          publishedFlowResponse?.update_flows_by_pk?.id &&
          publishedFlowResponse?.update_published_flows_by_pk?.id &&
          publishedFlowResponse?.update_temp_data_migrations_audit_by_pk?.flow_id
        ) {
          console.log(`${timestamp} Successfully updated ${flowSlug} - live flow, published flow, and audit table`);
        }
      } else {
        const flowResponse = await client.updateQueuedFlow(id, flowData);
        if (
          flowResponse?.update_flows_by_pk?.id &&
          flowResponse?.update_temp_data_migrations_audit_by_pk?.flow_id
        ) {
          console.log(`${timestamp} Successfully updated ${flowSlug} - live flow and audit table only, not published`);
        }
      }
    } catch (error) {
      console.log(chalk.red(`Error: ${error}`));
    }
  }
})();

// Follows details outlined in gsheet here https://docs.google.com/spreadsheets/d/1Vtxp5BLweDPDooQoNhgOCYjCIBPRYIcOuyArGJRqOkI/edit?gid=0#gid=0
const updateFlowData = (flowData) => {
  let newFlowData = flowData;
  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    // Project type schema
    if (nodeData?.["data"]?.["val"] === "changeofUse.annexe") {
      newFlowData[nodeId]["data"]["val"] = "changeOfUse.annexe";
      console.log(`${timestamp} Updated project type value`);
    }

    // Help text
    if (nodeData?.["data"]?.["policyRef"]?.includes("/made")) {
      newFlowData[nodeId]["data"]["policyRef"] = nodeData["data"]["policyRef"].replaceAll("/made", "");
      console.log(`${timestamp} Updated help text policy reference link`);
    }

    // About the property
    if (nodeData?.["type"] === 12) {
      newFlowData[nodeId]["data"] = defaultPropertyInformationNodeData;
      console.log(`${timestamp} Updated PropertyInformation content`);
    }

    // Calculate prop
    if (nodeData?.["type"] === 700 && nodeData?.["data"]?.["output"]) {
      newFlowData[nodeId]["data"]["fn"] = nodeData["data"]["output"];
      delete newFlowData[nodeId]["data"]["output"];
      console.log(`${timestamp} Updated Calculate prop`);
    }

    // DrawBoundary props
    if (nodeData?.["type"] === 10 && nodeData?.["data"]?.["dataFieldBoundary"]) {
      newFlowData[nodeId]["data"]["fn"] = "proposal.site";
      delete newFlowData[nodeId]["data"]["dataFieldBoundary"];
      delete newFlowData[nodeId]["data"]["dataFieldArea"];      
      console.log(`${timestamp} Updated DrawBoundary props`);
    }

    // Filter Options / Answers flag prop
    if (nodeData?.["type"] === 200 && nodeData?.["data"]?.["flag"]) {
      const currentFlagValue = nodeData["data"]["flag"];
      if (typeof currentFlagValue === "string") {
        // Legacy nodes are still string values
        newFlowData[nodeId]["data"]["flags"] = [currentFlagValue];
        delete newFlowData[nodeId]["data"]["flag"];
      } else {
        // New nodes are already arrays
        newFlowData[nodeId]["data"]["flags"] = currentFlagValue;
        delete newFlowData[nodeId]["data"]["flag"];
      }
      console.log(`${timestamp} Updated Answer flags prop`);
    }
  });

  return newFlowData;
}

const defaultPropertyInformationNodeData = {
  "title": "About the property",
  "description": "<p>This is the information we currently have about the property.</p><p>The blue line shows the <strong>outline</strong> of the property (known as the title boundary). If this looks incorrect, go back a step and <strong>check you have selected the correct address</strong>.</p><p>We use this outline to create the site boundary where the project will take place. If your project covers a different area, you can change or redraw the site boundary on the next page.</p>",
  "showPropertyTypeOverride": true
};
