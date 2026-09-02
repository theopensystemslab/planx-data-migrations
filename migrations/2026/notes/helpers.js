const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  // [Responsive] Questions and Checklists used to be added as "notes"
  const pseudoNoteTypes = [100, 101, 105, 106];

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    const currentType = nodeData["type"];
    const currentEdges = nodeData["edges"];
    const currentData = nodeData["data"];

    if (pseudoNoteTypes.includes(currentType) && (!currentEdges || currentEdges.length === 0)) {
      // Capture all possible pseudo-note props and concatenate text (handling rich text where applicable)
      const concatenatedContent = [
        currentData["text"], 
        removeHtmlTags(currentData["description"]), 
        currentData["notes"]
      ].filter(Boolean).join(" ");

      // Convert prior type to new dedicated "Note" component type
      newFlowData[nodeId]["type"] = 999;

      // Strip all existing data, reinitiate fresh, add only 'text' and 'tags' props
      delete newFlowData[nodeId]["data"];
      newFlowData[nodeId]["data"] = {};
      newFlowData[nodeId]["data"]["text"] = concatenatedContent;
      if (currentData["tags"]) {
        newFlowData[nodeId]["data"]["tags"] = currentData["tags"];
      }

      logs += `${timestamp} Updated node to note (node ${nodeId}); `;
    }
  });

  return {
    flowData: newFlowData,
    logs: logs,
  };
};

const removeHtmlTags = (str) => {
  if (!str) return '';
  return str.replace(/[<>]/g, '');
};

module.exports = { migrateFlowData };
