import type { Meta, StoryObj } from '@storybook/vue3-vite'
import GradientCard from './GradientCard.vue'

const meta = {
   title: 'Components/GradientCard',
   component: GradientCard,
   tags: ['autodocs'],
   args: {
      title: 'Ping Prod',
      gradientChosen: 'info',
   },
   argTypes: {
      gradientChosen: {
         options: ['info', 'success', 'warning'],
      },
   },
} satisfies Meta<typeof GradientCard>

export default meta

type Story = StoryObj<typeof meta>

export const Info: Story = {
   gradientChosen: 'info',
}

export const Success: Story = {
   args: {
      gradientChosen: 'success',
   },
}

export const Warning: Story = {
   args: {
      gradientChosen: 'warning',
      mainInformation: 'Data',
      additionalInformation: 'Added info',
   },
}
