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
    "3K0RcwCSI5": {
        "data": {
            "tags": [],
            "content": "<h1>Some H1 title</h1><h2>Some H2 title</h2><p>Some text, with reset to start</p>",
            "resetButton": true
        },
        "type": 250
    },
    "CnFtBAZw5q": {
        "data": {
            "content": "<h1>Some H1 title</h1><p>Some text</p><h2>Some H2 title</h2><p>Some text</p>",
            "resetButton": false
        },
        "type": 250
    },
    "HJlZ4hF53A": {
        "data": {
            "tags": [],
            "content": "<h1>Some H1 title</h1><p>Some text</p><p>Some more text</p><p>Some more text again</p><p></p>",
            "resetButton": false
        },
        "type": 250
    },
    "JtmOmQ168i": {
        "data": {
            "content": "<h1>Some H1 title</h1><p>Some text</p><h2>Some H2 title</h2><p>Some text</p>",
            "resetButton": false
        },
        "type": 250
    },
    "QILyCTs5Ud": {
        "data": {
            "tags": [],
            "color": "#2b00fe",
            "content": "<h1>Some H1 title</h1><h2>Some H2 title</h2><h2>Some other H2 title</h2><p>Some text and blue background</p>",
            "resetButton": false
        },
        "type": 250
    }
};

const expectedFlow = {
    "3K0RcwCSI5": {
        "data": {
            "tags": [],
            "title": "Some H1 title",
            "content": "<h1>Some H2 title</h1><p>Some text, with reset to start</p>",
            "resetButton": true
        },
        "type": 250
    },
    "CnFtBAZw5q": {
        "data": {
            "tags": [],
            "title": "Some H1 title",
            "content": "<p>Some text</p><h1>Some H2 title</h1><p>Some text</p>",
            "resetButton": false
        },
        "type": 250
    },
    "HJlZ4hF53A": {
        "data": {
            "tags": [],
            "title": "Some H1 title",
            "content": "<p>Some text</p><p>Some more text</p><p>Some more text again</p><p></p>",
            "resetButton": false
        },
        "type": 250
    },
    "JtmOmQ168i": {
        "data": {
            "tags": [],
            "title": "Some H1 title",
            "content": "<p>Some text</p><h1>Some H2 title</h1><p>Some text</p>",
            "resetButton": false
        },
        "type": 250
    },
    "QILyCTs5Ud": {
        "data": {
            "tags": [],
            "color": "#2b00fe",
            "title": "Some H1 title",
            "content": "<h1>Some H2 title</h1><h1>Some other H2 title</h1><p>Some text and blue background</p>",
            "resetButton": false
        },
        "type": 250
    }
};
