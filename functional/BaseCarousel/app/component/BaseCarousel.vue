<template>
   <v-sheet class="carousel">
      <Swiper
         :modules="[Pagination, Autoplay]"
         :pagination="{ clickable: true }"
         :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
         }"
         :speed="800"
         loop
      >
         <SwiperSlide v-for="(slide, index) in slides" :key="index">
            <slot name="slide" :slide="slide">
               <v-img
                  v-if="slide.image"
                  :src="slide.image"
                  :alt="slide.alt"
                  cover
                  class="slide-image"
               />
            </slot>
         </SwiperSlide>
      </Swiper>
   </v-sheet>
</template>

<script setup lang="ts">
   import { Swiper, SwiperSlide } from 'swiper/vue'
   import { Pagination, Autoplay } from 'swiper/modules'
   import 'swiper/css'
   import 'swiper/css/pagination'

   defineProps<{
      slides: {
         image?: string
         alt?: string
         [key: string]: unknown
      }[]
   }>()
</script>

<style scoped>
   .carousel {
      overflow: hidden;
      border-radius: 24px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
   }

   .slide-image {
      width: 100%;
      height: 360px;
   }

   :deep(.swiper-pagination) {
      left: 24px;
      bottom: 18px;
      width: auto;
   }

   :deep(.swiper-pagination-bullet) {
      width: 12px;
      height: 12px;
      opacity: 1;
      background: rgba(255, 255, 255, 0.6);
   }

   :deep(.swiper-pagination-bullet-active) {
      background: white;
   }
</style>
