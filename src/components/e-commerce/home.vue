<template>
    <div :class="{ 'dark': isDark }">
        <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
        
        <Navbar 
            :isDark="isDark"
            :mobileMenu="mobileMenu"
            :authUser="authUser"
            :avatarUrl="avatarUrl"
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

const isDark = ref(false)
const mobileMenu = ref(false)

const toggleDarkMode = () => {
    isDark.value = !isDark.value
}

const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value
}

const authUser = ref(null);
const isLoggedIn = ref(false);

async function loadAuthUser() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            isLoggedIn.value = false;
            authUser.value = null;
            return;
        }

        const res = await api.get("/user");
        authUser.value = res.data;
        isLoggedIn.value = true;
    } catch (err) {
        isLoggedIn.value = false;
        authUser.value = null;
        localStorage.removeItem("token");
    }
}

const defaultAvatar = "/images/avatar.png";

const avatarUrl = computed(() => {
    const photo = authUser.value?.photo;
    return photo ? makeImg(photo) : defaultAvatar;
});

onMounted(() => {
    loadAuthUser();
});
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
    transform: translateX(-100%);
}
</style>