<template>
   <v-app>
      <NuxtRouteAnnouncer />
      <NuxtPage />
   </v-app>
</template>

<script setup lang="ts">
import { useThemeConfig } from '@core/composable/useThemeConfig'

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme } =
  useThemeConfig()

syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
</script>
