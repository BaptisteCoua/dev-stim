import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MainCard from '~/technical/MainCard/app/components/MainCard.vue'

const meta = {
   title: 'Components/MainCard',
   component: MainCard,
   tags: ['autodocs'],
   args: {
      title: 'Default',
   },
   argTypes: {
      title: {
         control: 'text',
      },
      total: {
         control: 'number',
      },
   },
   render: (args) => ({
      components: { MainCard },
      setup() {
         return { args }
      },
      template: `
        <MainCard v-bind="args">
            <p>Contenu de la card</p>
        </MainCard>
        `,
   }),
} satisfies Meta<typeof MainCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
