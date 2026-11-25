const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateFlowData } = require("./helpers")

describe("migrate flow data function", () => {
    it("#returns the expected data when there have been customisations", () => {
        const migratedFlow = migrateFlowData(oldFlow, edits).flowData;
        assert.deepStrictEqual(migratedFlow, expectedFlow);
    });

    it("#retains the same oldFlow and does not add a note when there have been no user edits yet", () => {
        const migratedFlow = migrateFlowData(oldFlow, noEdits).flowData;
        assert.deepStrictEqual(migratedFlow, oldFlow);
    });
});

// Example templated_flow_edits
const edits = {
  // While "Vyqjfvcdtn" is the first templated node found in order, we only have an edit for "Z4yXiPwTTb" so we expect the note to be added to it
  "Z4yXiPwTTb": {
    "text": "Is this a responsive checklist",
  },
};

const noEdits = null;

// Example nodes
const oldFlow = {
    "_root": {
        "edges": [
            "JKonoRURaL",
            "Vyqjfvcdtn",
            "Z4yXiPwTTb"
        ]
    },
    "JKonoRURaL": {
        "type": 360,
        "data": {
            "title": "Section one",
            "length": "medium"
        }
    },
    "Vyqjfvcdtn": {
        "type": 100,
        "data": {
            "neverAutoAnswer": false,
            "alwaysAutoAnswerBlank": false,
            "text": "Is this a test",
            "isTemplatedNode": true,
            "areTemplatedNodeInstructionsRequired": false
        },
        "edges": [
            "073tGyEhSy"
        ]
    },
    "073tGyEhSy": {
        "type": 200,
        "data": {
            "text": "Yes"
        }
    },
    "Z4yXiPwTTb": {
        "type": 100,
        "data": {
            "neverAutoAnswer": false,
            "alwaysAutoAnswerBlank": false,
            "text": "Is this a checklist",
            "tags": [],
            "isTemplatedNode": true,
            "areTemplatedNodeInstructionsRequired": false
        },
        "edges": [
            "vS8G0anQAF"
        ]
    },
    "vS8G0anQAF": {
        "type": 200,
        "data": {
            "text": "No"
        }
    }
};

const expectedFlow = {
    "_root": {
        "edges": [
            "JKonoRURaL",
            "Vyqjfvcdtn",
            "Z4yXiPwTTb"
        ]
    },
    "JKonoRURaL": {
        "type": 360,
        "data": {
            "title": "Section one",
            "length": "medium"
        }
    },
    "Vyqjfvcdtn": {
        "type": 100,
        "data": {
            "neverAutoAnswer": false,
            "alwaysAutoAnswerBlank": false,
            "text": "Is this a test",
            "isTemplatedNode": true,
            "areTemplatedNodeInstructionsRequired": false,
        },
        "edges": [
            "073tGyEhSy"
        ]
    },
    "073tGyEhSy": {
        "type": 200,
        "data": {
            "text": "Yes"
        }
    },
    "Z4yXiPwTTb": {
        "type": 100,
        "data": {
            "neverAutoAnswer": false,
            "alwaysAutoAnswerBlank": false,
            "text": "Is this a checklist",
            "tags": [],
            "isTemplatedNode": true,
            "areTemplatedNodeInstructionsRequired": false,
            "notes": "Content migration test note",
        },
        "edges": [
            "vS8G0anQAF"
        ]
    },
    "vS8G0anQAF": {
        "type": 200,
        "data": {
            "text": "No"
        }
    }
};
