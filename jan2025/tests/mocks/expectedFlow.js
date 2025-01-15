const expectedFlow = {
  "_root": {
      "edges": [
          "N8T7u2fedh",
          "XDlfXlSFJY",
          "0xIFi1ZhfZ",
          "Z9dOoU0dD1",
          "MQzrk4KPRO"
      ]
  },
  "N8T7u2fedh": {
      "type": 9,
      "data": {
          "title": "Find the property",
          "allowNewAddresses": false,
          "newAddressTitle": "Click or tap at where the property is on the map and name it below",
          "newAddressDescription": "You will need to select a location and provide a name to continue",
          "newAddressDescriptionLabel": "Name the site"
      }
  },
  "XDlfXlSFJY": {
      "type": 11,
      "data": {
          "title": "Planning constraints",
          "description": "Planning constraints might limit how you can develop or use the property",
          "fn": "property.constraints.planning",
          "disclaimer": "<p><strong>This page does not include information about historic planning conditions that may apply to this property.</strong></p>",
          "dataValues": [
              "articleFour",
              "articleFour.caz",
              "brownfieldSite",
              "designated.AONB",
              "designated.conservationArea",
              "greenBelt",
              "designated.nationalPark",
              "designated.nationalPark.broads",
              "designated.WHS",
              "flood",
              "listed",
              "monument",
              "nature.ASNW",
              "nature.ramsarSite",
              "nature.SAC",
              "nature.SPA",
              "nature.SSSI",
              "registeredPark",
              "tpo",
              "road.classified"
          ]
      }
  },
  "0xIFi1ZhfZ": {
      "type": 105,
      "data": {
          "allRequired": false,
          "neverAutoAnswer": false,
          "fn": "property.constraints.planning",
          "text": "Do any of these constraints apply to you?",
          "tags": []
      },
      "edges": [
          "tUsd2VX0CE",
          "5NwXOe2kl6",
          "1DMLC1ilHg",
          "S50pYmgKlM"
      ]
  },
  "tUsd2VX0CE": {
      "data": {
          "text": "Article 4",
          "val": "articleFour",
          "flags": [
              "flag.pp.permissionNeeded",
              "flag.planningPolicy.edgeCase"
          ]
      },
      "type": 200,
      "edges": [
          "Xz0qrhi8H7"
      ]
  },
  "5NwXOe2kl6": {
      "data": {
          "text": "Designated land",
          "val": "designated",
          "flags": [
              "flag.pp.priorApproval",
              "flag.dca.consentNeeded"
          ]
      },
      "type": 200
  },
  "1DMLC1ilHg": {
      "data": {
          "text": "Listed building",
          "val": "listed",
          "flags": [
              "flag.lbc.deMinimis"
          ]
      },
      "type": 200,
      "edges": [
          "jtVZ3Xa3DE"
      ]
  },
  "S50pYmgKlM": {
      "data": {
          "text": "Flood zone",
          "val": "flood",
          "flags": [
              "flag.pp.notice",
              "flag.wtt.notRequired"
          ]
      },
      "type": 200,
      "edges": [
          "wvRHLsZyyk"
      ]
  },
  "jtVZ3Xa3DE": {
      "type": 105,
      "data": {
          "allRequired": false,
          "neverAutoAnswer": false,
          "fn": "property.constraints.planning",
          "text": "Which grade listed buildings?"
      },
      "edges": [
          "rKeLQit5lP",
          "fR27RXqLNn",
          "bsPJXND9ig"
      ]
  },
  "rKeLQit5lP": {
      "data": {
          "text": "Grade I",
          "val": "listed.gradeOne"
      },
      "type": 200
  },
  "fR27RXqLNn": {
      "data": {
          "text": "Grade II",
          "val": "listed.gradeTwo"
      },
      "type": 200
  },
  "bsPJXND9ig": {
      "data": {
          "text": "Grade II*",
          "val": "listed.gradeTwoStar"
      },
      "type": 200
  },
  "wvRHLsZyyk": {
      "type": 105,
      "data": {
          "allRequired": false,
          "neverAutoAnswer": false,
          "fn": "property.constraints.planning",
          "text": "Which risk level?"
      },
      "edges": [
          "r9hNgcu8xe",
          "0FIHMM1vcO",
          "x4Zma010vS"
      ]
  },
  "r9hNgcu8xe": {
      "data": {
          "text": "Zone 1 (Low)",
          "val": "flood.zoneOne"
      },
      "type": 200
  },
  "0FIHMM1vcO": {
      "data": {
          "text": "Zone 2 (Medium)",
          "val": "flood.zoneTwo"
      },
      "type": 200
  },
  "x4Zma010vS": {
      "data": {
          "text": "Zone 3 (High)",
          "val": "flood.zoneThree"
      },
      "type": 200
  },
  "Xz0qrhi8H7": {
      "type": 105,
      "data": {
          "allRequired": false,
          "neverAutoAnswer": false,
          "fn": "property.constraints.planning",
          "text": "Which article 4s apply?",
          "tags": []
      },
      "edges": [
          "2FoekDHPbA",
          "3zhtpyYEE1"
      ]
  },
  "2FoekDHPbA": {
      "data": {
          "text": "CAZ",
          "val": "articleFour.camden.caz"
      },
      "type": 200
  },
  "3zhtpyYEE1": {
      "data": {
          "text": "HMO",
          "val": "articleFour.lambeth.HMO"
      },
      "type": 200
  },
  "Z9dOoU0dD1": {
      "type": 500,
      "data": {
          "fn": "flag",
          "category": "Planning permission"
      },
      "edges": [
          "xkTXHHPGDf",
          "W5tCOXfKqp",
          "qrZ7hJFcwj",
          "6m7kgvL204",
          "HSVuNf2tZG",
          "LT6T7RR5O3",
          "LczMuHy8w6",
          "QF9PQ7c53U"
      ]
  },
  "xkTXHHPGDf": {
      "type": 200,
      "data": {
          "text": "Immune",
          "val": "flag.pp.immune"
      }
  },
  "W5tCOXfKqp": {
      "type": 200,
      "data": {
          "text": "Missing information",
          "val": "MISSING_INFO"
      }
  },
  "qrZ7hJFcwj": {
      "type": 200,
      "data": {
          "text": "Permission needed",
          "val": "flag.pp.permissionNeeded"
      }
  },
  "6m7kgvL204": {
      "type": 200,
      "data": {
          "text": "Prior approval",
          "val": "flag.pp.priorApproval"
      }
  },
  "HSVuNf2tZG": {
      "type": 200,
      "data": {
          "text": "Notice",
          "val": "flag.pp.notice"
      }
  },
  "LT6T7RR5O3": {
      "type": 200,
      "data": {
          "text": "Permitted development",
          "val": "flag.pp.permittedDevelopment"
      }
  },
  "LczMuHy8w6": {
      "type": 200,
      "data": {
          "text": "Not development",
          "val": "flag.pp.notDevelopment"
      }
  },
  "QF9PQ7c53U": {
      "type": 200,
      "data": {
          "text": "No flag result"
      }
  },
  "MQzrk4KPRO": {
      "type": 500,
      "data": {
          "fn": "flag",
          "category": "Works to listed buildings"
      },
      "edges": [
          "5TB6qVisoq",
          "fx0w4IdBU3",
          "zHeTwH6CaY",
          "ik25RDDUyG",
          "wgJ5dK7N7u"
      ]
  },
  "5TB6qVisoq": {
      "type": 200,
      "data": {
          "text": "Missing information",
          "val": "flag.lbc.missingInfo"
      }
  },
  "fx0w4IdBU3": {
      "type": 200,
      "data": {
          "text": "Consent needed",
          "val": "flag.lbc.consentNeeded"
      }
  },
  "zHeTwH6CaY": {
      "type": 200,
      "data": {
          "text": "De minimis",
          "val": "flag.lbc.deMinimis"
      }
  },
  "ik25RDDUyG": {
      "type": 200,
      "data": {
          "text": "Not required",
          "val": "flag.lbc.notRequired"
      }
  },
  "wgJ5dK7N7u": {
      "type": 200,
      "data": {
          "text": "No flag result"
      }
  }
};

module.exports = { expectedFlow };