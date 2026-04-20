<template>
   <div class="text-black">
      <p class="font-weight-bold">{{ title }}</p>
      <p>
         {{ message }}
      </p>
   </div>
</template>
<script setup lang="ts">
   const props = defineProps({
      title: { type: String },
      message: { type: String },
   })
</script>
