const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = defineConfig(
  {
    ignores: ['dist/', 'node_modules/'],
  },

  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,

    rules: {
      ...prettierConfig.rules,

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      quotes: [
        'warn',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ],

      semi: ['warn', 'always'],

      'object-curly-spacing': ['warn', 'always'],

      'template-curly-spacing': ['warn', 'always'],

      'padded-blocks': [
        'error',
        {
          classes: 'always',
        },
      ],

      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: false,
        },
      ],

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',

        {
          selector: 'enum',
          format: ['PascalCase'],
        },

        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },

        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
      ],

      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],

      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },

  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': 'error',

      'prettier/prettier': [
        'error',
        {
          parser: 'angular',
          tabWidth: 2,
          useTabs: false,
          singleQuote: true,
          semi: true,
        },
      ],
    },
  },
);
