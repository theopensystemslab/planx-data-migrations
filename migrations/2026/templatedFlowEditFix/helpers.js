const migrateFlowData = (flowData, templatedFlowEdits) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  // How we populate temp_data_migrations_audit should already guard against this case, 
  //   But helpful to have second-line here which can be unit-tested ! 
  if (!templatedFlowEdits) {
    return {
      flowData: flowData,
      logs: `${timestamp} Cannot update a templated flow which as not been customised yet`,
    };
  }

  let newFlowData = flowData;
  let logs = "";

  // We don't want to pollute "completed" customisations, so ensure we find the first templated node in the flow which has *already* been edited
  const firstTemplatedNodeThatHasBeenCustomised = Object.entries(flowData).find(([nodeId, nodeData]) => nodeData?.data?.isTemplatedNode === true && Object.keys(templatedFlowEdits || {}).includes(nodeId));
  if (!firstTemplatedNodeThatHasBeenCustomised) {
    return {
      flowData: flowData,
      logs: `${timestamp} Cannot update a templated flow which as not been customised yet`,
    };
  }

  const [nodeId, nodeData] = firstTemplatedNodeThatHasBeenCustomised;

  // Add an internal note to the templated node to trigger an update to `templated_flow_edits` on update of `flows.data`
  newFlowData[nodeId]["data"] = {
    ...nodeData["data"] || {},
    notes: "Content migration test note",
  };

  logs += `${timestamp} Added internal note to templated node (node ${nodeId}); `;

  return {
    flowData: newFlowData,
    logs: logs,
  };
};

module.exports = { migrateFlowData };
