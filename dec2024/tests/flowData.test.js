const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateFlowData } = require("./../helpers");

describe("migrate flow data function", () => {
  it("#returns the expected data", () => {
    const migratedFlow = migrateFlowData(oldFlow).flowData;
    assert.deepStrictEqual(migratedFlow, expectedFlow);
  });
});

const expectedFlow = {
  "_root": {
    "edges": [
      "FindProperty",
      "PropertyInformation",
      "DrawBoundary",
      "Calculate",
      "Question"
    ]
  },
  "FindProperty": {
    "type": 9,
    "data": {
      "title": "Find the property",
      "allowNewAddresses": false,
      "newAddressTitle": "Click or tap at where the property is on the map and name it below",
      "newAddressDescription": "You will need to select a location and provide a name to continue",
      "newAddressDescriptionLabel": "Name the site"
    }
  },
  "PropertyInformation": {
    "type": 12,
    "data": {
      "title": "About the property",
      "description": "<p>This is the information we currently have about the property.</p><p>The blue line shows the <strong>outline</strong> of the property (known as the title boundary). If this looks incorrect, go back a step and <strong>check you have selected the correct address</strong>.</p><p>We use this outline to create the site boundary where the project will take place. If your project covers a different area, you can change or redraw the site boundary on the next page.</p>",
      "showPropertyTypeOverride": true,
    }
  },
  "DrawBoundary": {
    "type": 10,
    "data": {
      "howMeasured": "<p>We have pre-populated the map with a red outline that includes the entire property using information from Land Registry.</p><p>In some cases, this outline might not include all the works or the areas that will be closed off. This might be because you&apos;re proposing works to a public highway (such as a dropped kerb), doing works that involve multiple properties, or works to a building that is part of a larger estate.</p><p>In these cases, you should amend the red outline by dragging the edges, or erase it by clicking the :wastebasket:-icon on the map and draw a new outline.</p><p></p><h1>How to draw and amend the outline</h1><ol><li><p>Move the cursor to the corner you want to start with and click or tap once.</p></li><li><p>Move the cursor to the next corner and click or tap.</p></li><li><p>Repeat until you have the shape you need.</p></li><li><p>Click or tap the last corner again to stop drawing.</p></li><li><p>To amend the outline, click or tap on a line and drag it into a new position.</p></li></ol><img src=\"https://api.editor.planx.uk/file/public/dni98ojg/Draw_Outline_2.gif\">",
      "policyRef": "<p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.legislation.gov.uk/uksi/2015/595/article/7\">The Town and Country Planning (Development Management Procedure) (England) Order 2015</a>,</p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.gov.uk/government/collections/planning-practice-guidance\">Planning Practice Guidance (PPG)</a></p>",
      "info": "<p>This outline identifies the location of the proposed changes on a map. This information is required for all planning applications. It is sometimes called a &apos;red line drawing&apos; or &apos;location plan&apos;.</p>",
      "title": "Confirm your location plan",
      "description": "<p>The red line shown below should include:</p><ul><li><p>the outline of your property boundary</p></li><li><p>any works outside the property boundary</p></li><li><p>areas that will be closed off or you&apos;ll need access to during the works</p></li></ul><p>If the red line already includes all these, select continue. If not, select More information for guidance on how to amend or redraw the outline.</p>",
      "titleForUploading": "Upload a location plan",
      "descriptionForUploading": "<p>Your location plan must:</p><ul><li><p>be based on an accurate, recognisable map</p></li><li><p>be drawn to a scale, labelled, and/or marked with a scale bar</p></li><li><p>show the site outline in red</p></li><li><p>include a<strong> </strong>north point</p></li></ul>",
      "hideFileUpload": false,
      "fn": "proposal.site",
    }
  },
  "Question": {
    "type": 100,
    "data": {
      "fn": "proposal.projectType",
      "text": "What's your project?",
      "neverAutoAnswer": false,
      "policyRef": "<p><a target=\"_blank\" rel=\"noopener\" href=\"https://www.legislation.gov.uk/uksi/1987/764\">The Town and Country Planning (<em>Use Classes</em>) <em>Order</em> 1987</a> as amended by the <a target=\"_blank\" rel=\"noopener\" href=\"https://www.legislation.gov.uk/uksi/2020/757\">Use Class Order 2020</a></p>"
    },
    "edges": [
      "Answer",
      "AnswerUnsupportedSchema"
    ]
  },
  "Answer": {
    "type": 200,
    "data": {
      "text": "Build something new",
      "val": "new.temporaryStructure",
      "flags": [
        "PRIOR_APPROVAL"
      ]
    }
  },
  "AnswerUnsupportedSchema": {
    "type": 200,
    "data": {
      "text": "Change of use",
      "val": "changeOfUse.annexe",
      "flags": [
        "NO_APP_REQUIRED"
      ]
    }
  },
  "Calculate": {
    "type": 700,
    "data": {
      "fn": "fee",
      "formula": "1+1",
      "formatOutputForAutomations": false,
      "title": "Calculate the fee",
      "tags": [],
      "defaults": {},
      "samples": {}
    }
  }
};

