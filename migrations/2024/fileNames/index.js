const ask = require("prompt");
const chalk = require("chalk");
const Client = require("../client");

const { setupPrompts } = require("../prompts");
const { updateUploadNodeFn, updateUploadAndLabelNodeFns, updateTextAndDateInputNodeFns } = require("./helpers");

ask.start();

(async function go() {
  // greeting
  console.log(
    chalk.cyan(
      `Hello! These prompts will step you through bulk updating Planx passport variables for files.\nType values when prompted or click 'enter' to accept ${chalk.white(
        "(default)"
      )} values.\n~~~~~~~~~~~~~~ ${chalk.bold("LET'S START")} ~~~~~~~~~~~~~~`
    )
  );

  // authentication & setup
  const { hasuraEnvironment, hasuraSecret, flowSlug } = await ask.get(
    setupPrompts
  );
  const url = {
    production: "https://hasura.editor.planx.uk/v1/graphql",
    staging: "https://hasura.editor.planx.dev/v1/graphql",
    local: "http://localhost:7100/v1/graphql",
  };

  // create graphQL client
  const client = new Client({
    hasuraSecret,
    targetURL: url[hasuraEnvironment],
  });

  const formattedSlug = flowSlug.toLowerCase().trim().replaceAll(" ", "-");

  // Fetch flows matching slugs
  const flows = await client.getFlowData(formattedSlug);
  if (flows?.length > 0) {
    console.log(chalk.white(`Fetched ${flows.length} flows`));

    flows.forEach(async (flow, i) => {
      let liveFlowData;
      let publishedFlowData;
      let response;

      try {        
        if (flow.publishedFlows.length > 0) {
          // Proceed with migration for flows that are published
          console.log(chalk.white(`Updating published flow ${i+1}/${flows.length}: ${flow.team.slug}/${flow.slug}`));

          // Find Upload & UploadAndLabel nodes in live flow data, update them
          //   This does NOT require a corresponding operation because we are not creating the flow for the first time
          liveFlowData = updateUploadNodeFn(flow.data);
          liveFlowData = updateUploadAndLabelNodeFns(liveFlowData);
          liveFlowData = updateTextAndDateInputNodeFns(liveFlowData);
  
          // Find Upload & UploadAndLabel nodes in published flow data, update them directly too
          publishedFlowData = updateUploadNodeFn(flow.publishedFlows?.[0]?.data);
          publishedFlowData = updateUploadAndLabelNodeFns(publishedFlowData);
          publishedFlowData = updateTextAndDateInputNodeFns(publishedFlowData);
  
          // Write update in a single mutation block for postgres transaction-like rollback behavior on error
          response = await client.updateFlowAndPublishedFlow(flow.id, liveFlowData, flow.publishedFlows?.[0]?.id, publishedFlowData);
          if (response?.update_flows_by_pk?.id) {
            console.log(
              chalk.green(`Successfully updated flow: ${flow.team.slug}/${flow.slug}`)
            );
          }
          if (response?.update_published_flows_by_pk?.id) {
            console.log(
              chalk.green(`Successfully updated published version of flow: ${flow.team.slug}/${flow.slug}`)
            );
          }
        } else {
          // Proceed with migration for flows that are not published
          console.log(chalk.white(`Updating unpublished flow ${i+1}/${flows.length}: ${flow.team.slug}/${flow.slug}`));

          // Find Upload & UploadAndLabel nodes in live flow data, update them
          //   This does NOT require a corresponding operation because we are not creating the flow for the first time
          liveFlowData = updateUploadNodeFn(flow.data);
          liveFlowData = updateUploadAndLabelNodeFns(liveFlowData);
          liveFlowData = updateTextAndDateInputNodeFns(liveFlowData);
  
          // Write update
          response = await client.updateFlow(flow.id, liveFlowData);
          if (response?.update_flows_by_pk?.id) {
            console.log(
              chalk.green(`Successfully updated flow: ${flow.team.slug}/${flow.slug}`)
            );
          }
        }
      } catch (error) {
        console.log(chalk.red(error));
      }
    });
  } else {
    console.log(chalk.red(`Cannot find any flows matching slug: ${formattedSlug}. Exiting migration script`));
  }
})();
