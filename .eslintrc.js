module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': ['*.ts', '*.tsx', '*.js', '*.jsx'],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@stylistic',
    'react-hooks',
    'import',
  ],
  'rules': {
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
    'padded-blocks': ['error', { 'blocks': 'never' }],
    'no-trailing-spaces': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@stylistic/indent': [
      'error',
      2,
    ],
    '@stylistic/linebreak-style': 'off',
    '@stylistic/quotes': [
      'error',
      'single',
    ],
    '@stylistic/eol-last': 'off',
    '@stylistic/space-infix-ops': ['warn', { 'int32Hint': false }],
    '@stylistic/comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
    }],
    '@stylistic/object-curly-spacing': ['error', 'always'],
  },
};
