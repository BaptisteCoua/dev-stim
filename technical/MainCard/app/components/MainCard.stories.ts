
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MainCard from '~/technical/MainCard/app/components/MainCard.vue'
import TeamStatRow from '~/technical/TeamStatRow/app/components/TeamStatRow.vue'

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
        default: {
            table: { disable: true },
        },
    },
    render: (args) => ({
        components: { MainCard, TeamStatRow },
        setup() {
        return { args }
        },
        template: `
        <MainCard v-bind="args">
            <TeamStatRow label="Assigné" value=11 trend="down" color="error" />
            <TeamStatRow label="Complétés" labelPercentage=95 value=52 trend="up" color="success" />
            <TeamStatRow label="Bugs" value=4 trend="up" color="warning" />
            <TeamStatRow label="MEP version" value="2.11.0" color="info" />
            <TeamStatRow label="Progression" variant="progress" :value=65 color="success" />
        </MainCard>
        `,
    }),
} satisfies Meta<typeof MainCard>

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

export const Bugs: Story = {
    args: {
        title: 'Bugs critiques',
    },
}

export const US: Story = {
    args: {
        title: 'US prioritaires',
        total: 11
    },
}
