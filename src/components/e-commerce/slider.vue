<template>
  <section class="relative w-full overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 py-8">
    <div class="container mx-auto">
      
      <div class="relative h-[340px] sm:h-[450px] md:h-[520px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-800/50 group/carousel">
        
        <div 
          class="flex h-full transition-transform duration-700 ease-in-out" 
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          
          <div 
            v-for="(slide, index) in displaySliders" 
            :key="slide.id || 'default-'+index"
            class="min-w-full h-full relative flex items-center bg-slate-900">
            
            <img 
              :src="slide.image" 
              :alt="slide.title" 
              class="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover/carousel:scale-102"
              @error="(e) => e.target.src = './images/placeholder-banner.jpg'"
            >
            
            <!-- <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent dark:from-slate-950/95 dark:via-slate-950/70"></div> -->
            
            <!-- <div class="relative z-10 w-full max-w-2xl px-6 sm:px-12 md:px-16 text-white space-y-3 sm:space-y-4">
              
              <span v-if="slide.tag" class="inline-block font-mono font-bold tracking-widest text-[10px] sm:text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md uppercase">
                {{ slide.tag }}
              </span>
              
              <h1 class="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-xl text-white drop-shadow-md">
                {{ slide.title }}
              </h1>
              
              <p class="text-xs sm:text-sm text-slate-300 font-light max-w-md md:max-w-lg line-clamp-2 sm:line-clamp-none">
                {{ slide.description }}
              </p>
              
              <div class="pt-2">
                <a 
                  :href="slide.button_link || '#'" 
                  class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-200"
                >
                  <span>{{ slide.button_text || 'Shop Now' }}</span>
                  <i class="fa-solid fa-arrow-right text-xs"></i>
                </a>
              </div>
            </div> -->

            </div>
        </div>

        <button 
          @click="prevSlide" 
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-950/30 hover:bg-[#4F46E5] backdrop-blur-md text-white flex items-center justify-center border border-white/10 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-20"
        >
          <i class="fa-solid fa-chevron-left text-sm"></i>
        </button>
        
        <button 
          @click="nextSlide" 
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-950/30 hover:bg-[#4F46E5] backdrop-blur-md text-white flex items-center justify-center border border-white/10 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-20"
        >
          <i class="fa-solid fa-chevron-right text-sm"></i>
        </button>

        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          <button 
            v-for="(_, index) in displaySliders" 
            :key="'dot-'+index"
            @click="goToSlide(index)"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'w-7 bg-[#4F46E5]' : 'w-2 bg-white/40 hover:bg-white/70'"
          ></button>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import api from '../../services/api';

const successMsg = ref('');
const errorMsg = ref('');
const loading = ref(false);

const currentSlide = ref(0)
let timer = null

const defaultSlides = [
  {
    tag: "New Arrival",
    title: "Next-Gen Wireless Audio Experience",
    description: "Immerse yourself in pure sound with our latest noise-cancelling technology. Limited edition colors available.",
    image: "./images/slide/1.png",
    button_text: "Explore Now",
    button_link: "#"
  },
  {
    tag: "Summer Sale",
    title: "Step Up Your Lifestyle Fashion",
    description: "Get up to 50% off on all premium sneakers and sports apparel this season. Move with style.",
    image: "./images/slide/2.jpeg",
    button_text: "Shop Sale",
    button_link: "#"
  },
  {
    tag: "Limited Stock",
    title: "Elegance on Your Wrist",
    description: "Modern smartwatches designed for both health and luxury. Experience the future of timekeeping.",
    image: "./images/slide/3.jpeg",
    button_text: "Pre-Order",
    button_link: "#"
  },
  {
    tag: "Limited Stock",
    title: "Elegance on Your Wrist",
    description: "Modern smartwatches designed for both health and luxury. Experience the future of timekeeping.",
    image: "./images/slide/4.jpeg",
    button_text: "View Details",
    button_link: "#"
  }
]

const sliders = ref([]);


const displaySliders = computed(() => {
  return sliders.value.length > 0 ? sliders.value : defaultSlides;
})


async function fetchedSliders() {
    loading.value = true;
    errorMsg.value = "";
    try {
        const { data } = await api.get("/slider/public");
        if (data.success) {
            sliders.value = (data.data ?? []).filter(item => Number(item.status) === 1);
        } else {
            throw new Error(data.message || "Failed to fetch sliders.");
        }
    } catch (err) {
        console.error("Fetch sliders failed:", err);
        errorMsg.value = err.response?.data?.message || err.message || "Failed to fetch sliders.";
        sliders.value = []; 
    } finally {
        loading.value = false;
    }
}


const nextSlide = () => {
  if (displaySliders.value.length === 0) return;
  currentSlide.value = (currentSlide.value + 1) % displaySliders.value.length
}

const prevSlide = () => {
  if (displaySliders.value.length === 0) return;
  currentSlide.value = (currentSlide.value - 1 + displaySliders.value.length) % displaySliders.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index;
  resetTimer(); 
}


const startTimer = () => {
  timer = setInterval(nextSlide, 5000)
}

const stopTimer = () => {
  if (timer) clearInterval(timer)
}

const resetTimer = () => {
  stopTimer();
  startTimer();
}

onMounted(() => {
  fetchedSliders()
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.transition-transform {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-102 {
  transform: scale(1.02);
}
</style>