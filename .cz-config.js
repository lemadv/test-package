const fs = require("fs");
const path = require("path");

// Function to dynamically generate scopes
function getScopes() {
  const baseDir = "./src"; // Adjust to your folder path
  try {
    const result = fs
      .readdirSync(baseDir)
      .filter((file) => fs.statSync(path.join(baseDir, file)).isDirectory())
      .map((folder) => ({ name: folder })); // Format as Commitizen scopes

    return [...result, "Other"];
  } catch (error) {
    console.error("Error reading scopes:", error);
    return []; // Return empty array if an error occurs
  }
}

module.exports = {
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


  skipQuestions: ["customScope", "body", "breaking", "footer"],

  // Default and required scopes/components
  scopes: getScopes(),
  askForBreakingChangeFirst: false,
  // Default commit message format
  subjectLimit: 72,
  allowCustomScopes: false,
  allowBreakingChanges: ["feat", "fix"], // Optional breaking change prompt
  messageFormat: (answers) => {
    const type = answers.type || "-";
    const scope = answers.scope || "-";
    const subject = answers.subject || "-";
    return `[${type}](${scope}): ${subject}`;
  },
  messages: {
    type: "Select the type of change that you're committing:",
    scope: "\nScope of this change:",
    // used if allowCustomScopes is true
    subject: "Write the description of the change:\n",
  },
};
