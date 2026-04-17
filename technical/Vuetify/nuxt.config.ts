import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
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
});
