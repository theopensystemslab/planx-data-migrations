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
            "R5TlgH2tYO",
            "rUuYy6mfk7",
            "k84wvStNvo"
        ]
    },
    "R5TlgH2tYO": {
        "type": 100,
        "data": {
            "fn": "property.localAuthorityDistrict",
            "text": "Is the property in the council?",
            "description": "<p>This question refers to the local planning authority (LPA)</p>",
            "neverAutoAnswer": false,
            "alwaysAutoAnswerBlank": true // << migration target
        },
        "edges": [
            "BKGYJRnGh2",
            "wWkkIrge2q"
        ]
    },
    "BKGYJRnGh2": {
        "data": {
            "val": "Barnet",
            "text": "Yes"
        },
        "type": 200
    },
    "wWkkIrge2q": {
        "data": {
            "text": "No"
        },
        "type": 200,
        "edges": [
            "zYiXC3LCVC"
        ]
    },
    "zYiXC3LCVC": {
        "data": {
            "color": "#ffe9e9",
            "title": "It looks like this property is not in the council",
            "content": "<p><a target=\"_self\" rel=\"noopener noreferrer nofollow\" href=\"https://localplanning.services/search\">Find your local planning authority</a>.</p>",
            "resetButton": true,
            "styleAsNotice": true
        },
        "type": 250
    },
    "rUuYy6mfk7": {
        "type": 100,
        "data": {
            "fn": "property.localAuthorityDistrict",
            "text": "Is the property in the council?",
            "description": "<p>This question refers to the local planning authority (LPA)</p>",
            "neverAutoAnswer": false,
            "alwaysAutoAnswerBlank": false, // already "correct", should not be migrated
            "tags": []
        },
        "edges": [
            "T7r1ARk62q",
            "VoKbPrbd5x"
        ]
    },
    "T7r1ARk62q": {
        "data": {
            "val": "Barnet",
            "text": "Yes"
        },
        "type": 200
    },
    "VoKbPrbd5x": {
        "data": {
            "text": "No"
        },
        "type": 200,
        "edges": [
            "NTlHpOR8lZ"
        ]
    },
    "NTlHpOR8lZ": {
        "data": {
            "color": "#ffe9e9",
            "title": "It looks like this property is not in the council",
            "content": "<p><a target=\"_self\" rel=\"noopener noreferrer nofollow\" href=\"https://localplanning.services/search\">Find your local planning authority</a>.</p>",
            "resetButton": true,
            "styleAsNotice": true
        },
        "type": 250
    },
    "k84wvStNvo": {
        "type": 100,
        "data": {
            "fn": "application.type",
            "tags": [
                "automation"
            ],
            "text": "What type of application is it?",
            "neverAutoAnswer": false,
            "alwaysAutoAnswerBlank": true // `fn` does not match, should not be migrated
        },
        "edges": [
            "FIiBVUXTn7",
            "nVqFSBUyLh"
        ]
    },
    "FIiBVUXTn7": {
        "data": {
            "val": "ldc.proposed",
            "text": "Certificate of lawfulness for proposed works"
        },
        "type": 200
    },
    "nVqFSBUyLh": {
        "data": {
            "text": "Something else"
        },
        "type": 200
    }
};

const expectedFlow = {
    "_root": {
        "edges": [
            "R5TlgH2tYO",
            "rUuYy6mfk7",
            "k84wvStNvo"
        ]
    },
    "R5TlgH2tYO": {
        "type": 100,
        "data": {
            "fn": "property.localAuthorityDistrict",
            "text": "Is the property in the council?",
            "description": "<p>This question refers to the local planning authority (LPA)</p>",
            "neverAutoAnswer": false,
            "alwaysAutoAnswerBlank": false
        },
        "edges": [
            "BKGYJRnGh2",
            "wWkkIrge2q"
        ]
    },
    "BKGYJRnGh2": {
        "data": {
            "val": "Barnet",
            "text": "Yes"
        },
        "type": 200
    },
    "wWkkIrge2q": {
        "data": {
            "text": "No"
        },
        "type": 200,
        "edges": [
            "zYiXC3LCVC"
        ]
    },
    "zYiXC3LCVC": {
        "data": {
            "color": "#ffe9e9",
            "title": "It looks like this property is not in the council",
            "content": "<p><a target=\"_self\" rel=\"noopener noreferrer nofollow\" href=\"https://localplanning.services/search\">Find your local planning authority</a>.</p>",
            "resetButton": true,
            "styleAsNotice": true
        },
        "type": 250
    },
    "rUuYy6mfk7": {
        "type": 100,
        "data": {
            "fn": "property.localAuthorityDistrict",
            "text": "Is the property in the council?",
            "description": "<p>This question refers to the local planning authority (LPA)</p>",
            "neverAutoAnswer": false,
            "alwaysAutoAnswerBlank": false,
            "tags": []
        },
        "edges": [
            "T7r1ARk62q",
            "VoKbPrbd5x"
        ]
    },
    "T7r1ARk62q": {
        "data": {
            "val": "Barnet",
            "text": "Yes"
        },
        "type": 200
    },
    "VoKbPrbd5x": {
        "data": {
            "text": "No"
        },
        "type": 200,
        "edges": [
            "NTlHpOR8lZ"
        ]
    },
    "NTlHpOR8lZ": {
        "data": {
            "color": "#ffe9e9",
            "title": "It looks like this property is not in the council",
            "content": "<p><a target=\"_self\" rel=\"noopener noreferrer nofollow\" href=\"https://localplanning.services/search\">Find your local planning authority</a>.</p>",
            "resetButton": true,
            "styleAsNotice": true
        },
        "type": 250
    },
    "k84wvStNvo": {
        "type": 100,
        "data": {
            "fn": "application.type",
            "tags": [
                "automation"
            ],
            "text": "What type of application is it?",
            "neverAutoAnswer": false,
            "alwaysAutoAnswerBlank": true
        },
        "edges": [
            "FIiBVUXTn7",
            "nVqFSBUyLh"
        ]
    },
    "FIiBVUXTn7": {
        "data": {
            "val": "ldc.proposed",
            "text": "Certificate of lawfulness for proposed works"
        },
        "type": 200
    },
    "nVqFSBUyLh": {
        "data": {
            "text": "Something else"
        },
        "type": 200
    }
};
