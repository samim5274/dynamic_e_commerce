<template>
    <main class="container mx-auto px-4 py-6 md:py-10">
        <div class="flex flex-col lg:flex-row gap-8">

            <Message
                :successMsg="successMsg"
                :errorMsg="errorMsg"
                @update:successMsg="successMsg = $event"
                @update:errorMsg="errorMsg = $event"
            />
            
            <aside class="hidden lg:block w-64 shrink-0">
                <div class="sticky top-28 space-y-8">
                    <div>
                        <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                            <span class="w-1 h-6 bg-indigo-600 rounded-full"></span> Categories
                        </h3>
                        <ul class="space-y-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-hide">
                            <li v-for="cat in categories" :key="cat.id" @click="selectedCategory = cat.id"
                                class="group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-300"
                                :class="selectedCategory === cat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-600 dark:text-gray-400'">
                                <span class="text-sm font-bold">{{ cat.name }}</span>
                                <i class="fa-solid fa-chevron-right text-[10px] opacity-50 group-hover:translate-x-1 transition-transform"></i>
                            </li>
                        </ul>
                    </div>

                    <div class="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] text-white shadow-xl shadow-indigo-200 dark:shadow-none relative overflow-hidden group">
                        <div class="relative z-10">
                            <p class="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Exclusive Offer</p>
                            <h4 class="font-black text-xl mb-1">Get ৳500 OFF</h4>
                            <p class="text-[10px] opacity-70 mb-4 font-bold uppercase tracking-widest">Code: BAZAR2026</p>
                            <button class="w-full bg-white text-indigo-600 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">Copy Code</button>
                        </div>
                        <i class="fa-solid fa-bolt-lightning absolute -bottom-4 -right-2 text-6xl opacity-10 group-hover:rotate-12 transition-transform"></i>
                    </div>
                </div>
            </aside>

            <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-3xl md:text-4xl font-black tracking-tighter">
                        Featured <span class="text-indigo-600">Deals</span>
                    </h2>
                    <div class="flex gap-2">
                        <button class="p-3 border dark:border-white/10 rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 transition active:scale-90">
                            <i class="fa-solid fa-sliders text-gray-500"></i>
                        </button>
                    </div>
                </div>

                <div class="space-y-16 py-4">
                    <div v-for="(items, categoryName, index) in groupedProducts" :key="index" class="relative group/slider-box">
                        
                        <div class="flex items-end justify-between mb-6 border-b border-gray-100 dark:border-white/5 pb-5">
                            <div>
                                <h3 class="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                                    <span class="w-2 h-7 bg-indigo-600 rounded-full"></span>
                                    {{ categoryName }}
                                </h3>
                                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 ml-5">Collection {{ index + 1 }}</p>
                            </div>

                            <router-link to="/" class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">
                                View All <i class="fa-solid fa-arrow-right-long"></i>
                            </router-link>
                        </div>

                        <div class="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-4 -right-4 justify-between pointer-events-none z-40">
                            <button @click="scrollSlider(index, 'left')" 
                                class="h-12 w-12 rounded-full bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-white/10 flex items-center justify-center pointer-events-auto opacity-0 group-hover/slider-box:opacity-100 transition-all hover:bg-indigo-600 hover:text-white">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            <button @click="scrollSlider(index, 'right')" 
                                class="h-12 w-12 rounded-full bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-white/10 flex items-center justify-center pointer-events-auto opacity-0 group-hover/slider-box:opacity-100 transition-all hover:bg-indigo-600 hover:text-white">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>

                        <div :id="'slider-' + index" 
                            class="flex overflow-x-auto gap-6 pb-10 pt-2 scrollbar-hide snap-x snap-mandatory scroll-smooth">
                            
                            <div v-for="product in items" :key="product.id"
                                class="flex-none w-[85%] sm:w-[45%] lg:w-[calc(25%-18px)] snap-start group relative bg-white dark:bg-[#111827] rounded-[xl] p-4 border border-gray-100/80 dark:border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-none hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] transition-all duration-700 hover:-translate-y-2 flex flex-col justify-between">
                                
                                <div class="relative aspect-[10/12] overflow-hidden rounded-[1.6rem] bg-gray-50/70 dark:bg-gray-800/50 border border-gray-100/50 dark:border-white/[0.03]">
                                    
                                    <div class="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
                                        <span v-if="product.discount_price > 0" class="bg-red-500 text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-md shadow-red-500/10">
                                            -{{ Math.round((product.discount_price / product.price) * 100) }}% OFF
                                        </span>
                                    </div>

                                    <button class="absolute top-3.5 right-3.5 z-10 bg-white/70 dark:bg-[#1f2937]/60 backdrop-blur-md p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-[#1f2937] transition-all duration-300 active:scale-90 shadow-sm border border-white/40 dark:border-white/5">
                                        <i class="fa-regular fa-heart text-sm"></i>
                                    </button>

                                    <img @click="ProductDetails(product)" :src="getProductImage(product)" :alt="product.name"
                                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out cursor-pointer">
                                    
                                    <div class="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                                        <button @click="ProductDetails(product)" 
                                            class="w-full bg-white/95 dark:bg-indigo-600/95 backdrop-blur-md text-gray-900 dark:text-white font-black text-[10px] uppercase tracking-[0.2em] py-3.5 rounded-xl shadow-xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                            Quick View
                                        </button>
                                    </div>
                                </div>

                                <div class="mt-5 flex-1 flex flex-col justify-between px-1">
                                    <div>
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="text-[9px] font-black uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                                                {{ product.category?.name || categoryName }}
                                            </span>
                                            <div class="flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-md">
                                                <i class="fa-solid fa-star text-[9px] text-amber-500"></i>
                                                <span class="text-[10px] font-black text-amber-700 dark:text-amber-400">4.9</span>
                                            </div>
                                        </div>

                                        <h3 @click="ProductDetails(product)" 
                                            class="text-base font-black text-gray-800 dark:text-gray-100 truncate cursor-pointer group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
                                            {{ product.name }} 
                                            <span v-if="product.point" class="text-xs font-medium text-gray-400 ml-1">({{ product.point }} Pts)</span>
                                        </h3>
                                    </div>

                                    <div class="mt-4 pt-3 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-between">
                                        <div class="flex flex-col">
                                            <span v-if="product.discount_price > 0" class="text-[11px] font-bold text-gray-400 line-through decoration-red-500/20 mb-0.5">
                                                ৳{{ product.price }}
                                            </span>
                                            <span class="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none flex items-start gap-0.5">
                                                <span class="text-sm font-bold mt-0.5">৳</span>{{ product.price - product.discount_price || product.price }}
                                            </span>
                                        </div>

                                        <button @click="ProductDetails(product)" class="relative h-10 w-10 group/btn overflow-hidden rounded-[1.25rem] bg-gray-900 dark:bg-indigo-600 text-white shadow-xl shadow-gray-900/10 dark:shadow-indigo-500/20 transition-all duration-500 hover:w-32 hover:rounded-2xl active:scale-95">
                                            <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover/btn:translate-x-12 group-hover/btn:opacity-0">
                                                <i class="fa-solid fa-plus text-xl"></i>
                                            </div>
                                            <div class="absolute inset-0 flex items-center justify-center gap-2 -translate-x-12 opacity-0 transition-all duration-500 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 px-4">
                                                <i class="fa-solid fa-cart-shopping text-sm"></i>
                                                <span class="text-xs font-black uppercase whitespace-nowrap">View</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <newsLatter />
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api, { makeImg } from '../../services/api';
import newsLatter from './news-latter.vue'
import { useCartStore } from './stores/cart';

