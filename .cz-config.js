module.exports = {
  // List of types
  types: [
    { value: "feat", name: "feat:     A new feature" },
    { value: "fix", name: "fix:      A bug fix" },
    { value: "docs", name: "docs:     Documentation only changes" },
    {
      value: "style",
      name: "style:    Changes that do not affect the meaning of the code",
    },
    {
      value: "refactor",
      name: "refactor: A code change that neither fixes a bug nor adds a feature",
    },
    {
      value: "test",
      name: "test:     Adding missing tests or correcting existing tests",
    },
    {
      value: "chore",
      name: "chore:    Changes to the build process or auxiliary tools",
    },
  ],

  // Skip optional questions
  skipQuestions: [],

  // Default and required scopes/components
  scopes: [
    { name: "button" },
    { name: "card" },
    { name: "layout" },
    { name: "api" },
    { name: "docs" },
  ],

  // Default commit message format
  subjectLimit: 72,
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"], // Optional breaking change prompt
  messageFormat: (answers) => {
    const type = answers.type || "-";
    const scope = answers.scope || "-";
    const subject = answers.subject || "-";
    return `[${type}](${scope}): ${subject}`;
  },
};
