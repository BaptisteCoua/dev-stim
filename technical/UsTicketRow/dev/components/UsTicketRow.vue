<template>
   <v-sheet class="ticket-row d-flex align-center ga-2 px-3 py-2" :class="`ticket-row--${props.status}`">
      <v-icon :icon="status.icon" :color="status.color" size="20" />

      <v-text class="ticket-row__title text-no-wrap">
         <b>{{ code }}</b> {{ title }}
         <span v-if="progress !== undefined" class="ticket-row__progress font-weight-bold">
            {{ progress }}%
         </span>
      </v-text>
      <v-text class="ticket-row__status font-weight-semibold text-no-wrap">
         {{ status.label }}
      </v-text>

      <v-sheet
         v-if="assignee"
         class="ticket-row__user d-flex align-center ga-2 font-weight-semibold text-no-wrap"
         color="transparent"
      >
         <v-text>{{ assignee.name }}</v-text>
         <v-avatar size="28">
            <v-img :src="assignee.avatar" cover />
         </v-avatar>
      </v-sheet>

      <v-sheet
         v-else-if="assignees?.length"
         class="ticket-row__user d-flex align-center ga-2 font-weight-semibold text-no-wrap"
         color="transparent"
      >
         <v-text v-if="mainAssignee">{{ mainAssignee.name }}</v-text>

         <v-sheet class="ticket-row__avatars d-flex align-center" color="transparent">
            <v-avatar
               v-for="user in assignees"
               :key="user.name"
               :class="{ 'ticket-row__avatar--main': user.main }"
               size="28"
            >
               <v-img :src="user.avatar" cover />
            </v-avatar>
         </v-sheet>
      </v-sheet>
   </v-sheet>
</template>

<script setup lang="ts">
   import { computed } from 'vue'
   import theme from '~/technical/Vuetify/plugins/vuetify/theme'

   type Status = 'review' | 'in_progress' | 'todo' | 'done'

   const props = defineProps<{
      code: string
      title: string
      status: Status
      progress?: number
      assignee?: { name: string; avatar: string }
      assignees?: { name: string; avatar: string; main?: boolean }[]
   }>()

   const colors = theme.themes.light.colors

   const statusMap = {
      review: ['En review', 'mdi-check', colors.doneJira],
      done: ['Terminé', 'mdi-check', colors.doneJira],
      in_progress: ['En cours', 'mdi-timer-sand', colors.pendingJira],
      todo: ['À faire', 'mdi-clock-outline', colors.todoJira],
   } as const

   const status = computed(() => {
      const [label, icon, color] = statusMap[props.status]
      return { label, icon, color }
   })

   const mainAssignee = computed(() => props.assignees?.find((user) => user.main))
</script>

<style scoped lang="scss">
.ticket-row {
   min-height: 44px;
   border-radius: 10px;
   color: v-bind('colors.textColor');

   &--review,
   &--done {
      background: v-bind('colors.bgDoneJira');

      .ticket-row__status {
         color: v-bind('colors.doneJira');
      }
   }

   &--in_progress {
      background: v-bind('colors.bgPendingJira');

      .ticket-row__status {
         color: v-bind('colors.pendingJira');
      }
   }

   &--todo {
      background: v-bind('colors.bgTodoJira');

      .ticket-row__status {
         color: v-bind('colors.todoJira');
      }
   }

   &__title {
      flex: 1;
      font-size: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
   }

   &__progress {
      margin-left: 6px;
      opacity: 0.5;
      font-size: 14px;
   }

   &__avatars {
      padding-left: 10px;

      :deep(.v-avatar) {
         margin-left: -10px;
         border: 2px solid v-bind('colors.white');
      }
   }

   &__avatar--main {
      z-index: 2;
      width: 34px !important;
      height: 34px !important;
      box-shadow: 0 0 0 2px v-bind('colors.doneJira');
   }
}
</style>
