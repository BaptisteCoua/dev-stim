// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import theme from './vuetify/theme'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import defaults from './vuetify/defaults'

export default defineNuxtPlugin((app) => {
   const vuetify = createVuetify({
      defaults,
      theme,
   })
   app.vueApp.use(vuetify)
})
