const setupPrompts = [
  {
    name: "hasuraEnvironment",
    description: "Enter the environment you want to connect to",
    type: "string",
    default: "staging",
    pattern: /^(?:production\b|staging\b|local\b)/,
    message: "Enter 'production', 'staging', or 'local' only",
    required: true,
  },
  {
    name: "hasuraSecret",
    description: "Enter your x-hasura-admin-secret",
    type: "string",
    hidden: true,
    replace: "*",
    required: true,
  },
  {
    name: "flowSlug",
    description: "Which service do you want to update content for? Enter the flow slug",
    default: "apply-for-planning-permission",
    type: "string",
    required: true,
  },
];

module.exports = { setupPrompts };
