const oldFlow = {
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
              "article4",
              "article4.caz",
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
          "val": "article4",
          "flags": [
              "PLANNING_PERMISSION_REQUIRED",
              "EDGE_CASE"
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
              "PRIOR_APPROVAL",
              "DC-REQUIRED"
          ]
      },
      "type": 200
  },
  "1DMLC1ilHg": {
      "data": {
          "text": "Listed building",
          "val": "listed",
          "flags": [
              "LB-DE_MINIMIS"
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
              "PP-NOTICE",
              "TR-NOT_REQUIRED"
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
          "val": "listed.grade.I"
      },
      "type": 200
  },
  "fR27RXqLNn": {
      "data": {
          "text": "Grade II",
          "val": "listed.grade.II"
      },
      "type": 200
  },
  "bsPJXND9ig": {
      "data": {
          "text": "Grade II*",
          "val": "listed.grade.II*"
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
          "val": "flood.zone.1"
      },
      "type": 200
  },
  "0FIHMM1vcO": {
      "data": {
          "text": "Zone 2 (Medium)",
          "val": "flood.zone.2"
      },
      "type": 200
  },
  "x4Zma010vS": {
      "data": {
          "text": "Zone 3 (High)",
          "val": "flood.zone.3"
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
          "val": "article4.camden.caz"
      },
      "type": 200
  },
  "3zhtpyYEE1": {
      "data": {
          "text": "HMO",
          "val": "article4.lambeth.HMO"
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
          "val": "IMMUNE"
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
          "val": "PLANNING_PERMISSION_REQUIRED"
      }
  },
  "6m7kgvL204": {
      "type": 200,
      "data": {
          "text": "Prior approval",
          "val": "PRIOR_APPROVAL"
      }
  },
  "HSVuNf2tZG": {
      "type": 200,
      "data": {
          "text": "Notice",
          "val": "PP-NOTICE"
      }
  },
  "LT6T7RR5O3": {
      "type": 200,
      "data": {
          "text": "Permitted development",
          "val": "NO_APP_REQUIRED"
      }
  },
  "LczMuHy8w6": {
      "type": 200,
      "data": {
          "text": "Not development",
          "val": "PP-NOT_DEVELOPMENT"
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
          "category": "Listed building consent"
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
          "val": "LB-MISSING_INFO"
      }
  },
  "fx0w4IdBU3": {
      "type": 200,
      "data": {
          "text": "Required",
          "val": "LB-REQUIRED"
      }
  },
  "zHeTwH6CaY": {
      "type": 200,
      "data": {
          "text": "De minimis",
          "val": "LB-DE_MINIMIS"
      }
  },
  "ik25RDDUyG": {
      "type": 200,
      "data": {
          "text": "Not required",
          "val": "LB-NOT_REQUIRED"
      }
  },
  "wgJ5dK7N7u": {
      "type": 200,
      "data": {
          "text": "No flag result"
      }
  }
};

module.exports = { oldFlow };