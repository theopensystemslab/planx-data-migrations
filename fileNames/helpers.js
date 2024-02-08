/**
 * Find each FileUpload node in a flow (live or published) and update its' passport variable (fn)
 */
const updateUploadNodeFn = (flowData) => {
  let newFlowData = flowData;
  Object.entries(flowData)
    .filter(([_nodeId, nodeData]) => nodeData["type"] === 140)
    .forEach(([uploadNodeId, uploadNodeData]) => {
      const currentFn = uploadNodeData["data"]["fn"];
      if (existingFns.includes(currentFn)) {
        newFlowData[uploadNodeId]["data"]["fn"] = filesNowToNext[currentFn];
      }
    });
  return newFlowData;
}

/**
 * Find each FileUploadAndLabel node in a flow (live or published) and update the passport variable (fn) of each of its' defined files
 */
const updateUploadAndLabelNodeFns = (flowData) => {
  let newFlowData = flowData;
  Object.entries(flowData)
    .filter(([_nodeId, nodeData]) => nodeData["type"] === 145)
    .forEach(([uploadAndLabelNodeId, uploadAndLabelNodeData]) => {
      uploadAndLabelNodeData["data"]["fileTypes"].forEach((file, i) => {
        const currentFn = file?.fn;
        if (existingFns.includes(currentFn)) {
          newFlowData[uploadAndLabelNodeId]["data"]["fileTypes"][i]["fn"] = filesNowToNext[currentFn];
        }
      });
    });
  return newFlowData;
}

/**
 * Find each TextInput (110) or DateInput (120) node in a flow (live or published) that asks about what a file contains and update its' passport variable (fn)
 */
const updateTextAndDateInputNodeFns = (flowData) => {
  let newFlowData = flowData;
  Object.entries(flowData)
    .filter(([_nodeId, nodeData]) => nodeData["type"] === 110 || nodeData["type"] === 120)
    .forEach(([inputNodeId, inputNodeData]) => {
      const currentFn = inputNodeData["data"]["fn"];
      existingFns.forEach((existingFn) => {
        if (currentFn?.startsWith(existingFn)) {
          newFlowData[inputNodeId]["data"]["fn"] = currentFn.replace(existingFn, filesNowToNext[existingFn]);
        }
      });
    });
  return newFlowData;
}

