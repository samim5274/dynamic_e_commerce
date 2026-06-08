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
                <main class="flex-1 min-h-screen min-w-0 bg-gray-50 dark:bg-[#0C1326] px-4 sm:px-6 lg:px-8 py-6 transition-colors duration-300">

                    <div>
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div class="flex items-center gap-4">
                                <button @click="$router.back()" class="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm">
                                    <i class="fa-solid fa-arrow-left-long h-5 w-5 text-slate-600 dark:text-slate-400"></i>
                                </button>
                                <div>
                                    <h1 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    Customer Details<span class="text-indigo-600 dark:text-indigo-400">#{{ customer?.user_id || "User" }}</span>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div v-if="customer" class="grid grid-cols-1 gap-6">
                            <section class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                            
                            <div class="h-20 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20"></div>

                            <div class="px-6 pb-6">
                                <div class="relative -mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                                <div class="relative">
                                    <img v-if="customer?.photo" :src="photoUrl" alt="Customer" 
                                        class="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg ring-1 ring-slate-200 dark:border-slate-900 dark:ring-slate-700"/>
                                    
                                    <div v-else class="h-20 w-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/30">
                                        {{ customer?.name.substring(0, 2).toUpperCase() }}
                                    </div>

                                    <div v-if="customer?.is_active" 
                                        class="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-white bg-emerald-500 dark:border-slate-900" 
                                        title="Active Now"></div>
                                </div>
                                
                                <div class="mb-1 flex-1">
                                    <h2 class="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                                    {{ customer?.name }}
                                    </h2>
                                    <div class="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <span class="font-medium">{{ customer?.email }}</span>
                                    <span v-if="customer?.email" 
                                            :class="customer?.email_verified_at ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'" 
                                            class="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                                        <i class="fa-solid" :class="customer?.email_verified_at ? 'fa-circle-check' : 'fa-circle-xmark'"></i>
                                        {{ customer?.email_verified_at ? 'Verified' : 'Unverified' }}
                                    </span>
                                    </div>
                                </div>

                                <div class="mb-1">
                                    <span class="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                                    <i class="fa-solid fa-user-shield mr-2"></i>
                                    {{ customer?.role || 'Customer' }}
                                    </span>
                                </div>
                                </div>

                                <div class="mt-6 flex flex-wrap gap-3 border-y border-slate-100 py-4 dark:border-slate-800">
                                    <div class="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-1.5 dark:border-slate-800 dark:bg-slate-800/50">
                                        <div class="h-2 w-2 rounded-full" :class="customer?.is_active ? 'bg-emerald-500' : 'bg-red-500'"></div>
                                        <span class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ customer?.is_active ? 'Account Active' : 'Account Disabled' }}</span>
                                    </div>

                                    <div class="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-1.5 dark:border-slate-800 dark:bg-slate-800/50">
                                        <i class="fa-solid text-xs" :class="customer?.is_profile_completed ? 'fa-check-double text-indigo-500' : 'fa-triangle-exclamation text-amber-500'"></i>
                                        <span class="text-xs font-bold text-slate-700 dark:text-slate-300">
                                            {{ customer?.is_profile_completed ? 'Profile Completed' : 'Incomplete Profile' }}
                                        </span>
                                    </div>

                                    <div @click="openStatusModal(customer)"
                                        class="group flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-1.5 dark:border-slate-800 dark:bg-slate-800/50 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 transition-all">
                                        
                                        <i class="fa-solid fa-user-pen fa-triangle-exclamation text-slate-500"></i>
                                        
                                        <span class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                            Change Role 
                                            <i class="fa-solid fa-pencil text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-200"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                                <InfoRow label="Phone" icon="fa-phone">
                                    <div class="flex items-center gap-2">
                                    <span class="font-bold">{{ customer?.phone || 'N/A' }}</span>
                                    <span v-if="customer?.phone" 
                                            :class="customer?.phone_verified_at ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'" 
                                            class="rounded px-1.5 py-0.5 text-[10px] font-black uppercase">
                                        {{ customer?.phone_verified_at ? 'Verified' : 'Unverified' }}
                                    </span>
                                    </div>
                                </InfoRow>

                                <InfoRow label="Personal Info" icon="fa-user-tag">
                                    <span class="font-bold tracking-tight">
                                        {{ customer?.gender || 'N/A' }} • {{ customer?.blood_group || 'N/A' }} • {{ customer?.religion || 'N/A' }}
                                    </span>
                                </InfoRow>

                                <InfoRow label="Birthday" icon="fa-cake-candles">
                                    <span class="font-bold">{{ formatOnlyDate(customer?.dob) }}</span>
                                </InfoRow>

                                <InfoRow label="National ID" icon="fa-id-card">
                                    <span class="font-bold">{{ customer?.national_id || 'N/A' }}</span>
                                </InfoRow>

                                <div class="mt-2 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                                    <p class="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">Security & Access</p>
                                    <div class="space-y-3">
                                    <div class="flex justify-between text-xs">
                                        <span class="text-slate-500">Last Login:</span>
                                        <span class="font-bold text-slate-700 dark:text-slate-200">{{ formatDateTime(customer?.last_login_at) }}</span>
                                    </div>
                                    <div class="flex justify-between text-xs">
                                        <span class="text-slate-500">Access IP:</span>
                                        <span class="font-mono font-bold text-indigo-600 dark:text-indigo-400">{{ customer?.last_login_ip || '0.0.0.0' }}</span>
                                    </div>
                                    </div>
                                </div>
                                </div>

                            </div>
                            </section>
                        </div>
                    </div>
                        
                </main>
            </div>
        </div>
        
    </div>

    <Teleport to="body">
        <Transition 
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="isStatusModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        
                <div 
                    @click.stop 
                    class="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    
                    <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Change User Role</h3>
                        <button @click="isStatusModalOpen = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                            <i class="fa-solid fa-xmark text-lg"></i>
                        </button>
                    </div>

                    <form @submit.prevent="updateRole">
                        <div class="p-6 space-y-4">
                            
                            <div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                <p class="text-xs text-slate-500 dark:text-slate-400">User Profile</p>
                                <p class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ selectedUser?.name }}</p>
                                <p class="text-xs text-slate-400">{{ selectedUser?.email }}</p>
                            </div>
                        
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Select New Role
                                </label>
                                <select 
                                    v-model="role"
                                    class="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    required>
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                        </div>

                        <div class="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                            <button 
                                type="button"
                                @click="isStatusModalOpen = false" 
                                class="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition">
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                class="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </Teleport>

