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
  { image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthirstymag.com%2FMorty-into-The-Space-HD-Wallpaper-HD-TV-Series-4K-Wallpapers-3302044.html&psig=AOvVaw2yUP6ZZBF19I-XyuwG6Vr6&ust=1717102302728000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCv6djes4YDFQAAAAAdAAAAABAJ' },
  { image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wallpaperpass.com%2Frick-and-morty-wallpaper&psig=AOvVaw2yUP6ZZBF19I-XyuwG6Vr6&ust=1717102302728000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCv6djes4YDFQAAAAAdAAAAABAR' },
  { image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthirstymag.com%2Fmore-1080p-background-desktop-high-resolution-home-screen-3302042.html&psig=AOvVaw2yUP6ZZBF19I-XyuwG6Vr6&ust=1717102302728000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCv6djes4YDFQAAAAAdAAAAABAZ' },

])
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 100%;
}
</style>
