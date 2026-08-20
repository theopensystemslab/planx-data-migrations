const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  // Deep clone to ensure `notes` are correctly extracted in loop
  let newFlowData = structuredClone(flowData);
  let logs = "";
  const notes = [];

  for (const [nodeId, nodeData] of Object.entries(flowData)) {
    const internalNote = nodeData["data"]?.["notes"];
    if (internalNote) {
      // Track the original content
      notes.push({
        nodeId: nodeId,
        text: internalNote,
      });

      // Remove the node prop
      delete newFlowData[nodeId]["data"]["notes"];
      logs += `${timestamp} Removed internal notes prop (node ${nodeId}); `;
    }
  };

  return {
    flowData: newFlowData,
    logs,
    notes,
  };
};

module.exports = { migrateFlowData };
