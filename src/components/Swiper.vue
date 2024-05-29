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

import SwiperCore, { Autoplay } from 'swiper'

SwiperCore.use([Autoplay])

const slides = ref([
  { image: 'https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/420-rick-and-morty-chromebook-wallpaper.jpg' },
  { image: 'https://w0.peakpx.com/wallpaper/653/714/HD-wallpaper-rick-morty-x-breaking-bad.jpg' },
  { image: 'https://wallpapercave.com/wp/wp1822728.jpg' },
  { image: 'https://m.media-amazon.com/images/M/MV5BM2ExNmYyZjctMWZiNC00MjUxLWI4NDAtYWQ2OTJhMGZmNGI3XkEyXkFqcGdeQXNvbG5vbXM@._V1_QL75_UX500_CR0,0,500,281_.jpg' },

])
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 100%;
}
</style>
