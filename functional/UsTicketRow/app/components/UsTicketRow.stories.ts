import type { Meta, StoryObj } from '@storybook/vue3'
import UsTicketRow from './UsTicketRow.vue'

const meta = {
   title: 'Components/UsTicketRow',
   component: UsTicketRow,
   tags: ['autodocs'],
} satisfies Meta<typeof UsTicketRow>

export default meta
type Story = StoryObj<typeof meta>

export const EnReview: Story = {
   args: {
      code: 'HPV-1378',
      title: 'Rapports des activités de sauvegarde V2',
      status: 'review',
      progress: '100',
      assignee: {
         name: 'Ines',
         avatar: 'https://i.pinimg.com/736x/63/0c/92/630c924184e8ec2ed03e0009b3560d2d.jpg',
      },
   },
}

export const Termine: Story = {
   args: {
      code: 'HPV-1378',
      title: 'Rapports des activités de sauvegarde V2',
      status: 'done',
      progress: '100',
      assignees: [
         {
            name: 'Ines',
            avatar: 'https://i.pinimg.com/736x/63/0c/92/630c924184e8ec2ed03e0009b3560d2d.jpg',
         },
         {
            name: 'Aurore',
            avatar: 'https://i.pinimg.com/736x/88/b1/a9/88b1a9e10e20dea60a3b6c7b76a31927.jpg',
         },
         {
            name: 'Ruru',
            avatar:
               'https://i.pinimg.com/webp70/1200x/73/86/35/7386355e526a9c512aa3841a54cec2a5.webp',
            main: true,
         },
      ],
   },
}

export const EnCours: Story = {
   args: {
      code: 'HPV-8990',
      title: 'Terminologie colonne "Nom" - Page Enrôlement',
      status: 'in_progress',
      progress: '56',
      assignee: {
         name: 'Cléclé',
         avatar: 'https://i.pinimg.com/1200x/34/21/38/342138fb0a3a1533e8d7b308db14337c.jpg',
      },
   },
}

export const AFaire: Story = {
   args: {
      code: 'HPV-1121',
      title: 'Problème avec la story HPV-10760',
      status: 'todo',
      assignee: {
         name: 'Baptiste',
         avatar: 'https://i.pinimg.com/736x/f8/71/06/f871062489c0fe1b5168e09ffd163cd5.jpg',
      },
   },
}
