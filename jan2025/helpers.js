// Follows details outlined in gsheet here https://docs.google.com/spreadsheets/d/1Vtxp5BLweDPDooQoNhgOCYjCIBPRYIcOuyArGJRqOkI/edit?gid=0#gid=0
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

    // Property types (option or setvalue type)
    if (
      nodeData?.["data"]?.["val"] && 
      Object.keys(propertyTypeChanges).includes(nodeData["data"]["val"])
    ) {
      const current = nodeData["data"]["val"];
      newFlowData[nodeId]["data"]["val"] = propertyTypeChanges[current];
      logs += `${timestamp} Updated property type value (node ${nodeId}); `
    }

    // Lingering draw boundary props in calculate formulas and defaults
    if (nodeData?.["type"] === 700) {
      Object.keys(nodeData?.["data"]?.["defaults"]).map((current) => {
        if (Object.keys(drawBoundaryChanges).includes(current)) {
          const proposed = drawBoundaryChanges[current];
          newFlowData[nodeId]["data"]["defaults"][proposed] = nodeData["data"]["defaults"][current];
          delete newFlowData[nodeId]["data"]["defaults"][current];
          newFlowData[nodeId]["data"]["formula"] = nodeData["data"]["formula"].replaceAll(current, proposed);
        }
      });
    }

    // Lingering project types
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

  // Property types
  if (Object.keys(passportData).includes("property.type")) {
    newsessionData["passport"]["data"]["property.type"] = passportData["property.type"].map(
      (current) => Object.keys(propertyTypeChanges).includes(current) ? propertyTypeChanges[current] : current
    );

    Object.entries(breadcrumbs).forEach(([nodeId, crumb]) => {
      if (crumb.data?.hasOwnProperty("property.type")) {
        newsessionData["breadcrumbs"][nodeId]["data"]["property.type"] = crumb["data"]["property.type"].map(
          (current) => Object.keys(propertyTypeChanges).includes(current) ? propertyTypeChanges[current] : current
        );
      }
    });
  }

  // Planning constraints (including `_constraints` audit key)
  const combinedConstraintChanges = {...listedGradeChanges, ...floodZoneChanges};
  if (Object.keys(passportData).includes("property.constraints.planning") || Object.keys(passportData).includes("_nots")) {
    newsessionData["passport"]["data"]["property.constraints.planning"] = passportData?.["property.constraints.planning"]?.map(
      (current) => Object.keys(combinedConstraintChanges).includes(current) ? combinedConstraintChanges[current] : current.replaceAll("article4", "articleFour")
    );
    newsessionData["passport"]["data"]["_nots"]["property.constraints.planning"] = passportData?.["_nots"]?.["property.constraints.planning"]?.map(
      (current) => Object.keys(combinedConstraintChanges).includes(current) ? combinedConstraintChanges[current] : current.replaceAll("article4", "articleFour")
    );

    Object.entries(breadcrumbs).forEach(([nodeId, crumb]) => {
      if (crumb.data?.hasOwnProperty("property.constraints.planning")) {
        newsessionData["breadcrumbs"][nodeId]["data"]["property.constraints.planning"] = crumb["data"]["property.constraints.planning"].map(
          (current) => Object.keys(combinedConstraintChanges).includes(current) ? combinedConstraintChanges[current] : current.replaceAll("article4", "articleFour")
        );
      }
      if (crumb.data?.hasOwnProperty("_nots")) {
        newsessionData["breadcrumbs"][nodeId]["data"]["_nots"]["property.constraints.planning"] = crumb["data"]["_nots"]["property.constraints.planning"].map(
          (current) => Object.keys(combinedConstraintChanges).includes(current) ? combinedConstraintChanges[current] : current.replaceAll("article4", "articleFour")
        );
      }
    });
  }

  if (Object.keys(passportData).includes("_constraints")) {
    // _constraints is a list of two requests: planning data first, os roads second
    const planningDataConstraints = passportData["_constraints"][0]["constraints"];
    Object.entries(planningDataConstraints).forEach(([currentKey, currentData]) => {
      if (Object.keys(combinedConstraintChanges).includes(currentKey)) {
        const proposedKey = combinedConstraintChanges[currentKey];
        currentData["fn"] = proposedKey;
        newsessionData["passport"]["data"]["_constraints"][0]["constraints"][proposedKey] = currentData;
        delete newsessionData["passport"]["data"]["_constraints"][0]["constraints"][currentKey];

        Object.entries(breadcrumbs).forEach(([nodeId, crumb]) => {
          if (crumb.data?.hasOwnProperty("_constraints")) {
            newsessionData["breadcrumbs"][nodeId]["data"]["_constraints"][0]["constraints"][proposedKey] = currentData;
            delete newsessionData["breadcrumbs"][nodeId]["data"]["_constraints"][0]["constraints"][currentKey];
          }
        });
      }

      if (currentKey.includes("article4")) {
        const proposedKey = currentKey.replaceAll("article4", "articleFour");
        currentData["fn"] = proposedKey;
        newsessionData["passport"]["data"]["_constraints"][0]["constraints"][proposedKey] = currentData;
        delete newsessionData["passport"]["data"]["_constraints"][0]["constraints"][currentKey];

        Object.entries(breadcrumbs).forEach(([nodeId, crumb]) => {
          if (crumb.data?.hasOwnProperty("_constraints")) {
            newsessionData["breadcrumbs"][nodeId]["data"]["_constraints"][0]["constraints"][proposedKey] = currentData;
            delete newsessionData["breadcrumbs"][nodeId]["data"]["_constraints"][0]["constraints"][currentKey];
          }
        });
      }
    });

    const planningDataMetadata = passportData["_constraints"][0]["metadata"];
    Object.entries(planningDataMetadata).forEach(([currentKey, currentData]) => {
      // A4 is only relevant constraint in metadata
      if (currentKey.includes("article4")) {
        const proposedKey = currentKey.replaceAll("article4", "articleFour");
        newsessionData["passport"]["data"]["_constraints"][0]["metadata"][proposedKey] = currentData;
        delete newsessionData["passport"]["data"]["_constraints"][0]["metadata"][currentKey];

        Object.entries(breadcrumbs).forEach(([nodeId, crumb]) => {
          if (crumb.data?.hasOwnProperty("_constraints")) {
            newsessionData["breadcrumbs"][nodeId]["data"]["_constraints"][0]["metadata"][proposedKey] = currentData;
            delete newsessionData["breadcrumbs"][nodeId]["data"]["_constraints"][0]["metadata"][currentKey];
          }
        });
      }
    });
  }

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
  "alter.deck": "alter.decks",
  "alter.internal.mezzanine": "internal.mezzanine",
  "alter.internal.loft": "internal.loft",
};

