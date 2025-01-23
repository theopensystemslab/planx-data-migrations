const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateSessionData } = require("./../helpers");
const { oldSession } = require("../tests/mocks/oldSession");
const { expectedSession } = require("../tests/mocks/expectedSession");

describe("migrate session data function", () => {
  it("#returns the expected data", () => {
    const migratedSession = migrateSessionData(oldSession);
    assert.deepStrictEqual(migratedSession, expectedSession);
  });
});
