const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    // Remove "customisation" tag
    if (nodeData?.["data"]?.["tags"] && nodeData["data"]["tags"].includes("customisation")) {
      const filteredTags = nodeData["data"]["tags"].filter((tag) => tag !== "customisation");
      newFlowData[nodeId]["data"]["tags"] = filteredTags;
      logs += `${timestamp} Renamed "placeholder" tag (node ${nodeId}); `;
    }

    // Update DrawBoundary 
    if (nodeData?.["type"] === 10) {
      newFlowData[nodeId]["data"]["howMeasured"] = updatedHowMeasuredContent;
      logs += `${timestamp} Updated DrawBoundary props (node ${nodeId}); `;
    }
  });

  return {
    flowData: newFlowData,
    logs: logs
  };
}

// Source: https://github.com/theopensystemslab/planx-new/blob/main/editor.planx.uk/src/@planx/components/DrawBoundary/model.ts#L58
const updatedHowMeasuredContent = `<p>We have pre-populated the map with a red outline that includes the entire property using information from Land Registry.</p><p>In some cases, this outline might not include all the works or the areas that will be closed off. This might be because you're proposing works to a public highway (such as a dropped kerb), doing works that involve multiple properties, or works to a building that is part of a larger estate.</p><p>In these cases, you should amend the red outline by dragging the edges, or erase it by clicking the 🗑️-icon on the map and draw a new outline.</p><p></p><h1>How to draw and amend the outline</h1><ol><li><p>Move the cursor to the corner you want to start with and click or tap once.<br><br></p><img alt="Move the cursor to the corner you want to start with and click or tap once." src="https://api.editor.planx.uk/file/public/9axlxbxo/Draw%20boundary_step%201.png"><p><br></p></li><li><p>Move the cursor to the next corner and click or tap.<br><br></p><img alt="Move the cursor to the next corner and click or tap." src="https://api.editor.planx.uk/file/public/5npyu7aq/Draw%20boundary_step%202.png"><p><br></p></li><li><p>Repeat until you have the shape you need.<br><br></p><img alt="Repeat until you have the shape you need." src="https://api.editor.planx.uk/file/public/3ddotc4q/Draw%20boundary_step%203.png"><p><br></p></li><li><p>Click or tap the last corner again to stop drawing.<br><br></p><img alt="Click or tap the last corner again to stop drawing." src="https://api.editor.planx.uk/file/public/pen82j73/Draw%20boundary_step%204.png"><p><br></p></li><li><p>To amend the outline, click or tap on a line and drag it into a new position.<br><br></p><img alt="To amend the outline, click or tap on a line and drag it into a new position" src="https://api.editor.planx.uk/file/public/ko11wuez/Draw%20boundary_step%205.png"><p></p></li></ol>`;

module.exports = { migrateFlowData, updatedHowMeasuredContent };
