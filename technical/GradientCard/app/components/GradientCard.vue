<template>
    <v-gradient-card class="pa-3" :class="gradientUsed" >
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>{{ mainInformation }}</v-card-subtitle>
        <v-card-text>{{ additionalInformation }}</v-card-text>
    </v-gradient-card>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    gradientChosen?: string
    title: string
    mainInformation: string
    additionalInformation?: string
}>(), {gradientChosen: 'info', additionalInformation:''})

const gradientUsed = `${props.gradientChosen}-gradient`
</script>

<style scoped lang="scss">
@use "~/technical/Template/assets/scss/main.scss"
</style>
