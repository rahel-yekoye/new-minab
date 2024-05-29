<template>
  <swiper
    class="mySwiper"
    :slides-per-view="1"
    :space-between="10"
    loop
    :autoplay="{ delay: 5000 }"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index">
<img :src="slide.image" :alt="slide.alt" class="w-full h-auto rounded-lg shadow-lg" />    </swiper-slide>
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
  { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqeWYO69fgMc6PxA8c2CH1bC49ifWhyGO8rg&s' },
  { image: 'https://w0.peakpx.com/wallpaper/653/714/HD-wallpaper-rick-morty-x-breaking-bad.jpg' },
  { image: 'https://wallpapercave.com/wp/wp1822728.jpg' },
  { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7HZmZChkuCLOT8VoLPImroBbTA7p57gJrQ&s' },

])
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 100%;
}
</style>
