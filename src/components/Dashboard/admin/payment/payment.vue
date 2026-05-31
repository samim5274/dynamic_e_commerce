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
                                <div class="flex items-center gap-2">
                                    <i class="fa-solid fa-filter h-4 w-4 text-slate-400"></i>
                                    <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Status:</span>
                                </div>
                                <select 
                                    v-model="statusFilter" 
                                    class="min-w-[160px] rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-indigo-500"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="paid">Paid</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>

                                <button 
                                    @click="resetFilters" 
                                    class="p-2.5 text-slate-400 hover:text-rose-500 transition-colors"
                                    title="Reset Filters"
                                >
                                    <i class="fa-solid fa-rotate h-5 w-5"></i>
                                </button>
                            </div>
                        </div>
                    </div>


                    
                    <div class="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h2 class="text-lg font-bold text-slate-800 dark:text-white">Withdrawal History</h2>
                            <button class="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition">View All</button>
                        </div>

                        <div class="overflow-x-auto max-h-[850px]">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="bg-slate-50 dark:bg-slate-800/50">
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Requested Date</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Method & Details</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Amount</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Charge</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Net Amount</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                                        <th class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                    <tr v-if="filteredTransactions.length === 0">
                                        <td colspan="7" class="px-6 py-12 text-center">
                                            <div class="flex flex-col items-center justify-center py-6">
                                                
                                                <div class="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-full mb-4 text-slate-400 dark:text-slate-500 fallback-icon animate-pulse-slow">
                                                    <i class="fa-solid fa-receipt text-3xl"></i>
                                                </div>
                                                
                                                <h3 class="text-base font-semibold text-slate-700 dark:text-slate-300">
                                                    No Transactions Found
                                                </h3>
                                                
                                                <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
                                                    We couldn't find any records matching your search or filters. Try adjusting your keywords or clearing the status filter.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Row 1: Bank Withdrawal -->
                                    <tr
                                        v-for="item in filteredTransactions"
                                        :key="item.id"
                                         @click="viewPaymentDetails(item)"
                                        class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                                        <!-- DATE -->
                                        <td class="px-6 py-4">
                                            <span class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {{ formatDate(item.requested_at) }}
                                            </span>
                                            <span class="text-[11px] text-slate-400">
                                                {{ formatTime(item.requested_at) }}
                                            </span>
                                        </td>

                                        <!-- PAYMENT METHOD -->
                                        <td class="px-6 py-4">
                                            <div class="flex flex-col">
                                                <span class="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase">
                                                    {{ item.payment_method ?? 'N/A' }}
                                                </span>
                                                <span class="text-xs text-slate-500">
                                                    {{ item.bank_name ?? '---' }} - ****{{ item.account_number?.slice(-4) }}
                                                </span>
                                            </div>
                                        </td>

                                        <!-- AMOUNT -->
                                        <td class="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                                            ৳{{ item.amount }}
                                        </td>

                                        <!-- CHARGE -->
                                        <td class="px-6 py-4 text-sm text-red-400">
                                            ৳{{ item.charge ?? 0 }}
                                        </td>

                                        <!-- NET AMOUNT -->
                                        <td class="px-6 py-4">
                                            <span class="text-sm font-bold text-slate-900 dark:text-white">
                                                ৳{{ item.net_amount }}
                                            </span>
                                        </td>

                                        <!-- STATUS -->
                                        <td class="px-6 py-4">
                                            <span
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                                                :class="statusClass(item.status)"
                                            >
                                                {{ item.status }}
                                            </span>
                                        </td>

                                        <!-- ACTION -->
                                        <td class="px-6 py-4 text-right">
                                            <div class="flex items-center justify-end gap-3">
                                                <!-- VIEW -->
                                                <button
                                                    @click="viewTransaction(item)"
                                                    class="text-slate-400 hover:text-indigo-600 transition"
                                                    title="View Details">
                                                    <i class="fa-solid fa-eye"></i>
                                                </button>

                                                <!-- DELETE -->
                                                <button
                                                    v-if="item.status === 'pending' && !item.is_confirm"
                                                    @click="deleteTransaction(item.id)"
                                                    class="text-slate-400 hover:text-red-600 transition"
                                                    title="Delete">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>

                                            </div>
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
import api from '../../../../services/api';

import Navbar from '../admin-navbar.vue';
import Header from '../admin-header.vue';
import Message from '../../../Message/message.vue';
import FooterSection from "../../../e-commerce/footer.vue";

const sidebarOpen = ref(false);
const active = ref("dashboard");

const router = useRouter();

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');








const searchQuery = ref('');
const statusFilter = ref('');
const transactions = ref([]);
async function fetcheTransection()
{
    try {
        loading.value = true;
        errorMsg.value = null;

        const res = await api.get('/finance/admin/transaction');
        if (res.data?.success) {
            transactions.value = res.data.data ?? [];
        } else {
            errorMsg.value = res.data?.message || 'Failed to fetch transactions';
        }
    } catch (err) {
        console.error('Fetch Transactions Error:', err);
        errorMsg.value = err?.response?.data?.message || 'Something went wrong while connecting to the server.';
    } finally {
        loading.value = false;
    }
}

const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
};

const formatTime = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
};

const statusClass = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';

        case 'processing':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';

        case 'paid':
            return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';

        case 'rejected':
            return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';

        case 'cancelled':
            return 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300';

        default:
            return 'bg-slate-100 text-slate-700';
    }
};





// =============================
// Filter orders
// =============================

const filteredTransactions = computed(() => {
    return transactions.value.filter(item => {

        // =====================
        // STATUS FILTER
        // =====================
        const matchesStatus =
            !statusFilter.value ||
            item.status?.toLowerCase() === statusFilter.value.toLowerCase();

        // =====================
        // SEARCH FILTER
        // =====================
        const search = searchQuery.value.toLowerCase().trim();

        if (!search) return matchesStatus;

        const matchesSearch =
            item.transaction_id?.toLowerCase().includes(search) ||
            item.payment_method?.toLowerCase().includes(search) ||
            item.bank_name?.toLowerCase().includes(search) ||
            item.account_number?.toLowerCase().includes(search) ||
            item.amount?.toString().includes(search) ||
            item.net_amount?.toString().includes(search) ||
            item.status?.toLowerCase().includes(search);

        return matchesStatus && matchesSearch;
    });
});

const resetFilters = () => {
    searchQuery.value = '';
    statusFilter.value = '';
};









function viewPaymentDetails(item) {
    console.log('Full item object:', item); // Inspect this in your browser console!
    
    // Safety check: Prevent navigating if the ID is missing
    if (!item || !item.transaction_id) {
        console.error("Routing failed: transaction_id is missing from item.");
        return;
    }
    
    router.push(`/admin/payment/details/${item.transaction_id}/${item.user_id}`);
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

const onSearch = (value) => {
    searchQuery.value = value;
};


/* ESC to close drawer */
onMounted(() => {
    
    fetcheTransection();






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