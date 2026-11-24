const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  const firstTemplatedNode = Object.entries(flowData).find(([nodeId, nodeData]) => nodeData?.data?.isTemplatedNode === true);
  const [nodeId, nodeData] = firstTemplatedNode;

  // Add an internal note to the *first* templated node to trigger an update to `templated_flow_edits` on update of `flows.data`
  newFlowData[nodeId]["data"] = {
    ...nodeData["data"] || {},
    notes: "Content migration test note",
  }

  logs += `${timestamp} Added internal note to templated node (node ${nodeId}); `;

  return {
    flowData: newFlowData,
    logs: logs,
  };
};

module.exports = { migrateFlowData };
