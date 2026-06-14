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

                    <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div class="flex items-center gap-3">
                                <h1 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Status Order Filter</h1>
                                <span class="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                                    {{ filteredOrders.length }} / {{ orders.length }} Orders
                                </span>
                            </div>
                            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Monitor and manage your customer transactions and shipping status.</p>
                        </div>
                    </div>

                    <!-- ==================== TOTAL AMOUNT CARDS DESIGN START ==================== -->
                    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                        <div class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        {{ (searchQuery || statusFilter) ? 'Filtered Amount' : 'Total Sales Amount' }}
                                    </p>
                                    <h4 class="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                                        ৳ {{ displayTotalAmount.toLocaleString() }}
                                    </h4>
                                </div>
                                <div class="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <i class="fa-solid fa-wallet text-xl"></i>
                                </div>
                            </div>
                            <div class="absolute bottom-0 left-0 h-1 w-full bg-emerald-500"></div>
                        </div>

                        <div class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Orders Count</p>
                                    <h4 class="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                                        {{ displayTotalCount.toLocaleString() }} <span class="text-sm font-normal text-slate-400">Orders</span>
                                    </h4>
                                </div>
                                <div class="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                    <i class="fa-solid fa-boxes-stacked text-xl"></i>
                                </div>
                            </div>
                            <div class="absolute bottom-0 left-0 h-1 w-full bg-indigo-500"></div>
                        </div>

                        <div class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 lg:col-span-1">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Avg. Order Value</p>
                                    <h4 class="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                                        ৳ {{ displayAverageValue.toLocaleString() }}
                                    </h4>
                                </div>
                                <div class="rounded-xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                                    <i class="fa-solid fa-chart-line text-xl"></i>
                                </div>
                            </div>
                            <div class="absolute bottom-0 left-0 h-1 w-full bg-amber-500"></div>
                        </div>
                    </div>

                    <div class="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900">
                        <div class="space-y-4">
                            
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
                                
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
                                        @click="fetchData"
                                        class="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-600 bg-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:border-indigo-700 focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.98]"
                                    >
                                        <i class="fa-solid fa-magnifying-glass text-xs"></i>
                                        <span>Search</span>
                                    </button>
                                </div>
                            </div>

                            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                                
                                <!-- Text Search Input -->
                                <div class="relative flex-1">
                                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                                        <i class="fa-solid fa-magnifying-glass h-4 w-4"></i>
                                    </div>
                                    <input 
                                        type="text" 
                                        v-model="searchQuery" 
                                        placeholder="Search by ID, Customer name or Transaction..." 
                                        class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-800"
                                    />
                                </div>

                                <!-- Filters & Reset Actions -->
                                <div class="flex flex-wrap items-center gap-3 sm:flex-nowrap">
                                    <div class="flex items-center gap-2 shrink-0">
                                        <i class="fa-solid fa-filter h-3.5 w-3.5 text-slate-400 dark:text-slate-500"></i>
                                        <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Status:</span>
                                    </div>
                                    
                                    <select 
                                        v-model="statusFilter" 
                                        class="w-full sm:w-[180px] rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm font-medium text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:focus:border-indigo-500 dark:focus:bg-slate-800"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="processing">Processing</option>
                                        <option value="picked">Picked</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="out for delivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="failed">Failed</option>
                                        <option value="returned">Returned</option>
                                    </select>

                                    <!-- Reset Button -->
                                    <button 
                                        @click="resetFilters" 
                                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 hover:border-rose-200 transition-all dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 dark:hover:border-rose-500/20"
                                        title="Reset Filters"
                                    >
                                        <i class="fa-solid fa-rotate h-4 w-4"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    
                    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div class="overflow-x-auto max-h-[850px]">
                            <table class="w-full text-left border-collapse">
                                <thead class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                                    <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Registration</th>
                                    <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Customer</th>
                                    <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                                    <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Transaction ID</th>
                                    <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                </tr>
                                </thead>

                                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                    
                                    <template v-if="filteredOrders && filteredOrders.length > 0">
                                        <tr v-for="order in filteredOrders" :key="order.id" @click="viewOrderDetails(order)" class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                            
                                            <td class="px-6 py-4">
                                                <div class="text-xs text-slate-700 dark:text-slate-300">{{ formatDate(order.date) }}</div>
                                                <div v-if="order.paid_at" class="text-[10px] text-green-600 dark:text-green-400 mt-0.5">
                                                    Paid: {{ formatDate(order.paid_at) }}
                                                </div>
                                            </td>

                                            <td class="px-6 py-4">
                                                <span class="font-mono font-bold text-indigo-600 dark:text-indigo-400">{{ order.reg }}</span>
                                            </td>

                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-3">
                                                    <div class="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                                                        {{ order.user?.name.substring(0, 2).toUpperCase() }}
                                                    </div>
                                                    <div>
                                                        <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ order.user?.name }}</div>
                                                        <div class="text-xs text-slate-500 dark:text-slate-400">{{ order.user?.user_id }}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td class="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                                                {{ order.currency }} ৳ {{ order.amount.toLocaleString() }}
                                            </td>

                                            <td class="px-6 py-4">
                                                <div class="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded inline-block">
                                                    {{ order.transaction_id || 'N/A' }}
                                                </div>
                                            </td>

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span 
                                                    :class="getStatus(order.status).container" 
                                                    class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-2 border border-transparent dark:border-current/10 transition-all duration-300 shadow-sm"
                                                >
                                                    <span class="relative flex h-2 w-2">
                                                        <span 
                                                            v-if="order.status.toLowerCase() === 'pending'"
                                                            class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                                            :class="getStatus(order.status).dot"
                                                        ></span>
                                                        <span 
                                                            class="relative inline-flex rounded-full h-2 w-2"
                                                            :class="getStatus(order.status).dot"
                                                        ></span>
                                                    </span>
                                                    
                                                    {{ order.status }}
                                                </span>
                                            </td>
                                        </tr>
                                    </template>

                                    <!-- Empty State -->
                                    <tr v-else>
                                        <td colspan="6" class="px-6 py-12 text-center">
                                            <div v-if="loading" class="w-full flex flex-col items-center justify-center py-20">
                                                <div class="animate-spin h-10 w-10 border-4 border-[#A3D921] border-t-transparent rounded-full"></div>
                                                <p class="mt-4 text-sm text-gray-500">Updating Tree...</p>
                                            </div>
                                            
                                            <div class="flex flex-col items-center justify-center max-w-sm mx-auto">
                                                <div class="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-full text-slate-400 dark:text-slate-500 mb-4 ring-8 ring-slate-50 dark:ring-slate-900/30 flex items-center justify-center w-12 h-12 mx-auto">
                                                    <i class="fas fa-box-open text-xl"></i>
                                                </div>
                                                <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                                    No orders found
                                                </h3>
                                                <p class="text-xs text-slate-400 dark:text-slate-500">
                                                    Your search or filter criteria didn't match any orders.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
                                @click="changePage(1)" :disabled="pagination.page === 1 || loading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-angles-left"></i>
                            </button>

                            <!-- Prev -->
                            <button
                                @click="changePage(pagination.page - 1)" :disabled="pagination.page === 1 || loading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>

                            <!-- Pages -->
                            <button
                                v-for="page in OrderVisiblePages"
                                :key="String(page)"
                                @click="page !== '...' && changePage(page)"
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
                                @click="changePage(pagination.page + 1)"
                                :disabled="pagination.page === pagination.lastPage || loading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-angle-right"></i>
                            </button>

                            <!-- Last -->
                            <button
                                @click="changePage(pagination.lastPage)"
                                :disabled="pagination.page === pagination.lastPage || loading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-angles-right"></i>
                            </button>
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







