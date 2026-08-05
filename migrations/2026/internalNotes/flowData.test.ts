// https://editor.planx.uk/app/testing/internal-notes-migration
const oldFlow = {
  "_root": {
    "edges": [
      "Section",
      "Question",
      "Notice"
    ]
  },
  "Section": {
    "type": 360,
    "data": {
      "title": "Section one",
      "length": "short",
      "notes": "This is an internal note on a section"
    }
  },
  "Question": {
    "type": 100,
    "data": {
      "neverAutoAnswer": false,
      "alwaysAutoAnswerBlank": false,
      "text": "Is this a test?",
      "notes": "This is an internal note on a question, not an answer"
    },
    "edges": [
      "OptionYes",
      "OptionNo"
    ]
  },
  "OptionYes": {
    "type": 200,
    "data": {
      "text": "Yes"
    },
    "edges": [
      "ClonedContent"
    ]
  },
  "OptionNo": {
    "type": 200,
    "data": {
      "text": "No"
    },
    "edges": [
      "ClonedContent"
    ]
  },
  "Notice": {
    "type": 8,
    "data": {
      "title": "Restart?",
      "description": "<p>This is a notice <em>without</em> an internal note</p>",
      "color": "#EFEFEF",
      "resetButton": true
    }
  },
  "ClonedContent": {
    "type": 250,
    "data": {
      "content": "<h1>Cloned content</h1><p></p>",
      "resetButton": false,
      "notes": "This is an internal note attached to a clone"
    }
  }
};

const extractedNotes = [
  {
    nodeId: "Section",
    text: "This is an internal note on a section"
  },
  {
    nodeId: "Question",
    text: "This is an internal note on a question, not an answer"
  },
  {
    nodeId: "ClonedContent",
    text: "This is an internal note attached to a clone"
  },
];

const expectedFlow = {
  "_root": {
    "edges": [
      "Section",
      "Question",
      "Notice"
    ]
  },
  "Section": {
    "type": 360,
    "data": {
      "title": "Section one",
      "length": "short",
    }
  },
  "Question": {
    "type": 100,
    "data": {
      "neverAutoAnswer": false,
      "alwaysAutoAnswerBlank": false,
      "text": "Is this a test?",
    },
    "edges": [
      "OptionYes",
      "OptionNo"
    ]
  },
  "OptionYes": {
    "type": 200,
    "data": {
      "text": "Yes"
    },
    "edges": [
      "ClonedContent"
    ]
  },
  "OptionNo": {
    "type": 200,
    "data": {
      "text": "No"
    },
    "edges": [
      "ClonedContent"
    ]
  },
  "Notice": {
    "type": 8,
    "data": {
      "title": "Restart?",
      "description": "<p>This is a notice <em>without</em> an internal note</p>",
      "color": "#EFEFEF",
      "resetButton": true
    }
  },
  "ClonedContent": {
    "type": 250,
    "data": {
      "content": "<h1>Cloned content</h1><p></p>",
      "resetButton": false,
    }
  }
};
