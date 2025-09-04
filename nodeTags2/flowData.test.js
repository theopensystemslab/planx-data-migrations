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
          "ONAPixcuEc"
      ]
  },
  "MrtwawXdKc": {
      "type": 100,
      "data": {
          "text": "This is a sticky note",
          "neverAutoAnswer": false,
          "tags": [
              "customisation",
              "automation"
          ]
      }
  },
  "TxlPAa2vUB": {
      "type": 110,
      "data": {
          "title": "What's your email address?",
          "fn": "email",
          "type": "email",
          "tags": [
              "customisation"
          ]
      }
  },
  "ONAPixcuEd": {
      "type": 100,
      "data": {
          "text": "This is a node without any tags",
          "neverAutoAnswer": false
      }
  },
  "ONAPixcuEc": {
      "type": 10,
      "data": {
          "howMeasured": "old data",
      }
  }
};

const expectedFlow = {
  "_root": {
      "edges": [
          "MrtwawXdKc",
          "TxlPAa2vUB",
          "ONAPixcuEd",
          "ONAPixcuEc"
      ]
  },
  "MrtwawXdKc": {
      "type": 100,
      "data": {
          "text": "This is a sticky note",
          "neverAutoAnswer": false,
          "tags": [
              "automation"
          ]
      }
  },
  "TxlPAa2vUB": {
      "type": 110,
      "data": {
          "title": "What's your email address?",
          "fn": "email",
          "type": "email",
          "tags": []
      }
  },
  "ONAPixcuEd": {
      "type": 100,
      "data": {
          "text": "This is a node without any tags",
          "neverAutoAnswer": false
      }
  },
    "ONAPixcuEc": {
        "type": 10,
        "data": {
            "howMeasured": updatedHowMeasuredContent
        }
    }
};
