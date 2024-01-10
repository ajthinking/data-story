module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': ['*.ts', '*.tsx', '*.js', '*.jsx'],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    '@stylistic',
    'react-hooks'
  ],
  'rules': {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@stylistic/indent': [
      'error',
      2
    ],
    '@stylistic/linebreak-style': 'off',
    '@stylistic/quotes': [
      'error',
      'single'
    ],
    '@stylistic/eol-last': 'off',
    '@stylistic/space-infix-ops': ['error', { 'int32Hint': false }]
  }
};
