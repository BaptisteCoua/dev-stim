<template>
   <div class="d-flex flex-wrap justify-center align-center pie-chart-appearance">
      <v-chart :option="option" autoresize />
      <div
         class="position-absolute w-100 d-flex flex-column align-center justify-center text-center chart-overlay text-textColor font-weight-bold text-title-large"
      >
         {{ percentage }}
      </div>
   </div>
</template>

<script setup lang="ts">
   const props = defineProps<{
      numberUsDone: number
      totalUs: number
   }>()

   const percentage = computed(() => {
      const response = (props.numberUsDone / props.totalUs) * 100
      return `${Math.trunc(response)}%`
   })

   const option = {
      tooltip: {
         show: false,
      },
      series: [
         {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
               show: false,
            },
            labelLine: {
               show: false,
            },
            data: [
               { value: props.numberUsDone, name: 'Done' },
               { value: props.totalUs - props.numberUsDone, name: 'ToDo' },
            ],
            color: ['rgba(255, 255, 255, 0.77)', 'rgba(250, 250, 253, 0.39)'],
         },
      ],
   }
</script>

<style>
   .pie-chart-appearance {
      height: 116px;
      width: 116px;
   }
</style>
