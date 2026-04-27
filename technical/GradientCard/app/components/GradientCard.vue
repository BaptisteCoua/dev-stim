<template>
   <v-gradient-card
      :class="[gradientUsed, additionalInformation !== '' ? 'px-5 pt-5 pb-1' : 'pa-5']"
   >
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ mainInformation }}</v-card-subtitle>
      <v-card-text>{{ additionalInformation }}</v-card-text>
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
