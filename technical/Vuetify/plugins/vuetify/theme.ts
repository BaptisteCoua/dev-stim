import { resolveVuetifyTheme } from '@core/utils/vuetify'

export const staticPrimaryColor = '#E10600'

const theme = {
  defaultTheme: resolveVuetifyTheme(),
  themes: {
    textColor: '#082D0F',
    bgBlue: '#AAC6DA',
    bgWhite: '#F5F7FA',
    success: '#8FAF5A',
    error: '#BD1B0F',
    warningOrange: '#E77728',
    warningYellow: '#E6C84F',
    pendingJira: '#FFAB00',
    doneJira: '#36B37E',
    todoJira:'#6B778C',
    bgTodoJira: '#EDEFF1',
    bgDoneJira: '#E7F6F0',
    bgPendingJira: '#FFF5E0',
  },
}

export default theme
