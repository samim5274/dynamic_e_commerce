<template>
  <section class="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-900 px-4 py-6">
    <div class="container mx-auto">
      <div class="relative h-[300px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
        
        <div 
          class="flex h-full transition-transform duration-700 ease-in-out" 
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div 
            v-for="(slide, index) in slides" 
            :key="index"
            class="min-w-full h-full relative">
            <img :src="slide.image" :alt="slide.title" class="w-full h-full">
          </div>
        </div>

        <button 
          @click="prevSlide" 
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button 
          @click="nextSlide" 
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition">
          <i class="fa-solid fa-chevron-right"></i>
        </button>

        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          <button 
            v-for="(_, index) in slides" 
            :key="index"
            @click="currentSlide = index"
            class="h-2 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'w-8 bg-indigo-500' : 'w-2 bg-white/50'"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let timer = null

const slides = [
  {
    tag: "New Arrival",
    title: "Next-Gen Wireless Audio Experience",
    description: "Immerse yourself in pure sound with our latest noise-cancelling technology. Limited edition colors available.",
    image: "./images/slide/1.png"
  },
  {
    tag: "Summer Sale",
    title: "Step Up Your Lifestyle Fashion",
    description: "Get up to 50% off on all premium sneakers and sports apparel this season. Move with style.",
    image: "./images/slide/2.jpeg"
  },
  {
    tag: "Limited Stock",
    title: "Elegance on Your Wrist",
    description: "Modern smartwatches designed for both health and luxury. Experience the future of timekeeping.",
    image: "./images/slide/3.jpeg"
  },
  {
    tag: "Limited Stock",
    title: "Elegance on Your Wrist",
    description: "Modern smartwatches designed for both health and luxury. Experience the future of timekeeping.",
    image: "./images/slide/4.jpeg"
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

// Auto-play logic
const startTimer = () => {
  timer = setInterval(nextSlide, 5000)
}

const stopTimer = () => {
  if (timer) clearInterval(timer)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
/* Custom curve for smoother slide movement */
.transition-transform {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>