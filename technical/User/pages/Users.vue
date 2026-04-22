<template>
   <div>
      <v-data-table :items="data" hide-default-footer> </v-data-table>
   </div>
</template>

<script setup lang="ts">
   const { data } = await useFetch('/api/userJira')
</script>
