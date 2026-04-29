import type { Preview } from '@storybook-vue/nuxt'
import { setup } from '@storybook/vue3'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import themes from '../technical/Vuetify/plugins/vuetify/theme'
import '../technical/Template/assets/scss/main.scss'

setup((app) => {
   app.use(
      createVuetify({
         theme: {
            ...themes,
         },
      }),
   )
})

const preview: Preview = {
   decorators: [
      (story) => ({
         components: { story },
         template: '<v-app><v-main><story /></v-main></v-app>',
      }),
   ],
   parameters: {
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
         },
      },
   },
}

export default preview
