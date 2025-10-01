const js = require('eslint-plugin-jsx-a11y')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const prettier = require('eslint-plugin-prettier')

module.exports = [
  {
    ignores: ['node_modules/**', '.next/**', 'public/**'],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: { parser: tsParser },
    plugins: { react, 'react-hooks': reactHooks, '@typescript-eslint': tsPlugin, 'prettier': prettier, 'jsx-a11y': js },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  }
]
