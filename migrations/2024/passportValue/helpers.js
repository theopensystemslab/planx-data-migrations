/**
 * Find a current  passport variable (fn) or (val) and replace it in each node in a flow (live or published
 */

const updateNodeFn = (flowData, currentPassportVariable, newPassportVariable) => {
  let newFlowData = flowData;
  Object.entries(flowData)
    .filter(([_nodeId, nodeData]) => nodeData?.["data"]?.["fn"] || nodeData?.["data"]?.["val"])
    .forEach(([nodeId, nodeData]) => {
      const passportKey = nodeData["data"]["fn"] ? "fn" : "val"
      const currentFn = nodeData["data"][`${passportKey}`]
      newFlowData[nodeId]["data"][`${passportKey}`] = currentFn.replaceAll(currentPassportVariable, newPassportVariable)
    })
  return newFlowData;
}

module.exports = { updateNodeFn };
