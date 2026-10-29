import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist', 'storybook-static', 'node_modules', '!.storybook'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  ...storybook.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'arrow-body-style': ['error', 'always'],
      'func-style': ['error', 'expression'],
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXOpeningElement[name.name=/^(button|Button)$/] > JSXAttribute[name.name='aria-label']",
          message: 'Icon-only controls get an sr-only span plus title, never aria-label.',
        },
      ],
    },
  },
);
