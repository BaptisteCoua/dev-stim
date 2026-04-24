<template>
    <v-card rounded="xl" class="d-flex flex-column pa-5 ga-6">
        <div class="d-flex align-center justify-space-between">
            <v-card-title class="font-weight-semibold pa-0">
                {{ title }}
            </v-card-title>
            <v-chip v-if="total !== undefined" class="px-4 py-1 font-weight-medium">
                TOTAL : {{ total }}
            </v-chip>
        </div>

        <v-card-text class="d-flex flex-column pa-0 ga-6">
            <slot />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    defineProps<{
        title: string
        total?: number
    }>()
</script>

<style scoped>

</style>