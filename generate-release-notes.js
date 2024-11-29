const axios = require('axios');

(async () => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = 'lemadv';
  const REPO_NAME = 'test-package';

  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN is not set');
    process.exit(1);
  }

  const github = axios.create({
    baseURL: 'https://api.github.com',
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });

  try {
    // Fetch the latest two tags
    const { data: tags } = await github.get(`/repos/${REPO_OWNER}/${REPO_NAME}/tags?per_page=2`);

    if (tags.length < 2) {
      console.log("This is the first release. No previous tags found.");
      console.log("This is the first release. No previous commits to compare.");
      process.exit(0);
    }

    const currentTag = tags[0].name;
    const previousTag = tags[1].name;
    console.log(`Current tag: ${currentTag}`);
    console.log(`Previous tag: ${previousTag}`);

    // Fetch commits between the two tags
    const { data: commitsData } = await github.get(
      `/repos/${REPO_OWNER}/${REPO_NAME}/compare/${previousTag}...${currentTag}`
    );

    const commits = commitsData.commits;

    // Group commits by component
    const groupedCommits = commits.reduce((groups, commit) => {
      const message = commit.commit.message;

      // Match the format type(component): description
      const match = message.match(/^(\w+)\((.+?)\):\s*(.+)$/);
      const type = match ? match[1] : '-';
      const component = match ? match[2] : '-';
      const description = match ? match[3] : message;

      if (!groups[component]) {
        groups[component] = [];
      }
      groups[component].push({
        type,
        hash: commit.sha.slice(0, 7),
        url: commit.html_url,
        description,
      });

      return groups;
    }, {});

    // Generate Markdown Notes
    let notes = '';
    for (const [component, commits] of Object.entries(groupedCommits)) {
      notes += `### ${component}\n\n`;
      notes += '| Type | Commit | Description |\n';
      notes += '|------|--------|-------------|\n';
      commits.forEach(({ type, hash, url, description }) => {
        notes += `| ${type} | [${hash}](${url}) | ${description} |\n`;
      });
      notes += '\n';
    }

    console.log('Generated Release Notes:');
    console.log(notes);

    // Save notes to a file for CircleCI to use later
    const fs = require('fs');
    fs.writeFileSync('release_notes.md', notes.trim());
  } catch (error) {
    console.error('Error generating release notes:', error.message);
    process.exit(1);
  }
})();
