<template>
  <swiper
    class="mySwiper"
    :slides-per-view="1"
    :space-between="10"
    loop
    :autoplay="{ delay: 5000 }"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      <img :src="(`src/assets/image/${slide.image}`)" :alt="slide.alt" class="w-full h-auto rounded-lg shadow-lg" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'

// Import Swiper core and required modules
import SwiperCore, { Autoplay } from 'swiper'

// Install modules
SwiperCore.use([Autoplay])

// Define your slides data
const slides = ref([
  { image: '/bt.jpg', alt: 'Slide 1' },
  { image: '/rick4.jpg', alt: 'Slide 3' },
  { image: '/mo.jpg', alt: 'Slide 4' },

])
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 100%;
}
</style>
