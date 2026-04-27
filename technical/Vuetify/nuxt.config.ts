import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
   build: {
      transpile: ['vuetify'],
   },
   vite: {
      plugins: [vuetify({ autoImport: true, styles: { configFile: 'src/styles/settings.scss' } })],
      vue: {
         template: {
            transformAssetUrls,
         },
      },
   },
   css: ['~/technical/Template/assets/scss/main.scss'],
})
