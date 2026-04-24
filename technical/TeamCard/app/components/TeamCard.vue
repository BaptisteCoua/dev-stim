<template>
    <v-card rounded="lg" class="pa-5">
        <v-card-title class="font-weight-semibold pa-0">
            {{ title }}
        </v-card-title>
        <v-card-text class="d-flex flex-column ga-6">
            <slot />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    defineProps<{
        title: string
    }>()
</script>

<style scoped>

</style>