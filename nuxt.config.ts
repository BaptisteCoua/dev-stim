import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: '2025-07-15',
   modules: ['nuxt-auth-utils', '@nuxt/eslint', '@nuxtjs/i18n'],
   devtools: { enabled: true },
   build: {
      transpile: ['vuetify'],
   },
   vite: {
      plugins: [vuetify({ autoImport: true })],
      vue: {
         template: {
            transformAssetUrls,
         },
      },
   },
   i18n: {
      locales: [{ code: 'fr-FR', iso: 'fr-FR', name: 'Français', file: 'fr-FR.ts' }],
      langDir: 'locales/',
      defaultLocale: 'fr-FR',
   },
});
