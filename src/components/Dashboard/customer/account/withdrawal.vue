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
                
                    <!-- STATS SECTION -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                        <!-- AVAILABLE BALANCE CARD WITH WITHDRAW BUTTON -->
                        <div class="relative overflow-hidden bg-indigo-600 dark:bg-indigo-900 rounded-3xl p-6 shadow-lg shadow-indigo-200 dark:shadow-none ring-1 ring-indigo-500">
                            <!-- Decoration -->
                            <div class="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                            
                            <div class="relative flex flex-col h-full">
                                <div class="flex items-center justify-between mb-2">
                                    <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-100 opacity-90">
                                        Available Balance
                                    </p>
                                    <!-- Live Pulse -->
                                    <span class="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                                </div>

                                <div class="flex items-baseline text-white mb-6">
                                    <span class="text-2xl font-medium mr-1">৳</span>
                                    <h2 class="text-4xl font-black tracking-tight">
                                        {{ balance ?? 0 }}
                                    </h2>
                                </div>

                                <!-- Action Button -->
                                <div class="mt-auto">
                                    <button @click="WithdrawCreate()" class="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-sm font-bold rounded-2xl transition-all active:scale-95 shadow-sm">
                                        <i class="fa-solid fa-wallet text-indigo-200"></i>
                                        Withdraw Money
                                    </button>
                                    <p class="text-[10px] text-center text-indigo-200/70 mt-3 italic">
                                        Min. withdrawal: ৳500
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- PENDING WITHDRAWAL -->
                        <div class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between mb-4">
                                <div class="p-2.5 bg-amber-50 dark:bg-amber-500/10 rounded-2xl">
                                    <i class="fa-solid fa-clock-rotate-left text-amber-500"></i>
                                </div>
                                <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pending</span>
                            </div>
                            <h2 class="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                                <span class="text-amber-500 mr-1">৳</span>{{ pending ?? 0 }}
                            </h2>
                            <div class="mt-4 flex items-center justify-between">
                                <span class="text-[11px] text-slate-400">In process</span>
                                <a href="#" class="text-[11px] font-bold text-indigo-500 hover:underline">Details</a>
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
                                    <!-- Row 1: Bank Withdrawal -->
                                    <tr
                                        v-for="item in transactions"
                                        :key="item.id"
                                        @click="viewPaymentDetails(item)"
                                        class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition"
                                    >
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

                                                <!-- DELETE -->
                                                <button
                                                    v-if="canDelete(item)"
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


















const balance = ref(0);
const pending = ref(0);
const fetchBalance = async () => {
    try {
        loading.value = true;
        errorMsg.value = null;

        const response = await api.get('/finance'); 

        if (response.data.success === true) {
            const data = response.data.data;
            balance.value = data.balance ?? 0;
            pending.value = data.pending ?? 0;
        } else {
            errorMsg.value = response.data.message || "Failed to fetch balance";
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        errorMsg.value = err.response?.data?.message || "Something went wrong while connecting to the server.";
    } finally {
        loading.value = false;
    }
};












const transactions = ref([]);
async function fetchTransection()
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

const formatDate = (date) => {
    if (!date) return '-';

    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
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















const viewTransaction = (item) => {
    console.log('View:', item);

    // Example: open modal
    selectedTransaction.value = item;
    showModal.value = true;
};

const deleteTransaction = async (id) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    try {
        loading.value = true;

        const res = await api.delete(`/finance/transaction/${id}`);
        if (res.data.success) {
            // remove from UI instantly (no reload)
            transactions.value = transactions.value.filter(t => t.id !== id);
            fetchBalance();
        }

    } catch (err) {
        console.error(err);
        alert('Delete failed!');
    } finally {
        loading.value = false;
    }
};











function WithdrawCreate()
{
    router.push('/withdraw/create');
}











function canDelete(item) {
    return item.status === 'pending' &&
        [0, '0', false, null].includes(item.is_confirm)
}













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

    fetchBalance();
    fetchTransection();
    
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