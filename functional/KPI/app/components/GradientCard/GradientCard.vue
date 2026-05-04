<template>
   <v-card
      class="px-5 pt-5 pb-1 text-textColor rounded-lg d-flex align-center"
      width="300px"
      :class="GRADIENTUSED"
   >
      <div>
         <v-card-title
            class="text-textColor text-title-large pa-0 font-weight-semibold card--title-height"
         >
            {{ title }}
         </v-card-title>
         <v-card-subtitle
            class="text-textColor font-weight-bold text-display-large pa-0 card--subtitle-height"
            opacity="100"
         >
            {{ mainInformation }}
         </v-card-subtitle>
         <v-card-text
            class="text-textColor text-title-medium pa-0 font-weight-medium card--text-height"
         >
            {{ additionalInformation }}
         </v-card-text>
      </div>
      <div v-if="numberUsDone && totalUs">
         <PieChart :number-us-done :total-us />
      </div>
   </v-card>
</template>

<script setup lang="ts">
   const props = withDefaults(
      defineProps<{
         gradientChosen?: string | null
         title: string
         mainInformation: string
         additionalInformation?: string
         numberUsDone?: number
         totalUs?: number
      }>(),
      { gradientChosen: 'info', additionalInformation: '' },
   )

   const GRADIENTUSED = props.gradientChosen ? `container--${props.gradientChosen}` : ''
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
