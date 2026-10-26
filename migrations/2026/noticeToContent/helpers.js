const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  const noticeType = 8;
  const contentType = 250;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    if (nodeData?.type !== noticeType) return;

    // Notice `description` becomes Content `content`, all other props (title, color, resetButton, info, policyRef, howMeasured, definitionImg, notes, tags, templated node settings) carry over as-is
    const { description, ...currentData } = nodeData["data"] || {};

    newFlowData[nodeId]["type"] = contentType;
    newFlowData[nodeId]["data"] = {
      ...currentData,
      ...(description !== undefined && { content: description }),
      // Default Notice background colour for known edge cases of colourless notices
      color: currentData["color"] || "#EFEFEF",
      styleAsNotice: true,
    };

    logs += `${timestamp} Migrated Notice to Content (node ${nodeId}); `;
  });

  return {
    flowData: newFlowData,
    logs: logs,
  };
};

module.exports = { migrateFlowData };
