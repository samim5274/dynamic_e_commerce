<template>
    <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
        <Header
            @open-sidebar="sidebarOpen = true"
            @search="onSearch"
            :isDark="isDark" 
            @toggle-theme="toggleTheme"
        />

        <div class="flex min-h-[calc(100vh-56px)]">
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
                <main class="flex-1 min-h-screen min-w-0 bg-gray-50 dark:bg-[#0C1326] px-4 sm:px-6 lg:px-8 py-6">

                    <!-- Filter Section -->
                    <div class="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
                            
                            <div class="relative flex-1">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <i class="fa-solid fa-magnifying-glass h-4 w-4"></i>
                                </div>
                                <input 
                                    type="text" 
                                    v-model="searchQuery" 
                                    placeholder="Search by ID, Name, Email or Phone..." 
                                    class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-500"
                                />
                            </div>

                            <div class="flex flex-wrap items-center gap-3">
                                <div class="flex items-center gap-2">
                                    <i class="fa-solid fa-filter h-4 w-4 text-slate-400"></i>
                                    <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Status:</span>
                                </div>
                                
                                <select 
                                    v-model="statusFilter" 
                                    class="min-w-[160px] rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-indigo-500">
                                    <option value="">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                                <button 
                                    @click="resetFilters" 
                                    class="p-2.5 text-slate-400 hover:text-rose-500 transition-colors"
                                    title="Reset Filters">
                                    <i class="fa-solid fa-rotate h-5 w-5"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Loading State -->
                    <div v-if="loading" class="flex justify-center items-center py-12">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                    
                    <!-- Users Table Card -->
                    <div v-else class="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h2 class="text-lg font-bold text-slate-800 dark:text-white">User Management</h2>
                            <span class="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-full">
                                Total: {{ filteredUsers.length }}
                            </span>
                        </div>

                        <div class="overflow-x-auto max-h-[850px]">
                            <table class="w-full text-left border-collapse whitespace-nowrap">
                                <thead>
                                    <tr class="bg-slate-50 dark:bg-slate-800/50">
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">User Info</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Designation & Rank</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Balance</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Carry Points (L/R)</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Total Points (L/R)</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                    <!-- Empty/No Data State -->
                                    <tr v-if="filteredUsers.length === 0">
                                        <td colspan="7" class="px-6 py-12 text-center">
                                            <div class="flex flex-col items-center justify-center py-6">
                                                <div class="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-full mb-4 text-slate-400 dark:text-slate-500">
                                                    <i class="fa-solid fa-users text-3xl"></i>
                                                </div>
                                                <h3 class="text-base font-semibold text-slate-700 dark:text-slate-300">
                                                    No Users Found
                                                </h3>
                                                <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
                                                    We couldn't find any records matching your search or filters.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr
                                        v-for="user in filteredUsers"
                                        :key="user.id"
                                        @click="openStatusModal(user)"
                                        class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition text-sm text-slate-700 dark:text-slate-300">
                                        <!-- User Info -->
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-3">
                                                <img v-if="user.photo" :src="user.photo" class="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800" alt="avatar" />
                                                <div v-else class="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                                    <i class="fa-solid fa-user"></i>
                                                </div>
                                                <div>
                                                    <div class="font-bold text-slate-900 dark:text-white">{{ user.name }}</div>
                                                    <div class="text-xs text-slate-500">ID: {{ user.user_id }} | {{ user.phone }}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <!-- Designation & Rank -->
                                        <td class="px-6 py-4">
                                            <div class="capitalize font-medium">{{ user.designation || 'General' }}</div>
                                            <div class="text-xs text-indigo-500 font-semibold">{{ user.rank || 'No Rank' }}</div>
                                        </td>

                                        <td class="px-6 py-4">
                                            <div class="capitalize font-medium">৳ {{ Number(user.wallet_balance ?? 0).toFixed(2) }}</div>
                                        </td>

                                        <!-- Carry Points -->
                                        <td class="px-6 py-4 text-xs font-semibold">
                                            <span class="text-emerald-600 dark:text-emerald-400">L: {{ user.left_carry_point || 0 }}</span>
                                            <span class="mx-1.5 text-slate-300">|</span>
                                            <span class="text-blue-600 dark:text-blue-400">R: {{ user.right_carry_point || 0 }}</span>
                                        </td>

                                        <!-- Total Points -->
                                        <td class="px-6 py-4 text-xs font-semibold">
                                            <span class="text-emerald-600 dark:text-emerald-400">L: {{ user.left_total_point || 0 }}</span>
                                            <span class="mx-1.5 text-slate-300">|</span>
                                            <span class="text-blue-600 dark:text-blue-400">R: {{ user.right_total_point || 0 }}</span>
                                        </td>

                                        <!-- Status Badge -->
                                        <td class="px-6 py-4">
                                            <span 
                                                class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                                                :class="user.is_active == 1 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'"
                                            >
                                                <span class="h-1.5 w-1.5 rounded-full" :class="user.is_active == 1 ? 'bg-emerald-500' : 'bg-rose-500'"></span>
                                                {{ user.is_active == 1 ? 'Active' : 'Inactive' }}
                                            </span>
                                        </td>

                                        <!-- Action Buttons -->
                                        <td class="px-6 py-4 text-center">
                                            <div class="flex items-center justify-center gap-2">
                                                <!-- <button 
                                                    @click="viewUser(user.id)" 
                                                    class="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition" 
                                                    title="View Details">
                                                    <i class="fa-solid fa-eye"></i>
                                                </button> -->
                                                <button 
                                                    @click.stop="editUser(user.user_id)" 
                                                    class="p-2 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition" 
                                                    title="Edit User">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button 
                                                    @click.stop="openStatusModal(user)"
                                                    class="p-2 text-slate-400 hover:text-green-600 dark:hover:text-indigo-400 transition" 
                                                    title="Add Money">
                                                    <i class="fa-solid fa-money-bill-1-wave"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                                        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Payment on "{{ selectedUser ? selectedUser.name : '' }}"</h3>
                                        <button @click="isStatusModalOpen = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                            <i class="fa-solid fa-x h-6 w-6"></i>
                                        </button>
                                    </div>

                                    <div class="p-6 space-y-4">
                                        
                                        <!-- User Info -->
                                        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                                            <p class="text-xs text-slate-500 mb-1">User Name</p>
                                            <p class="font-semibold text-slate-900 dark:text-white">
                                               {{ selectedUser ? selectedUser.name : '' }}
                                            </p>
                                            <p class="font-semibold text-slate-900 dark:text-white">
                                                {{ selectedUser ? selectedUser.email : '' }}
                                            </p>

                                            <p class="text-xs text-slate-500 mt-3 mb-1">User ID</p>
                                            <p class="font-medium text-slate-700 dark:text-slate-300">
                                                {{ selectedUser?.user_id }}
                                            </p>
                                        </div>

                                        <!-- Amount Input -->
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                Amount
                                            </label>

                                            <input
                                                v-model="amount"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                required
                                                placeholder="Enter amount"
                                                class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            >
                                        </div>

                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                Source
                                            </label>

                                            <select name="source" id="source" v-model="source" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                                                <option value="" disabled selected>-- Select Source --</option>
                                                <option value="bank_transfer">Bank Transfer</option>
                                                <option value="rank_bonus">Rank Bonus</option>
                                                <option value="gift">Gift</option>
                                                <option value="add_money">Add Money</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                Note
                                            </label>

                                            <input
                                                v-model="note"
                                                type="text"
                                                placeholder="Write something on note"
                                                class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            >
                                        </div>

                                    </div>

                                    <div class="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                                        <button
                                            @click="isStatusModalOpen = false"
                                            class="text-sm font-semibold text-slate-600 dark:text-slate-400">
                                            Cancel
                                        </button>

                                        <button
                                            @click="submitAmount" :disabled="loading"
                                            class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">
                                            <span v-if="loading">Saving...</span>
                                            <span v-else>Save</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </Teleport>

                </main>
            </div>
        </div>
        <FooterSection />
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import api from '../../../../services/api';

