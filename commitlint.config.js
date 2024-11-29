module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore'],
      ],
      'type-case': [2, 'always', 'lower-case'],
      'type-empty': [2, 'never'],
      'subject-empty': [2, 'never'],
      'subject-case': [0, 'always'],
      'header-max-length': [2, 'always', 72],
      'scope-case': [2, 'always', 'lower-case'],
    },
  };
  