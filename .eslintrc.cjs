module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/require-default-props': 0,
    'no-plusplus': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-misused-promises': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    'no-param-reassign': 0,
    'import/extensions': 0,
    'react/prop-types': 0,
    'import/no-extraneous-dependencies': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '~*',
            group: 'internal',
          },
          {
            pattern: '~*/**',
            group: 'internal',
          },
          {
            pattern: './**',
            group: 'index',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
};
