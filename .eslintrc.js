module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "quotes": [1, "double"],
    "indent": 0,
    "react/prop-types": 0,
    "react/display-name": 0,
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        bracketSpacing: true,
        htmlWhitespaceSensitivity: "css",
        insertPragma: false,
        jsxBracketSameLine: false,
        jsxSingleQuote: false,
        proseWrap: "preserve",
        quoteProps: "consistent",
        requirePragma: false,
        semi: true,
        tabWidth: 2,
        trailingComma: "es5",
        useTabs: false,
        vueIndentScriptAndStyle: false,
        printWidth: 100,
        jsxSingleQuote: false,
        singleQuote: false,
        stylelintIntegration: true,
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
