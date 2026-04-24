<template>
    <v-sheet class="row d-flex align-center ga-2 px-3 py-2" :class="`row--${status}`">
        <v-icon :icon="s.icon" :color="s.color" size="20" />
        
        <v-text class="title text-no-wrap">
            <b>{{ code }}</b> {{ title }}
            <span v-if="progress !== undefined" class="progress font-weight-bold">
                {{ progress }}%
            </span>
        </v-text>
        <v-text class="status font-weight-semibold text-no-wrap">{{ s.label }}</v-text>

        <v-sheet v-if="assignee" class="user d-flex align-center ga-2 font-weight-semibold text-no-wrap" color="transparent">
            <v-text>{{ assignee.name }}</v-text>
            <v-avatar size="28">
                <v-img :src="assignee.avatar" cover />
            </v-avatar>
        </v-sheet>

        <v-sheet v-else-if="assignees?.length" class="user d-flex align-center ga-2 font-weight-semibold text-no-wrap" color="transparent">
            <v-text v-if="mainAssignee">{{ mainAssignee.name }}</v-text>

            <v-sheet class="avatars d-flex align-center" color="transparent">
                <v-avatar
                    v-for="user in assignees"
                    :key="user.name"
                    :class="{ 'avatar--main': user.main }"
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

const s = computed(() => {
    const [label, icon, color] = statusMap[props.status]
    return { label, icon, color }
})

const mainAssignee = computed(() =>
  props.assignees?.find(user => user.main)
)
</script>

<style scoped>
.row {
    min-height: 44px;
    border-radius: 10px;
    color: v-bind('colors.textColor');
}

.row--review,
.row--done {
    background: v-bind('colors.bgDoneJira');
}

.row--in_progress {
    background: v-bind('colors.bgPendingJira');
}

.row--todo {
    background: v-bind('colors.bgTodoJira');
}

.title {
    flex: 1;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.row--review .status,
.row--done .status {
    color: v-bind('colors.doneJira');
}

.row--in_progress .status {
    color: v-bind('colors.pendingJira');
}

.row--todo .status {
    color: v-bind('colors.todoJira');
}

.progress {
    margin-left: 6px;
    opacity: 0.5;
    font-size: 14px;
}

.avatars {
    padding-left: 10px;
}

.avatars :deep(.v-avatar) {
    margin-left: -10px;
    border: 2px solid v-bind('colors.white');
}

.avatar--main {
    z-index: 2;
    width: 34px !important;
    height: 34px !important;
    box-shadow: 0 0 0 2px v-bind('colors.doneJira');
}
</style>