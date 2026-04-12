<template>
    <div :class="{ 'dark': isDark }">
        <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
        
        <div class="bg-indigo-600 text-white text-[10px] md:text-sm py-2 px-4 flex justify-between items-center">
            <div class="truncate">🔥 Flash Sale: Get 50% Off Today!</div>
            <div class="flex gap-4 shrink-0">
            <button @click="toggleDarkMode" class="flex items-center gap-2 bg-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-800 transition">
                <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
                <span class="hidden sm:inline">{{ isDark ? 'Light' : 'Dark' }}</span>
            </button>
            </div>
        </div>

        <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b dark:border-gray-800">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">Dynamic Bazar</div>
            
            <div class="hidden lg:flex flex-1 mx-10 max-w-xl">
                <div class="relative w-full">
                <input type="text" placeholder="Search products..." 
                    class="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full px-6 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                <i class="fa-solid fa-magnifying-glass absolute right-4 top-3.5 text-gray-400"></i>
                </div>
            </div>

            <div class="flex items-center gap-4 md:gap-6">
                <button class="hover:text-indigo-600 transition"><i class="fa-regular fa-user text-xl"></i></button>
                <router-link to="/login">Login</router-link>
                <div class="relative cursor-pointer group">
                <i class="fa-solid fa-bag-shopping text-xl group-hover:text-indigo-600 transition"></i>
                <span class="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">2</span>
                </div>
                <button @click="mobileMenu = !mobileMenu" class="lg:hidden text-2xl">
                <i :class="mobileMenu ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered'"></i>
                </button>
            </div>
            </div>

            <div class="lg:hidden px-4 pb-4">
            <input type="text" placeholder="Search..." class="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm outline-none">
            </div>
        </header>

        <nav class="hidden lg:block border-b dark:border-gray-800 bg-white dark:bg-gray-900">
            <div class="container mx-auto px-4">
            <ul class="flex gap-8 py-3 text-sm font-semibold uppercase tracking-wide">
                <li v-for="menu in menus" :key="menu">
                <a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{{ menu }}</a>
                </li>
            </ul>
            </div>
        </nav>

        <slider />

        <transition name="slide">
            <div v-if="mobileMenu" class="fixed inset-0 z-[60] lg:hidden">
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="mobileMenu = false"></div>
            <div class="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 p-6 shadow-2xl">
                <h2 class="text-xl font-bold mb-6">Menu</h2>
                <ul class="space-y-4 font-medium">
                <li v-for="menu in menus" :key="menu" @click="mobileMenu = false">
                    <a href="#" class="block py-2 border-b dark:border-gray-800">{{ menu }}</a>
                </li>
                </ul>
            </div>
            </div>
        </transition>

        <Main />

        <FooterSection />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import slider from './slider.vue';
import Main from './main.vue';
import FooterSection from './footer.vue';

const isDark = ref(false)
const mobileMenu = ref(false)

const toggleDarkMode = () => {
    isDark.value = !isDark.value
}

const menus = ['Home', 'New Arrivals', 'Collections', 'Limited Edition', 'Sale']
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
    transform: translateX(-100%);
}
</style>