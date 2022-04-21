module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base/legacy',
    'plugin:react/jsx-runtime',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    semi: [2, 'always'],
    'max-len': 'off',
    'require-jsdoc': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'no-underscore-dangle': 0,
    'comma-dangle': ['error', 'never'],
    'react/jsx-filename-extension': [1, { allow: 'as-needed' }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'consistent-return': 0
  }
};
