/**
 * Find a current  passport variable (fn) or (val) and replace it in each node in a flow (live or published
 */

function replaceAllOccurrences(fullPassportValue, currentPassportVariable, newPassportVariable) {
  const regex = new RegExp('\\b' + currentPassportVariable + '\\b', 'g');
  return fullPassportValue.replace(regex, newPassportVariable);
}

const updateNodeFn = (flowData, currentPassportVariable, newPassportVariable) => {
  let newFlowData = flowData;
  Object.entries(flowData)
    .filter(([_nodeId, nodeData]) => nodeData?.["data"]?.["fn"] || nodeData?.["data"]?.["val"])
    .forEach(([nodeId, nodeData]) => {
      const passportKey = nodeData["data"]["fn"] ? "fn" : "val"
      const currentFn = nodeData["data"][`${passportKey}`]
      newFlowData[nodeId]["data"][`${passportKey}`] = replaceAllOccurrences(currentFn, currentPassportVariable, newPassportVariable)
    })
  return newFlowData;
}

module.exports = { updateNodeFn };
