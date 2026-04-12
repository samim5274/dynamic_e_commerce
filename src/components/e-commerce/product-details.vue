<template>
    <div :class="{ 'dark': isDark }">
        <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
        
        <Navbar 
            :isDark="isDark"
            :mobileMenu="mobileMenu"
            @toggle-dark="toggleDarkMode"
            @toggle-menu="toggleMenu"
        />

















        <!-- <section v-if="product" class="py-12 bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-gray-100 min-h-screen">
            <div class="container mx-auto px-4">
                
                <nav class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-10 overflow-x-auto whitespace-nowrap">
                    <router-link to="/" class="hover:text-indigo-500 transition">Home</router-link>
                    <i class="fa-solid fa-chevron-right text-[8px]"></i>
                    <span class="hover:text-indigo-500 transition cursor-pointer">{{ product.category?.name }}</span>
                    <i class="fa-solid fa-chevron-right text-[8px]"></i>
                    <span class="text-gray-900 dark:text-white">{{ product.name }}</span>
                </nav>

                <div class="flex flex-col lg:flex-row gap-16">

                    <div class="w-full lg:w-[55%]">
                        <div class="lg:sticky lg:top-28 space-y-6">
                            <div class="relative group aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 dark:bg-[#111113] border border-gray-100 dark:border-white/5 shadow-2xl">
                                <img :src="activeImage" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                                
                                <button class="absolute bottom-6 right-6 bg-white/90 dark:bg-black/50 backdrop-blur-xl p-4 rounded-2xl shadow-xl text-gray-900 dark:text-white">
                                    <i class="fa-solid fa-expand text-lg"></i>
                                </button>
                            </div>

                            <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                <div v-for="img in product.images" :key="img.id"
                                    @click="activeImage = makeImg(img.image_path)"
                                    class="relative min-w-[100px] h-[120px] rounded-[1.5rem] overflow-hidden cursor-pointer border-2 transition-all duration-300"
                                    :class="activeImage === makeImg(img.image_path) ? 'border-indigo-600 scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'">
                                    <img :src="makeImg(img.image_path)" class="w-full h-full object-cover">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full lg:w-[45%] space-y-8">
                        
                        <div class="space-y-4">
                            <span class="px-4 py-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-indigo-500/20">
                                In Stock & Ready to Ship
                            </span>
                            <h1 class="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-gray-900 dark:text-white">
                                {{ product.name }}
                            </h1>
                            
                            <div class="flex items-center gap-6">
                                <div class="flex flex-col">
                                    <span class="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                                        ৳{{ product.discount_price || product.price }}
                                    </span>
                                    <span v-if="product.discount_price" class="text-sm text-gray-400 line-through font-medium">
                                        Original: ৳{{ product.price }}
                                    </span>
                                </div>
                                <div v-if="product.discount_price" class="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-lg">
                                    SAVE {{ Math.round(((product.price - product.discount_price) / product.price) * 100) }}%
                                </div>
                            </div>
                        </div>

                        <p class="text-gray-500 dark:text-gray-400 text-lg leading-relaxed border-l-4 border-indigo-500 pl-6 py-2 bg-gray-50 dark:bg-white/5 rounded-r-2xl font-medium">
                            {{ product.summary }}
                        </p>

                        <div class="space-y-6">
                            <h4 class="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-3">
                                Select Variant <span class="h-[1px] flex-1 bg-gray-100 dark:bg-gray-800"></span>
                            </h4>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button v-for="(variant, index) in product.variants" :key="index"
                                    @click="selectedVariant = variant"
                                    class="relative p-4 rounded-2xl border-2 text-left transition-all duration-300 group"
                                    :class="selectedVariant?.id === variant.id ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10' : 'border-gray-100 dark:border-white/5 hover:border-gray-300'">
                                    
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ variant.color || 'Standard' }}</p>
                                            <p class="font-black text-gray-900 dark:text-white">{{ variant.size || 'No Size' }}</p>
                                        </div>
                                        <span class="text-xs font-black text-indigo-600">৳{{ variant.price }}</span>
                                    </div>

                                    <div v-if="selectedVariant?.id === variant.id" class="absolute -top-2 -right-2 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                        <i class="fa-solid fa-check text-[10px]"></i>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div class="space-y-4 pt-6">
                            <div class="flex flex-col sm:flex-row gap-4">
                                <div class="flex items-center bg-gray-100 dark:bg-[#1c1c1e] rounded-2xl p-2 border border-transparent focus-within:border-indigo-500 transition">
                                    <button @click="qty > 1 ? qty-- : null" class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-800 transition shadow-sm active:scale-90 text-xl font-bold">-</button>
                                    <input type="number" v-model="qty" class="w-16 bg-transparent text-center font-black text-lg outline-none" readonly>
                                    <button @click="qty++" class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-800 transition shadow-sm active:scale-90 text-xl font-bold">+</button>
                                </div>

                                <button class="flex-1 bg-gray-900 dark:bg-indigo-600 text-white py-4 rounded-[1.5rem] font-black text-lg hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                                    <i class="fa-solid fa-cart-shopping text-sm"></i>
                                    ADD TO CART
                                </button>
                            </div>

                            <div class="flex gap-4">
                                <button class="flex-1 h-14 rounded-2xl border-2 border-gray-100 dark:border-white/5 font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition">
                                    <i class="fa-regular fa-heart"></i> Add to Wishlist
                                </button>
                                <button class="h-14 w-14 rounded-2xl border-2 border-gray-100 dark:border-white/5 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition text-gray-500">
                                    <i class="fa-solid fa-share-nodes"></i>
                                </button>
                            </div>
                        </div>

                        <div class="grid grid-cols-3 gap-4 pt-8 border-t dark:border-white/5">
                            <div class="text-center space-y-2">
                                <i class="fa-solid fa-truck-fast text-indigo-500 text-xl"></i>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Free Shipping</p>
                            </div>
                            <div class="text-center space-y-2 border-x dark:border-white/5">
                                <i class="fa-solid fa-rotate-left text-indigo-500 text-xl"></i>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">30 Day Return</p>
                            </div>
                            <div class="text-center space-y-2">
                                <i class="fa-solid fa-shield-halved text-indigo-500 text-xl"></i>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure Pay</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section> -->
        
        
        <section v-if="product" class="py-16 bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 min-h-screen selection:bg-indigo-500 selection:text-white">
            <div class="container mx-auto px-4 max-w-7xl">
                
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <nav class="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                        <router-link to="/" class="hover:text-indigo-500 transition-colors">Shop</router-link>
                        <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span class="text-indigo-500">{{ product.category?.name }}</span>
                    </nav>
                    
                    <div class="flex items-center gap-4 text-xs font-bold">
                        <span class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            In Stock
                        </span>
                        <span class="text-gray-400">SKU: PRD-{{ product.sku }}</span>
                    </div>
                </div>

                <div class="flex flex-col lg:flex-row gap-16 xl:gap-24">

                    <div class="w-full lg:w-1/2 xl:w-[60%]">
                        <div class="lg:sticky lg:top-24 space-y-8">
                            <div class="relative group aspect-square lg:aspect-[16/14] rounded-[3.5rem] overflow-hidden bg-gray-50 dark:bg-[#111113] border border-gray-100 dark:border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] dark:shadow-none">
                                <img :src="activeImage || defaultProductImage"  class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110">
                                
                                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div class="absolute top-8 left-8">
                                    <span v-if="product.discount_price" class="bg-white/90 dark:bg-black/40 backdrop-blur-xl px-5 py-2 rounded-2xl text-sm font-black shadow-2xl">
                                        -{{ Math.round(((product.price - product.discount_price) / product.price) * 100) }}% OFF
                                    </span>
                                </div>
                            </div>

                            <div class="flex justify-center gap-6 px-4">
                                <button v-for="img in product.images" :key="img.id"
                                    @click="activeImage = makeImg(img.image_path)"
                                    class="relative w-16 h-16 rounded-[2rem] overflow-hidden transition-all duration-700 border-2 shadow-sm"
                                    :class="activeImage === makeImg(img.image_path) 
                                        ? 'border-indigo-600 dark:border-indigo-400 scale-110 shadow-indigo-500/20' 
                                        : 'border-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100'">
                                    <img :src="makeImg(img.image_path)" class="w-full h-full object-cover">
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="w-full lg:w-1/2 xl:w-[40%] flex flex-col justify-center">
                        
                        <div class="space-y-10">
                            <div class="space-y-4">
                                <h1 class="text-5xl md:text-6xl font-black tracking-tight leading-[0.9] text-gray-900 dark:text-white">
                                    {{ product.name }}
                                </h1>
                                <div class="flex items-center gap-4">
                                    <div class="flex text-amber-400 text-xs gap-0.5">
                                        <i v-for="i in 5" :key="i" class="fa-solid fa-star"></i>
                                    </div>
                                    <span class="text-xs font-black text-gray-400 uppercase tracking-widest underline decoration-indigo-500/30 underline-offset-4 cursor-pointer hover:text-indigo-500 transition">
                                        48 Verified Reviews
                                    </span>
                                </div>
                            </div>

                            <div class="p-8 rounded-xl bg-gray-50 dark:bg-[#111827] border border-gray-300 dark:border-white/20 flex items-center justify-between group">
                                <div class="flex flex-col">
                                    <span class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Market Price</span>
                                    <div class="flex items-baseline gap-3">
                                        <span class="text-5xl font-black text-indigo-600 dark:text-white tracking-tighter transition-all group-hover:text-indigo-800">
                                            ৳{{ product.discount_price || product.price }}
                                        </span>
                                        <span v-if="product.discount_price" class="text-lg text-gray-400 line-through font-bold opacity-50">
                                            ৳{{ product.price }}
                                        </span>
                                    </div>
                                </div>
                                <div class="h-14 w-14 rounded-full border-2 border-gray-200 dark:border-gray-500 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                                    <i class="fa-solid fa-tag text-xl text-gray-200 group-hover:text-indigo-500 transition-colors"></i>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <div class="flex items-center justify-between">
                                    <h4 class="text-xs font-black uppercase tracking-widest text-gray-500">Configure Variant</h4>
                                    <button class="text-[10px] font-bold text-indigo-500 underline uppercase tracking-wider">Size Guide</button>
                                </div>
                                
                                <div class="flex flex-wrap gap-3">
                                    <label v-for="(variant, index) in product.variants" :key="index" 
                                        class="relative cursor-pointer group">
                                        
                                        <input type="radio" name="variant" :value="variant" v-model="selectedVariant" class="peer sr-only">

                                        <div class="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-gray-300 transition-all duration-300
                                                    bg-white dark:bg-white/[0.03] dark:border-white/10
                                                    peer-checked:border-indigo-600 peer-checked:bg-indigo-50/50 dark:peer-checked:bg-indigo-500/10 
                                                    peer-checked:shadow-sm hover:border-gray-300 dark:hover:border-white/20">
                                            
                                            <div class="w-3 h-3 rounded-full border border-black/5 shadow-inner shrink-0 transition-transform group-hover:scale-125"
                                                :style="{ backgroundColor: variant.color_code || variant.color }">
                                            </div>

                                            <div class="flex flex-col leading-none">
                                                <div class="flex items-center gap-2">
                                                    <span class="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                                        {{ variant.size }}
                                                    </span>
                                                    <span class="w-px h-2 bg-gray-200 dark:bg-gray-700"></span>
                                                    <span class="text-[10px] font-bold text-gray-400 uppercase">
                                                        {{ variant.color }}
                                                    </span>
                                                </div>
                                                <div class="mt-1 flex items-center gap-1">
                                                    <span class="text-[10px] font-black text-indigo-600 dark:text-indigo-400">
                                                        ৳{{ variant.price }}
                                                    </span>
                                                </div>
                                            </div>

                                            <i class="fa-solid fa-circle-check text-[10px] text-indigo-600 opacity-0 transition-opacity peer-checked:opacity-100"></i>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div class="space-y-4 pt-4">
                                <div class="flex flex-col sm:flex-row items-center gap-4 w-full">
    
                                    <div class="flex items-center justify-between bg-gray-50 dark:bg-white/[0.03] p-1.5 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-inner w-full sm:w-auto">
                                        <button @click="qty > 1 ? qty-- : null" 
                                            class="w-12 h-12 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm hover:shadow-md transition-all active:scale-90 group">
                                            <i class="fa-solid fa-minus text-xs text-gray-400 group-hover:text-indigo-500"></i>
                                        </button>
                                        
                                        <div class="flex-1 sm:w-14 flex flex-col items-center">
                                            <span class="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-[-2px]">Amount</span>
                                            <input type="number" v-model="qty" class="w-full bg-transparent text-center font-black text-xl sm:text-lg outline-none cursor-default text-gray-900 dark:text-white" readonly>
                                        </div>

                                        <button @click="qty++" 
                                            class="w-12 h-12 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm hover:shadow-md transition-all active:scale-90 group">
                                            <i class="fa-solid fa-plus text-xs text-gray-400 group-hover:text-indigo-500"></i>
                                        </button>
                                    </div>

                                    <button class="relative w-full sm:flex-1 h-[68px] sm:h-[64px] group overflow-hidden rounded-[2.2rem] bg-gray-950 dark:bg-indigo-600 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.5)] active:scale-[0.98]">
                                        
                                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-[35deg] -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out"></div>
                                        
                                        <div class="relative flex items-center justify-center gap-4">
                                            <div class="relative flex items-center justify-center">
                                                <i class="fa-solid fa-bag-shopping text-white text-lg group-hover:scale-110 transition-transform duration-500"></i>
                                                <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-gray-950 dark:border-indigo-600 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                            </div>

                                            <div class="flex flex-col items-start leading-tight">
                                                <span class="text-white text-[11px] font-black uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all duration-500">
                                                    Add to Cart
                                                </span>
                                                <span class="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-0.5">
                                                    Secure Checkout
                                                </span>
                                            </div>
                                        </div>

                                        <div class="absolute inset-0 border border-white/10 rounded-[2.2rem] pointer-events-none"></div>
                                    </button>

                                </div>
                            </div>

                            <div class="bg-indigo-500/5 rounded-3xl p-6 border border-indigo-500/10 flex items-start gap-4">
                                <div class="h-10 w-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
                                    <i class="fa-solid fa-bolt"></i>
                                </div>
                                <div>
                                    <h5 class="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">Express Delivery Available</h5>
                                    <p class="text-xs text-gray-500 leading-relaxed font-medium">Order within <span class="text-indigo-500 font-bold">02h 45m</span> to receive your package by tomorrow. Verified by ShopperX Priority.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>        










        <FooterSection />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api, { makeImg } from '../../services/api'

import Navbar from './navbar.vue'
import FooterSection from './footer.vue'
import { useAuth } from '../../stores/auth';

const route = useRoute()

const product = ref(null)
const qty = ref(1)
const activeImage = ref('')
const loading = ref(false)
const selectedVariant = ref(null)












const isDark = ref(false)
const mobileMenu = ref(false)

const toggleDarkMode = () => {
    isDark.value = !isDark.value
}

const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value
}






const { loadUser } = useAuth()







async function getProduct() {
    loading.value = true
    try {
        const res = await api.get(`/products/${route.params.slug}`)
        product.value = res.data.data

        if (product.value?.images?.length) {
            activeImage.value = makeImg(product.value.images[0].image_path)
        }
    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

// default image
const defaultProductImage = "/images/product/default-product.png"

// helper function
const getProductImage = (product) => {
    const images = product?.images

    if (Array.isArray(images) && images.length > 0) {
        const primary = images.find(i => i.is_primary)
        return makeImg((primary || images[0]).image_path)
    }

    return defaultProductImage
}


onMounted(() => {
    getProduct();
    loadUser();
})
</script>

<style>

</style>