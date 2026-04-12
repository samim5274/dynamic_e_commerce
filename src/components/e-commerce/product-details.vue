<template>
    <div :class="{ 'dark': isDark }">
        <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
        
        <Navbar 
            :isDark="isDark"
            :mobileMenu="mobileMenu"
            @toggle-dark="toggleDarkMode"
            @toggle-menu="toggleMenu"
        />

















        <section v-if="product" class="py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">

            <div class="container mx-auto px-4">

                <!-- Breadcrumb -->
                <nav class="flex text-sm text-gray-500 mb-8">
                    <router-link to="/" class="hover:text-indigo-600">Home</router-link>
                    <span class="mx-2">/</span>
                    <span>{{ product.category?.name }}</span>
                    <span class="mx-2">/</span>
                    <span class="text-gray-900 dark:text-white font-semibold">
                        {{ product.name }}
                    </span>
                </nav>

                <!-- MAIN -->
                <div class="flex flex-col lg:flex-row gap-12">

                    <!-- LEFT: IMAGE -->
                    <div class="w-full lg:w-1/2">
                        <div class="lg:sticky lg:top-10">

                            <!-- MAIN IMAGE -->
                            <div class="aspect-square rounded-3xl overflow-hidden border dark:border-gray-800 shadow-xl mb-4">
                                <img 
                                    :src="activeImage" 
                                    class="w-full h-full object-cover"
                                >
                            </div>

                            <!-- THUMBNAILS -->
                            <div class="flex gap-3 overflow-x-auto">
                                <img 
                                    v-for="img in product.images"
                                    :key="img.id"
                                    :src="makeImg(img.image_path)"
                                    @click="activeImage = makeImg(img.image_path)"
                                    class="w-20 h-20 object-cover rounded-xl border cursor-pointer hover:scale-105 transition"
                                >
                            </div>

                        </div>
                    </div>

                    <!-- RIGHT: INFO -->
                    <div class="w-full lg:w-1/2 space-y-6">

                        <!-- Title -->
                        <h1 class="text-4xl font-black">
                            {{ product.name }}
                        </h1>

                        <!-- Price -->
                        <div class="flex items-center gap-4">
                            <span class="text-4xl font-black text-indigo-600">
                                ৳{{ product.discount_price || product.price }}
                            </span>

                            <span v-if="product.discount_price" class="line-through text-gray-400">
                                ৳{{ product.price }}
                            </span>
                        </div>

                        <!-- Description -->
                        <p class="text-gray-600 dark:text-gray-400">
                            {{ product.summary }}
                        </p>

                        <hr class="dark:border-gray-800">

                        <!-- Quantity -->
                        <div class="flex items-center gap-4">
                            <button @click="qty--" class="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl">-</button>

                            <span class="font-bold">{{ qty }}</span>

                            <button @click="qty++" class="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl">+</button>
                        </div>

                        <!-- Add to Cart -->
                        <button class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700">
                            Add To Cart
                        </button>

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

const route = useRoute()

const product = ref(null)
const qty = ref(1)
const activeImage = ref('')
const loading = ref(false)













const isDark = ref(false)
const mobileMenu = ref(false)

const toggleDarkMode = () => {
    isDark.value = !isDark.value
}

const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value
}














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

onMounted(() => {
    getProduct()
})
</script>

<style>

</style>