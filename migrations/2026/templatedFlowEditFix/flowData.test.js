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
            "notes": "Content migration test note"
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
