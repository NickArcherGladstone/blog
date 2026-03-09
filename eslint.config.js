export default [
  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        document: 'readonly',
        window: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        Promise: 'readonly',
        URLSearchParams: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'],
      'no-implicit-globals': 'error',
    },
  },
];