</template>

<script setup>
import { onMounted, ref, computed, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import api, {makeImg} from '../../../../services/api';

import Navbar from '../super-admin-navbar.vue';
import Header from '../super-admin-header.vue';
import Message from '../../../Message/message.vue';

const sidebarOpen = ref(false);
const active = ref("dashboard");

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');












// open pop-up
const isStatusModalOpen = ref(false);
const role = ref('');
const selectedUser = ref(null);

function openStatusModal(customer) {
    if (!customer) return;

    successMsg.value = '';
    errorMsg.value = '';
    
    selectedUser.value = customer;
    role.value = customer.role || 'customer';
    isStatusModalOpen.value = true;
}

async function updateRole() {
    
    if (loading.value) return;

    try {

        loading.value = true;
        errorMsg.value = '';
        successMsg.value = '';
        
        const payload = {
            user_id: selectedUser.value.id,
            role: role.value
        };
        
        
        const res = await api.put('/super-admin/user/change-role', payload);
        if (res.success || res.data?.success) {
            successMsg.value = res.message || res.data?.message || "User role updated successfully.";

            if (selectedUser.value) {
                selectedUser.value.role = role.value;
            }

            isStatusModalOpen.value = false;
        } else {
            console.error('Error updating role:', error);
            errorMsg.value = res.message || "Failed to update user role.";
        }
        
    } catch (error) {
        console.error(error);

        errorMsg.value =
            error.response?.data?.message ||
            error.message ||
            'Failed to update role';
    } finally {
        loading.value = false;
    }
}










// =============================
// Get customer
// =============================
const customer = ref(null);
async function fetchCustomerDetails(){
    loading.value = true;
    try{
        const userId = route.params.user_id;
        if (!userId) {
            errorMsg.value = "Invalid user !.";
            return;
        }

        const res = await api.get(`/super-admin/user/${userId}`);
        customer.value = res.data.data;
        console.log(customer.value);
    } catch (err) {
        errorMsg.value =
            err.response?.data?.message ||
            err.message ||
            "Something went wrong while fetching customer details.";

        console.log(err);
    } finally {
        loading.value = false;
    }
}


const photoUrl = computed(() => {
    const p = customer.value?.photo;
    if (!p) return "/images/avatar.png";
    return makeImg(p);
});



/** small inline components */
const InfoRow = (props, { slots }) => h(
    "div",
    { class: "flex items-center justify-between p-1 group" },
    [
        h("div", { class: "flex items-center gap-3 text-slate-500 dark:text-slate-400" }, [
            props.icon ? h("i", { class: `fa-solid ${props.icon} w-4 text-[12px] opacity-70` }) : null,
            h("span", { class: "text-xs font-medium uppercase tracking-tight" }, props.label)
        ]),
        h("div", { class: "text-sm text-slate-900 dark:text-slate-100" }, slots.default?.() || props.value)
    ]
);

function formatOnlyDate(d) {
    if (!d) return "N/A";
    return new Date(d).toLocaleDateString("en-BD", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function formatDateTime(date) {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-BD", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}


























const isDark = ref(false);

function applyTheme(dark) {
    isDark.value = dark;
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

    fetchCustomerDetails();
    
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

<style>

</style>