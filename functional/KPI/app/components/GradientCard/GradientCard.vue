<template>
   <v-gradient-card :class="gradientUsed" class="px-5 pt-5 pb-1">
      <v-card-title class="card--title-height">{{ title }}</v-card-title>
      <v-card-subtitle class="card--subtitle-height">{{ mainInformation }}</v-card-subtitle>
      <v-card-text class="card--text-height">{{ additionalInformation }}</v-card-text>
   </v-gradient-card>
</template>

<script setup lang="ts">
   const props = withDefaults(
      defineProps<{
         gradientChosen?: string
         title: string
         mainInformation: string
         additionalInformation?: string
      }>(),
      { gradientChosen: 'info', additionalInformation: '' },
   )

   const gradientUsed = `container--${props.gradientChosen}`
</script>

<style scoped lang="scss">
   .card--title-height {
      height: 28px;
   }

   .card--subtitle-height {
      height: 64px;
   }

   .card--text-height {
      height: 24px;
   }
</style>
