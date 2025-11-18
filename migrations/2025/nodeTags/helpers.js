// Follows details outlined in gsheet here https://docs.google.com/spreadsheets/d/1Vtxp5BLweDPDooQoNhgOCYjCIBPRYIcOuyArGJRqOkI/edit?gid=0#gid=0
const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    if (nodeData?.["data"]?.["tags"] && nodeData["data"]["tags"].includes("placeholder")) {
      newFlowData[nodeId]["data"]["tags"] = nodeData["data"]["tags"].map(current => 
        current === "placeholder" ? "customisation" : current
      );
      logs += `${timestamp} Renamed "placeholder" tag (node ${nodeId}); `;
    }
  });

  return {
    flowData: newFlowData,
    logs: logs
  };
}

module.exports = { migrateFlowData };
