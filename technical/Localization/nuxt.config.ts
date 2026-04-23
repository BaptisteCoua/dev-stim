export default defineNuxtConfig({
   modules: ['@nuxtjs/i18n'],
   i18n: {
      locales: [{ code: 'fr-FR', iso: 'fr-FR', name: 'Français', file: 'fr-FR.ts' }],
      langDir: 'locales/',
      defaultLocale: 'fr-FR',
   },
})
