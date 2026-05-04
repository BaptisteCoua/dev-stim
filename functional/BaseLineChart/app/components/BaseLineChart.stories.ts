import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseLineChart from './BaseLineChart.vue'
import MainCard from '~/technical/MainCard/app/components/MainCard.vue'

const meta = {
   title: 'Components/BaseLineChart',
   component: BaseLineChart,
   tags: ['autodocs'],
   argTypes: {
      labels: { control: 'object' },
      values: { control: 'object' },
      label: { control: 'text' },
   },
} satisfies Meta<typeof BaseLineChart>

export default meta
type Story = StoryObj<typeof meta>

export const InMainCard: Story = {
   args: {
      label: 'Visitors',
      labels: ['Mar', 'Mer', 'Jeu', 'Ven', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Lun', 'Mar'],
      values: [300, 280, 240, 250, 210, 200],
   },
   render: (args) => ({
      components: { BaseLineChart, MainCard },
      setup: () => ({ args }),
      template: `
         <MainCard title="Evolution du sprint">
            <BaseLineChart v-bind="args" />
         </MainCard>
      `,
   }),
}