const oldFlow = {
  "_root": {
    "edges": [
      "FindProperty",
      "PropertyInformation",
      "DrawBoundary",
      "Calculate",
      "Question"
    ]
  },
  "FindProperty": {
    "type": 9,
    "data": {
      "title": "Find the property",
      "allowNewAddresses": false,
      "newAddressTitle": "Click or tap at where the property is on the map and name it below",
      "newAddressDescription": "You will need to select a location and provide a name to continue",
      "newAddressDescriptionLabel": "Name the site"
    }
  },
  "PropertyInformation": {
    "type": 12,
    "data": {
      "title": "About the property",
      "description": "This is the information we currently have about the property, including its title boundary shown in blue from the Land Registry",
      "showPropertyTypeOverride": false
    }
  },
  "DrawBoundary": {
    "type": 10,
    "data": {
      "howMeasured": "<p>We have pre-populated the map with a red outline that includes the entire property using information from Land Registry.</p><p>In some cases, this outline might not include all the works or the areas that will be closed off. This might be because you&apos;re proposing works to a public highway (such as a dropped kerb), doing works that involve multiple properties, or works to a building that is part of a larger estate.</p><p>In these cases, you should amend the red outline by dragging the edges, or erase it by clicking the :wastebasket:-icon on the map and draw a new outline.</p><p></p><h1>How to draw and amend the outline</h1><ol><li><p>Move the cursor to the corner you want to start with and click or tap once.</p></li><li><p>Move the cursor to the next corner and click or tap.</p></li><li><p>Repeat until you have the shape you need.</p></li><li><p>Click or tap the last corner again to stop drawing.</p></li><li><p>To amend the outline, click or tap on a line and drag it into a new position.</p></li></ol><img src=\"https://api.editor.planx.uk/file/public/dni98ojg/Draw_Outline_2.gif\">",
      "policyRef": "<p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.legislation.gov.uk/uksi/2015/595/article/7\">The Town and Country Planning (Development Management Procedure) (England) Order 2015</a>,</p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.gov.uk/government/collections/planning-practice-guidance\">Planning Practice Guidance (PPG)</a></p>",
      "info": "<p>This outline identifies the location of the proposed changes on a map. This information is required for all planning applications. It is sometimes called a &apos;red line drawing&apos; or &apos;location plan&apos;.</p>",
      "title": "Confirm your location plan",
      "description": "<p>The red line shown below should include:</p><ul><li><p>the outline of your property boundary</p></li><li><p>any works outside the property boundary</p></li><li><p>areas that will be closed off or you&apos;ll need access to during the works</p></li></ul><p>If the red line already includes all these, select continue. If not, select More information for guidance on how to amend or redraw the outline.</p>",
      "titleForUploading": "Upload a location plan",
      "descriptionForUploading": "<p>Your location plan must:</p><ul><li><p>be based on an accurate, recognisable map</p></li><li><p>be drawn to a scale, labelled, and/or marked with a scale bar</p></li><li><p>show the site outline in red</p></li><li><p>include a<strong> </strong>north point</p></li></ul>",
      "hideFileUpload": false,
      "dataFieldBoundary": "property.boundary.site",
      "dataFieldArea": "property.boundary.area"
    }
  },
  "Question": {
    "type": 100,
    "data": {
      "fn": "proposal.projectType",
      "text": "What's your project?",
      "neverAutoAnswer": false,
      "policyRef": "<p><a target=\"_blank\" rel=\"noopener\" href=\"https://www.legislation.gov.uk/uksi/1987/764\">The Town and Country Planning (<em>Use Classes</em>) <em>Order</em> 1987</a> as amended by the <a target=\"_blank\" rel=\"noopener\" href=\"https://www.legislation.gov.uk/uksi/2020/757/made\">Use Class Order 2020</a></p>"
    },
    "edges": [
      "Answer",
      "AnswerUnsupportedSchema"
    ]
  },
  "Answer": {
    "type": 200,
    "data": {
      "text": "Build something new",
      "val": "new.temporaryStructure",
      "flag": [
        "PRIOR_APPROVAL"
      ]
    }
  },
  "AnswerUnsupportedSchema": {
    "type": 200,
    "data": {
      "text": "Change of use",
      "val": "changeofUse.annexe",
      "flag": "NO_APP_REQUIRED"
    }
  },
  "Calculate": {
    "type": 700,
    "data": {
      "output": "fee",
      "formula": "1+1",
      "formatOutputForAutomations": false,
      "title": "Calculate the fee",
      "tags": [],
      "defaults": {},
      "samples": {}
    }
  }
};
