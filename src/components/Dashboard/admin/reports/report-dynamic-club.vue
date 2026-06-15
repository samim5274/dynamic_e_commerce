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

                    <!-- ==================== TRANSACTION SUMMARY CARDS START ==================== -->
                    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-6">
                        
                        <!-- Total Credit Card -->
                        <div class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        {{ (searchQuery || typeFilter) ? 'Filtered Credit' : 'Total Credit (In)' }}
                                    </p>
                                    <h4 class="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                        ৳ {{ displayCredit.toLocaleString() }}
                                    </h4>
                                </div>
                                <div class="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <i class="bi bi-arrow-down-left-circle text-xl"></i>
                                </div>
                            </div>
                            <div class="absolute bottom-0 left-0 h-1 w-full bg-emerald-500"></div>
                        </div>

                        <!-- Total Debit Card -->
                        <div class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        {{ (searchQuery || typeFilter) ? 'Filtered Debit' : 'Total Debit (Out)' }}
                                    </p>
                                    <h4 class="mt-2 text-2xl font-black text-rose-600 dark:text-rose-400">
                                        ৳ {{ displayDebit.toLocaleString() }}
                                    </h4>
                                </div>
                                <div class="rounded-xl bg-rose-50 p-3 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                                    <i class="bi bi-arrow-up-right-circle text-xl"></i>
                                </div>
                            </div>
                            <div class="absolute bottom-0 left-0 h-1 w-full bg-rose-500"></div>
                        </div>
                    </div>
                    <!-- ==================== TRANSACTION SUMMARY CARDS END ==================== -->
                
                    <div class="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center mb-4">
                                
                            <!-- Start Date (5 Columns) -->
                            <div class="relative md:col-span-5">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                                    <i class="fa-solid fa-calendar-days h-4 w-4"></i>
                                </div>
                                <input
                                    type="date"
                                    v-model="startDate"
                                    :max="today"
                                    class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-800"
                                />
                            </div>

                            <!-- End Date (5 Columns) -->
                            <div class="relative md:col-span-5">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                                    <i class="fa-solid fa-calendar-days h-4 w-4"></i>
                                </div>
                                <input
                                    type="date"
                                    v-model="endDate"
                                    :max="today"
                                    class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-800"
                                />
                            </div>

                            <!-- Submit Button (2 Columns) -->
                            <div class="md:col-span-2">
                                <button
                                    type="submit"
                                    @click="fetchStatements(1)"
                                    class="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-600 bg-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:border-indigo-700 focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.98]"
                                >
                                    <i class="fa-solid fa-magnifying-glass text-xs"></i>
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>
                        
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
                            <span v-else class="text-xs font-bold text-indigo-500">Total: {{ pagination.total }} Records</span>
                        </div>

                        <div v-if="loading" class="w-full flex flex-col items-center justify-center py-20">
                            <div class="animate-spin h-10 w-10 border-4 border-[#A3D921] border-t-transparent rounded-full"></div>
                            <p class="mt-4 text-sm text-gray-500">Updating Tree...</p>
                        </div>

                        <div class="overflow-x-auto max-h-[850px]">
                            <table class="min-w-full text-sm">
                                <thead class="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-widest">
                                    <tr>
                                        <th class="px-4 py-3 text-left">User Name</th>
                                        <th class="px-4 py-3 text-left">Type</th>
                                        <th class="px-4 py-3 text-left">Bonus</th>
                                        <th class="px-4 py-3 text-left">Status</th>
                                        <th class="px-4 py-3 text-left">Source</th>
                                        <th class="px-4 py-3 text-left">Month</th>
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
                                            <span 
                                                class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full"
                                                :class="(typeConfig[item.type] || typeConfig.default).container">
                                                <span 
                                                    class="h-1.5 w-1.5 rounded-full" 
                                                    :class="(typeConfig[item.type] || typeConfig.default).dot"></span>
                                                <span class="capitalize">{{ item.type }}</span>
                                            </span>
                                        </td>

                                        <td class="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                                            {{ item.bonus_amount > 0 ? '৳' + item.bonus_amount : '—' }}
                                        </td>

                                        <td class="px-4 py-3">
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

                                        <td class="px-4 py-3 text-slate-500 text-xs italic">
                                            {{ formatDate(item.created_at) }}
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

                        <!-- Pagination -->
                        <div class="flex flex-col gap-2 border-slate-200 bg-white dark:bg-slate-900 shadow-sm px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <!-- Showing info -->
                            <p class="text-xs text-slate-500">
                                Showing
                                <span class="font-semibold text-slate-700">{{ pagination.from }}</span>
                                –
                                <span class="font-semibold text-slate-700">{{ pagination.to }}</span>
                                of
                                <span class="font-semibold text-slate-700">{{ pagination.total }}</span>
                            </p>

                            <div class="flex flex-wrap items-center justify-end gap-2">
                                <!-- First -->
                                <button
                                    @click="fetchStatements(1)" :disabled="pagination.page === 1 || loading"
                                    class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                    <i class="fa-solid fa-angles-left"></i>
                                </button>

                                <!-- Prev -->
                                <button
                                    @click="fetchStatements(pagination.page - 1)" :disabled="pagination.page === 1 || loading"
                                    class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </button>

                                <!-- Pages -->
                                <button
                                    v-for="page in StatementVisiblePages"
                                    :key="String(page)"
                                    @click="page !== '...' && fetchStatements(page)"
                                    class="rounded-lg border px-3 py-1.5 text-xs font-semibold"
                                    :disabled="page === '...' || loading"
                                    :class="[
                                        page === pagination.page
                                            ? 'border-slate-900 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                                            : 'border-slate-200 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 hover:bg-slate-50'
                                    ]">
                                    {{ page }}
                                </button>

                                <!-- Next -->
                                <button
                                    @click="fetchStatements(pagination.page + 1)"
                                    :disabled="pagination.page === pagination.lastPage || loading"
                                    class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>

                                <!-- Last -->
                                <button
                                    @click="fetchStatements(pagination.lastPage)"
                                    :disabled="pagination.page === pagination.lastPage || loading"
                                    class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                    <i class="fa-solid fa-angles-right"></i>
                                </button>
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
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import api from '../../../../services/api';

