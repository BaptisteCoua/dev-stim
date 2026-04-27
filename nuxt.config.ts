import { defineOSDDNuxtConfig } from 'nuxt-osdd'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineOSDDNuxtConfig({
   osdd: {
      technical: [
         'Authentication',
         'Permissions',
         'Vuetify',
         'Template',
         'Toastify',
         'Swiper',
         'ECharts',
         'User',
      ],
      functional: ['Version'],
   },
   compatibilityDate: '2025-07-15',
   modules: ['nuxt-auth-utils', '@nuxt/eslint', '@nuxtjs/i18n', 'nuxt-echarts'],
   devtools: { enabled: true },
   i18n: {
      locales: [{ code: 'fr-FR', iso: 'fr-FR', name: 'Français', file: 'fr-FR.ts' }],
      langDir: 'locales/',
      defaultLocale: 'fr-FR',
   },
})
