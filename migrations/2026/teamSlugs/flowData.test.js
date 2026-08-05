const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateFlowData } = require("./helpers")
const { expectedFlow } = require("./expectedFlow");
const { oldFlow } = require("./oldFlow");

// See https://editor.planx.uk/app/testing/a4-migration-mocks
describe("migrate flow data function", () => {
  it("#returns the expected data", () => {
    const migratedFlow = migrateFlowData(oldFlow).flowData;
    assert.deepStrictEqual(migratedFlow, expectedFlow);
  });
});
