const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    // Only operate on "Pay" nodes...
    if (!nodeData.type == 400) return;
    // ...with metdata
    if (!nodeData.data?.govPayMetadata?.length) return;

    newFlowData[nodeId].data.govPayMetadata = nodeData.data.govPayMetadata.map(data => {
      const isDataValue = typeof data.value === "string" && data.value.startsWith("@");
      if (isDataValue) return ({
        key: data.key,
        // Strip leading "@" character
        value: data.value.substring(1),
        type: "data",
      }) 

      return ({
        ...data,
        type: "static"
      });
    })

    logs += `${timestamp} Updated GovPay metadata (node ${nodeId}); `;
  });

  return {
    flowData: newFlowData,
    logs: logs
  };
}

module.exports = { migrateFlowData };
