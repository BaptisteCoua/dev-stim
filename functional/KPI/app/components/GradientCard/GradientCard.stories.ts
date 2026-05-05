import type { Meta, StoryObj } from '@storybook/vue3-vite'
import GradientCard from '~/functional/KPI/app/components/GradientCard/GradientCard.vue'

const meta = {
   title: 'Components/GradientCard',
   component: GradientCard,
   tags: ['autodocs'],
   args: {
      title: 'Ping Prod',
      mainInformation: 'Data',
   },
   argTypes: {
      gradientChosen: {
         control: 'inline-radio',
         options: ['info', 'success', 'warning'],
      },
   },
} satisfies Meta<typeof GradientCard>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
   args: {},
}

export const WithDescription: Story = {
   args: {
      gradientChosen: 'warning',
      additionalInformation: 'Added info',
   },
}

export const WithPieChart: Story = {
   args: {
      gradientChosen: 'warning',
      additionalInformation: 'Added info',
      numberUsDone: 29,
      totalUs: 52,
   },
}
