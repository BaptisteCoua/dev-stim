import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseCarousel from './BaseCarousel.vue'
import MainCard from '~/technical/MainCard/app/components/MainCard.vue'

const meta = {
   title: 'Components/BaseCarousel',
   component: BaseCarousel,
   tags: ['autodocs'],
   argTypes: {
      slides: {
         control: 'object',
         description: 'Liste des slides (images ou contenu custom)',
         table: {
            type: {
               summary: 'Array<{ image?: string; title?: string }>',
            },
         },
      },
   },
} satisfies Meta<typeof BaseCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const WithImages: Story = {
   args: {
      slides: [
         { image: 'https://i.pinimg.com/1200x/ad/05/82/ad0582b08cad64308cacbcfd38b65b78.jpg' },
         {
            image: 'https://i.pinimg.com/webp70/1200x/78/a4/e7/78a4e72ffed2f4601344d453bdcec5d4.webp',
         },
         { image: 'https://i.pinimg.com/736x/2d/84/20/2d84200891a2231c74a94fc5df387ab7.jpg' },
      ],
   },
}

export const WithMainCards: Story = {
   args: {
      slides: [{ title: 'Card 1' }, { title: 'Card 2' }, { title: 'Card 3' }],
   },
   render: (args) => ({
      components: { BaseCarousel, MainCard },
      setup: () => ({ args }),
      template: `
         <BaseCarousel v-bind="args">
            <template #slide="{ slide }">
               <MainCard :title="slide.title">
                  <p>Contenu de la card</p>
               </MainCard>
            </template>
         </BaseCarousel>
      `,
   }),
}