import Navbar from "../super-admin-navbar.vue";
import Header from "../super-admin-header.vue";
import Message from '../../../Message/message.vue';
import FooterSection from "../../../e-commerce/footer.vue";

const sidebarOpen = ref(false);
const active = ref("dashboard");

const router = useRouter();

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');








// open pop-up
const isStatusModalOpen = ref(false);
const selectedUser = ref(null);
const amount = ref('');
const source = ref('');
const note = ref('');


function openStatusModal(item) {
    selectedUser.value = item;
    amount.value = '';
    source.value = '';
    note.value = '';
    isStatusModalOpen.value = true;
}


async function submitAmount() {

    if (!selectedUser.value?.id) {
        errorMsg.value = 'User not selected';
        return;
    }

    if (!amount.value || Number(amount.value) <= 0) {
        errorMsg.value = 'Please enter a valid amount'
        return
    }

    loading.value = true;
    errorMsg.value = null;
    successMsg.value = null;

    try{
        const response = await api.post(`/super-admin/add-money/${selectedUser.value.id}`,
            { amount: Number(amount.value), source: String(source.value), note: String(note.value)}
        )

        if (response.data?.success) {
            successMsg.value = response.data.message || 'Amount added successfully'

            // refresh list
            await fetchUsers();

            // reset modal state
            resetModal()

        } else {
            errorMsg.value = response.data?.message || 'Failed to add amount'
        }

    } catch(err) {
        console.error('Submit Amount Error:', err);

        errorMsg.value =
            err?.response?.data?.message ||
            'Something went wrong while connecting to the server.';
    } finally {
        loading.value = false;
    }

}

