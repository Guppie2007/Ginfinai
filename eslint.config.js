import js from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: { parser: tsParser },
    plugins: { react, 'react-hooks': reactHooks, '@typescript-eslint': tsPlugin, 'prettier': prettier, 'jsx-a11y': js },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    },
    ignores: ["node_modules", ".next", "dist"],
  }
]
