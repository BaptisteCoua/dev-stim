<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import type { EChartsOption } from 'echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const props = defineProps<{
   labels: string[]
   values: number[]
   label?: string
}>()

const theme = useTheme()

const chartOption = computed<EChartsOption>(() => {
   const colors = theme.current.value.colors

   return {
      grid: {
         left: 0,
         right: 16,
         top: 20,
         bottom: 40,
         containLabel: true,
      },
      tooltip: {
         trigger: 'axis',
      },
      legend: {
         bottom: 0,
         left: 'center',
      },
      xAxis: {
         type: 'category',
         boundaryGap: false,
         data: props.labels,
         axisTick: { show: false },
      },
      yAxis: {
         type: 'value',
         splitLine: { show: true },
      },
      series: [
         {
            name: props.label ?? 'Valeur',
            type: 'line',
            data: props.values,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
               width: 2,
               color: colors.info,
            },
            itemStyle: {
               color: colors.info,
            },
            areaStyle: {
               color: colors.bgInfo,
            },
         },
      ],
   }
})
</script>

<template>
   <v-chart :option="chartOption" autoresize class="line-chart" />
</template>

<style scoped>
.line-chart {
   height: 300px;
   width: 100%;
}
</style>