import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
   nuxtApp.vueApp.use(Vue3Toastify, {
      transition: 'slide',
      autoClose: 5000,
      position: 'bottom-center',
      limit: 3,
      newestOnTop: true,
      style: {
         width: '500px',
      },
   })

   return {
      provide: { toast },
   }
})
