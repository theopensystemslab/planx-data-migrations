const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateFlowData } = require("./helpers")

describe("migrate flow data function", () => {
    it("#returns the expected data", () => {
        const migratedFlow = migrateFlowData(oldFlow).flowData;
        assert.deepStrictEqual(migratedFlow, expectedFlow);
    });
});

// Example nodes direct from https://editor.planx.uk/opensystemslab/permitteddevelopment-rear-and-side-extensions
const oldFlow = {
    "01vi5dDHDv": {
        "data": {
            "text": "As part of the waste management facility",
            "flags": [
                "flag.pp.permittedDevelopment"
            ]
        },
        "type": 200
    },
    "0NV9SHkg8B": {
        "data": {
            "img": "https://planx-temp.s3.eu-west-2.amazonaws.com/production/xtsuube5/Terrace_outrigger_rearonly_4m.svg",
            "text": "4m or less",
            "flags": [
                "flag.pp.permittedDevelopment"
            ]
        },
        "type": 200
    },
    "0UKzdzbE9i": {
        "data": {
            "img": "https://planx-temp.s3.eu-west-2.amazonaws.com/production/12eofbdx/Terrace_outrigger_sidewraparound_3m.svg",
            "text": "3m or less",
            "flags": [
                "flag.pp.permittedDevelopment"
            ]
        },
        "type": 200
    },
    "14s9yUQdxC": {
        "data": {
            "img": "https://planx-infrastructure.s3.amazonaws.com/uploads/1adf142a-f134-482b-be0b-17a9c038bfb9_3.4_replace-windows-doors_3.4_SemiD_replaceWindows_upperfloor_obscuredbelow1.7m.svg",
            "text": "Yes",
            "flags": [
                "flag.pp.permittedDevelopment"
            ]
        },
        "type": 200
    },
    "1ikPydDHDv": {
        "data": {
            "img": "https://api.editor.planx.uk/file/public/9de6zdew/housetypes_semiDetached.png",
            "val": "residential.house.semiDetached",
            "text": "Semi-detached"
        },
        "type": 200
    },
    "25iMndDHDv": {
        "data": {
            "info": "<p>Structures that extend 4m or less from the respective rear wall of a detached house may not need planning permission.</p>\n<p>Structures that extend between 4 and 8m from the rear wall may not require planning permission but will need prior approval.</p>\n<p>Otherwise, you will planning permission.</p>",
            "text": "How far does the new extension extend beyond the back wall of the original house?",
            "policyRef": "<p><a href=\"https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/1\" target=\"_self\">The Town and Country Planning (General Permitted Development) (England) Order 2015 Schedule 2, Part 1, Class A.1 (f)(i)</a></p>",
            "howMeasured": "<p>The depth of an extension is measured from the external face of the rear wall of the original house. This includes any previous extensions. It does not include any guttering or barge boards.</p><p>If the rear of the original house is stepped, the extension should be measured from each part of the rear walls you are extending from, even if it is not the rearmost part of the original house.</p><p>The original house is the house as it was first built, or as it was in 1948 if it was built before then. This does not include any subsequent additions or alterations.</p>",
            "definitionImg": "https://user-data-8038f15.s3.eu-west-2.amazonaws.com/qd4w3khu/extension_stepped.svg"
        },
        "type": 100,
        "edges": [
            "YJpJ5dDHDv",
            "79UgydDHDv",
            "3yIEvdDHDv"
        ]
    },
};

const expectedFlow = {
    "01vi5dDHDv": {
        "data": {
            "text": "As part of the waste management facility",
            "flags": [
                "flag.pp.permittedDevelopment"
            ]
        },
        "type": 200
    },
    "0NV9SHkg8B": {
        "data": {
            "img": "https://api.editor.planx.uk/file/public/xtsuube5/Terrace_outrigger_rearonly_4m.svg",
            "text": "4m or less",
            "flags": [
                "flag.pp.permittedDevelopment"
            ]
        },
        "type": 200
    },
    "0UKzdzbE9i": {
        "data": {
            "img": "https://planx-temp.s3.eu-west-2.amazonaws.com/production/12eofbdx/Terrace_outrigger_sidewraparound_3m.svg",
            "text": "3m or less",
            "flags": [
                "flag.pp.permittedDevelopment"
            ]
        },
        "type": 200
    },
    "14s9yUQdxC": {
        "data": {
            "img": "https://planx-infrastructure.s3.amazonaws.com/uploads/1adf142a-f134-482b-be0b-17a9c038bfb9_3.4_replace-windows-doors_3.4_SemiD_replaceWindows_upperfloor_obscuredbelow1.7m.svg",
            "text": "Yes",
            "flags": [
                "flag.pp.permittedDevelopment"
            ]
        },
        "type": 200
    },
    "1ikPydDHDv": {
        "data": {
            "img": "https://api.editor.planx.uk/file/public/9de6zdew/housetypes_semiDetached.png",
            "val": "residential.house.semiDetached",
            "text": "Semi-detached"
        },
        "type": 200
    },
    "25iMndDHDv": {
        "data": {
            "info": "<p>Structures that extend 4m or less from the respective rear wall of a detached house may not need planning permission.</p>\n<p>Structures that extend between 4 and 8m from the rear wall may not require planning permission but will need prior approval.</p>\n<p>Otherwise, you will planning permission.</p>",
            "text": "How far does the new extension extend beyond the back wall of the original house?",
            "policyRef": "<p><a href=\"https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/1\" target=\"_self\">The Town and Country Planning (General Permitted Development) (England) Order 2015 Schedule 2, Part 1, Class A.1 (f)(i)</a></p>",
            "howMeasured": "<p>The depth of an extension is measured from the external face of the rear wall of the original house. This includes any previous extensions. It does not include any guttering or barge boards.</p><p>If the rear of the original house is stepped, the extension should be measured from each part of the rear walls you are extending from, even if it is not the rearmost part of the original house.</p><p>The original house is the house as it was first built, or as it was in 1948 if it was built before then. This does not include any subsequent additions or alterations.</p>",
            "definitionImg": "https://user-data-8038f15.s3.eu-west-2.amazonaws.com/qd4w3khu/extension_stepped.svg"
        },
        "type": 100,
        "edges": [
            "YJpJ5dDHDv",
            "79UgydDHDv",
            "3yIEvdDHDv"
        ]
    },
};
