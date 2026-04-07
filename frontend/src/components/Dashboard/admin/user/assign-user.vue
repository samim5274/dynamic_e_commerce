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

            <Message
                :successMsg="successMsg"
                :errorMsg="errorMsg"
                @update:successMsg="successMsg = $event"
                @update:errorMsg="errorMsg = $event"
            />

            <!-- Content -->
            <div class="flex-1 min-w-0">
                <main class="flex-1 min-w-0 bg-gray-50 dark:bg-[#0C1326] px-4 sm:px-6 lg:px-8 py-6">
                    <!-- Header -->
                    <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">Assign in Tree</h1>
                            <p class="text-sm text-slate-600 dark:text-slate-300">Update your personal information</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        <section class="lg:col-span-1 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            
                            <!-- Header -->
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                                <input type="text" v-model="search" class="input" placeholder="Search users..." />
                            </div>

                            <!-- Table -->
                            <div class="overflow-x-auto max-h-[700px]">
                                <table class="min-w-full text-sm">
                                    <!-- Body -->
                                    <tbody>
                                        <tr 
                                            v-for="user in filteredUsers" 
                                            :key="user.id"
                                            @click="selectUser(user)"
                                            :class="[
                                                'group border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/80 dark:hover:bg-[#1e293b]/50 transition-all duration-300',
                                                selectedUser?.id === user.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                                            ]">
                                            <td class="py-4 px-6">
                                                <div class="flex items-center gap-4">

                                                    <div v-if="user.photo">
                                                        <img :src="user.photo ? makeImg(user.photo) : '/images/avatar.png'" alt="User photo" class="h-11 w-11 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-white/10"/>
                                                    </div>
                                                    <div v-else class="h-11 w-11 rounded-xl bg-gradient-to-br from-[#A3D921] to-[#639d00] flex items-center justify-center text-black font-bold shadow-lg shadow-[#A3D921]/10 group-hover:scale-110 transition-transform">
                                                        {{ user.name.charAt(0).toUpperCase() }}
                                                    </div>

                                                    <div class="flex flex-col gap-1">
                                                        <div class="flex items-center gap-3">
                                                            <span class="text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                                                                {{ user.name }}
                                                            </span>
                                                            
                                                            <span 
                                                                class="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider border transition-all duration-300 shadow-sm"
                                                                :class="{
                                                                    'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20': user.role === 'admin',
                                                                    'bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20': user.role === 'customer'
                                                                }">
                                                                <span class="relative flex h-1.5 w-1.5 mr-1.5">
                                                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="user.role === 'admin' ? 'bg-emerald-400' : 'bg-blue-400'"></span>
                                                                    <span class="relative inline-flex rounded-full h-1.5 w-1.5" :class="user.role === 'admin' ? 'bg-emerald-500' : 'bg-blue-500'"></span>
                                                                </span>
                                                                {{ user.role }}
                                                            </span>
                                                        </div>

                                                        <div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                                            <i class="fa-regular fa-envelope text-[10px] opacity-70"></i>
                                                            <span class="text-[11px] font-medium tracking-wide">
                                                                {{ user.email }}
                                                            </span>
                                                        </div>
                                                        <div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                                            <i class="fa-solid fa-id-card-clip text-[10px] opacity-70"></i>
                                                            <span class="text-[11px] font-medium tracking-wide">
                                                                {{ user.user_id }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td class="py-4 px-6">
                                                <div class="flex items-center gap-2">
                                                    <div v-if="user.left_child_id || user.right_child_id" class="flex -space-x-2">
                                                        <div v-if="user.left_child_id" class="h-6 w-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold" title="Left Occupied">L</div>
                                                        <div v-if="user.right_child_id" class="h-6 w-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold" title="Right Occupied">R</div>
                                                    </div>
                                                    <span v-else class="text-[10px] text-slate-400 italic font-medium">No direct down line</span>
                                                </div>
                                            </td>
                                        </tr>

                                        <!-- Empty -->
                                        <tr v-if="filteredUsers.length === 0">
                                            <td colspan="3" class="text-center py-6 text-slate-400">
                                                No users found
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section class="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900/50">
                            <div v-if="selectedUser" class="space-y-8">
                                <div class="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                                    <div v-if="selectedUser.photo" class="relative">
                                            <img :src="makeImg(selectedUser.photo)" class="h-24 w-24 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-slate-800" />
                                        <span class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900">
                                            <div class="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                                        </span>
                                    </div>
                                    <div v-else class="h-11 w-11 rounded-xl bg-gradient-to-br from-[#A3D921] to-[#639d00] flex items-center justify-center text-black font-bold shadow-lg shadow-[#A3D921]/10 group-hover:scale-110 transition-transform">
                                        {{ selectedUser.name.charAt(0).toUpperCase() }}
                                    </div>
                                    
                                    <div>
                                        <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                            {{ selectedUser.name }}
                                        </h2>
                                        <div class="mt-1 flex items-center gap-2">
                                            <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                                                {{ selectedUser.role }}
                                            </span>
                                            <span class="text-sm text-slate-500 dark:text-slate-400">ID: {{ selectedUser.user_id }}</span>
                                        </div>
                                    </div>
                                </div>

                                <hr class="border-slate-100 dark:border-slate-800" />

                                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div class="space-y-1.5">
                                                <label class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    Email Address
                                                </label>
                                                <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 selection:bg-indigo-100">
                                                    {{ selectedUser.email }}
                                                </p>
                                            </div>

                                            <div v-if="selectedUser.refer_id" class="space-y-1.5 border-l border-slate-100 pl-6 dark:border-slate-800">
                                                <label class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Referral Source
                                                </label>
                                                <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                    {{ selectedUser.referrer?.name || 'N/A' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-3">
                                        <div class="flex items-center gap-2">
                                            <label class="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                            Hierarchy Status
                                            </label>
                                            <div class="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                                        </div>

                                        <div class="flex flex-wrap gap-3">
                                            <template v-if="selectedUser.left_child_id || selectedUser.right_child_id">
                                            
                                            <div v-if="selectedUser.left_child_id" 
                                                class="group flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-500">
                                                <div class="flex items-center justify-center bg-slate-50 px-2 py-1.5 text-[10px] font-black text-slate-400 border-r border-slate-200 group-hover:bg-blue-50 group-hover:text-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:bg-blue-900/20">
                                                    L
                                                </div>
                                                <div class="px-3 py-1.5">
                                                    <span class="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300">
                                                        #{{ selectedUser.left_child?.name || 'No Child Assigned' }}
                                                    </span>
                                                </div>
                                            </div>

                                            <div v-if="selectedUser.right_child_id" 
                                                class="group flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-indigo-500">
                                                <div class="flex items-center justify-center bg-slate-50 px-2 py-1.5 text-[10px] font-black text-slate-400 border-r border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-500 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:bg-indigo-900/20">
                                                    R
                                                </div>
                                                <div class="px-3 py-1.5">
                                                    <span class="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300">
                                                        #{{ selectedUser.right_child?.name || 'No Child Assigned' }}
                                                    </span>
                                                </div>
                                            </div>

                                            </template>

                                            <div v-else class="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-800/30">
                                            <i class="fa-solid fa-sitemap text-slate-300 dark:text-slate-600"></i>
                                            <span class="text-xs font-medium italic text-slate-400 dark:text-slate-500">
                                                No direct down line members
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Please selected user -->
                                <div class="space-y-3">
                                    <div class="flex items-center gap-2">
                                        <label class="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                        Root user
                                        </label>
                                        <div class="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                                    </div>

                                    <div class="flex flex-col gap-2">

                                        <!-- Search input -->
                                        <input type="text" v-model="searchRootUser" placeholder="Search by ID, name or email..." class="input" />

                                        <!-- Dropdown -->
                                        <select class="input inputDisabled" v-model="selectedRootUser">
                                            <option disabled selected>-- Select Root User --</option>
                                            <option v-for="rus in filteredRootUsers" :key="rus.id" :value="rus">
                                                <!-- {{ rus.name }} - ({{ rus.email }}) - [ID: {{ rus.user_id }}] -->
                                                {{ rus.name }} - [{{ rus.user_id }}]
                                            </option>
                                            <option v-if="filteredRootUsers.length === 0" disabled>No available root users</option>
                                        </select>

                                    </div>

                                    <div class="mt-4">
                                        <label class="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 block">
                                            Assign Placement
                                        </label>

                                        <div class="grid grid-cols-2 gap-4">
                                            <label :class="[
                                                'relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all duration-300',
                                                selectedRootUser?.left_child_id 
                                                    ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 opacity-50 cursor-not-allowed' 
                                                    : (placement === 'left' 
                                                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' 
                                                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-slate-500')
                                            ]">
                                                <input 
                                                    type="radio" 
                                                    v-model="placement" 
                                                    value="left" 
                                                    :disabled="selectedRootUser?.left_child_id" 
                                                    class="sr-only" 
                                                />
                                                
                                                <div class="flex items-center justify-between">
                                                    <span class="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">Left Node</span>
                                                    <div v-if="placement === 'left' && !selectedRootUser?.left_child_id" class="h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div class="mt-2 flex items-center gap-1.5">
                                                    <span :class="['h-2 w-2 rounded-full', selectedRootUser?.left_child_id ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse']"></span>
                                                    <span class="text-[10px] font-semibold uppercase tracking-wide" :class="selectedRootUser?.left_child_id ? 'text-rose-500' : 'text-emerald-500'">
                                                        {{ selectedRootUser?.left_child_id ? 'Occupied' : 'Available' }}
                                                    </span>
                                                </div>
                                            </label>

                                            <label :class="[
                                                'relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all duration-300',
                                                selectedRootUser?.right_child_id 
                                                    ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 opacity-50 cursor-not-allowed' 
                                                    : (placement === 'right' 
                                                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' 
                                                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-slate-500')
                                            ]">
                                                <input 
                                                    type="radio" 
                                                    v-model="placement" 
                                                    value="right" 
                                                    :disabled="selectedRootUser?.right_child_id" 
                                                    class="sr-only" 
                                                />
                                                
                                                <div class="flex items-center justify-between">
                                                    <span class="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">Right Node</span>
                                                    <div v-if="placement === 'right' && !selectedRootUser?.right_child_id" class="h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div class="mt-2 flex items-center gap-1.5">
                                                    <span :class="['h-2 w-2 rounded-full', selectedRootUser?.right_child_id ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse']"></span>
                                                    <span class="text-[10px] font-semibold uppercase tracking-wide" :class="selectedRootUser?.right_child_id ? 'text-rose-500' : 'text-emerald-500'">
                                                        {{ selectedRootUser?.right_child_id ? 'Occupied' : 'Available' }}
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else 
                                    class="flex h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition-colors dark:border-slate-800 dark:bg-slate-900/20">
                                
                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                                    <i class="fa-solid fa-user-tie text-2xl text-slate-300 dark:text-slate-500"></i>
                                </div>

                                <div class="mt-4 text-center">
                                    <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    No User Selected
                                    </h3>
                                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    Click on a member from the list to <br class="hidden sm:block" /> view their full profile and down line.
                                    </p>
                                </div>

                                <div class="mt-6">
                                    <span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                    <span class="relative flex h-2 w-2">
                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
                                    </span>
                                    Waiting for Input
                                    </span>
                                </div>
                            </div>
                        </section>

                    </div>


                </main>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import api, { makeImg } from "../../../../services/api.js";


import Navbar from '../admin-navbar.vue';
import Header from '../admin-header.vue';
import Message from '../../../Message/message.vue';

const sidebarOpen = ref(false);
const active = ref("dashboard");
const successMsg = ref('');
const errorMsg = ref('');










const users = ref([]);
const loadingUsers = ref(false);
// fetch all admin and customer
async function fetchedUsers() {
    loadingUsers.value = true;
    try {
        const res = await api.get('/users');
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
    if (!search.value) return users.value;
    return users.value.filter(user =>
        user.name.toLowerCase().includes(search.value.toLowerCase()) ||
        user.email.toLowerCase().includes(search.value.toLowerCase()) ||
        user.user_id.toLowerCase().includes(search.value.toLowerCase())
    );
});


const selectedUser = ref(null);
function selectUser(user) {
    selectedUser.value = user;
}










// fetched root user
const rootUsers = ref("");
async function fetchedRootUsers() {
    try{
        const res = await api.get('/users/root');
        rootUsers.value = res.data.data;
        // console.log(rootUsers.value);
    } catch (err) {
        console.error(err);
        errorMsg.value = err.response?.data?.message || "Root user not fetched.";
    } finally {
        loadingUsers.value = false;
    }
}

// root user search
const searchRootUser = ref("");
const filteredRootUsers = computed(() => {
    if (!rootUsers.value) return [];

    return rootUsers.value.filter(user => {
        // Exclude the selected user
        if (selectedUser.value && user.id === selectedUser.value.id) return false;

        // Apply search filter
        if (!searchRootUser.value) return true;

        const term = searchRootUser.value.toLowerCase();
        return (
            user.name?.toLowerCase().includes(term) ||
            user.email?.toLowerCase().includes(term) ||
            user.user_id?.toLowerCase().includes(term) ||
            String(user.id).includes(term)
        );
    });
});



const selectedRootUser = ref(null);
const placement = ref(null); 
watch(() => selectedRootUser.value, (newUser) => {
    if (newUser) {
        if (!newUser.left_child_id && newUser.right_child_id) {
            placement.value = 'left';
        } else if (newUser.left_child_id && !newUser.right_child_id) {
            placement.value = 'right';
        } else if (!newUser.left_child_id && !newUser.right_child_id) {
            placement.value = 'left'; 
        } else {
            placement.value = null;
        }
    }
}, { immediate: true });














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
    fetchedRootUsers();

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
.input{
    @apply w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100;
}
.inputDisabled{
    @apply w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600
        dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300;
}
</style>