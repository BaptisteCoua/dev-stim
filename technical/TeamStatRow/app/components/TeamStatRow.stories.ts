import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TeamStatRow from '~/technical/TeamStatRow/app/components/TeamStatRow.vue'

const meta = {
   title: 'Components/TeamStatRow',
   component: TeamStatRow,
   tags: ['autodocs'],
   args: {
      label: 'Default',
      value: '11',
      variant: 'badge',
      color: 'primary',
   },
   argTypes: {
      variant: {
         control: 'inline-radio',
         options: ['badge', 'progress'],
      },
      trend: {
         control: 'inline-radio',
         options: [undefined, 'up', 'down', 'equal'],
      },
      color: {
         control: 'select',
         options: ['primary', 'success', 'error', 'warning', 'info'],
      },
      label: {
         control: 'text',
      },
      value: {
         control: 'number',
      },
   },
} satisfies Meta<typeof TeamStatRow>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