const filesNowToNext = {
  "applicant.disability.evidence": "disabilityExemptionEvidence",
  "property.drawing.elevation": "elevations.existing",
  "property.drawing.floorPlan": "floorPlan.existing",
  "property.drawing.roofPlan": "roofPlan.existing",
  "property.drawing.section": "sections.existing",
  "property.drawing.sitePlan": "sitePlan.existing",
  "property.drawing.usePlan": "usePlan.existing",
  "property.photograph": "photographs.existing",
  "proposal.document.affordableHousingStatement": "affordableHousingStatement",
  "proposal.document.bankStatement": "bankStatement",
  "proposal.document.basementImpact": "basementImpactStatement",
  "proposal.document.buildingControl.certificate": "buildingControlCertificate",
  "proposal.document.conditionSurvey": "conditionSurvey",
  "proposal.document.construction.invoice": "constructionInvoice",
  "proposal.document.contamination": "contaminationReport",
  "proposal.document.councilTaxBill": "councilTaxBill",
  "proposal.document.crimePreventionStrategy": "crimePreventionStrategy",
  "proposal.document.declaration": "statutoryDeclaration",
  "proposal.document.designAndAccess": "designAndAccessStatement",
  "proposal.document.ecologyReport": "ecologyReport",
  "proposal.document.eia": "environmentalImpactAssessment",
  "proposal.document.energyStatement": "energyStatement",
  "proposal.document.fireSafety": "fireSafetyReport",
  "proposal.document.floodRisk": "floodRiskAssessment",
  "proposal.document.foulDrainage": "foulDrainageAssessment",
  "proposal.document.heritageStatement": "heritageStatement",
  "proposal.document.hydrologyReport": "hydrologyReport",
  "proposal.document.internalElevations": "internalElevations",
  "proposal.document.internalSections": "internalSections",
  "proposal.document.landContaminationAssessment": "landContaminationAssessment",
  "proposal.document.landscapeStrategy": "landscapeStrategy",
  "proposal.document.lightingAssessment": "lightingAssessment",
  "proposal.document.lvia": "landscapeAndVisualImpactAssessment",
  "proposal.document.mineral.assessment": "mineralsAndWasteAssessment",
  "proposal.document.mineral.bioAerosolAssessment": "bioaerosolAssessment",
  "proposal.document.mineral.birdStrikeRiskManagementPlan": "birdstrikeRiskManagementPlan",
  "proposal.document.mineral.boreholeOrTrialPitAnalysis": "boreholeOrTrialPitAnalysis",
  "proposal.document.mineral.geoAssessment": "geodiversityAssessment",
  "proposal.document.mineral.hydrologicalAssessment": "hydrologicalAssessment",
  "proposal.document.mineral.litterVerminAndBirdControl": "litterVerminAndBirdControlDetails",
  "proposal.document.mineral.mitigationAndMonitoring": "emissionsMitigationAndMonitoringScheme",
  "proposal.document.mineral.storageTreatmentDisposal": "storageTreatmentAndWasteDisposalDetails",
  "proposal.document.newDwellingSchedule": "newDwellingsSchedule",
  "proposal.document.noise": "noiseAssessment",
  "proposal.document.openSpaceAssessment": "openSpaceAssessment",
  "proposal.document.other.evidence": "otherEvidence",
  "proposal.document.other": "otherDocument",
  "proposal.document.parkingPlan": "parkingPlan",
  "proposal.document.planningStatement": "planningStatement",
  "proposal.document.statementOfCommunityInvolvement": "statementOfCommunityInvolvement",
  "proposal.document.sunAndDaylight": "sunlightAndDaylightReport",
  "proposal.document.sustainabilityStatement": "sustainabilityStatement",
  "proposal.document.tenancyAgreement": "tenancyAgreement",
  "proposal.document.tenancyInvoice": "tenancyInvoice",
  "proposal.document.townCentre.impactAssessment": "townCentreImpactAssessment",
  "proposal.document.townCentre.sequentialAssessment": "townCentreSequentialAssessment",
  "proposal.document.transport": "transportAssessment",
  "proposal.document.travelPlan": "travelPlan",
  "proposal.document.treeCanopyCalculator": "treeCanopyCalculator",
  "proposal.document.treesReport": "treesReport",
  "proposal.document.utilitiesStatement": "utilitiesStatement",
  "proposal.document.utility.bill": "utilityBill",
  "proposal.document.ventilationStatement": "ventilationStatement",
  "proposal.document.waterAndRecyclingStrategy": "wasteAndRecyclingStrategy",
  "proposal.document.waterEnvironmentAssessment": "waterEnvironmentAssessment",
  "proposal.drawing.elevation": "elevations.proposed",
  "proposal.drawing.floorPlan": "floorPlan.proposed",
  "proposal.drawing.locationPlan": "locationPlan",
  "proposal.drawing.other": "otherDrawing",
  "proposal.drawing.roofPlan": "roofPlan.proposed",
  "proposal.drawing.section": "sections.proposed",
  "proposal.drawing.sitePlan": "sitePlan.proposed",
  "proposal.drawing.streetScene": "streetScene",
  "proposal.drawing.unitPlan": "unitPlan.proposed",
  "proposal.drawing.usePlan": "usePlan.proposed",
  "proposal.photograph.evidence": "photographs.proposed",
  "proposal.photograph": "photographs.proposed",
  "proposal.visualisation": "visualisations"
};

const existingFns = Object.keys(filesNowToNext);

module.exports = { updateUploadNodeFn, updateUploadAndLabelNodeFns, updateTextAndDateInputNodeFns };
