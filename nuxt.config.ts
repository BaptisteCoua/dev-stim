import { defineOSDDNuxtConfig } from 'nuxt-osdd'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineOSDDNuxtConfig({
   runtimeConfig: {
      productionUrl: process.env.URL_PROD,
   },
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
         'Localization',
         'Story',
         'MainCard',
         'Ticket',
      ],
      functional: ['KPI', 'UsTicketRow', 'Version'],
   },
   compatibilityDate: '2025-07-15',
   modules: ['nuxt-auth-utils', '@nuxt/eslint', '@nuxtjs/i18n', 'nuxt-echarts'],
   nitro: {
      externals: {
         external: ['node-cron'],
      },
      rollupConfig: {
         external: ['node-cron'],
      },
   },
   devtools: { enabled: true },
})
