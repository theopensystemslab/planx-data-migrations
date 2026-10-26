const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateFlowData } = require("./helpers")

describe("migrate flow data function", () => {
    it("#returns the expected data", () => {
        const migratedFlow = migrateFlowData(oldFlow).flowData;
        assert.deepStrictEqual(migratedFlow, expectedFlow);
    });
});

// Example nodes
const oldFlow = {
    "NoticeFullyCustomised": {
        "data": {
            "tags": [],
            "info": "<p>Why it matters</p>",
            "color": "#FFDD00",
            "notes": "Internal note",
            "title": "You may need planning permission",
            "policyRef": "<p>Source</p>",
            "description": "<p>Some notice text with a <a href=\"https://www.google.com\">link</a></p>",
            "howMeasured": "<p>How it is defined</p>",
            "resetButton": true,
        },
        "type": 8
    },
    "NoticeMinimalCustomisation": {
        "data": {
            "tags": [],
            "color": "#EFEFEF",
            "title": "Minimal notice",
            "description": "<p>Some notice text</p>",
            "resetButton": false
        },
        "type": 8
    },
    "OldNoticeWithJustTitle": {
        "data": {
            "tags": [],
            "title": "Notice without colour or description"
        },
        "type": 8
    },
    "CustomisableNotice": {
        "data": {
            "tags": [],
            "color": "#2b00fe",
            "title": "Templated notice",
            "description": "<p>Some templated text</p>",
            "resetButton": false,
            "isTemplatedNode": true,
            "templatedNodeInstructions": "Update this notice for your council",
            "areTemplatedNodeInstructionsRequired": true
        },
        "type": 8
    },
    "ContentNode": {
        "data": {
            "tags": [],
            "title": "Existing content",
            "content": "<p>Should not change</p>",
            "resetButton": false
        },
        "type": 250
    }
};

const expectedFlow = {
    "NoticeFullyCustomised": {
        "data": {
            "tags": [],
            "info": "<p>Why it matters</p>",
            "color": "#FFDD00",
            "notes": "Internal note",
            "title": "You may need planning permission",
            "policyRef": "<p>Source</p>",
            "content": "<p>Some notice text with a <a href=\"https://www.google.com\">link</a></p>",
            "howMeasured": "<p>How it is defined</p>",
            "resetButton": true,
            "styleAsNotice": true
        },
        "type": 250
    },
    "NoticeMinimalCustomisation": {
        "data": {
            "tags": [],
            "color": "#EFEFEF",
            "title": "Minimal notice",
            "content": "<p>Some notice text</p>",
            "resetButton": false,
            "styleAsNotice": true
        },
        "type": 250
    },
    "OldNoticeWithJustTitle": {
        "data": {
            "tags": [],
            "color": "#EFEFEF",
            "title": "Notice without colour or description",
            "styleAsNotice": true
        },
        "type": 250
    },
    "CustomisableNotice": {
        "data": {
            "tags": [],
            "color": "#2b00fe",
            "title": "Templated notice",
            "content": "<p>Some templated text</p>",
            "resetButton": false,
            "isTemplatedNode": true,
            "templatedNodeInstructions": "Update this notice for your council",
            "areTemplatedNodeInstructionsRequired": true,
            "styleAsNotice": true
        },
        "type": 250
    },
    "ContentNode": {
        "data": {
            "tags": [],
            "title": "Existing content",
            "content": "<p>Should not change</p>",
            "resetButton": false
        },
        "type": 250
    }
};
