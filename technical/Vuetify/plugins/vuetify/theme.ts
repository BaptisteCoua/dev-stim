import { resolveVuetifyTheme } from '@core/utils/vuetify'

export const staticPrimaryColor = '#0052CC'

const theme = {
   defaultTheme: resolveVuetifyTheme(),
   themes: {
      textColor: '#082D0F',
      bgBlue: '#AAC6DA',
      bgWhite: '#F5F7FA',
      info: '#0052CC',
      success: '#8FAF5A',
      error: '#BD1B0F',
      warningOrange: '#E77728',
      warningYellow: '#E6C84F',
      bgText: 'rgba(170, 198, 218, 0.25)',
      bgInfo: 'rgba(0, 82, 204, 0.25)',
      bgSuccess: 'rgba(143, 175, 90, 0.25)',
      bgError: 'rgba(231, 119, 40, 0.25)',
      bgWarning: 'rgba(230, 200, 79, 0.25)',
      doneJira: '#36B37E',
      todoJira: '#6B778C',
      pendingJira: '#1062DA',
      bgTodoJira: 'rgba(107, 119, 140, 0.12)',
      bgDoneJira: 'rgba(54, 179, 126, 0.12)',
      bgPendingJira: 'rgba(16, 98, 218, 0.12)',
      white: '#FFFFFF',
      black: '#000000',
   },
}

export default theme
