<template>
   <div class="text-black">
      <p class="font-weight-bold">{{ title }}</p>
      <p>
         {{ message }}
      </p>
   </div>
</template>
<script setup lang="ts">
   withDefaults(
      defineProps<{
         title?: string
         message?: string
      }>(),
      {
         title: '',
         message: '',
      },
   )
</script>
