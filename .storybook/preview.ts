import type { Preview } from '@storybook-vue/nuxt'
import { setup } from '@storybook/vue3'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

setup((app) => {
   app.use(createVuetify())
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
