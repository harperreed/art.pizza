module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'class-methods-use-this': 0,
    // Changing max row length from 80 to 150.
    // Remember to change in .editorconfig also, although am not sure if that file is even needed?
    // Especially as scaffolding gave 100 as max len while ESLint default is 80...
    'max-len': [
      'error',
      {
        code: 180,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'import/extensions': ['error', 'never', { js: 'never', vue: 'never' }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
      },
    },
  },

};