// reset helper
function resetModal() {
    isStatusModalOpen.value = false;
    selectedUser.value = null;
    amount.value = '';
    note.value = '';

    fetchUsers();
}






















const searchQuery = ref('');
const statusFilter = ref('');
const users = ref([]);

async function fetchUsers() {
    try {
        loading.value = true;
        errorMsg.value = null;

        const res = await api.get('/super-admin');
        if (res.data?.success) {
            users.value = res.data.data ?? [];
        } else {
            errorMsg.value = res.data?.message || 'Failed to fetch users';
        }
    } catch (err) {
        console.error('Fetch Users Error:', err);
        errorMsg.value = err?.response?.data?.message || 'Something went wrong while connecting to the server.';
    } finally {
        loading.value = false;
    }
}

// =============================
// Filter users (FIXED & OPTIMIZED)
// =============================
const filteredUsers = computed(() => {
    let data = users.value || [];

    // SEARCH FILTER (ID, Name, Email, Phone)
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase().trim();
        data = data.filter(user =>
            (user.name && user.name.toLowerCase().includes(query)) ||
            (user.email && user.email.toLowerCase().includes(query)) ||
            (user.user_id && String(user.user_id).toLowerCase().includes(query)) ||
            (user.phone && String(user.phone).includes(query))
        );
    }

    // STATUS FILTER (Active / Inactive)
    if (statusFilter.value !== '') {
        if (statusFilter.value === 'active') {
            data = data.filter(user => user.is_active == 1); // database এ integer বা string ২ টাতেই হ্যান্ডেল করবে
        }
        if (statusFilter.value === 'inactive') {
            data = data.filter(user => user.is_active == 0);
        }
    }

    return data;
});

const resetFilters = () => {
    searchQuery.value = '';
    statusFilter.value = '';
};










// Action methods (Optional but placeholder added for functionality)
const viewUser = (id) => {
    // router.push(`/super-admin/users/${id}`);
    console.log('View user:', id);
};






const editUser = (user_id) => {
    router.push(`/super-admin/customer/${user_id}/edit`);
    // console.log('Edit user:', id);
};













// Theme Toggle Engine
const isDark = ref(false);

function applyTheme(dark) {
    isDark.value = dark;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
}

function toggleTheme() {
    applyTheme(!isDark.value);
}

const onSearch = (value) => {
    searchQuery.value = value;
};











/* ESC to close drawer & On Mounted Hook */
onMounted(() => {
    fetchUsers();

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