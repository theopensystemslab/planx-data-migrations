// Follows details outlined in gsheet here https"://docs.google.com/spreadsheets/d/1Vtxp5BLweDPDooQoNhgOCYjCIBPRYIcOuyArGJRqOkI/edit?gid=0#gid=0
const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    // Project type schema
    if (nodeData?.["data"]?.["val"] === "changeofUse.annexe") {
      newFlowData[nodeId]["data"]["val"] = "changeOfUse.annexe";
      logs += `${timestamp} Updated project type value (node ${nodeId}); `;
    }

    // Help text
    const policyRef = nodeData?.["data"]?.["policyRef"];
    if (policyRef?.includes("legislation.gov.uk") && policyRef?.includes("/made")) {
      newFlowData[nodeId]["data"]["policyRef"] = nodeData["data"]["policyRef"].replaceAll("/made", "");
      logs += `${timestamp} Updated help text policy reference link (node ${nodeId}); `;
    }

    // About the property
    if (nodeData?.["type"] === 12) {
      newFlowData[nodeId]["data"] = defaultPropertyInformationNodeData;
      logs += `${timestamp} Updated PropertyInformation content (node ${nodeId}); `;
    }

    // Calculate prop
    if (nodeData?.["type"] === 700 && nodeData?.["data"]?.["output"]) {
      newFlowData[nodeId]["data"]["fn"] = nodeData["data"]["output"];
      delete newFlowData[nodeId]["data"]["output"];
      logs += `${timestamp} Updated Calculate prop (node ${nodeId}); `;
    }

    // DrawBoundary props
    if (nodeData?.["type"] === 10 && nodeData?.["data"]?.["dataFieldBoundary"]) {
      newFlowData[nodeId]["data"]["fn"] = "proposal.site";
      delete newFlowData[nodeId]["data"]["dataFieldBoundary"];
      delete newFlowData[nodeId]["data"]["dataFieldArea"];
      logs += `${timestamp} Updated DrawBoundary props (node ${nodeId}); `;
    }

    // Filter Options / Answers flag prop
    if (nodeData?.["type"] === 200 && nodeData?.["data"]?.["flag"]) {
      const currentFlagValue = nodeData["data"]["flag"];
      if (typeof currentFlagValue === "string") {
        // Legacy nodes are still string values
        newFlowData[nodeId]["data"]["flags"] = [currentFlagValue];
        delete newFlowData[nodeId]["data"]["flag"];
      } else {
        // New nodes are already arrays, but prop name needs to be made plural
        newFlowData[nodeId]["data"]["flags"] = currentFlagValue;
        delete newFlowData[nodeId]["data"]["flag"];
      }
      logs += `${timestamp} Updated Answer flags prop (node ${nodeId}); `;
    }
  });

  return {
    flowData: newFlowData,
    logs: logs
  };
}

const defaultPropertyInformationNodeData = {
  "title": "About the property",
  "description": "<p>This is the information we currently have about the property.</p><p>The blue line shows the <strong>outline</strong> of the property (known as the title boundary). If this looks incorrect, go back a step and <strong>check you have selected the correct address</strong>.</p><p>We use this outline to create the site boundary where the project will take place. If your project covers a different area, you can change or redraw the site boundary on the next page.</p>",
  "showPropertyTypeOverride": true,
};

const migrateSessionData = (sessionData) => {
  const newsessionData = sessionData;

  const passportData = sessionData?.passport?.data;
  const breadcrumbs = sessionData?.breadcrumbs;

  // "current": "proposed"
  const drawBoundaryChanges = {
    "property.boundary.site": "proposal.site",
    "property.boundary.site.buffered": "proposal.site.buffered",
    "property.boundary.area": "proposal.site.area",
    "property.boundary.area.hectares": "proposal.site.area.hectares",
    "property.boundary.title": "property.boundary",
    "property.boundary.title.area": "property.boundary.area",
    "property.boundary.title.area.hectares": "property.boundary.area.hectares",
  };

  Object.keys(drawBoundaryChanges).forEach((currentDataField) => {
    if (Object.keys(passportData).includes(currentDataField)) {
      // Update passport keys
      newsessionData["passport"]["data"][drawBoundaryChanges[currentDataField]] = passportData[currentDataField];
      delete newsessionData["passport"]["data"][currentDataField];

      // Update breadcrumbs
      Object.entries(breadcrumbs).forEach(([nodeId, crumb]) => {
        if (crumb.data?.hasOwnProperty(currentDataField)) {
          newsessionData["breadcrumbs"][nodeId]["data"][drawBoundaryChanges[currentDataField]] = crumb.data[currentDataField];
          delete newsessionData["breadcrumbs"][nodeId]["data"][currentDataField];
        }
      });
    }
  });

  return newsessionData;
}

module.exports = { migrateFlowData, migrateSessionData };
