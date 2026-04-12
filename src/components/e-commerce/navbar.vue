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
        <header class="sticky top-0 bg-white dark:bg-gray-900 border-b z-50">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">

                <div class="font-black text-2xl text-indigo-600">Dynamic Bazar</div>

                <input
                    class="hidden lg:block w-1/2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800"
                    placeholder="Search..."
                />

                <div class="flex items-center gap-4">

                    <router-link to="/login">Login</router-link>

                    <!-- CART -->
                    <i class="fa-solid fa-bag-shopping text-xl"></i>

                    <!-- MOBILE BUTTON -->
                    <button class="lg:hidden text-2xl" @click="emit('toggle-menu')">
                        <i class="fa-solid fa-bars"></i>
                    </button>

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
defineProps({
    isDark: Boolean,
    mobileMenu: Boolean
})

const emit = defineEmits(['toggle-dark', 'toggle-menu'])

const menus = ['Home', 'New Arrivals', 'Collections', 'Limited Edition', 'Sale']
</script>