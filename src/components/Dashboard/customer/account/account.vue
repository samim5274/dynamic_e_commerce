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
                <main class="min-h-screen bg-slate-50 dark:bg-[#080E1E] transition-colors duration-300 p-8">
                
                    <div class="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
    
                            <div class="relative flex-1">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <i class="fa-solid fa-magnifying-glass h-4 w-4"></i>
                                </div>
                                <input 
                                    type="text" 
                                    v-model="searchQuery" 
                                    placeholder="Search by User ID, Source, Reference or Note..." 
                                    class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-500"
                                />
                            </div>

                            <div class="flex flex-wrap items-center gap-3">
                                <div class="flex items-center gap-2">
                                    <i class="fa-solid fa-filter h-4 w-4 text-slate-400"></i>
                                    <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Type:</span>
                                </div>
                                <select 
                                    v-model="typeFilter" 
                                    class="min-w-[160px] rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-indigo-500">
                                    <option value="">All Types</option>
                                    <option value="earn">Earn</option>
                                    <option value="spend">Spend</option>
                                    <option value="bonus">Sponsor Bonus</option>
                                    <option value="matching">Matching</option>
                                    <option value="withdraw">Withdraw</option>
                                    <option value="refund">Refund</option>

                                    <option value="rank_bonus">Rank Bonus</option>
                                    <option value="bank_transfer">Bank Transfer</option>
                                    <option value="gift">Gift</option>
                                    <option value="add_money">Add Money</option>

                                    <option value="star_club">Star Club</option>
                                    <option value="dynamic_club">Dynamic Club</option>
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

                    <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h2 class="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                                User Statement
                            </h2>
                            <span v-if="loading" class="text-xs font-bold text-indigo-500 animate-pulse">Loading...</span>
                            <span v-else class="text-xs font-bold text-indigo-500">Total: {{ statements.length }} Records</span>
                        </div>

                        <div v-if="loading" class="w-full flex flex-col items-center justify-center py-20">
                            <div class="animate-spin h-10 w-10 border-4 border-[#A3D921] border-t-transparent rounded-full"></div>
                            <p class="mt-4 text-sm text-gray-500">Updating Tree...</p>
                        </div>

                        <div class="overflow-x-auto max-h-[850px]">
                            <table class="min-w-full text-sm">
                                <thead class="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-widest">
                                    <tr>
                                        <th class="px-4 py-3 text-left">User ID</th>
                                        <th class="px-4 py-3 text-left">Type</th>
                                        <th class="px-4 py-3 text-left">Points</th>
                                        <th class="px-4 py-3 text-left">Bonus</th>
                                        <th class="px-4 py-3 text-left">Status</th>
                                        <th class="px-4 py-3 text-left">Source</th>
                                        <th class="px-4 py-3 text-left">Ref</th>
                                        <th class="px-4 py-3 text-left">Note</th>
                                    </tr>
                                </thead>

                                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                    
                                    <tr v-for="(item, index) in filteredTransactions" :key="index"
                                        class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                        
                                        <td class="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">
                                            {{ item.user.name }}
                                        </td>

                                        <td class="px-4 py-3">
                                            <!-- <span class="px-2 py-1 text-[10px] rounded-full font-black uppercase tracking-tighter"
                                                :class="{
                                                    'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10': item.type === 'bonus',
                                                    
                                                    'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10': item.type === 'matching',
                                                    
                                                    'bg-blue-100 text-blue-600 dark:bg-blue-500/10': item.type === 'earn',
                                                    
                                                    'bg-red-100 text-red-600 dark:bg-red-500/10': item.type === 'withdraw'
                                                }">
                                                {{ item.type }}
                                            </span> -->
                                            <span 
                                                class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full"
                                                :class="(typeConfig[item.type] || typeConfig.default).container">
                                                <span 
                                                    class="h-1.5 w-1.5 rounded-full" 
                                                    :class="(typeConfig[item.type] || typeConfig.default).dot"></span>
                                                <span class="capitalize">{{ item.type }}</span>
                                            </span>
                                        </td>

                                        <td class="px-4 py-3 font-bold" :class="item.points > 0 ? 'text-indigo-600' : 'text-slate-400'">
                                            {{ item.points }}
                                        </td>

                                        <td class="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                                            {{ item.bonus_amount > 0 ? '৳' + item.bonus_amount : '—' }}
                                        </td>

                                        <td class="px-4 py-3">
                                            <!-- <span class="text-[10px] font-black uppercase tracking-widest"
                                                :class="{
                                                    'text-emerald-500': item.bonus_status === 'credit' || item.bonus_status === 'deposit',
                                                    'text-red-500': item.bonus_status === 'debit' || item.bonus_status === 'withdraw'
                                                }">
                                                {{ item.bonus_status || 'N/A' }}
                                            </span> -->
                                            <div class="flex items-center gap-1.5">
                                                <span class="w-1.5 h-1.5 rounded-full" 
                                                    :class="item.bonus_status === 'credit' ? 'bg-emerald-500' : 'bg-red-500'">
                                                </span>
                                                
                                                <span class="text-[10px] font-black uppercase tracking-widest"
                                                    :class="item.bonus_status === 'credit' ? 'text-emerald-500' : 'text-red-500'">
                                                    {{ item.bonus_status }}
                                                </span>
                                            </div>
                                        </td>

                                        <td class="px-4 py-3 text-slate-500 capitalize">
                                            {{ item.source }}
                                        </td>

                                        <td class="px-4 py-3 text-slate-400 text-xs">
                                            <!-- {{ item.reference_id ? '#REF-' + item.reference_id : '—' }} -->
                                            {{ item.reference_user?.name ?? '—' }}
                                        </td>

                                        <td class="px-4 py-3 text-slate-500 text-xs italic">
                                            {{ item.note }}
                                        </td>
                                    </tr>

                                    <tr v-if="!loading && statements.length === 0">
                                        <td colspan="8" class="px-4 py-10 text-center text-slate-400 italic">
                                            No transactions found in your history.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>
        </div>
        
    </div>


    <FooterSection />
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import api, {makeImg} from '../../../../services/api';

