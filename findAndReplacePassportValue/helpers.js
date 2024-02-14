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
      const currentValueSegments = currentFn.split(".")
      const matchIndexPosition = currentValueSegments.indexOf(currentPassportVariable)
      if (matchIndexPosition !==-1) {
        currentValueSegments.splice(matchIndexPosition, 1, newPassportVariable)
        const updatedPassportVariable = currentValueSegments.join(".")
        newFlowData[nodeId]["data"][`${passportKey}`] = updatedPassportVariable
      }
    })
  return newFlowData;
}

module.exports = { updateNodeFn };