import Navbar from '../admin-navbar.vue';
import Header from '../admin-header.vue';
import Message from '../../../Message/message.vue';
import FooterSection from "../../../e-commerce/footer.vue";

const sidebarOpen = ref(false);
const active = ref("dashboard");

const router = useRouter();

const successMsg = ref('');
const errorMsg = ref('');
const search = ref('');
const loading = ref(false);

const today = new Date().toISOString().split('T')[0];
const startDate = ref(today);
const endDate = ref(today);

const statementPage = ref(1);
const statementLastPage = ref(1);
const statementTotal = ref(0);
const statementPerPage = ref(50);
const statementFromItem = ref(0);
const statementToItem = ref(0);

const StatementVisiblePages = computed(() => {
    const pages = [];
    const last = pagination.value.lastPage;
    const cur = pagination.value.page;

    if (last <= 5) {
        for (let i = 1; i <= last; i++) pages.push(i);
        return pages;
    }

    pages.push(1);

    if (cur > 3) pages.push("...");

    const start = Math.max(2, cur - 1);
    const end = Math.min(last - 1, cur + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (cur < last - 2) pages.push("...");

    pages.push(last);

    return pages;
});



const statements = ref([]);
const searchQuery = ref('');
const typeFilter = ref('');
const backendCredit = ref(0);
const backendDebit = ref(0);
const backendNetTotal = ref(0);

const pagination = ref({
    page: 1,
    lastPage: 1,
    total: 0,
    perPage: 50,
    from: 0,
    to: 0,
});

async function fetchStatements(page = 1) {
    try {
        loading.value = true;
        errorMsg.value = null;

        const response = await api.get('/account/admin/dynamic/club', {
            params: {
                page,
                start_date: startDate.value,
                end_date: endDate.value,
            }
        });

        if (response.data.status === 'success') {
            statements.value = Array.isArray(response.data.data) ? response.data.data : [];

            backendCredit.value   = response.data.total_credit ?? 0;
            backendDebit.value    = response.data.total_debit ?? 0;
            backendNetTotal.value = response.data.net_total ?? 0;

            pagination.value = {
                page:     response.data.current_page ?? 1,
                lastPage: response.data.last_page    ?? 1,
                total:    response.data.total        ?? 0,
                perPage:  response.data.per_page     ?? 50,
                from:     response.data.from         ?? 0,
                to:       response.data.to           ?? 0,
            };
        } else {
            errorMsg.value = response.data.message || "Failed to fetch data";
        }

    } catch (err) {
        console.error("Fetch Error:", err);
        errorMsg.value = err.response?.data?.message || "Something went wrong while connecting to the server.";

        statements.value = [];
    } finally {
        loading.value = false;
    }
}



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


// =============================
// Statement Financial Calculations
// =============================
const displayCredit = computed(() => {
    if (searchQuery.value || typeFilter.value) {
        return filteredTransactions.value.reduce((sum, item) => {
            return item.bonus_status?.toLowerCase() === 'credit' ? sum + (parseFloat(item.bonus_amount) || 0) : sum;
        }, 0);
    }
    return backendCredit.value;
});

const displayDebit = computed(() => {
    if (searchQuery.value || typeFilter.value) {
        return filteredTransactions.value.reduce((sum, item) => {
            return item.bonus_status?.toLowerCase() === 'debit' ? sum + (parseFloat(item.bonus_amount) || 0) : sum;
        }, 0);
    }
    return backendDebit.value;
});


const formatDate = (date) => {
    if (!date) return '-';

    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC' // <-- Keeps the month locked to UTC
    });
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

const onSearch = () => {
    console.log(search.value)
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