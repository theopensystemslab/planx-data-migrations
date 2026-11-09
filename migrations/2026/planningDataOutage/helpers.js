const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    // Only operate on Question nodes, which have this `fn`, and are currently toggled "on"
    if (
      nodeData?.type === 100 &&
      nodeData?.data?.fn === "property.localAuthorityDistrict" &&
      nodeData?.data?.alwaysAutoAnswerBlank === true
    ) {
      newFlowData[nodeId]["data"] = {
        ...nodeData["data"] || {},
        // Toggling "off" ensures that when we can't fetch LAD automatically, the user will be prompted to answer rather than be automated through blank
        alwaysAutoAnswerBlank: false,
      };

      logs += `${timestamp} Set alwaysAutoAnswerBlank to false (node ${nodeId}); `;
    }
  });
  
  return {
    flowData: newFlowData,
    logs: logs,
  };
};

module.exports = { migrateFlowData };
