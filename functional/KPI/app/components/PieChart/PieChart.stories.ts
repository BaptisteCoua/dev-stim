import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PieChart from '~/functional/KPI/app/components/PieChart/PieChart.vue'

const meta = {
   title: 'Components/PieChart',
   component: PieChart,
   tags: ['autodocs'],
   args: {
      numberUsDone: '25',
      totalUs: '59,',
   },
   argTypes: {},
} satisfies Meta<typeof PieChart>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
   args: {
      numberUsDone: 25,
      totalUs: 59,
   },
}
