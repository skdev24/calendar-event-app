module.exports = {
  root: true,
  extends: 'satya164',
  settings: {
    react: { version: '17' },
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.ios.js',
          '.android.js',
          '.native.js',
          '.ts',
          '.tsx'
        ]
      },
      'babel-module': {
        alias: {}
      }
    }
  },
  parser: 'babel-eslint',
  plugins: ['prettier'],
  globals: { fetch: true, window: true },
  rules: {
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'jest/no-truthy-falsy': 0,
    'react/jsx-sort-props': 0,
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx']
      }
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        singleQuote: true
      }
    ],
    'react-native/no-inline-styles': 0,
    'import/named': 0,
    'import/no-cycle': 0,
    'import/no-named-as-default': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/display-name': 2,
    'react/no-array-index-key': 0,
    'jest/no-test-prefixes': 0,
    'jest/no-disabled-tests': 0,
    'babel/no-unused-expressions': 'off',
    'react/jsx-curly-brace-presence': 0,
    'react/prop-types': 0,
    'global-require': 0,
    'react/style-prop-object': 0,
    'no-new': 0,
    'no-underscore-dangle': 0,
    'no-nested-ternary': 0,
    camelcase: 0,
    'no-console': 0,
    'react/jsx-props-no-spreading': 0,
    'no-param-reassign': 0,
    'func-names': 0,
    'no-use-before-define': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: './'
      }
    ]
  },
  env: { browser: true, node: true }
};
