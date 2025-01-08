const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { migrateSessionData } = require("./../helpers");

describe("migrate session data function", () => {
  it("#returns the expected data", () => {
    const migratedSession = migrateSessionData(oldSession);
    assert.deepStrictEqual(migratedSession, expectedSession);
  });
});

const expectedSession = {
  "id": "flow-id-123",
  "passport": {
    "data": {
      "_address": {
        "uprn": "200003453480",
        "usrn": "22500531",
        "blpu_code": "2",
        "latitude": 51.4859065,
        "longitude": -0.076021,
        "organisation": null,
        "pao": "47",
        "street": "COBOURG ROAD",
        "town": "LONDON",
        "postcode": "SE5 0HU",
        "ward": "E05011109",
        "x": 533683,
        "y": 178083,
        "planx_description": "HMO Parent",
        "planx_value": "residential.HMO.parent",
        "single_line_address": "47, COBOURG ROAD, LONDON, SOUTHWARK, SE5 0HU",
        "title": "47, COBOURG ROAD, LONDON",
        "source": "os"
      },
      "property.type": [
        "residential.HMO.parent"
      ],
      "property.localAuthorityDistrict": [
        "Southwark"
      ],
      "property.region": [
        "London"
      ],
      "property.boundary": {
        "geometry": {
          "type": "MultiPolygon",
          "coordinates": [
            [
              [
                [
                  -0.076303,
                  51.485923
                ],
                [
                  -0.076307,
                  51.48591
                ],
                [
                  -0.075586,
                  51.485849
                ],
                [
                  -0.075574,
                  51.485849
                ],
                [
                  -0.075569,
                  51.485903
                ],
                [
                  -0.076293,
                  51.485963
                ],
                [
                  -0.076303,
                  51.485923
                ]
              ]
            ]
          ]
        },
        "type": "Feature",
        "properties": {
          "entry-date": "2024-05-06",
          "start-date": "2011-01-05",
          "end-date": "",
          "entity": 12000601051,
          "name": "",
          "dataset": "title-boundary",
          "typology": "geography",
          "reference": "49560082",
          "prefix": "title-boundary",
          "organisation-entity": "13"
        }
      },
      "property.boundary.area": 307.21,
      "property.boundary.area.hectares": 0.030721,
      "findProperty.action": "Selected an existing address",
      "propertyInformation.action": "Accepted the property type",
      "proposal.site": {
        "type": "Feature",
        "geometry": {
          "type": "MultiPolygon",
          "coordinates": [
            [
              [
                [
                  -0.076303,
                  51.485923000000014
                ],
                [
                  -0.07632628083229737,
                  51.48582760417486
                ],
                [
                  -0.0756007432937695,
                  51.48576747572753
                ],
                [
                  -0.07559269666672483,
                  51.485819253006355
                ],
                [
                  -0.07558465003968015,
                  51.48585015232217
                ],
                [
                  -0.07557400000000002,
                  51.485849
                ],
                [
                  -0.075569,
                  51.48590300000001
                ],
                [
                  -0.07629299999999999,
                  51.485963
                ],
                [
                  -0.076303,
                  51.485923000000014
                ]
              ]
            ]
          ]
        },
        "properties": {
          "entry-date": "2024-05-06",
          "start-date": "2011-01-05",
          "end-date": "",
          "entity": 12000601051,
          "name": "",
          "dataset": "title-boundary",
          "typology": "geography",
          "reference": "49560082",
          "prefix": "title-boundary",
          "organisation-entity": "13",
          "label": "1",
          "area.squareMetres": 770.91,
          "area.hectares": 0.07709099999999999
        }
      },
      "proposal.site.buffered": {
        "type": "Feature",
        "properties": {
          "entry-date": "2024-05-06",
          "start-date": "2011-01-05",
          "end-date": "",
          "entity": 12000601051,
          "name": "",
          "dataset": "title-boundary",
          "typology": "geography",
          "reference": "49560082",
          "prefix": "title-boundary",
          "organisation-entity": "13",
          "label": "1",
          "area.squareMetres": 770.91,
          "area.hectares": 0.07709099999999999
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -0.07801543355898241,
                51.486088991749774
              ],
              [
                -0.07801638783624971,
                51.48608512802929
              ],
              [
                -0.07803966516672906,
                51.48598973186495
              ],
              [
                -0.07805734530691227,
                51.4857759732716
              ],
              [
                -0.07800692998910766,
                51.48556424619612
              ],
              [
                -0.07789040332626171,
                51.48536287935954
              ],
              [
                -0.07771234990781474,
                51.485179793835265
              ],
              [
                -0.07747977434047056,
                51.485022191483395
              ],
              [
                -0.07720182563669466,
                51.48489627168828
              ],
              [
                -0.07688943730339401,
                51.484806987536025
              ],
              [
                -0.07655489729070172,
                51.48475785101622
              ],
              [
                -0.07582937647159732,
                51.48469772397949
              ],
              [
                -0.0754820987083684,
                51.48469082327248
              ],
              [
                -0.07513958978695447,
                51.48472719992464
              ],
              [
                -0.07481561667407215,
                51.48480539179843
              ],
              [
                -0.0745232014488339,
                51.48492225600701
              ],
              [
                -0.0742740979666462,
                51.485073095216876
              ],
              [
                -0.07407831945217508,
                51.48525184642354
              ],
              [
                -0.07394373600052459,
                51.48545132461874
              ],
              [
                -0.0739099525641686,
                51.48555677695028
              ],
              [
                -0.07389264648009798,
                51.485587389154865
              ],
              [
                -0.07384382511878987,
                51.48578686675134
              ],
              [
                -0.07383882307663467,
                51.485840866677755
              ],
              [
                -0.0738504345410729,
                51.48604226100583
              ],
              [
                -0.07392197439016698,
                51.486238799599526
              ],
              [
                -0.07405094867986657,
                51.48642362888478
              ],
              [
                -0.07423286050484486,
                51.48659030352743
              ],
              [
                -0.07446136673501423,
                51.486733011212365
              ],
              [
                -0.07472849916573443,
                51.48684677535556
              ],
              [
                -0.07502494237557013,
                51.48692762867553
              ],
              [
                -0.07534035860250868,
                51.4869727515677
              ],
              [
                -0.07606437528750037,
                51.48703275297534
              ],
              [
                -0.07639913792062278,
                51.48704015871558
              ],
              [
                -0.07672993524031049,
                51.48700732367529
              ],
              [
                -0.07704440869128709,
                51.48693547457051
              ],
              [
                -0.07733080969941666,
                51.486827295672306
              ],
              [
                -0.07757843866640726,
                51.48668682850333
              ],
              [
                -0.07777804473863421,
                51.486519320821444
              ],
              [
                -0.07792217140691997,
                51.486331030537045
              ],
              [
                -0.07800543502478816,
                51.48612899189538
              ],
              [
                -0.07801543355898241,
                51.486088991749774
              ]
            ]
          ]
        }
      },
      "proposal.site.area": 770.91,
      "proposal.site.area.hectares": 0.07709099999999999,
      "drawBoundary.action": "Amended the title boundary",
      "fee": 2,
      "proposal.projectType": [
        "new.temporaryStructure"
      ]
    }
  },
  "breadcrumbs": {
    "FindProperty": {
      "auto": false,
      "data": {
        "_address": {
          "uprn": "200003453480",
          "usrn": "22500531",
          "blpu_code": "2",
          "latitude": 51.4859065,
          "longitude": -0.076021,
          "organisation": null,
          "pao": "47",
          "street": "COBOURG ROAD",
          "town": "LONDON",
          "postcode": "SE5 0HU",
          "ward": "E05011109",
          "x": 533683,
          "y": 178083,
          "planx_description": "HMO Parent",
          "planx_value": "residential.HMO.parent",
          "single_line_address": "47, COBOURG ROAD, LONDON, SOUTHWARK, SE5 0HU",
          "title": "47, COBOURG ROAD, LONDON",
          "source": "os"
        },
        "property.type": [
          "residential.HMO.parent"
        ],
        "property.localAuthorityDistrict": [
          "Southwark"
        ],
        "property.region": [
          "London"
        ],
        "property.boundary": {
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": [
              [
                [
                  [
                    -0.076303,
                    51.485923
                  ],
                  [
                    -0.076307,
                    51.48591
                  ],
                  [
                    -0.075586,
                    51.485849
                  ],
                  [
                    -0.075574,
                    51.485849
                  ],
                  [
                    -0.075569,
                    51.485903
                  ],
                  [
                    -0.076293,
                    51.485963
                  ],
                  [
                    -0.076303,
                    51.485923
                  ]
                ]
              ]
            ]
          },
          "type": "Feature",
          "properties": {
            "entry-date": "2024-05-06",
            "start-date": "2011-01-05",
            "end-date": "",
            "entity": 12000601051,
            "name": "",
            "dataset": "title-boundary",
            "typology": "geography",
            "reference": "49560082",
            "prefix": "title-boundary",
            "organisation-entity": "13"
          }
        },
        "property.boundary.area": 307.21,
        "property.boundary.area.hectares": 0.030721,
        "findProperty.action": "Selected an existing address"
      }
    },
    "PropertyInformation": {
      "auto": false,
      "data": {
        "propertyInformation.action": "Accepted the property type"
      }
    },
    "DrawBoundary": {
      "auto": false,
      "data": {
        "proposal.site": {
          "type": "Feature",
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": [
              [
                [
                  [
                    -0.076303,
                    51.485923000000014
                  ],
                  [
                    -0.07632628083229737,
                    51.48582760417486
                  ],
                  [
                    -0.0756007432937695,
                    51.48576747572753
                  ],
                  [
                    -0.07559269666672483,
                    51.485819253006355
                  ],
                  [
                    -0.07558465003968015,
                    51.48585015232217
                  ],
                  [
                    -0.07557400000000002,
                    51.485849
                  ],
                  [
                    -0.075569,
                    51.48590300000001
                  ],
                  [
                    -0.07629299999999999,
                    51.485963
                  ],
                  [
                    -0.076303,
                    51.485923000000014
                  ]
                ]
              ]
            ]
          },
          "properties": {
            "entry-date": "2024-05-06",
            "start-date": "2011-01-05",
            "end-date": "",
            "entity": 12000601051,
            "name": "",
            "dataset": "title-boundary",
            "typology": "geography",
            "reference": "49560082",
            "prefix": "title-boundary",
            "organisation-entity": "13",
            "label": "1",
            "area.squareMetres": 770.91,
            "area.hectares": 0.07709099999999999
          }
        },
        "proposal.site.buffered": {
          "type": "Feature",
          "properties": {
            "entry-date": "2024-05-06",
            "start-date": "2011-01-05",
            "end-date": "",
            "entity": 12000601051,
            "name": "",
            "dataset": "title-boundary",
            "typology": "geography",
            "reference": "49560082",
            "prefix": "title-boundary",
            "organisation-entity": "13",
            "label": "1",
            "area.squareMetres": 770.91,
            "area.hectares": 0.07709099999999999
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -0.07801543355898241,
                  51.486088991749774
                ],
                [
                  -0.07801638783624971,
                  51.48608512802929
                ],
                [
                  -0.07803966516672906,
                  51.48598973186495
                ],
                [
                  -0.07805734530691227,
                  51.4857759732716
                ],
                [
                  -0.07800692998910766,
                  51.48556424619612
                ],
                [
                  -0.07789040332626171,
                  51.48536287935954
                ],
                [
                  -0.07771234990781474,
                  51.485179793835265
                ],
                [
                  -0.07747977434047056,
                  51.485022191483395
                ],
                [
                  -0.07720182563669466,
                  51.48489627168828
                ],
                [
                  -0.07688943730339401,
                  51.484806987536025
                ],
                [
                  -0.07655489729070172,
                  51.48475785101622
                ],
                [
                  -0.07582937647159732,
                  51.48469772397949
                ],
                [
                  -0.0754820987083684,
                  51.48469082327248
                ],
                [
                  -0.07513958978695447,
                  51.48472719992464
                ],
                [
                  -0.07481561667407215,
                  51.48480539179843
                ],
                [
                  -0.0745232014488339,
                  51.48492225600701
                ],
                [
                  -0.0742740979666462,
                  51.485073095216876
                ],
                [
                  -0.07407831945217508,
                  51.48525184642354
                ],
                [
                  -0.07394373600052459,
                  51.48545132461874
                ],
                [
                  -0.0739099525641686,
                  51.48555677695028
                ],
                [
                  -0.07389264648009798,
                  51.485587389154865
                ],
                [
                  -0.07384382511878987,
                  51.48578686675134
                ],
                [
                  -0.07383882307663467,
                  51.485840866677755
                ],
                [
                  -0.0738504345410729,
                  51.48604226100583
                ],
                [
                  -0.07392197439016698,
                  51.486238799599526
                ],
                [
                  -0.07405094867986657,
                  51.48642362888478
                ],
                [
                  -0.07423286050484486,
                  51.48659030352743
                ],
                [
                  -0.07446136673501423,
                  51.486733011212365
                ],
                [
                  -0.07472849916573443,
                  51.48684677535556
                ],
                [
                  -0.07502494237557013,
                  51.48692762867553
                ],
                [
                  -0.07534035860250868,
                  51.4869727515677
                ],
                [
                  -0.07606437528750037,
                  51.48703275297534
                ],
                [
                  -0.07639913792062278,
                  51.48704015871558
                ],
                [
                  -0.07672993524031049,
                  51.48700732367529
                ],
                [
                  -0.07704440869128709,
                  51.48693547457051
                ],
                [
                  -0.07733080969941666,
                  51.486827295672306
                ],
                [
                  -0.07757843866640726,
                  51.48668682850333
                ],
                [
                  -0.07777804473863421,
                  51.486519320821444
                ],
                [
                  -0.07792217140691997,
                  51.486331030537045
                ],
                [
                  -0.07800543502478816,
                  51.48612899189538
                ],
                [
                  -0.07801543355898241,
                  51.486088991749774
                ]
              ]
            ]
          }
        },
        "proposal.site.area": 770.91,
        "proposal.site.area.hectares": 0.07709099999999999,
        "drawBoundary.action": "Amended the title boundary"
      }
    },
    "Calculate": {
      "auto": true,
      "data": {
        "fee": 2
      }
    },
    "Question": {
      "auto": false,
      "answers": [
        "Answer"
      ]
    }
  },
};

