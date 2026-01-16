const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  const legacyFileNames = Object.keys(fileChanges);

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    // `definitionImg` are help text images on any component type
    if (nodeData?.data?.definitionImg && legacyFileNames.includes(nodeData.data.definitionImg)) {
      newFlowData[nodeId]["data"]["definitionImg"] = fileChanges[nodeData.data.definitionImg];
      logs += `${timestamp} Updated definitionImg URL (node ${nodeId}); `;
    }

    // `img` prop exists on multiple component types (Question, Checklist, Answer)
    if (nodeData?.data?.img && legacyFileNames.includes(nodeData.data.img)) {
      newFlowData[nodeId]["data"]["img"] = fileChanges[nodeData.data.img];
      logs += `${timestamp} Updated img URL (node ${nodeId}); `;
    }
  });

  return {
    flowData: newFlowData,
    logs: logs
  };
}

// TODO 
// ref https://docs.google.com/spreadsheets/d/18FpaJHpMp1OipRi9DebxzUgwWliSwQBsq-e_NpL8Aq4/edit?gid=68312197#gid=68312197
const fileChanges = {
  "https://planx-temp.s3.eu-west-2.amazonaws.com/production/xtsuube5/Terrace_outrigger_rearonly_4m.svg": "https://api.editor.planx.uk/file/public/xtsuube5/Terrace_outrigger_rearonly_4m.svg",
};

module.exports = { migrateFlowData };
