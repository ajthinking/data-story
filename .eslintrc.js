module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@stylistic"
  ],
  "rules": {
    "@stylistic/indent": [
      "error",
      2
    ],
    "@stylistic/linebreak-style": "off",
    "@stylistic/quotes": [
      "error",
      "double"
    ],
    "@stylistic/semi": [
      "warn",
      "always"
    ],
    "@stylistic/eol-last": "off",
    "@stylistic/space-infix-ops": ["error", { "int32Hint": false }]
  }
};
