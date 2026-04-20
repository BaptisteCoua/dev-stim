// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import defaults from './vuetify/defaults'

export default defineNuxtPlugin((app) => {
   const vuetify = createVuetify({
      defaults,
   })
   app.vueApp.use(vuetify)
})
