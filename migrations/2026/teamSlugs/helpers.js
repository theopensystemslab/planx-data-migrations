const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    // Article 4s (option node types only across Questions or Checklists)
    //   (Do not need to account for SetValues or other node types per "real" content in templated A4 flows)
    const current = nodeData["data"]?.["val"];
    if (nodeData?.["type"] === 200 && current && current.startsWith("articleFour")) {
      if (current.startsWith("articleFour.adurAndWorthing.")) {
        newFlowData[nodeId]["data"]["val"] = current.replace("articleFour.adurAndWorthing.", "articleFour.adurWorthing.");
      } else if (current.startsWith("articleFour.bristolCity.")) {
        newFlowData[nodeId]["data"]["val"] = current.replace("articleFour.bristolCity.", "articleFour.bristol.");
      } else if (current.startsWith("articleFour.greaterCambridge.")) {
        newFlowData[nodeId]["data"]["val"] = current.replace("articleFour.greaterCambridge.", "articleFour.greaterCambridgeSharedPlanning.");
      } else if (current.startsWith("articleFour.liverpoolCity.")) {
        newFlowData[nodeId]["data"]["val"] = current.replace("articleFour.liverpoolCity.", "articleFour.liverpool.");
      } else if (current.startsWith("articleFour.stoke.")) {
        newFlowData[nodeId]["data"]["val"] = current.replace("articleFour.stoke.", "articleFour.stokeOnTrent.");
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