const orderPage = ref(1);
const orderLastPage = ref(1);
const orderTotal = ref(0);
const orderPerPage = ref(20);
const orderFromItem = ref(0);
const orderToItem = ref(0);

const OrderVisiblePages = computed(() => {
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



// =============================
// Get orders
// =============================
const orders = ref([]);

const pagination = ref({
    page: 1,
    lastPage: 1,
    total: 0,
    perPage: 20,
    from: 0,
    to: 0,
});

const backendTotalAmount = ref(0);

async function fetchOrders(page = 1) {
    try {
        loading.value = true;
        errorMsg.value = '';

        const res = await api.get('/orders/reports/sale', {
            params: { page }
        });

        const response = res.data;

        // REAL DATA ARRAY (IMPORTANT FIX)
        orders.value = response?.data?.data ?? [];

        backendTotalAmount.value = response?.total_amount ?? 0;

        // PAGINATION META
        pagination.value = {
            page: response?.data?.current_page ?? 1,
            lastPage: response?.data?.last_page ?? 1,
            total: response?.data?.total ?? 0,
            perPage: response?.data?.per_page ?? 20,
            from: response?.data?.from ?? 0,
            to: response?.data?.to ?? 0,
        };

    } catch (err) {
        console.log(err);
        errorMsg.value = "Failed to fetch orders";

        orders.value = [];

        pagination.value = {
            page: 1,
            lastPage: 1,
            total: 0,
            perPage: 20,
            from: 0,
            to: 0,
        };

    } finally {
        loading.value = false;
    }
}

const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

const statusConfig = {
    'pending': {
        container: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
        dot: 'bg-amber-500'
    },
    'confirmed': {
        container: 'bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
        dot: 'bg-sky-500'
    },
    'processing': {
        container: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400',
        dot: 'bg-indigo-500'
    },
    'picked': {
        container: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
        dot: 'bg-violet-500'
    },
    'shipped': {
        container: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
        dot: 'bg-blue-500'
    },
    'out for delivery': {
        container: 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400',
        dot: 'bg-orange-500'
    },
    'delivered': {
        container: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
        dot: 'bg-emerald-500'
    },
    'cancelled': {
        container: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
        dot: 'bg-rose-500'
    },
    'failed': {
        container: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
        dot: 'bg-red-600'
    },
    'returned': {
        container: 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
        dot: 'bg-slate-500'
    },
    'default': {
        container: 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
        dot: 'bg-slate-500'
    }
};

const getStatus = (status) => {
    if (!status) return statusConfig.default;
    const normalizedStatus = status.toLowerCase().trim().replace(/_/g, ' '); 
    return statusConfig[normalizedStatus] || statusConfig.default;
};

// =============================
// Filter orders
// =============================
const searchQuery = ref('');
const statusFilter = ref('');

const filteredOrders = computed(() => {
    return orders.value.filter(order => {
        const matchesStatus = !statusFilter.value || 
        order.status.toLowerCase() === statusFilter.value.toLowerCase();
        const search = searchQuery.value.toLowerCase().trim();
        if (!search) return matchesStatus;
        const matchesSearch = 
            (order.reg?.toLowerCase().includes(search)) ||
            (order.user?.name?.toLowerCase().includes(search)) ||
            (order.user?.user_id?.toLowerCase().includes(search)) ||
            (String(order.user?.user_id || '').includes(search)) ||
            (order.transaction_id?.toLowerCase().includes(search)) ||
            (order.status?.toLowerCase().includes(search));
        return matchesStatus && matchesSearch;
    });
});






// Get data date wise
const today = new Date().toISOString().split('T')[0];
const startDate = ref(today);
const endDate = ref(today);
const isDateFilterActive = ref(false);

async function fetchData(page = 1) {
    try {

        loading.value = true;
        errorMsg.value = '';
        isDateFilterActive.value = true;

        const res = await api.get('/orders/reports/sale/filter', {
            params: {
                page,
                start_date: startDate.value,
                end_date: endDate.value
            }
        });

        const response = res.data;

        orders.value = response?.data?.data ?? [];

        backendTotalAmount.value = response?.total_amount ?? 0;

        // PAGINATION META
        pagination.value = {
            page: response.data.current_page,
            lastPage: response.data.last_page,
            total: response.data.total,
            perPage: response.data.per_page,
            from: response.data.from,
            to: response.data.to,
        };
        
    } catch (error) {
        console.error('Error fetching data:', error);

        errorMsg.value = error?.response?.data?.message || "Failed to fetch orders";

        orders.value = [];

        pagination.value = {
            page: 1,
            lastPage: 1,
            total: 0,
            perPage: 20,
            from: 0,
            to: 0,
        };

    }finally {
        loading.value = false;
    }
};


async function changePage(page) {

    if (isDateFilterActive.value) {
        await fetchData(page);
    } else {
        await fetchOrders(page);
    }

}




const resetFilters = async () => {

    searchQuery.value = '';
    statusFilter.value = '';

    startDate.value = today;
    endDate.value = today;

    isDateFilterActive.value = false;

    await fetchOrders(1);
};







// =========================================================================
// স্মার্ট কার্ড ক্যালকুলেশন (সার্চ বা স্ট্যাটাস সিলেক্ট করলে লাইভ পেজ হিসাব, নয়তো অল-ওভার)
// =========================================================================
const displayTotalAmount = computed(() => {
    // যদি টেক্সট সার্চ করা হয় বা স্ট্যাটাস ফিল্টার ড্রপডাউন সিলেক্ট করা হয়
    if (searchQuery.value || statusFilter.value) {
        return filteredOrders.value.reduce((sum, order) => {
            return sum + (parseFloat(order.amount) || 0);
        }, 0);
    }
    // নরমাল অবস্থায় ডেট ফিল্টার করা বা অল-ওভার ডেটার ব্যাকএন্ড পাঠানো সঠিক টোটাল দেখাবে
    return backendTotalAmount.value;
});

const displayTotalCount = computed(() => {
    if (searchQuery.value || statusFilter.value) {
        return filteredOrders.value.length;
    }
    // ডেট ফিল্টার বা নরমাল অবস্থায় সম্পূর্ণ পেজিনেশনের মোট অর্ডার কাউন্ট দেখাবে
    return pagination.value.total;
});

const displayAverageValue = computed(() => {
    if (displayTotalCount.value === 0) return 0;
    return Math.round(displayTotalAmount.value / displayTotalCount.value);
});









function viewOrderDetails(order){
    router.push(`/admin/orders/${order.reg}/${order.slug}`);
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

const onSearch = () => {
    console.log(search.value)
}

/* ESC to close drawer */
onMounted(() => {
    fetchOrders();


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