const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateFlowData, updatedHowMeasuredContent } = require("./helpers")

describe("migrate flow data function", () => {
    it("#returns the expected data", () => {
        const migratedFlow = migrateFlowData(oldFlow).flowData;
        assert.deepStrictEqual(migratedFlow, expectedFlow);
    });
});

const oldFlow = {
    "_root": {
        "edges": [
            "MrtwawXdKc",
            "TxlPAa2vUB",
            "ONAPixcuEd",
        ]
    },
    "MrtwawXdKc": {
        "type": 400,
        "data": {
            "text": "This is a pay node",
            "govPayMetadata": [
                { "key": "staticString", "value": "staticString" },
                { "key": "staticNumber", "value": 123 },
                { "key": "staticBoolean", "value": true },
                { "key": "dynamicKey", "value": "@dynamicValue" },
            ]
        }
    },
    "TxlPAa2vUB": {
        "type": 110,
        "data": {
            "title": "Not a pay node",
            "fn": "email",
            "type": "email",
            "tags": [
                "customisation"
            ]
        }
    },
    "ONAPixcuEd": {
        "type": 400,
        "data": {
            "text": "This is a Pay node without metdata",
        }
    },
};

const expectedFlow = {
    "_root": {
        "edges": [
            "MrtwawXdKc",
            "TxlPAa2vUB",
            "ONAPixcuEd",
        ]
    },
    "MrtwawXdKc": {
        "type": 400,
        "data": {
            "text": "This is a pay node",
            "govPayMetadata": [
                { "key": "staticString", "value": "staticString", "type": "static" },
                { "key": "staticNumber", "value": 123, "type": "static" },
                { "key": "staticBoolean", "value": true, "type": "static" },
                { "key": "dynamicKey", "value": "dynamicValue", "type": "data" },
            ]
        }
    },
    "TxlPAa2vUB": {
        "type": 110,
        "data": {
            "title": "Not a pay node",
            "fn": "email",
            "type": "email",
            "tags": [
                "customisation"
            ]
        }
    },
    "ONAPixcuEd": {
        "type": 400,
        "data": {
            "text": "This is a Pay node without metdata",
        }
    },
};