import Message from '../Message/message.vue';

const router = useRouter();
const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');
const categories = ref([]);
const products = ref([]);
const selectedCategory = ref(null);
const defaultProductImage = "/images/product/default-product.png";

// Get Product Image Logic
const getProductImage = (product) => {
    if (!product || !product.images || product.images.length === 0) {
        return defaultProductImage;
    }

    const primaryImg = product.images.find(i => i.is_primary == 1);
    
    const selectedImg = primaryImg || product.images[0];

    return selectedImg.url ? selectedImg.url : defaultProductImage;
}



















// Fetch Categories
async function fetchCategories() {
    try {
        const res = await api.get('/public/get-categories')
        categories.value = res.data.data
    } catch (err) { 
        console.error('Category error:', err); 
    }
}

// Fetch Products
async function fetchProducts() {
    loading.value = true
    try {
        const res = await api.get('/public/products');
        let data = res.data.data;
        products.value = Array.isArray(data) ? data : Object.values(data).flat();
    } catch (err) { 
        console.error('Product error:', err); 
    }
    finally { 
        loading.value = false;
    }
}


// Group Products by Category
const groupedProducts = computed(() => {
    const groups = {}
    filterProducts.value.forEach(product => {
        const category = product?.category?.name || 'New Collection'
        if (!groups[category]) groups[category] = []
        groups[category].push(product)
    })
    return groups
})

// Filtered Products
const filterProducts = computed(() => {
    if (!products.value) return []
    let filtered = [...products.value]
    if (selectedCategory.value) {
        filtered = filtered.filter(p => Number(p.category?.id) === Number(selectedCategory.value))
    }
    return filtered
})


























// Slider Navigation Logic
const scrollSlider = (index, direction) => {
    const element = document.getElementById('slider-' + index)
    if (element) {
        const scrollAmount = element.clientWidth * 0.8
        element.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        })
    }
}

































function ProductDetails(product) {
    router.push(`/product-details/${product.slug}`)
}

onMounted(() => {
    fetchProducts()
    fetchCategories()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Custom Scrollbar for Sidebar */
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
</style>