import Navbar from "../navbar.vue";
import Header from "../header.vue";
import Message from '../../../Message/message.vue'
import FooterSection from "../../../e-commerce/footer.vue";

const sidebarOpen = ref(false);
const active = ref("dashboard");

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');































const statements = ref([]);
const searchQuery = ref('');
const typeFilter = ref('');

const fetchStatements = async () => {
    try {
        loading.value = true;
        errorMsg.value = null;

        const response = await api.get('/account'); 

        if (response.data.status === 'success') {
            statements.value = response.data.data;
        } else {
            errorMsg.value = response.data.message || "Failed to fetch data";
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        errorMsg.value = err.response?.data?.message || "Something went wrong while connecting to the server.";
    } finally {
        loading.value = false;
    }
};



// =============================
// Filter orders
// =============================
const filteredTransactions = computed(() => {
    if (!statements.value) return [];

    return statements.value.filter(transaction => {

        let matchesType = true;
        if (typeFilter.value) {
            if (typeFilter.value === 'star_club') {
                matchesType = transaction.source?.toLowerCase() === 'star_club';
            } else if (typeFilter.value === 'dynamic_club') {
                matchesType = transaction.source?.toLowerCase() === 'dynamic_club';
            } else if (typeFilter.value === 'rank_bonus') {
                matchesType = transaction.source?.toLowerCase() === 'rank_bonus';
            } else if (typeFilter.value === 'bank_transfer') {
                matchesType = transaction.source?.toLowerCase() === 'bank_transfer';
            } else if (typeFilter.value === 'gift') {
                matchesType = transaction.source?.toLowerCase() === 'gift';
            } else if (typeFilter.value === 'add_money') {
                matchesType = transaction.source?.toLowerCase() === 'add_money';
            } else if (typeFilter.value === 'bonus') {
                matchesType = transaction.source?.toLowerCase() === 'sponsor_bonus' || 
                              transaction.type?.toLowerCase() === 'bonus';
            } else {
                matchesType = transaction.type?.toLowerCase() === typeFilter.value.toLowerCase();
            }
        }

        const search = searchQuery.value.toLowerCase().trim();
        if (!search) return matchesType;

        const matchesSearch = 
            (String(transaction.user_id || '').includes(search)) ||
            (String(transaction.points || '').includes(search)) ||
            (transaction.source?.toLowerCase().includes(search)) ||
            (transaction.reference_id?.toLowerCase().includes(search)) ||
            (transaction.note?.toLowerCase().includes(search)) ||
            (transaction.bonus_status?.toLowerCase().includes(search));

        return matchesType && matchesSearch;
    });
});

const typeConfig = {
    earn: { container: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400', dot: 'bg-emerald-500' },
    spend: { container: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400', dot: 'bg-rose-500' },
    bonus: { container: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400', dot: 'bg-amber-500' },
    matching: { container: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400', dot: 'bg-indigo-500' },
    withdraw: { container: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400', dot: 'bg-blue-500' },
    refund: { container: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400', dot: 'bg-purple-500' },
    default: { container: 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400', dot: 'bg-slate-500' }
};

const resetFilters = () => {
    searchQuery.value = '';
    typeFilter.value = '';
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

function onSearch(q) {
    console.log("search:", q);
}



/* ESC to close drawer */
onMounted(() => {

    fetchStatements();
    
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