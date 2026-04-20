export default defineNuxtConfig({
   echarts: {
      renderer: 'svg',
      charts: ['BarChart', 'LineChart', 'PieChart'],
      components: ['DatasetComponent', 'GridComponent', 'TooltipComponent'],
   },
})
