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

                    <div v-if="details" class="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        
                        <!-- Top Action / Navigation Bar -->
                        <div class="flex items-center justify-between">
                        <div>
                            <button @click="$router.back()" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 gap-1">
                            ← Back to Transactions
                            </button>
                            <h1 class="text-2xl font-bold text-slate-900 dark:text-white mt-1">Transaction Details</h1>
                        </div>
                        
                        <!-- Status Badge using your custom function -->
                        <span :class="['px-3 py-1.5 text-xs font-semibold rounded-full uppercase tracking-wider', statusClass(details.status)]">
                            {{ details.status }}
                        </span>
                        </div>

                        <!-- Main Grid Layout -->
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                            <!-- Left Column: Transaction & Bank Details -->
                            <div class="lg:col-span-2 space-y-6">
                                
                                <!-- Core Details Card -->
                                <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div class="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                        <h2 class="text-base font-semibold text-slate-900 dark:text-white">General Information</h2>
                                    </div>
                                    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                        <span class="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Transaction ID</span>
                                        <span class="mt-1 block font-mono text-sm font-semibold text-slate-900 dark:text-white select-all">{{ details.transaction_id }}</span>
                                        </div>
                                        <div>
                                        <span class="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Payment Method</span>
                                        <span class="mt-1 block text-sm font-medium text-slate-900 dark:text-white capitalize">{{ details.payment_method }}</span>
                                        </div>
                                        <div>
                                        <span class="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Requested At</span>
                                        <span class="mt-1 block text-sm text-slate-900 dark:text-white">
                                            {{ formatDate(details.requested_at) }} <span class="text-slate-400 text-xs ml-1">{{ formatTime(details.requested_at) }}</span>
                                        </span>
                                        </div>
                                        <div>
                                        <span class="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Processed At</span>
                                        <span class="mt-1 block text-sm text-slate-900 dark:text-white">
                                            <template v-if="details.processed_at">
                                            {{ formatDate(details.processed_at) }} <span class="text-slate-400 text-xs ml-1">{{ formatTime(details.processed_at) }}</span>
                                            </template>
                                            <span v-else class="text-slate-400 italic">Not processed yet</span>
                                        </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Bank Account / Payout Destination Card -->
                                <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div class="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                        <h2 class="text-base font-semibold text-slate-900 dark:text-white">Payout Destination</h2>
                                    </div>
                                    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                        <span class="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Bank Name</span>
                                        <span class="mt-1 block text-sm font-semibold text-slate-900 dark:text-white">{{ details.bank_name || '-' }}</span>
                                        </div>
                                        <div>
                                        <span class="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Account Holder</span>
                                        <span class="mt-1 block text-sm font-medium text-slate-900 dark:text-white">{{ details.account_holder_name || '-' }}</span>
                                        </div>
                                        <div>
                                        <span class="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Account Number</span>
                                        <span class="mt-1 block text-sm font-mono text-slate-900 dark:text-white">{{ details.account_number || '-' }}</span>
                                        </div>
                                        <div v-if="details.branch_name">
                                        <span class="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Branch Name</span>
                                        <span class="mt-1 block text-sm text-slate-900 dark:text-white">{{ details.branch_name }}</span>
                                        </div>
                                        <div v-if="details.routing_number">
                                        <span class="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Routing Number</span>
                                        <span class="mt-1 block text-sm font-mono text-slate-900 dark:text-white">{{ details.routing_number }}</span>
                                        </div>
                                        <div v-if="details.swift_code">
                                        <span class="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">SWIFT Code</span>
                                        <span class="mt-1 block text-sm font-mono text-slate-900 dark:text-white">{{ details.swift_code }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Admin Notes Section (Conditional) -->
                                <div v-if="details.admin_note" class="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5">
                                <h3 class="text-sm font-semibold text-amber-900 dark:text-amber-400">Admin Remarks</h3>
                                <p class="mt-1 text-sm text-amber-800 dark:text-amber-300/90 whitespace-pre-line">{{ details.admin_note }}</p>
                                <p class="mt-1 text-sm text-amber-800 dark:text-amber-300/90 font-medium">
                                    <template v-if="details.processed_at">
                                        <!-- এটি দেখাবে: May 22, 2026 -->
                                        <span>{{ formatDate(details.processed_at) }}</span> 
                                        
                                        <!-- পাশে ছোট করে টাইম (যেমন: 12:34 AM) দেখাতে চাইলে এটি রাখতে পারেন -->
                                        <span class="text-xs ml-2 opacity-75">
                                            at {{ formatTime(details.processed_at) }}
                                        </span>
                                    </template>
                                    <span v-else class="italic opacity-60 text-xs">Not processed yet</span>
                                </p>
                                </div>

                            </div>

                            <!-- Right Column: User Summary & Financial Breakdown -->
                            <div class="space-y-6">
                                
                                <!-- User Context Card -->
                                <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                                <h2 class="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Requested By</h2>
                                <div class="flex items-center gap-3" v-if="details.user">
                                    <img v-if="photoUrl" :src="photoUrl" alt="User photo" class="h-12 w-12 rounded-full object-cover ring-2 ring-slate-200 dark:ring-white/10"/>
                                    <div v-else class="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                                    {{ details.user.name.charAt(0) }}
                                    </div>
                                    <div>
                                    <span class="block text-sm font-semibold text-slate-900 dark:text-white">{{ details.user.name }}</span>
                                    <span class="block text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">{{ details.user.email }}</span>
                                    </div>
                                </div>
                                </div>

                                <!-- Financial Statement Card -->
                                <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                <div class="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                    <h2 class="text-base font-semibold text-slate-900 dark:text-white">Amount Breakdown</h2>
                                </div>
                                <div class="p-6 space-y-4">
                                    <div class="flex justify-between text-sm">
                                    <span class="text-slate-500 dark:text-slate-400">Requested Amount</span>
                                    <span class="font-medium text-slate-900 dark:text-white">৳{{ Number(details.amount).toFixed(2) }}</span>
                                    </div>
                                    <div class="flex justify-between text-sm">
                                    <span class="text-slate-500 dark:text-slate-400">Gateway/Service Charge</span>
                                    <span class="font-medium text-rose-600 dark:text-rose-400">- ৳{{ Number(details.charge).toFixed(2) }}</span>
                                    </div>
                                    
                                    <hr class="border-slate-200 dark:border-slate-700 my-2" />
                                    
                                    <div class="flex justify-between items-center">
                                    <span class="text-sm font-semibold text-slate-900 dark:text-white">Net Payout amount</span>
                                    <span class="text-xl font-bold text-emerald-600 dark:text-emerald-400">৳{{ Number(details.net_amount).toFixed(2) }}</span>
                                    </div>
                                </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    
                    <!-- Loading State -->
                    <div v-else class="flex flex-col items-center justify-center min-h-[400px] space-y-3">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p class="text-sm text-slate-500 dark:text-slate-400">Fetching transaction data...</p>
                    </div>

                </main>
            </div>
        </div>
        <FooterSection />
    </div>

</template>

<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import api, {makeImg} from '../../../../services/api';

import Navbar from "../navbar.vue";
import Header from "../header.vue";
import Message from '../../../Message/message.vue'
import FooterSection from "../../../e-commerce/footer.vue";

const sidebarOpen = ref(false);
const active = ref("dashboard");

const router = useRouter();
const route = useRoute()

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');







// ===============================
// Getting transection details
// ===============================
const details = ref(null)

const transactionId = route.params.transaction_id
const userId = route.params.user_id

const fetchTransactionDetails = async () => {
    // Safety guard
    if (!transactionId || !userId) return;

    try {
        loading.value = true
        const response = await api.get(`/finance/transection-details/${transactionId}/${userId}`);
        details.value = response.data.data;
        // console.log(details.value);
    } catch (error) {
        errorMsg.value = 'Fetch Transaction Details Error:', error;
        // console.error('Fetch Transaction Details Error:', error);
    } finally {
        loading.value = false
    }
}

const formatTime = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
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






const photoUrl = computed(() => {
    // ১. প্রথমে চেক করুন details এবং তার ভেতরে user অবজেক্ট আছে কিনা
    const userData = details.value?.user;
    
    // যদি ইউজার ডেটা না থাকে, তবে ডিফল্ট অ্যাভাটার দেখাবে
    if (!userData) return "/images/avatar.png";

    // ২. ইউজারের যদি সরাসরি photo_url থাকে (যেমন full URL)
    if (userData.photo_url) return userData.photo_url;

    // ৩. যদি শুধু ফাইলের নাম বা পাথ (photo) থাকে
    const p = userData.photo;
    if (!p) return "/images/avatar.png"; // ছবি না থাকলে ডিফল্ট ইমেজ
    
    // ৪. আপনার তৈরি করা ইমেজ ইউটিলিটি ফাংশন দিয়ে রিটার্ন করুন
    return makeImg(p);
});















const isDark = ref(false);

function applyTheme(dark) {
    isDark.value = dark;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
}

function toggleTheme() {
    applyTheme(!isDark.value);
}

const searchQuery = ref("");
const onSearch = (value) => {
    searchQuery.value = value;
};


/* ESC to close drawer */
onMounted(() => {
    
    fetchTransactionDetails();






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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>