const oldSession = {
  "id": "flow-id-123",
  "passport": {
    "data": {
      "_address": {
        "uprn": "200003453480",
        "usrn": "22500531",
        "blpu_code": "2",
        "latitude": 51.4859065,
        "longitude": -0.076021,
        "organisation": null,
        "pao": "47",
        "street": "COBOURG ROAD",
        "town": "LONDON",
        "postcode": "SE5 0HU",
        "ward": "E05011109",
        "x": 533683,
        "y": 178083,
        "planx_description": "HMO Parent",
        "planx_value": "residential.HMO.parent",
        "single_line_address": "47, COBOURG ROAD, LONDON, SOUTHWARK, SE5 0HU",
        "title": "47, COBOURG ROAD, LONDON",
        "source": "os"
      },
      "property.type": [
        "residential.HMO.parent"
      ],
      "property.localAuthorityDistrict": [
        "Southwark"
      ],
      "property.region": [
        "London"
      ],
      "property.boundary.title": {
        "geometry": {
          "type": "MultiPolygon",
          "coordinates": [
            [
              [
                [
                  -0.076303,
                  51.485923
                ],
                [
                  -0.076307,
                  51.48591
                ],
                [
                  -0.075586,
                  51.485849
                ],
                [
                  -0.075574,
                  51.485849
                ],
                [
                  -0.075569,
                  51.485903
                ],
                [
                  -0.076293,
                  51.485963
                ],
                [
                  -0.076303,
                  51.485923
                ]
              ]
            ]
          ]
        },
        "type": "Feature",
        "properties": {
          "entry-date": "2024-05-06",
          "start-date": "2011-01-05",
          "end-date": "",
          "entity": 12000601051,
          "name": "",
          "dataset": "title-boundary",
          "typology": "geography",
          "reference": "49560082",
          "prefix": "title-boundary",
          "organisation-entity": "13"
        }
      },
      "property.boundary.title.area": 307.21,
      "property.boundary.title.area.hectares": 0.030721,
      "findProperty.action": "Selected an existing address",
      "propertyInformation.action": "Accepted the property type",
      "property.boundary.site": {
        "type": "Feature",
        "geometry": {
          "type": "MultiPolygon",
          "coordinates": [
            [
              [
                [
                  -0.076303,
                  51.485923000000014
                ],
                [
                  -0.07632628083229737,
                  51.48582760417486
                ],
                [
                  -0.0756007432937695,
                  51.48576747572753
                ],
                [
                  -0.07559269666672483,
                  51.485819253006355
                ],
                [
                  -0.07558465003968015,
                  51.48585015232217
                ],
                [
                  -0.07557400000000002,
                  51.485849
                ],
                [
                  -0.075569,
                  51.48590300000001
                ],
                [
                  -0.07629299999999999,
                  51.485963
                ],
                [
                  -0.076303,
                  51.485923000000014
                ]
              ]
            ]
          ]
        },
        "properties": {
          "entry-date": "2024-05-06",
          "start-date": "2011-01-05",
          "end-date": "",
          "entity": 12000601051,
          "name": "",
          "dataset": "title-boundary",
          "typology": "geography",
          "reference": "49560082",
          "prefix": "title-boundary",
          "organisation-entity": "13",
          "label": "1",
          "area.squareMetres": 770.91,
          "area.hectares": 0.07709099999999999
        }
      },
      "property.boundary.site.buffered": {
        "type": "Feature",
        "properties": {
          "entry-date": "2024-05-06",
          "start-date": "2011-01-05",
          "end-date": "",
          "entity": 12000601051,
          "name": "",
          "dataset": "title-boundary",
          "typology": "geography",
          "reference": "49560082",
          "prefix": "title-boundary",
          "organisation-entity": "13",
          "label": "1",
          "area.squareMetres": 770.91,
          "area.hectares": 0.07709099999999999
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -0.07801543355898241,
                51.486088991749774
              ],
              [
                -0.07801638783624971,
                51.48608512802929
              ],
              [
                -0.07803966516672906,
                51.48598973186495
              ],
              [
                -0.07805734530691227,
                51.4857759732716
              ],
              [
                -0.07800692998910766,
                51.48556424619612
              ],
              [
                -0.07789040332626171,
                51.48536287935954
              ],
              [
                -0.07771234990781474,
                51.485179793835265
              ],
              [
                -0.07747977434047056,
                51.485022191483395
              ],
              [
                -0.07720182563669466,
                51.48489627168828
              ],
              [
                -0.07688943730339401,
                51.484806987536025
              ],
              [
                -0.07655489729070172,
                51.48475785101622
              ],
              [
                -0.07582937647159732,
                51.48469772397949
              ],
              [
                -0.0754820987083684,
                51.48469082327248
              ],
              [
                -0.07513958978695447,
                51.48472719992464
              ],
              [
                -0.07481561667407215,
                51.48480539179843
              ],
              [
                -0.0745232014488339,
                51.48492225600701
              ],
              [
                -0.0742740979666462,
                51.485073095216876
              ],
              [
                -0.07407831945217508,
                51.48525184642354
              ],
              [
                -0.07394373600052459,
                51.48545132461874
              ],
              [
                -0.0739099525641686,
                51.48555677695028
              ],
              [
                -0.07389264648009798,
                51.485587389154865
              ],
              [
                -0.07384382511878987,
                51.48578686675134
              ],
              [
                -0.07383882307663467,
                51.485840866677755
              ],
              [
                -0.0738504345410729,
                51.48604226100583
              ],
              [
                -0.07392197439016698,
                51.486238799599526
              ],
              [
                -0.07405094867986657,
                51.48642362888478
              ],
              [
                -0.07423286050484486,
                51.48659030352743
              ],
              [
                -0.07446136673501423,
                51.486733011212365
              ],
              [
                -0.07472849916573443,
                51.48684677535556
              ],
              [
                -0.07502494237557013,
                51.48692762867553
              ],
              [
                -0.07534035860250868,
                51.4869727515677
              ],
              [
                -0.07606437528750037,
                51.48703275297534
              ],
              [
                -0.07639913792062278,
                51.48704015871558
              ],
              [
                -0.07672993524031049,
                51.48700732367529
              ],
              [
                -0.07704440869128709,
                51.48693547457051
              ],
              [
                -0.07733080969941666,
                51.486827295672306
              ],
              [
                -0.07757843866640726,
                51.48668682850333
              ],
              [
                -0.07777804473863421,
                51.486519320821444
              ],
              [
                -0.07792217140691997,
                51.486331030537045
              ],
              [
                -0.07800543502478816,
                51.48612899189538
              ],
              [
                -0.07801543355898241,
                51.486088991749774
              ]
            ]
          ]
        }
      },
      "property.boundary.area": 770.91,
      "property.boundary.area.hectares": 0.07709099999999999,
      "drawBoundary.action": "Amended the title boundary",
      "fee": 2,
      "proposal.projectType": [
        "new.temporaryStructure"
      ]
    }
  },
  "breadcrumbs": {
    "FindProperty": {
      "auto": false,
      "data": {
        "_address": {
          "uprn": "200003453480",
          "usrn": "22500531",
          "blpu_code": "2",
          "latitude": 51.4859065,
          "longitude": -0.076021,
          "organisation": null,
          "pao": "47",
          "street": "COBOURG ROAD",
          "town": "LONDON",
          "postcode": "SE5 0HU",
          "ward": "E05011109",
          "x": 533683,
          "y": 178083,
          "planx_description": "HMO Parent",
          "planx_value": "residential.HMO.parent",
          "single_line_address": "47, COBOURG ROAD, LONDON, SOUTHWARK, SE5 0HU",
          "title": "47, COBOURG ROAD, LONDON",
          "source": "os"
        },
        "property.type": [
          "residential.HMO.parent"
        ],
        "property.localAuthorityDistrict": [
          "Southwark"
        ],
        "property.region": [
          "London"
        ],
        "property.boundary.title": {
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": [
              [
                [
                  [
                    -0.076303,
                    51.485923
                  ],
                  [
                    -0.076307,
                    51.48591
                  ],
                  [
                    -0.075586,
                    51.485849
                  ],
                  [
                    -0.075574,
                    51.485849
                  ],
                  [
                    -0.075569,
                    51.485903
                  ],
                  [
                    -0.076293,
                    51.485963
                  ],
                  [
                    -0.076303,
                    51.485923
                  ]
                ]
              ]
            ]
          },
          "type": "Feature",
          "properties": {
            "entry-date": "2024-05-06",
            "start-date": "2011-01-05",
            "end-date": "",
            "entity": 12000601051,
            "name": "",
            "dataset": "title-boundary",
            "typology": "geography",
            "reference": "49560082",
            "prefix": "title-boundary",
            "organisation-entity": "13"
          }
        },
        "property.boundary.title.area": 307.21,
        "property.boundary.title.area.hectares": 0.030721,
        "findProperty.action": "Selected an existing address"
      }
    },
    "PropertyInformation": {
      "auto": false,
      "data": {
        "propertyInformation.action": "Accepted the property type"
      }
    },
    "DrawBoundary": {
      "auto": false,
      "data": {
        "property.boundary.site": {
          "type": "Feature",
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": [
              [
                [
                  [
                    -0.076303,
                    51.485923000000014
                  ],
                  [
                    -0.07632628083229737,
                    51.48582760417486
                  ],
                  [
                    -0.0756007432937695,
                    51.48576747572753
                  ],
                  [
                    -0.07559269666672483,
                    51.485819253006355
                  ],
                  [
                    -0.07558465003968015,
                    51.48585015232217
                  ],
                  [
                    -0.07557400000000002,
                    51.485849
                  ],
                  [
                    -0.075569,
                    51.48590300000001
                  ],
                  [
                    -0.07629299999999999,
                    51.485963
                  ],
                  [
                    -0.076303,
                    51.485923000000014
                  ]
                ]
              ]
            ]
          },
          "properties": {
            "entry-date": "2024-05-06",
            "start-date": "2011-01-05",
            "end-date": "",
            "entity": 12000601051,
            "name": "",
            "dataset": "title-boundary",
            "typology": "geography",
            "reference": "49560082",
            "prefix": "title-boundary",
            "organisation-entity": "13",
            "label": "1",
            "area.squareMetres": 770.91,
            "area.hectares": 0.07709099999999999
          }
        },
        "property.boundary.site.buffered": {
          "type": "Feature",
          "properties": {
            "entry-date": "2024-05-06",
            "start-date": "2011-01-05",
            "end-date": "",
            "entity": 12000601051,
            "name": "",
            "dataset": "title-boundary",
            "typology": "geography",
            "reference": "49560082",
            "prefix": "title-boundary",
            "organisation-entity": "13",
            "label": "1",
            "area.squareMetres": 770.91,
            "area.hectares": 0.07709099999999999
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -0.07801543355898241,
                  51.486088991749774
                ],
                [
                  -0.07801638783624971,
                  51.48608512802929
                ],
                [
                  -0.07803966516672906,
                  51.48598973186495
                ],
                [
                  -0.07805734530691227,
                  51.4857759732716
                ],
                [
                  -0.07800692998910766,
                  51.48556424619612
                ],
                [
                  -0.07789040332626171,
                  51.48536287935954
                ],
                [
                  -0.07771234990781474,
                  51.485179793835265
                ],
                [
                  -0.07747977434047056,
                  51.485022191483395
                ],
                [
                  -0.07720182563669466,
                  51.48489627168828
                ],
                [
                  -0.07688943730339401,
                  51.484806987536025
                ],
                [
                  -0.07655489729070172,
                  51.48475785101622
                ],
                [
                  -0.07582937647159732,
                  51.48469772397949
                ],
                [
                  -0.0754820987083684,
                  51.48469082327248
                ],
                [
                  -0.07513958978695447,
                  51.48472719992464
                ],
                [
                  -0.07481561667407215,
                  51.48480539179843
                ],
                [
                  -0.0745232014488339,
                  51.48492225600701
                ],
                [
                  -0.0742740979666462,
                  51.485073095216876
                ],
                [
                  -0.07407831945217508,
                  51.48525184642354
                ],
                [
                  -0.07394373600052459,
                  51.48545132461874
                ],
                [
                  -0.0739099525641686,
                  51.48555677695028
                ],
                [
                  -0.07389264648009798,
                  51.485587389154865
                ],
                [
                  -0.07384382511878987,
                  51.48578686675134
                ],
                [
                  -0.07383882307663467,
                  51.485840866677755
                ],
                [
                  -0.0738504345410729,
                  51.48604226100583
                ],
                [
                  -0.07392197439016698,
                  51.486238799599526
                ],
                [
                  -0.07405094867986657,
                  51.48642362888478
                ],
                [
                  -0.07423286050484486,
                  51.48659030352743
                ],
                [
                  -0.07446136673501423,
                  51.486733011212365
                ],
                [
                  -0.07472849916573443,
                  51.48684677535556
                ],
                [
                  -0.07502494237557013,
                  51.48692762867553
                ],
                [
                  -0.07534035860250868,
                  51.4869727515677
                ],
                [
                  -0.07606437528750037,
                  51.48703275297534
                ],
                [
                  -0.07639913792062278,
                  51.48704015871558
                ],
                [
                  -0.07672993524031049,
                  51.48700732367529
                ],
                [
                  -0.07704440869128709,
                  51.48693547457051
                ],
                [
                  -0.07733080969941666,
                  51.486827295672306
                ],
                [
                  -0.07757843866640726,
                  51.48668682850333
                ],
                [
                  -0.07777804473863421,
                  51.486519320821444
                ],
                [
                  -0.07792217140691997,
                  51.486331030537045
                ],
                [
                  -0.07800543502478816,
                  51.48612899189538
                ],
                [
                  -0.07801543355898241,
                  51.486088991749774
                ]
              ]
            ]
          }
        },
        "property.boundary.area": 770.91,
        "property.boundary.area.hectares": 0.07709099999999999,
        "drawBoundary.action": "Amended the title boundary"
      }
    },
    "Calculate": {
      "auto": true,
      "data": {
        "fee": 2
      }
    },
    "Question": {
      "auto": false,
      "answers": [
        "Answer"
      ]
    }
  },
};
