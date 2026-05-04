<template>
   <div>
      <v-data-table :items="data" />
   </div>
</template>

<script setup lang="ts">
   const { data } = await useFetch('/api/story')
</script>
