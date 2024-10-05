import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

export default {
  files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
  plugins: {
    '@typescript-eslint': typescriptEslint,
    '@stylistic': stylistic,
    'react-hooks': reactHooks,
    'import': importPlugin,
  },
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      acquireVsCodeApi: 'readonly'  // Move globals here
    },
  },
  rules: {
    'no-multiple-empty-lines': [ 'error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 } ],
    'padded-blocks': [ 'error', { 'blocks': 'never' } ],
    'no-trailing-spaces': 'error',
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
    '@stylistic/space-infix-ops': [ 'error', { 'int32Hint': false }],
    '@typescript-eslint/naming-convention': [ 'warn', {
      selector: 'import',
      format: [ 'camelCase', 'PascalCase' ],
    } ],
    curly: 'warn',
    eqeqeq: 'warn',
    'no-throw-literal': 'warn',
    semi: 'warn',
  },
};
