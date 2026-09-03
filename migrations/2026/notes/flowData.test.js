const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateFlowData } = require("./helpers")

// See https://editor.planx.uk/app/testing/notes-migration
describe("migrate flow data function", () => {
  it("#returns the expected data", () => {
    const migratedFlow = migrateFlowData(oldFlow).flowData;
    assert.deepStrictEqual(migratedFlow, expectedFlow);
  });
});

const expectedFlow = {
  "_root": {
    "edges": [
      "QuestionWithoutEdges",
      "ChecklistWithoutEdges",
      "Question"
    ]
  },
  "QuestionWithoutEdges": {
    "type": 999,
    "data": {
      "text": "This is a plain Question note",
      "tags": []
    }
  },
  "ChecklistWithoutEdges": {
    "type": 999,
    "data": {
      "text": "This is a plain Checklist note",
      "tags": []
    }
  },
  "Question": {
    "type": 100,
    "data": {
      "neverAutoAnswer": false,
      "alwaysAutoAnswerBlank": false,
      "text": "This is a \"real\" question",
      "tags": []
    },
    "edges": [
      "AnswerOk",
      "AnswerYeah"
    ]
  },
  "AnswerOk": {
    "type": 200,
    "data": {
      "text": "Ok"
    },
    "edges": [
      "QuestionWithoutEdgesWithInternalNote"
    ]
  },
  "AnswerYeah": {
    "type": 200,
    "data": {
      "text": "Yeah"
    },
    "edges": [
      "QuestionWithoutEdgesWithDescription"
    ]
  },
  "QuestionWithoutEdgesWithInternalNote": {
    "type": 999,
    "data": {
      "text": "Principle The 1960 act says that use of a caravan within the curtilage of a house is permitted provided it is incidental. However, the meaning most councils seem to work to is actually 'ancilliary'\n\nWe *think* the reason for this is that that simply positioning a caravan on the site does not involve construction work, and therefore , provided no separate self-contained dwelling is being created (which would be a material change in use), no actual development is taking place.",
      "tags": ["toReview"]
    }
  },
  "QuestionWithoutEdgesWithDescription": {
    "type": 999,
    "data": {
      "text": "Planning Permission applications have further ownership declaration and certificate requirements (agricultural tenancy and agricultural holdings, publication, declaration) In addition to any other matters required to be contained in a certificate issued for the purposes of this section, every such certificate shall contain one or other of the following statements, that is to say—(a)a statement that none of the land to which the application relates constitutes or forms part of an agricultural holding;(b)a statement that the applicant has given the requisite notice of the application to every person (other than the applicant) who, at the beginning of the period of twenty-one days ending with the date of the application, was a tenant of any agricultural holding any part of which was comprised in the land to which the application relates, and setting out the name of each such person, the address at which notice of the application was given to him, and the date of service of that notice.https://www.e-lindsey.gov.uk/media/4621/Ownership-Certificates/pdf/ownership_certificate_apr-15.pdfhttps://www.legislation.gov.uk/uksi/2015/595/article/13/made"
    }
  },
};

const oldFlow = {
  "_root": {
    "edges": [
      "QuestionWithoutEdges",
      "ChecklistWithoutEdges",
      "Question"
    ]
  },
  "QuestionWithoutEdges": {
    "type": 100,
    "data": {
      "neverAutoAnswer": false,
      "alwaysAutoAnswerBlank": false,
      "text": "This is a plain Question note",
      "tags": []
    }
  },
  "ChecklistWithoutEdges": {
    "type": 105,
    "data": {
      "allRequired": false,
      "neverAutoAnswer": false,
      "alwaysAutoAnswerBlank": false,
      "text": "This is a plain Checklist note",
      "tags": []
    }
  },
  "Question": {
    "type": 100,
    "data": {
      "neverAutoAnswer": false,
      "alwaysAutoAnswerBlank": false,
      "text": "This is a \"real\" question",
      "tags": []
    },
    "edges": [
      "AnswerOk",
      "AnswerYeah"
    ]
  },
  "AnswerOk": {
    "type": 200,
    "data": {
      "text": "Ok"
    },
    "edges": [
      "QuestionWithoutEdgesWithInternalNote"
    ]
  },
  "AnswerYeah": {
    "type": 200,
    "data": {
      "text": "Yeah"
    },
    "edges": [
      "QuestionWithoutEdgesWithDescription"
    ]
  },
  "QuestionWithoutEdgesWithInternalNote": {
    "type": 100,
    "data": {
      "text": "Principle",
      "notes": "The 1960 act says that use of a caravan within the curtilage of a house is permitted provided it is incidental. However, the meaning most councils seem to work to is actually 'ancilliary'\n\nWe *think* the reason for this is that that simply positioning a caravan on the site does not involve construction work, and therefore , provided no separate self-contained dwelling is being created (which would be a material change in use), no actual development is taking place.",
      "tags": ["toReview"],
    }
  },
  "QuestionWithoutEdgesWithDescription": {
    "type": 100,
    "data": {
      "text": "Planning Permission applications have further ownership declaration and certificate requirements (agricultural tenancy and agricultural holdings, publication, declaration)",
      "description": "<p>In addition to any other matters required to be contained in a certificate issued for the purposes of this section, every such certificate shall contain one or other of the following statements, that is to say—</p><p>(a)a statement that none of the land to which the application relates constitutes or forms part of an agricultural holding;</p><p>(b)a statement that the applicant has given the requisite notice of the application to every person (other than the applicant) who, at the beginning of the period of twenty-one days ending with the date of the application, was a tenant of any agricultural holding any part of which was comprised in the land to which the application relates, and setting out the name of each such person, the address at which notice of the application was given to him, and the date of service of that notice.</p><p></p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.e-lindsey.gov.uk/media/4621/Ownership-Certificates/pdf/ownership_certificate_apr-15.pdf\">https://www.e-lindsey.gov.uk/media/4621/Ownership-Certificates/pdf/ownership_certificate_apr-15.pdf</a></p><p></p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.legislation.gov.uk/uksi/2015/595/article/13/made\">https://www.legislation.gov.uk/uksi/2015/595/article/13/made</a></p>"
    }
  }
};
