<template>
    <div :class="{ 'dark': isDark }">
        <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
        
        <Navbar 
            :isDark="isDark"
            :mobileMenu="mobileMenu"
            @toggle-dark="toggleDarkMode"
            @toggle-menu="toggleMenu"
        />

        <slider />
        <Main />
        <FooterSection />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api, {makeImg} from '../../services/api'

import Navbar from './navbar.vue';
import slider from './slider.vue';
import Main from './main.vue';
import FooterSection from './footer.vue';
import { useAuth } from '../../stores/auth';











const isDark = ref(false)
const mobileMenu = ref(false)

const toggleDarkMode = () => {
    isDark.value = !isDark.value
}

const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value
}


















const { loadUser } = useAuth()

onMounted(() => {
    loadUser()
})
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
    transform: translateX(-100%);
}
</style>