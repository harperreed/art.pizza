module.exports = {
  extends: [
    "airbnb-base",
    "prettier/prettier",
    "prettier",
    "plugin:jsdoc/recommended",
  ],
  plugins: ["jsdoc", "prettier", "jest"],
  env: {
    node: true,
    "jest/globals": true,
  },
  rules: {
    "prettier/prettier": ["error"],
    "require-jsdoc": [
      2,
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: false,
          ClassDeclaration: false,
        },
      },
    ],
    "jest/no-disabled-tests": ["warn"],
    "jest/no-focused-tests": ["error"],
    "jest/no-identical-title": ["error"],
    "jest/prefer-to-have-length": ["warn"],
    "jest/valid-expect": ["error"],
    "jest/no-console": ["off"],
  },
  overrides: [
    {
      files: ["*.js"],
    },
  ],
};
