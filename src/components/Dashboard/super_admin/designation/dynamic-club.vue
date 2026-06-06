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
                <main class="flex-1 min-h-screen min-w-0 bg-gray-50 dark:bg-[#0C1326] px-4 sm:px-6 lg:px-8 py-6">

                    <div class="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
                            
                            <div class="relative flex-1">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <i class="fa-solid fa-magnifying-glass h-4 w-4"></i>
                                </div>
                                <input 
                                    type="text" 
                                    v-model="searchQuery" 
                                    placeholder="Search by ID, Customer name or Transaction..." 
                                    class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-500"
                                />
                            </div>

                            <div class="flex flex-wrap items-center gap-3">
                                <button 
                                    @click="resetFilters" 
                                    class="p-2.5 text-slate-400 hover:text-rose-500 transition-colors"
                                    title="Reset Filters">
                                    <i class="fa-solid fa-rotate h-5 w-5"></i>
                                </button>
                            </div>
                        </div>
                    </div>


                    
                    <!-- MAIN CONTAINER CARD -->
                    <div class="bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden">
                        
                        <!-- TABLE AREA WRAPPER -->
                        <div class="overflow-x-auto max-h-[850px] custom-scrollbar">
                            <table class="w-full text-left border-collapse whitespace-nowrap">
                                <thead>
                                    <tr class="border-b border-slate-200/60 bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800/60 dark:bg-slate-900/40 dark:text-slate-500">
                                        <th class="px-6 py-4">Star Member Info</th>
                                        <th class="px-6 py-4">Total Refer</th>
                                        <th class="px-6 py-4">User ID</th>
                                        <th class="px-6 py-4">Current Rank</th>
                                        <th class="px-6 py-4">Status</th>
                                        <th class="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    
                                    <!-- EMPTY STATE -->
                                    <tr v-if="filteredStarUsers.length === 0">
                                        <td colspan="7" class="px-6 py-20 text-center">
                                            <div class="flex flex-col items-center justify-center max-w-sm mx-auto">
                                                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 dark:bg-slate-800/30 dark:border-slate-800/50 dark:text-slate-500 mb-4">
                                                    <i class="fa-solid fa-id-card-clip text-2xl"></i>
                                                </div>
                                                <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    No Star Club User Found
                                                </h3>
                                                <p class="text-xs text-slate-400 dark:text-slate-500 mt-1.5 leading-relaxed">
                                                    We couldn't find any certified nodes matching your lookup query. Try tweaking filters or clear parameters.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>

                                    <!-- DATA ROW PATTERN -->
                                    <tr v-for="item in filteredStarUsers" :key="item.id" @click="viewPaymentDetails(item)"
                                        class="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all duration-200">
                                        
                                        <!-- Member Info Column -->
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-3">
                                                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-mono font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 text-xs uppercase tracking-tight">
                                                    {{ item.name ? item.name.substring(0, 2) : 'U' }}
                                                </div>
                                                <div class="flex flex-col min-w-0">
                                                    <span class="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400 transition truncate max-w-[180px]">
                                                        {{ item.name }}
                                                    </span>
                                                    <span class="text-xs text-slate-400 dark:text-slate-500 font-mono tracking-tight truncate max-w-[180px]">
                                                        {{ item.email }}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="px-6 py-4 text-center">
                                            <span class="inline-flex min-w-[54px] items-center justify-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-100/60 px-2.5 py-1 font-mono text-xs font-extrabold text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400 shadow-sm">
                                                <i class="fa-solid fa-users text-[10px] opacity-70"></i>
                                                {{ item.star_referrals_count ?? 0 }}
                                            </span>
                                        </td>

                                        <!-- System ID Column -->
                                        <td class="px-6 py-4">
                                            <span class="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-mono font-bold text-slate-600 border border-slate-200/10 dark:bg-slate-800/60 dark:text-slate-300 dark:border-transparent">
                                                <i class="fa-solid fa-fingerprint text-[10px] text-slate-400 dark:text-slate-500"></i>
                                                #{{ item.user_id }}
                                            </span>
                                        </td>

                                        <!-- Rank Badge -->
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-1.5">
                                                <i class="fa-solid fa-award text-amber-500 text-xs"></i>
                                                <span class="text-xs font-bold text-amber-600 dark:text-amber-400/90 uppercase tracking-wide">
                                                    {{ item.rank || 'Star Master' }}
                                                </span>
                                            </div>
                                        </td>

                                        <!-- Status Badge -->
                                        <td class="px-6 py-4">
                                            <span :class="[
                                                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border',
                                                // Truthy check handles both 1 (Integer), '1' (String), and true (Boolean) seamlessly
                                                item.is_active == 1 || item.is_active === true
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-transparent'
                                                    : 'bg-rose-50 text-rose-700 border-rose-200/30 dark:bg-rose-500/10 dark:text-rose-400 dark:border-transparent'
                                            ]">
                                                <!-- Dot Indicator -->
                                                <span class="h-1 w-1 rounded-full bg-current"></span>
                                                
                                                <!-- Dynamic Text Layer -->
                                                {{ (item.is_active == 1 || item.is_active === true) ? 'Active' : 'Inactive' }}
                                            </span>
                                        </td>

                                        <!-- Action Column -->
                                        <td class="px-6 py-4 text-right">
                                            <button class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors duration-200">
                                                <svg class="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </button>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                </main>
            </div>
        </div>
        <FooterSection />
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import api from '../../../../services/api.js';

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








const searchQuery = ref('');
const users = ref([]);
async function fetcheStarClubUsers()
{
    try {
        loading.value = true;
        errorMsg.value = null;

        const res = await api.get('/super-admin/dynamic-club/users');
        if (res.data?.success) {
            users.value = res.data.data ?? [];
            // console.log(users.value);
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
// Filter orders
// =============================

const filteredStarUsers = computed(() => {

    const list = Array.isArray(users.value) ? users.value : [];
    const search = searchQuery.value.toLowerCase().trim();

    return list.filter(item => {

        const matchesSearch = !search || (
            item.name?.toLowerCase().includes(search) ||
            item.email?.toLowerCase().includes(search) ||
            item.phone?.toLowerCase().includes(search) ||
            item.user_id?.toLowerCase().includes(search) ||
            item.rank?.toLowerCase().includes(search)
        );

        return matchesSearch;
    });
});







const resetFilters = () => {
    fetcheStarClubUsers();
};
























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


/* ESC to close drawer */
onMounted(() => {
    
    fetcheStarClubUsers();






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