const { setupPrompts } = require("../prompts");

const findAndReplacePrompts= [
  ...setupPrompts,
  {
    name: "currentPassportVariable",
    description: "What is the current passport variable to be replaced?",
    default: "outbuildings",
    type: "string",
    required: true,
  },
  {
    name: "newPassportVariable",
    description: "What should this passport variable be replaced with?",
    default: "outbuilding",
    type: "string",
    required: true,
  },

];

module.exports = { findAndReplacePrompts };
