<template>
    <div>

        <!-- TOP BAR -->
        <div class="bg-indigo-600 text-white text-sm py-2 px-4 flex justify-between">
            <div>🔥 Flash Sale: Get 50% Off Today!</div>

            <button @click="emit('toggle-dark')"
                class="bg-indigo-700 px-3 py-1 rounded-full flex items-center gap-2">
                <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
                {{ isDark ? 'Light' : 'Dark' }}
            </button>
        </div>

        <!-- HEADER -->
        <header class="sticky top-0 z-[100] transition-all duration-300">
            <div class="absolute inset-0 bg-white/80 dark:bg-[#080809]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5"></div>

            <div class="container mx-auto px-4 relative">
                <div class="flex items-center justify-between h-20 gap-4 sm:gap-8">
                    
                    <router-link to="/" class="flex items-center gap-2 group shrink-0">
                        <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                            <i class="fa-solid fa-bolt-lightning text-white text-lg"></i>
                        </div>
                        <div class="flex flex-col leading-none">
                            <span class="font-black text-lg sm:text-xl tracking-tighter text-gray-900 dark:text-white uppercase">
                                Dynamic<span class="text-indigo-600">Bazar</span>
                            </span>
                            <span class="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">Premium Store</span>
                        </div>
                    </router-link>

                    <div class="hidden md:flex flex-1 max-w-xl relative group">
                        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm group-focus-within:text-indigo-500 transition-colors"></i>
                        <input
                            type="text"
                            placeholder="Search for premium products..."
                            class="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-[#0d0d0f] focus:border-indigo-500/50 outline-none transition-all duration-300 text-sm font-medium dark:text-gray-200"
                        />
                        <div class="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-2 py-1 rounded bg-gray-200 dark:bg-white/10 text-[10px] font-black text-gray-500 uppercase tracking-tighter">
                            <span class="opacity-50">Cmd</span> K
                        </div>
                    </div>

                    <div class="flex items-center gap-2 sm:gap-4">
                        
                        <button class="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                            <i class="fa-solid fa-bag-shopping"></i>
                            <span class="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-[#080809]">0</span>
                        </button>

                        <div class="relative group" v-if="authUser">
                            <div class="flex items-center gap-2 p-1 pr-2 sm:pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-white/10 cursor-pointer">
                                
                                <div class="relative group shrink-0">
                                    <div v-if="authUser.photo" class="relative">
                                        <img 
                                            :src="avatarUrl" 
                                            class="h-10 w-10 rounded-full object-cover p-[2px] ring-2 ring-indigo-500/20 dark:ring-white/10 group-hover:ring-indigo-500 transition-all duration-500 shadow-sm"
                                            alt="User Profile"
                                        />
                                        <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#0d0d0f] rounded-full"></span>
                                    </div>

                                    <div v-else class="relative h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-500">
                                        <div class="flex items-center justify-center w-full h-full rounded-full bg-white/10 backdrop-blur-sm">
                                            <span class="text-[13px] font-black text-white tracking-tighter uppercase">
                                                {{ authUser.name.charAt(0) }}
                                            </span>
                                        </div>
                                        <span class="absolute -inset-0.5 bg-indigo-500/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    </div>
                                </div>
                                

                                
                                <div class="hidden lg:block text-left leading-none max-w-[100px]">
                                    <p class="text-xs font-black text-gray-900 dark:text-white tracking-tight truncate">{{ authUser.name }}</p>
                                    <p class="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Member</p>
                                </div>
                                
                                <i class="fa-solid fa-chevron-down text-[9px] text-gray-400 transition-transform duration-300 group-hover:rotate-180"></i>
                            </div>

                            <div class="absolute right-0 top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-[120]">
                                <div class="w-64 bg-white dark:bg-[#0d0d0f] rounded-[1.8rem] border border-gray-100 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.25)] overflow-hidden">
                                    
                                    <div class="p-5 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                                        <p class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Authenticated Account</p>
                                        <p class="text-xs font-black text-gray-900 dark:text-white truncate">{{ authUser.email }}</p>
                                    </div>

                                    <div class="p-2">
                                        <router-link to="/profile" class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 group/item transition-colors">
                                            <div class="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover/item:bg-indigo-600 transition-colors shadow-sm">
                                                <i class="fa-regular fa-user text-gray-500 group-hover/item:text-white text-sm"></i>
                                            </div>
                                            <span class="text-xs font-bold text-gray-600 group-hover/item:text-indigo-600 dark:text-white">Profile Overview</span>
                                        </router-link>

                                        <router-link to="/" class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 group/item transition-colors">
                                            <div class="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover/item:bg-indigo-600 transition-colors shadow-sm">
                                                <i class="fa-solid fa-box-archive text-gray-500 group-hover/item:text-white text-sm"></i>
                                            </div>
                                            <span class="text-xs font-bold text-gray-600 group-hover/item:text-indigo-600 dark:text-white">My Orders</span>
                                        </router-link>
                                    </div>

                                    <div class="p-2 bg-gray-50/50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5">
                                        <button @click="logout" class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 group/logout transition-colors">
                                            <div class="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center group-hover/logout:bg-red-500 transition-colors shadow-sm">
                                                <i class="fa-solid fa-arrow-right-from-bracket text-red-500 group-hover/logout:text-white text-sm"></i>
                                            </div>
                                            <span class="text-xs font-bold text-red-600 group-hover/logout:text-red-700">Logout System</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="md:hidden pb-4 px-2">
                    <div class="relative group">
                        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input
                            type="text"
                            placeholder="Search premium bazaar..."
                            class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 outline-none text-xs font-medium border border-transparent focus:border-indigo-500/30 transition-all dark:text-gray-200"
                        />
                    </div>
                </div>
            </div>
        </header>

        <!-- DESKTOP MENU -->
        <nav class="hidden lg:block border-b bg-white dark:bg-gray-900">
            <ul class="flex gap-8 px-4 py-3 uppercase text-sm font-semibold">
                <li v-for="m in menus" :key="m">{{ m }}</li>
            </ul>
        </nav>

        <!-- MOBILE MENU -->
        <transition name="slide">
            <div v-if="mobileMenu" class="fixed inset-0 z-[60] lg:hidden">

                <div class="absolute inset-0 bg-black/50"
                    @click="emit('toggle-menu')"></div>

                <div class="absolute left-0 top-0 w-64 h-full bg-white dark:bg-gray-900 p-6">

                    <h2 class="font-bold text-xl mb-6">Menu</h2>

                    <ul class="space-y-4">
                        <li v-for="m in menus" :key="m" @click="emit('toggle-menu')">
                            {{ m }}
                        </li>
                    </ul>

                </div>

            </div>
        </transition>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'
const router = useRouter()

const props = defineProps({
    isDark: Boolean,
    mobileMenu: Boolean,
    authUser: Object,
    avatarUrl: String
})

const emit = defineEmits(['toggle-dark', 'toggle-menu', 'logout'])

const menus = ['Home', 'New Arrivals', 'Collections', 'Limited Edition', 'Sale']

const loading = ref(false);

async function logout() {
    try {
        loading.value = true
        await api.post("/auth/logout")
    } catch (error) {
        console.error("Logout failed API side:", error)
    } finally {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        emit('logout')

        router.push("/login")
    }
}
</script>