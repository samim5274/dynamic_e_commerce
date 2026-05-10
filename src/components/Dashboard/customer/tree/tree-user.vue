<template>
    <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
        <Header @open-sidebar="sidebarOpen = true" :isDark="isDark" @toggle-theme="toggleTheme" />

        <div class="flex min-h-[calc(100vh-56px)]">
            <Navbar v-model="active" :open="sidebarOpen" @close="sidebarOpen = false" />
            
            <Message :successMsg="successMsg" :errorMsg="errorMsg" />

            <div class="flex-1 min-w-0">
                <main class="min-h-screen bg-gray-50 dark:bg-[#0C1326]">
                    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-5">

                        <!-- Dashboard Header -->
                        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                            <div>
                                <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                    <i class="fa-solid fa-sitemap text-[#3cabd3]"></i> My Network Tree
                                </h1>
                                <p class="text-xs text-gray-500 mt-1">
                                    Viewing: <span class="text-[#3cabd3] font-bold">{{ rootUser?.name }}</span>'s organization
                                </p>
                            </div>

                            <div class="flex flex-wrap items-center gap-3">
                                <!-- Back to Me Button -->
                                <!-- <button 
                                    v-if="rootUser?.id !== authUser?.id"
                                    @click="resetToAuthUser"
                                    class="flex items-center gap-2 px-4 py-2 bg-[#3cabd3] text-white rounded-lg text-sm font-medium hover:bg-[#3498bb] shadow-sm transition-all"
                                >
                                    <i class="fa-solid fa-arrow-left"></i> My Root
                                </button> -->

                                <button 
                                    v-if="rootUser?.id !== authUser?.id"
                                    @click="resetToAuthUser"
                                    class="group inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 
                                        /* Light Mode */
                                        text-[#3cabd3] border-2 border-[#3cabd3] bg-transparent hover:bg-[#3cabd3] hover:text-white shadow-sm
                                        /* Dark Mode */
                                        dark:text-[#4cc1eb] dark:border-[#3cabd3]/50 dark:hover:border-[#3cabd3] dark:hover:bg-[#3cabd3]/10 dark:hover:text-white
                                        /* Focus & Active State */
                                        focus:outline-none focus:ring-2 focus:ring-[#3cabd3] focus:ring-offset-2 dark:focus:ring-offset-slate-900 
                                        active:scale-95 disabled:opacity-50"
                                >
                                    <i class="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i> 
                                    <span>My Root</span>
                                </button>

                                <button @click="fetchedUsers" class="p-2 bg-white dark:bg-slate-800 border rounded-lg dark:border-slate-700">
                                    <i class="fa-solid fa-rotate dark:text-white" :class="{ 'animate-spin': loading }"></i>
                                </button>
                                
                                <!-- Simplified Stats -->
                                <div class="px-4 py-2 bg-[#A3D921]/10 border border-[#A3D921]/20 rounded-lg">
                                    <p class="text-[10px] uppercase text-gray-500 dark:text-slate-400 font-bold">Balance</p>
                                    <p class="text-sm font-bold text-gray-800 dark:text-gray-100">
                                        ৳{{ authUser?.bonus_balance || '0.00' }}
                                    </p>
                                </div>

                                <div class="px-4 py-2 bg-[#A3D921]/10 border border-[#A3D921]/20 rounded-lg">
                                    <p class="text-[10px] uppercase text-gray-500 dark:text-slate-400 font-bold">Personal Point</p>
                                    <p class="text-sm font-bold text-gray-800 dark:text-gray-100">
                                        {{ authUser?.total_own_points || '0' }}
                                    </p>
                                </div>

                                <div class="px-4 py-2 bg-[#A3D921]/10 border border-[#A3D921]/20 rounded-lg">
                                    <p class="text-[10px] uppercase text-gray-500 dark:text-slate-400 font-bold">A Group</p>
                                    <p class="text-sm font-bold text-gray-800 dark:text-gray-100">
                                        {{ authUser?.left_total_point || '0' }}
                                    </p>
                                </div>

                                <div class="px-4 py-2 bg-[#A3D921]/10 border border-[#A3D921]/20 rounded-lg">
                                    <p class="text-[10px] uppercase text-gray-500 dark:text-slate-400 font-bold">B Group</p>
                                    <p class="text-sm font-bold text-gray-800 dark:text-gray-100">
                                        {{ authUser?.right_total_point || '0' }}
                                    </p>
                                </div>

                                <div class="px-4 py-2 bg-[#A3D921]/10 border border-[#A3D921]/20 rounded-lg">
                                    <p class="text-[10px] uppercase text-gray-500 dark:text-slate-400 font-bold">Total Point</p>
                                    <p class="text-sm font-bold text-gray-800 dark:text-gray-100">
                                        {{ authUser?.total_points || '0' }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Tree Container -->
                        <div class="w-full overflow-x-auto bg-white dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800 p-10 shadow-inner min-h-[600px]">
                            <div class="min-w-max flex justify-center">
                                <div v-if="loading" class="flex flex-col items-center justify-center py-20">
                                    <div class="animate-spin h-10 w-10 border-4 border-[#A3D921] border-t-transparent rounded-full"></div>
                                    <p class="mt-4 text-sm text-gray-500">Updating Tree...</p>
                                </div>

                                <UserTreeNode 
                                    v-else-if="rootUser" 
                                    :user="rootUser" 
                                    :depth="1"
                                    @select-node="handleNodeClick"
                                />
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from '../../../../services/api';
import UserTreeNode from './UserTreeNode.vue';
import Message from '../../../Message/message.vue';
import Navbar from '../navbar.vue';
import Header from '../header.vue';

const successMsg = ref("");
const errorMsg = ref("");
const loading = ref(false);
const authUser = ref(null);
const rootUser = ref(null);
const sidebarOpen = ref(false);
const active = ref("network");

// Fetch Initial Data
async function fetchedUsers(){
    loading.value = true;
    try {
        const resUser = await api.get("/user");
        const userData = resUser.data.data || resUser.data;
        if (userData) {
            authUser.value = userData;
            // Initially set root as current user
            await fetchTreeData(userData.id);
        }
    } catch (err) {
        errorMsg.value = "Auth error";
    } finally {
        loading.value = false;
    }
}

// Fetch Specific Tree Branch
async function fetchTreeData(nodeId) {
    loading.value = true;
    try {
        const resTree = await api.get(`/tree-user-log-root?root_id=${nodeId}`);
        if (resTree.data?.success) {
            rootUser.value = resTree.data.data;
        }
    } catch (err) {
        errorMsg.value = "Failed to load branch";
    } finally {
        loading.value = false;
    }
}

// Handle Node Click
function handleNodeClick(selectedUser) {
    if (selectedUser?.id) {
        fetchTreeData(selectedUser.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Reset to Auth User Root
function resetToAuthUser() {
    if (authUser.value) fetchTreeData(authUser.value.id);
}

// Theme Logic
const isDark = ref(false);
function applyTheme(dark) {
    isDark.value = dark;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
}
function toggleTheme() { applyTheme(!isDark.value); }

onMounted(() => {
    fetchedUsers();
    const saved = localStorage.getItem("theme");
    if (saved) applyTheme(saved === "dark");
});
</script>