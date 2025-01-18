// Follows details outlined in gsheet here https"://docs.google.com/spreadsheets/d/1Vtxp5BLweDPDooQoNhgOCYjCIBPRYIcOuyArGJRqOkI/edit?gid=0#gid=0
const migrateFlowData = (flowData) => {
  const timestamp = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

  let newFlowData = flowData;
  let logs = "";

  Object.entries(flowData).forEach(([nodeId, nodeData]) => {
    // Flags
    if (nodeData?.["type"] === 200) {
      // Question or checklists with `flags` array
      if (nodeData?.["data"]?.["flags"]?.length > 0) {
        newFlowData[nodeId]["data"]["flags"] = nodeData["data"]["flags"].map(current =>
          flagChanges[current]
        );
      }

      // Filter options with flag as `val`
      const current = nodeData?.["data"]?.["val"];
      if (current && Object.keys(flagChanges).includes(current)) {
        const proposed = flagChanges[current];
        newFlowData[nodeId]["data"]["val"] = proposed;
        if (proposed.endsWith(".consentNeeded")) {
          newFlowData[nodeId]["data"]["text"] = "Consent needed";
        }
      }
    }

    // Filter flagset category change
    if (nodeData?.["type"] === 500 && nodeData?.["data"]?.["category"] === "Listed building consent") {
      newFlowData[nodeId]["data"]["category"] = "Works to listed buildings";
    }

    // Article 4s (options and selectable planning constraints)
    if (nodeData?.["type"] === 200 && nodeData?.["data"]?.["val"]?.startsWith("article4")) {
      newFlowData[nodeId]["data"]["val"] = nodeData["data"]["val"].replace("article4", "articleFour");
    }

    if (
      nodeData?.["type"] === 11 &&
      (nodeData?.["data"]?.["dataValues"]?.includes("article4") || nodeData?.["data"]?.["dataValues"]?.includes("article4.caz"))
    ) {
      newFlowData[nodeId]["data"]["dataValues"] = nodeData["data"]["dataValues"].map(
        current => current.startsWith("article4") ? current.replace("article4", "articleFour") : current
      );
    }

    // Listed building grades (options only)
    if (nodeData?.["type"] === 200 && nodeData?.["data"]?.["val"]?.startsWith("listed.")) {
      const current = nodeData["data"]["val"];
      newFlowData[nodeId]["data"]["val"] = listedGradeChanges[current];
    }

    // Flood risk zones (options only)
    if (nodeData?.["type"] === 200 && nodeData?.["data"]?.["val"]?.startsWith("flood.")) {
      const current = nodeData["data"]["val"];
      newFlowData[nodeId]["data"]["val"] = floodZoneChanges[current];
    }

    // Property types

    // Draw boundary props in Calculate formulas

    // Overflow project types
    if (nodeData?.["type"] === 200 && nodeData?.["data"]?.["val"] && Object.keys(projectTypeChanges).includes(nodeData["data"]["val"])) {
      const current = nodeData["data"]["val"];
      newFlowData[nodeId]["data"]["val"] = projectTypeChanges[current];
      logs += `${timestamp} Updated project type value (node ${nodeId}); `;
    }
  });

  return {
    flowData: newFlowData,
    logs: logs
  };
}

const migrateSessionData = (sessionData) => {
  const newsessionData = sessionData;

  const passportData = sessionData?.passport?.data;
  const breadcrumbs = sessionData?.breadcrumbs;

  // // "current": "proposed"
  // const drawBoundaryChanges = {
  //   "property.boundary.site": "proposal.site",
  //   "property.boundary.site.buffered": "proposal.site.buffered",
  //   "property.boundary.area": "proposal.site.area",
  //   "property.boundary.area.hectares": "proposal.site.area.hectares",
  //   "property.boundary.title": "property.boundary",
  //   "property.boundary.title.area": "property.boundary.area",
  //   "property.boundary.title.area.hectares": "property.boundary.area.hectares",
  // };

  // Object.entries(drawBoundaryChanges).forEach(([current, proposed]) => {
  //   if (Object.keys(passportData).includes(current)) {
  //     // Update passport keys
  //     newsessionData["passport"]["data"][proposed] = passportData[current];
  //     delete newsessionData["passport"]["data"][current];

  //     // Update breadcrumbs
  //     Object.entries(breadcrumbs).forEach(([nodeId, crumb]) => {
  //       if (crumb.data?.hasOwnProperty(current)) {
  //         newsessionData["breadcrumbs"][nodeId]["data"][proposed] = crumb.data[current];
  //         delete newsessionData["breadcrumbs"][nodeId]["data"][current];
  //       }
  //     });
  //   }
  // });

  return newsessionData;
}

const flagChanges = {
  "IMMUNE": "flag.pp.immune",
  "MISSING_INFO": "flag.pp.missingInfo",
  "PLANNING_PERMISSION_REQUIRED": "flag.pp.permissionNeeded",
  "PRIOR_APPROVAL": "flag.pp.priorApproval",
  "PP-NOTICE": "flag.pp.notice",
  "NO_APP_REQUIRED": "flag.pp.permittedDevelopment",
  "PP-NOT_DEVELOPMENT": "flag.pp.notDevelopment",
  "LB-MISSING_INFO": "flag.lbc.missingInfo",
  "LB-REQUIRED": "flag.lbc.consentNeeded",
  "LB-DE_MINIMIS": "flag.lbc.deMinimis",
  "LB-NOT_REQUIRED": "flag.lbc.notRequired",
  "TR-MISSING_INFO": "flag.wtt.missingInfo",
  "TR-REQUIRED": "flag.wtt.consentNeeded",
  "TR-DE_MINIMIS": "flag.wtt.notice",
  "TR-NOT_REQUIRED": "flag.wtt.notRequired",
  "DC-MISSING_INFO": "flag.dca.missingInfo",
  "DC-REQUIRED": "flag.dca.consentNeeded",
  "DC-DE_MINIMIS": "flag.dca.deMinimis",
  "DC-NOT_REQUIRED": "flag.dca.notRequired",
  "PO_MISSING_INFO": "flag.planningPolicy.missingInfo",
  "LIKELY_FAIL": "flag.planningPolicy.fail",
  "EDGE_CASE": "flag.planningPolicy.edgeCase",
  "LIKELY_PASS": "flag.planningPolicy.pass",
  "CO_MISSING_INFO": "flag.cil.missingInfo",
  "CO_EXEMPTION_VOID": "flag.cil.exemptionVoid",
  "CO_EXEMPT": "flag.cil.exempt",
  "CO_RELIEF_VOID": "flag.cil.reliefVoid",
  "CO_RELIEF": "flag.cil.relief",
  "CO_LIABLE": "flag.cil.liable",
  "CO_NOT_LIABLE": "flag.cil.notLiable",
  "MCOU_TRUE": "flag.mcou.true",
  "MCOU_FALSE": "flag.mcou.false",
};

const listedGradeChanges = {
  "listed.grade.I": "listed.gradeOne",
  "listed.grade.II": "listed.gradeTwo",
  "listed.grade.II*": "listed.gradeTwoStar",
};

const floodZoneChanges = {
  "flood.zone.1": "flood.zoneOne",
  "flood.zone.2": "flood.zoneTwo",
  "flood.zone.3": "flood.zoneThree",
};

const projectTypeChanges = {
  "ChangeOfUse": "changeOfUse",
};

module.exports = { migrateFlowData, migrateSessionData };
