import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TeamCard from '~/technical/TeamCard/app/components/TeamCard.vue'

const meta = {
  title: 'Components/TeamCard',
  component: TeamCard,
  tags: ['autodocs'],
  args: {
    title: 'Default',
  },
  argTypes: {
    title: {
      control: 'text',
    },
  },
  render: (args) => ({
    components: { TeamCard },
    setup() {
      return { args }
    },
    template: `
      <TeamCard v-bind="args">
        <p>Contenu de la card</p>
      </TeamCard>
    `,
  }),
} satisfies Meta<typeof TeamCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Front: Story = {
  args: {
    title: 'Front',
  },
}

export const Back: Story = {
  args: {
    title: 'Back',
  },
}

export const Agent: Story = {
  args: {
    title: 'Agent',
  },
}