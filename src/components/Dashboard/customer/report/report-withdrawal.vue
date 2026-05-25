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

                    <!-- FILTER SECTION -->
                    <div class="mb-6 flex flex-wrap gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <!-- Search Input -->
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-xs font-medium text-slate-500 mb-1">Search Transaction</label>
                            <input 
                                v-model="searchQuery" 
                                type="text" 
                                placeholder="Search by method, bank or amount..." 
                                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                            />
                        </div>

                        <!-- Status Dropdown -->
                        <div class="w-full sm:w-[200px]">
                            <label class="block text-xs font-medium text-slate-500 mb-1">Filter by Status</label>
                            <select 
                                v-model="selectedStatus" 
                                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200 capitalize">
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="paid">Paid</option>
                                <option value="rejected">Rejected</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                
                    <div class="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h2 class="text-lg font-bold text-slate-800 dark:text-white">Withdrawal History</h2>
                            <!-- <button class="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition">View All</button> -->
                        </div>

                        <div class="overflow-x-auto">
                            
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
                                                    title="View Details"
                                                >
                                                    <i class="fa-solid fa-eye"></i>
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





























const transactions = ref([]);
async function fetcheTransection()
{
    try {
        loading.value = true;
        errorMsg.value = null;

        const res = await api.get('/finance/transaction');
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



// ফিল্টারের জন্য রিয়্যাক্টিভ ভ্যারিয়েবল
const searchQuery = ref('');
const selectedStatus = ref('');

// ফিল্টারিং লজিক (Computed Property)
const filteredTransactions = computed(() => {
    return transactions.value.filter(item => {
        // ১. স্ট্যাটাস ফিল্টার
        const matchesStatus = !selectedStatus.value || item.status === selectedStatus.value;

        // ২. সার্চ ইনপুট ফিল্টার (Method, Bank, Amount বা Account Number দিয়ে সার্চ করা যাবে)
        const query = searchQuery.value.toLowerCase().trim();
        const matchesSearch = !query || 
            item.payment_method?.toLowerCase().includes(query) ||
            item.bank_name?.toLowerCase().includes(query) ||
            item.account_number?.includes(query) ||
            item.amount?.toString().includes(query);

        // দুইটা শর্তই মিললে ডাটা দেখাবে
        return matchesStatus && matchesSearch;
    });
});



function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(new Date(date));
}

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















const viewTransaction = (item) => {
    console.log('View:', item);

    // Example: open modal
    selectedTransaction.value = item;
    showModal.value = true;
};



































function viewPaymentDetails(item) {
    console.log('Full item object:', item); // Inspect this in your browser console!
    
    // Safety check: Prevent navigating if the ID is missing
    if (!item || !item.transaction_id) {
        console.error("Routing failed: transaction_id is missing from item.");
        return;
    }
    
    router.push(`/withdraw/details/${item.transaction_id}/${item.user_id}`);
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