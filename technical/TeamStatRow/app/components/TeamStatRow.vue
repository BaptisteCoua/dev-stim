<template>
    <div class="d-flex flex-column ga-3">
        <div class="d-flex align-center justify-space-between">
            <span class="font-weight-medium">
                {{ label }}
                <span v-if="labelPercentage !== undefined">
                    {{ labelPercentage }}%
                </span>
            </span>
            <v-chip
                v-if="variant === 'badge'"
                :color="color"
                class="px-5 py-1 font-weight-semibold"
            >
                <v-icon
                v-if="trend"
                :icon="trendIcon"
                size="x-small"
                class="mr-1"
                />
                {{ value }}
            </v-chip>
            <span v-if="variant === 'progress'" class="font-weight-semibold">{{ value }}%</span>
        </div>
        <v-progress-linear
            v-if="variant === 'progress'"
            :model-value="value"
            :color="color"
            height="9"
            rounded
        />
    </div>
</template>

<script setup lang="ts">
type Variant = 'badge' | 'progress'
type Trend = 'up' | 'down' | 'equal'

const {
    label,
    value,
    variant = 'badge',
    trend,
    color = 'primary',
    labelPercentage
} = defineProps<{
    label: string
    value?: number | string
    variant?: Variant
    trend?: Trend
    color?: string
    labelPercentage?: number
}>()

const trendIcon = computed((): string => {
    switch (trend) {
        case 'up':
            return 'mdi-arrow-up'
        case 'down':
            return 'mdi-arrow-down'
        case 'equal':
            return 'mdi-equal'
        default:
            return ''
    }
})
</script>

<style scoped>

</style>