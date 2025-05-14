const fs = require('fs');
const path = require('path');

const summary = process.argv[2];
const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');

if (!summary) {
  console.error('❌ No summary provided.');
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0]; // e.g., 2025-05-13
const newEntry = `## Unreleased - ${today}\n\n${summary.trim()}\n\n`;

const existing = fs.existsSync(changelogPath)
  ? fs.readFileSync(changelogPath, 'utf8')
  : '';

fs.writeFileSync(changelogPath, newEntry + existing);
console.log('✅ CHANGELOG.md updated');
