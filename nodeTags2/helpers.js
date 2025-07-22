const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    if (nodeData?.["data"]?.["tags"] && nodeData["data"]["tags"].includes("customisation")) {
      const filteredTags = nodeData["data"]["tags"].filter((tag) => tag !== "customisation");
      newFlowData[nodeId]["data"]["tags"] = filteredTags;
      logs += `${timestamp} Renamed "placeholder" tag (node ${nodeId}); `;
    }
  });

  return {
    flowData: newFlowData,
    logs: logs
  };
}

module.exports = { migrateFlowData };
