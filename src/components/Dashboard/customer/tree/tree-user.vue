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
                            <div class="space-y-1">
                                <div class="flex items-center gap-3">
                                    <div class="p-2.5 bg-[#3cabd3]/10 rounded-xl">
                                        <i class="bi bi-diagram-2-fill text-[#3cabd3] text-xl"></i>
                                    </div>
                                    <div>
                                        <h1 class="text-xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
                                            My Network Tree
                                        </h1>
                                        <p class="text-xs text-gray-500 flex items-center gap-1.5">
                                            <span class="inline-block w-2 h-2 rounded-full bg-[#A3D921]"></span>
                                            Viewing: <span class="text-[#3cabd3] font-bold">{{ rootUser?.name }}</span>'s organization
                                        </p>
                                    </div>
                                </div>
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

                                <div class="flex items-center gap-2 border-r border-gray-100 dark:border-slate-800 pr-4">
                                    <button 
                                        v-if="rootUser?.id !== authUser?.id"
                                        @click="resetToAuthUser"
                                        class="group inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 
                                            text-[#3cabd3] border border-[#3cabd3]/30 bg-[#3cabd3]/5 hover:bg-[#3cabd3] hover:text-white
                                            active:scale-95"
                                    >
                                        <i class="fa-solid fa-house-user transition-transform group-hover:-translate-y-0.5"></i> 
                                        <span>My Root</span>
                                    </button>

                                    <button 
                                        @click="fetchedUsers" 
                                        class="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                        title="Refresh Tree"
                                    >
                                        <i class="fa-solid fa-rotate text-slate-600 dark:text-slate-300" :class="{ 'animate-spin': loading }"></i>
                                    </button>
                                </div>

                                <!-- Balance Card (Primary) -->
                                <div class="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-br from-[#A3D921] to-[#8ebc1a] rounded-2xl shadow-sm shadow-[#A3D921]/20">
                                    <div class="p-1.5 bg-white/20 rounded-lg text-white">
                                        <i class="fa-solid fa-wallet text-xs"></i>
                                    </div>
                                    <div>
                                        <p class="text-[9px] uppercase text-white/80 font-bold leading-none mb-1">Balance</p>
                                        <p class="text-sm font-black text-white">৳{{ authUser?.bonus_balance || '0.00' }}</p>
                                    </div>
                                </div>

                                <!-- Points Group -->
                                <div class="flex gap-2 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <!-- Group A -->
                                    <div class="px-3 py-1.5">
                                        <p class="text-[8px] uppercase text-slate-400 font-bold">Group A</p>
                                        <p class="text-xs font-bold text-gray-700 dark:text-gray-200">{{ authUser?.left_total_point || '0' }}</p>
                                    </div>
                                    
                                    <!-- Divider -->
                                    <div class="w-px h-8 bg-slate-200 dark:bg-slate-700 my-auto"></div>

                                    <!-- Group B -->
                                    <div class="px-3 py-1.5">
                                        <p class="text-[8px] uppercase text-slate-400 font-bold">Group B</p>
                                        <p class="text-xs font-bold text-gray-700 dark:text-gray-200">{{ authUser?.right_total_point || '0' }}</p>
                                    </div>

                                    <!-- Divider -->
                                    <div class="w-px h-8 bg-slate-200 dark:bg-slate-700 my-auto"></div>

                                    <!-- Personal Point -->
                                    <div class="px-3 py-1.5">
                                        <p class="text-[8px] uppercase text-slate-400 font-bold">Personal Point</p>
                                        <p class="text-xs font-bold text-gray-700 dark:text-gray-200">{{ authUser?.total_own_points || '0' }}</p>
                                    </div>

                                    <!-- Divider -->
                                    <div class="w-px h-8 bg-slate-200 dark:bg-slate-700 my-auto"></div>

                                    <!-- Total -->
                                    <div class="px-3 py-1.5">
                                        <p class="text-[8px] uppercase text-[#3cabd3] font-bold">Total Pts</p>
                                        <p class="text-xs font-black text-[#3cabd3]">
                                            {{
                                                (Number(authUser?.total_own_points || 0) +
                                                Number(authUser?.right_total_point || 0) +
                                                Number(authUser?.left_total_point || 0))
                                            }}
                                        </p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <!-- Tree Container -->
                        <div class="w-full overflow-x-auto bg-white dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-inner min-h-[600px] cursor-grab active:cursor-grabbing">
                            <div class="inline-flex justify-start md:justify-center min-w-full p-6 md:p-12">
                                <div v-if="loading" class="w-full flex flex-col items-center justify-center py-20">
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
        <FooterSection />
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from '../../../../services/api';
import UserTreeNode from './UserTreeNode.vue';
import Message from '../../../Message/message.vue';
import Navbar from '../navbar.vue';
import Header from '../header.vue';
import FooterSection from "../../../e-commerce/footer.vue";

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