const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateFlowData } = require("./helpers")

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
          "ONAPixcuEd"
      ]
  },
  "MrtwawXdKc": {
      "type": 100,
      "data": {
          "text": "This is a sticky note",
          "neverAutoAnswer": false,
          "tags": [
              "placeholder",
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
              "sensitiveData"
          ]
      }
  },
  "ONAPixcuEd": {
      "type": 100,
      "data": {
          "text": "This is a node without any tags",
          "neverAutoAnswer": false
      }
  }
};

const expectedFlow = {
  "_root": {
      "edges": [
          "MrtwawXdKc",
          "TxlPAa2vUB",
          "ONAPixcuEd"
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
              "sensitiveData"
          ]
      }
  },
  "ONAPixcuEd": {
      "type": 100,
      "data": {
          "text": "This is a node without any tags",
          "neverAutoAnswer": false
      }
  }
};
