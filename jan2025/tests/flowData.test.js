const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateFlowData } = require("./../helpers");
const { oldFlow } = require("./mocks/oldFlow");
const { expectedFlow } = require("./mocks/expectedFlow");

describe("migrate flow data function", () => {
  it("#returns the expected data", () => {
    const migratedFlow = migrateFlowData(oldFlow).flowData;
    assert.deepStrictEqual(migratedFlow, expectedFlow);
  });
});
