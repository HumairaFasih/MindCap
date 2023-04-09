module.exports = {
  extends: ['react-app', 'wesbos', 'airbnb/hooks'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
        endOfLine: 'lf',
      },
    ],
    'react/prop-types': 0,
    'camelcase': 0,
    'no-nested-ternary': 0,
  },
};
