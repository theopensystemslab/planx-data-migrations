const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  const contentType = 250;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    if (nodeData?.type !== contentType) return;

    const currentData = nodeData["data"];
    const content = currentData?.["content"];

    // Skip nodes without rich text content, or which have already been migrated
    if (!content || typeof content !== "string" || currentData["title"]) return;

    // Set the leading H1 as the component title
    const leadingH1 = content.match(/^\s*<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
    if (!leadingH1) return;

    const title = decodeHtmlEntities(removeHtmlTags(leadingH1[1])).trim();
    if (!title) return;

    // Remove the leading H1 from content, then promote H2s to H1s
    const newContent = content
      .slice(leadingH1[0].length)
      .replace(/<h2\b/gi, "<h1")
      .replace(/<\/h2>/gi, "</h1>");

    newFlowData[nodeId]["data"]["title"] = title;
    newFlowData[nodeId]["data"]["content"] = newContent;
    if (!currentData["tags"]) {
      newFlowData[nodeId]["data"]["tags"] = [];
    }

    logs += `${timestamp} Updated title and content (node ${nodeId}); `;
  });

  return {
    flowData: newFlowData,
    logs: logs,
  };
};

const removeHtmlTags = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '');
};

const decodeHtmlEntities = (str) => {
  if (!str) return '';
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
};

module.exports = { migrateFlowData };
