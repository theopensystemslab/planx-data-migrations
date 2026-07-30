const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    // Article 4s (option node types only)
    const current = nodeData["data"]?.["val"];
    if (nodeData?.["type"] === 200 && current.startsWith("articleFour")) {
      if (current.startsWith("articleFour.bristolCity.")) {
        newFlowData[nodeId]["data"]["val"] = current.replace("articleFour.bristolCity.", "articleFour.bristol.");
      } else if (current.startsWith("articleFour.liverpoolCity.")) {
        newFlowData[nodeId]["data"]["val"] = current.replace("articleFour.liverpoolCity.", "articleFour.liverpool.");
      }
      logs += `${timestamp} Updated article4 option val (node ${nodeId}); `;
    }
  });

  return {
    flowData: newFlowData,
    logs: logs,
  };
};

module.exports = { migrateFlowData };
