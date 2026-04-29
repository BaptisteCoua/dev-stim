import type { Meta, StoryObj } from '@storybook/vue3'
import BaseCarousel from './BaseCarousel.vue'

const meta = {
    title: 'Components/BaseCarousel',
    component: BaseCarousel,
    tags: ['autodocs'],
} satisfies Meta<typeof BaseCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        slides: [
            {
                image: 'https://picsum.photos/1000/500?random=1',
                alt: 'Slide 1',
            },
            {
                image: 'https://picsum.photos/1000/500?random=2',
                alt: 'Slide 2',
            },
            {
                image: 'https://picsum.photos/1000/500?random=3',
                alt: 'Slide 3',
            },
        ],
    },
}