<template>
    <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
        <Header
            @open-sidebar="sidebarOpen = true"
            @search="onSearch"
            :isDark="isDark" @toggle-theme="toggleTheme"
        />

        <div class="flex  min-h-[calc(100vh-56px)]">
            <Navbar
                v-model="active"
                :open="sidebarOpen"
                @close="sidebarOpen = false"
            />

            <!-- Content -->
            <div class="flex-1 min-w-0">
                <main class="flex-1 min-w-0 bg-gray-50 dark:bg-[#0C1326] px-4 sm:px-6 lg:px-8 py-6">
                    
                    <section>
                        
                        <div class="relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">System Entities</h2>
                                    <p class="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A3D921]/80">Node Architecture & Hierarchy Management</p>
                                </div>
                                
                                <div class="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-2 rounded-3xl border border-slate-100 dark:border-slate-800">
                                    <div class="relative">
                                        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]"></i>
                                        <input 
                                            type="text" 
                                            v-model="search" 
                                            class="w-full md:w-64 border-none bg-transparent pl-10 pr-4 py-2 text-xs font-black tracking-tight focus:ring-0 dark:text-slate-200 placeholder:text-slate-400" 
                                            placeholder="QUERY MEMBER_ID..." 
                                        />
                                    </div>
                                    <div class="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                                    <button @click="goToUserList" class="flex items-center gap-2 px-4 py-2 bg-[#A3D921] text-black rounded-2xl text-[10px] font-black hover:shadow-lg hover:shadow-[#A3D921]/40 transition-all">
                                        <i class="fa-solid fa-plus"></i> NEW USER
                                    </button>
                                </div>
                            </div>
                            <!-- Decorative background element -->
                            <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#A3D921]/5 blur-3xl font-black"></div>
                        </div>

                        <div class="overflow-hidden">
                            <div class="overflow-y-auto max-h-[800px] px-1">
                                <table class="w-full border-separate border-spacing-y-3">
                                    <tbody>
                                        <tr 
                                            v-for="user in filteredUsers" 
                                            :key="user.id"
                                            class="group relative bg-white dark:bg-[#0B1222] transition-all duration-300 rounded-2xl hover:outline hover:outline-2 hover:outline-[#A3D921]/40 hover:-outline-offset-2 shadow-sm hover:shadow-xl dark:hover:shadow-none">
                                            
                                            <!-- Profile Section -->
                                            <td class="p-4 rounded-l-2xl border-y border-l border-slate-100 dark:border-slate-800/40">
                                                <div class="flex items-center gap-3">
                                                    <div class="relative flex-shrink-0">
                                                        <!-- Avatar with rotation effect -->
                                                        <div class="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 p-0.5 transition-transform duration-500 group-hover:rotate-6">
                                                            <div class="h-full w-full rounded-[1.1rem] overflow-hidden border border-white dark:border-slate-700">
                                                                <img v-if="user.photo" :src="makeImg(user.photo)" class="h-full w-full object-cover" />
                                                                <div v-else class="h-full w-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">
                                                                    {{ user.name.charAt(0).toUpperCase() }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- Status Dot -->
                                                        <span class="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                                                            <span 
                                                                class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                                                :class="user.is_active ? 'bg-emerald-400' : 'bg-red-400'"
                                                            ></span>
                                                            <span 
                                                                class="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white dark:border-[#0B1222]"
                                                                :class="user.is_active ? 'bg-emerald-500' : 'bg-red-500'"
                                                            ></span>
                                                        </span>
                                                    </div>

                                                    <div class="min-w-0">
                                                        <div class="flex items-center gap-2 mb-0.5">
                                                            <p class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate capitalize leading-tight">
                                                                {{ user.name }}
                                                            </p>
                                                            <span 
                                                                class="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider border transition-all duration-300"
                                                                :class="user.role === 'admin' 
                                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' 
                                                                    : 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'">
                                                                {{ user.role }}
                                                            </span>
                                                        </div>
                                                        <div class="flex flex-col">
                                                            <span class="text-[10px] text-slate-500 font-medium truncate">{{ user.email }}</span>
                                                            <span class="text-[10px] text-[#A3D921] font-black tracking-widest uppercase mt-0.5">{{ user.user_id }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <!-- Placement Section -->
                                            <td class="py-6">
                                                <div class="flex items-center justify-center gap-6">
                                                    <!-- Node Socket L -->
                                                    <div class="relative group/socket">
                                                        <div 
                                                            :class="user.left_child_id ? 'border-[#A3D921] text-[#A3D921] bg-[#A3D921]/5 shadow-lg shadow-[#A3D921]/20' : 'border-slate-200 dark:border-slate-800 text-slate-300'"
                                                            class="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all duration-500">
                                                            <!-- <i class="fa-solid fa-microchip text-sm"></i> -->
                                                            <!-- <i class="fa-solid fa-street-view text-sm"></i> -->
                                                            A
                                                        </div>
                                                        <div class="absolute pb-2 -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                                            <span class="text-[8px] font-black tracking-[0.2em] text-slate-400 uppercase">A Group</span>
                                                        </div>
                                                    </div>

                                                    <!-- Data Link -->
                                                    <div class="relative flex items-center justify-center w-16">
                                                        <div class="h-[2px] w-full bg-slate-100 dark:bg-slate-800"></div>
                                                        <div 
                                                            :class="user.left_child_id && user.right_child_id ? 'bg-[#A3D921] shadow-[0_0_10px_#A3D921]' : 'bg-slate-300 dark:bg-slate-700'"
                                                            class="absolute h-2 w-2 rounded-full"></div>
                                                    </div>

                                                    <!-- Node Socket R -->
                                                    <div class="relative group/socket">
                                                        <div 
                                                            :class="user.right_child_id ? 'border-[#A3D921] text-[#A3D921] bg-[#A3D921]/5 shadow-lg shadow-[#A3D921]/20' : 'border-slate-200 dark:border-slate-800 text-slate-300'"
                                                            class="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all duration-500">
                                                            <!-- <i class="fa-solid fa-street-view text-sm"></i> -->
                                                            B
                                                        </div>
                                                        <div class="absolute pb-2 -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                                            <span class="text-[8px] font-black tracking-[0.2em] text-slate-400 uppercase">B Group</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <!-- Action Section -->
                                            <td class="p-4 rounded-r-2xl border-y border-r border-slate-100 dark:border-slate-800/40 text-right">
                                                <button 
                                                    @click="editUser(user)"
                                                    class="h-9 w-9 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#A3D921] hover:text-white hover:shadow-lg hover:shadow-[#A3D921]/20 transition-all duration-300 dark:bg-slate-900 dark:text-slate-500 border border-slate-200/50 dark:border-slate-800 flex items-center justify-center group-hover:scale-105 active:scale-95">
                                                    <i class="fa-solid fa-pen-to-square text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>

                                        <tr v-if="filteredUsers.length === 0">
                                            <td colspan="3" class="text-center py-20">
                                                <div class="flex flex-col items-center gap-3">
                                                    <i class="fa-solid fa-users-slash text-4xl text-slate-200"></i>
                                                    <p class="text-sm text-slate-400 font-medium">No users found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                </main>

            </div>
        </div>
        
    </div>
    <FooterSection />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api, { makeImg } from "../../../../services/api.js";

const router = useRouter();



import Navbar from '../admin-navbar.vue';
import Header from '../admin-header.vue';

import FooterSection from "../../../e-commerce/footer.vue";

const sidebarOpen = ref(false);
const active = ref("dashboard");


function goToUserList() {
    router.push({ name: 'UserList' });
}









const users = ref([]);
const loadingUsers = ref(false);
// fetch all admin and customer
async function fetchedUsers() {
    loadingUsers.value = true;
    try {
        const res = await api.get('/users/get-all');
        if (res.data?.success) {
        users.value = res.data.data;
        }
    } catch (err) {
        console.error(err);
    } finally {
        loadingUsers.value = false;
    }
}

const search = ref("");
const filteredUsers = computed(() => {
    return users.value.filter(user =>
        user.name.toLowerCase().includes(search.value.toLowerCase()) ||
        user.email.toLowerCase().includes(search.value.toLowerCase()) ||
        user.user_id.toLowerCase().includes(search.value.toLowerCase())
    );
});













function editUser(user){
    router.push(`/admin/user-setting/edit/${user.id}`);
}










const isDark = ref(false);

function applyTheme(dark) {
    isDark.value = dark;   // VERY IMPORTANT
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
}

function toggleTheme() {
    applyTheme(!isDark.value);
}

function onSearch(q) {
    console.log("search:", q);
}



/* ESC to close drawer */
onMounted(() => {

    fetchedUsers();

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") sidebarOpen.value = false;
    });

    const saved = localStorage.getItem("theme");

    if (saved === "dark") applyTheme(true);
    else if (saved === "light") applyTheme(false);
    else {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(systemDark);
    }
});
</script>


<style scoped>
/* Row Spacing Hack for Table */
table {
    border-collapse: separate;
    border-spacing: 0 12px;
}
</style>