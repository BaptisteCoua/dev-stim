// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
   files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
   rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Vue
      'vue/html-self-closing': [
         'warn',
         {
            html: { void: 'always', normal: 'always', component: 'always' },
            svg: 'always',
            math: 'always',
         },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'warn',

      // Général
      'no-console': 'warn',
      'no-debugger': 'warn',
   },
   ignores: ['prisma/generated/**'],
})