const drawBoundaryChanges = {
  "property.boundary.site": "proposal.site",
  "property.boundary.site.buffered": "proposal.site.buffered",
  "property.boundary.area": "proposal.site.area",
  "property.boundary.area.hectares": "proposal.site.area.hectares",
  "property.boundary.title": "property.boundary",
  "property.boundary.title.area": "property.boundary.area",
  "property.boundary.title.area.hectares": "property.boundary.area.hectares",
};

// See https://docs.google.com/spreadsheets/d/1P_MjwuJlTshSsz1-9yLjBtZOqim93y31AGglturIaJA/edit?gid=0#gid=0
const propertyTypeChanges = {
  "commercial.abattoir": "commercial.industrial.abattoir",
  "commercial.ancilliary": "commercial",
  "commercial.community.CCTV": "commercial.utility.CCTV",
  "commercial.community.cemetary": "commercial.community.cemetery",
  "commercial.community.cemetary.cemetary": "commercial.community.cemetery.cemetery",
  "commercial.community.cemetary.chapelOfRest": "commercial.community.cemetery.chapelOfRest",
  "commercial.community.cemetary.columbarium": "commercial.community.cemetery.columbarium",
  "commercial.community.cemetary.columbarium": "commercial.community.cemetery.columbarium",
  "commercial.community.cemetary.crematorium": "commercial.community.cemetery.crematorium",
  "commercial.community.cemetary.military": "commercial.community.cemetery.military",
  "commercial.education.secondarySchool": "commercial.education.school.secondary",
  "commercial.education.secondarySchool.private": "commercial.education.school.secondary.private",
  "commercial.education.secondarySchool.state": "commercial.education.school.secondary.state",
  "commercial.fish.processing": "commercial.industrial.fishProcessing",
  "commercial.horticulture": "commercial.agriculture.horticulture",
  "commercial.horticulture.smallholding": "land.smallholding",
  "commercial.horticulture.vineyard": "commercial.agriculture.horticulture.vineyard",
  "commercial.horticulture.watercress": "commercial.agriculture.horticulture.watercress",
  "commercial.industrial.distribution": "commercial.storage.distribution",
  "commercial.industrial.distribution.solidFueld": "commercial.storage.distribution.solidFuel",
  "commercial.industrial.distribution.timber": "commercial.storage.distribution.timber",
  "commercial.industrial.light.storage": "commercial.storage",
  "commercial.industrial.light.storage.crops": "commercial.storage.crops",
  "commercial.industrial.light.storage.solidFuel": "commercial.storage.solidFuel",
  "commercial.industrial.light.storage.timber": "commercial.storage.timber",
  "commercial.information": "other.information",
  "commercial.information.advertising": "other.information.advertising",
  "commercial.information.tourist.sign": "other.information.touristSign",
  "commercial.information.tourist.visitor": "commercial.retail.visitorInformation",
  "commercial.information.traffic.sign": "other.information.trafficSign",
  "commercial.leisure.sport.historicVehicles": "commercial.leisure.museum.historicVehicles",
  "commercial.medical.care.home": "commercial.medical.careHome",
  "commercial.medical.care.hospital": "commercial.medical.hospital",
  "commercial.retail.atm": "commercial.utility.atm",
  "commercial.storageLand": "commercial.storage.land",
  "commercial.storageLand.building": "commercial.industrial.buildersYard",
  "commercial.storageLand.general": "commercial.storage.land.general",
  "commercial.transport.bus": "commercial.transport.road.bus",
  "commercial.transport.dock": "commercial.transport.water.dock",
  "commercial.transport.dock.ferry.passengers": "commercial.transport.water.dock.ferry.passengers",
  "commercial.transport.dock.ferry.vehicles": "commercial.transport.water.dock.ferry.vehicles",
  "commercial.transport.dock.generalBerth": "commercial.transport.water.dock.generalBerth",
  "commercial.transport.dock.refuelling": "commercial.transport.water.dock.refuelling",
  "commercial.transport.dock.slipway": "commercial.transport.water.dock.slipway",
  "commercial.transport.dock.slipway": "commercial.transport.water.dock.passenger",
  "commercial.transport.dock.tankerBerth": "commercial.transport.water.dock.tankerBerth",
  "commercial.transport.infrastructure.aqueduct": "commercial.transport.water.infrastructure.aqueduct",
  "commercial.transport.infrastructure.lock": "commercial.transport.water.infrastructure.lock",
  "commercial.transport.infrastructure.weighing": "commercial.transport.road.infrastructure.weighing",
  "commercial.transport.infrastructure.weir": "commercial.transport.water.infrastructure.weir",
  "commercial.transport.marina": "commercial.transport.water.marina",
  "commercial.transport.mooring": "commercial.transport.water.mooring",
  "commercial.transport.overnightLorryPark": "commercial.transport.road.overnightLorryPark",
  "commercial.transport.parking": "commercial.transport.road.parking",
  "commercial.transport.parking.car": "commercial.transport.road.parking.car",
  "commercial.transport.parking.coach": "commercial.transport.road.parking.coach",
  "commercial.transport.parking.commercialVehicle": "commercial.transport.road.parking.commercialVehicle",
  "commercial.transport.parking.parkAndRide": "commercial.transport.road.parking.parkAndRide",
  "commercial.transport.railAsset": "commercial.transport.rail.railAsset",
  "commercial.transport.storage": "commercial.storage.transport",
  "commercial.transport.storage.boat": "commercial.storage.transport.boat",
  "commercial.transport.storage.bus": "commercial.storage.transport.bus",
  "commercial.transport.terminal.bus": "commercial.transport.road.terminal.bus",
  "commercial.transport.terminal.train": "commercial.transport.rail.terminal",
  "commercial.transport.terminal.vehicularRail": "commercial.transport.rail.terminal",
  "commercial.transport.track": "commercial.transport.rail.track",
  "commercial.transport.track.cliff": "commercial.transport.rail.track",
  "commercial.transport.track.monorail": "commercial.transport.rail.monorail",
  "land.agriculture": "commercial.agriculture.land",
  "land.agriculture.crops": "commercial.agriculture.land.crops",
  "land.agriculture.grazing": "commercial.agriculture.land.grazing",
  "land.agriculture.orchard": "commercial.agriculture.land.orchard",
  "land.building": "other.ancillary",
  "land.building.aviary": "other.ancillary.aviary",
  "land.building.bandstand": "other.ancillary.bandstand",
  "land.building.pavilion": "other.ancillary.pavilion",
  "land.building.sportsViewing": "other.ancillary.sportsViewing",
  "residential.dwelling": "residential",
  "residential.dwelling.boat": "residential.boat",
  "residential.dwelling.caravan": "residential.caravan",
  "residential.dwelling.flat": "residential.flat",
  "residential.dwelling.flat.multiple": "residential.multiple",
  "residential.dwelling.holiday": "residential.holiday",
  "residential.dwelling.house": "residential.house",
  "residential.dwelling.house.detached": "residential.house.detached",
  "residential.dwelling.house.multiple": "residential.multiple",
  "residential.dwelling.house.semiDetached": "residential.house.semiDetached",
  "residential.dwelling.house.terrace": "residential.house.terrace",
  "residential.dwelling.house.terrace.end": "residential.house.terrace.end",
  "residential.dwelling.house.terrace.mid": "residential.house.terrace.mid",
  "residential.dwelling.liveWork": "residential.liveWork",
  "residential.dwelling.shelteredAccommodation": "residential.shelteredAccommodation",
  "residential.HMO.student": "residential.student",
};

module.exports = { migrateFlowData, migrateSessionData };
