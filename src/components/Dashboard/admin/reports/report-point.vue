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
                                <h1 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Point Statement</h1>
                                <span class="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                                    {{ filteredPoints.length }} / {{ points.length }} Points
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
                                        {{ (searchQuery || typesFilter) ? 'Filtered Points' : 'Total Points' }}
                                    </p>
                                    <h4 class="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                                        {{ displayTotalPoints.toLocaleString() }}
                                        <span class="text-sm font-normal text-slate-400">Points</span>
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
                                    <p class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        Current Page
                                    </p>
                                    <h4 class="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                                        {{ currentPagePoints.toLocaleString() }}
                                        <span class="text-sm font-normal text-slate-400">Points</span>
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
                                    <p class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        Average Points
                                    </p>
                                    <h4 class="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                                        {{ displayAveragePoints.toLocaleString() }}
                                        <span class="text-sm font-normal text-slate-400">Points</span>
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
                                        <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Type:</span>
                                    </div>
                                    
                                    <select 
                                        v-model="typesFilter" 
                                        class="w-full sm:w-[180px] rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm font-medium text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:focus:border-indigo-500 dark:focus:bg-slate-800">

                                        <option value="">All Types</option>
                                        <option value="earn">Earn</option>
                                        <option value="spend">Spend</option>
                                        <option value="bonus">Bonus</option>
                                        <option value="matching">Matching</option>
                                        <option value="withdraw">Withdraw</option>
                                        <option value="refund">Refund</option>
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


                    
                    <div class="w-full rounded-xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
                        <div class="overflow-x-auto max-h-[850px]">
                            <table class="w-full text-left border-collapse whitespace-nowrap">
                                <!-- Table Header -->
                                <thead class="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">User Info</th>
                                        <th scope="col" class="px-6 py-4">Date</th>
                                        <th scope="col" class="px-6 py-4">Type</th>
                                        <th scope="col" class="px-6 py-4 text-right">Points</th>
                                        <th scope="col" class="px-6 py-4 text-right">Bonus Info</th>
                                        <th scope="col" class="px-6 py-4 hidden md:table-cell">Source & Ref</th>
                                        <th scope="col" class="px-6 py-4 hidden lg:table-cell">Note</th>
                                    </tr>
                                </thead>

                                <!-- Table Body -->
                                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/70">
                                    
                                    <!-- 1. loading state -->
                                    <tr v-if="loading">
                                        <td colspan="7" class="px-6 py-16 text-center">
                                            <div class="flex flex-col items-center justify-center">
                                                <div class="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full dark:border-indigo-400 dark:border-t-transparent"></div>
                                                <p class="mt-3 text-sm text-slate-500 dark:text-slate-400 font-medium">Loading transactions...</p>
                                            </div>
                                        </td>
                                    </tr>

                                    <!-- 2. Data Rows -->
                                    <template v-if="filteredPoints && filteredPoints.length > 0">
                                        <tr
                                            v-for="point in filteredPoints"
                                            :key="point.id"
                                            class="group hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors duration-200"
                                        >
                                            <!-- User Info (Avatar + Name + ID) -->
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-3">
                                                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600 ring-1 ring-inset ring-indigo-500/10 dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/20">
                                                        {{ point.user?.name?.substring(0, 2).toUpperCase() || 'NA' }}
                                                    </div>
                                                    <div class="flex flex-col">
                                                        <span class="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                            {{ point.user?.name || 'Unknown User' }}
                                                        </span>
                                                        <span class="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                                                            #{{ point.user?.user_id || '—' }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <!-- Date -->
                                            <td class="px-6 py-4">
                                                <div class="text-sm text-slate-600 dark:text-slate-300">
                                                    {{ formatDate(point.created_at) }}
                                                </div>
                                            </td>

                                            <!-- Type (Modern Minimalist Badges) -->
                                            <td class="px-6 py-4">
                                                <span
                                                    class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset capitalize tracking-wide"
                                                    :class="{
                                                        'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20': point.type === 'earn',
                                                        'bg-rose-50 text-rose-700 ring-rose-600/10 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20': point.type === 'spend' || point.type === 'withdraw',
                                                        'bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20': point.type === 'bonus',
                                                        'bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20': point.type === 'matching',
                                                        'bg-cyan-50 text-cyan-700 ring-cyan-700/10 dark:bg-cyan-500/10 dark:text-cyan-400 dark:ring-cyan-500/20': point.type === 'refund'
                                                    }"
                                                >
                                                    {{ point.type }}
                                                </span>
                                            </td>

                                            <!-- Points -->
                                            <td class="px-6 py-4 text-right">
                                                <div class="flex flex-col items-end">
                                                    <span 
                                                        class="text-sm font-bold tracking-tight"
                                                        :class="(point.type === 'spend' || point.type === 'withdraw') ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-slate-100'"
                                                    >
                                                        {{ point.type === 'spend' || point.type === 'withdraw' ? '-' : '+' }}{{ point.points }}
                                                    </span>
                                                    <span v-if="point.matching_count > 0" class="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                                                        {{ point.matching_count }} matches
                                                    </span>
                                                </div>
                                            </td>

                                            <!-- Bonus Info (Amount & Status Combined) -->
                                            <td class="px-6 py-4 text-right">
                                                <div v-if="point.bonus_amount > 0" class="flex flex-col items-end gap-1.5">
                                                    <span class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                                        ৳ {{ parseFloat(point.bonus_amount).toFixed(2) }}
                                                    </span>
                                                    <span
                                                        class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset"
                                                        :class="point.bonus_status === 'credit'
                                                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20'
                                                            : point.bonus_status === 'debit'
                                                                ? 'bg-rose-50 text-rose-700 ring-rose-600/10 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20'
                                                                : 'bg-slate-50 text-slate-600 ring-slate-500/10 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700/50'"
                                                    >
                                                        {{ point.bonus_status }}
                                                    </span>
                                                </div>
                                                <span v-else class="text-slate-400 dark:text-slate-500">—</span>
                                            </td>

                                            <!-- Source & Reference (Hidden on Mobile) -->
                                            <td class="px-6 py-4 hidden md:table-cell">
                                                <div class="flex flex-col">
                                                    <span class="text-sm font-medium capitalize text-slate-700 dark:text-slate-300">
                                                        {{ point.source || '—' }}
                                                    </span>
                                                    <span v-if="point.reference_id" class="text-xs font-mono text-slate-400 dark:text-slate-500 mt-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded w-max">
                                                        #{{ point.reference_id }}
                                                    </span>
                                                </div>
                                            </td>

                                            <!-- Note (Hidden on Tablet & Mobile) -->
                                            <td class="px-6 py-4 hidden lg:table-cell max-w-[220px] truncate text-sm text-slate-500 dark:text-slate-400" :title="point.note">
                                                {{ point.note || '—' }}
                                            </td>
                                        </tr>
                                    </template>

                                    <!-- 3. Empty State Fallback -->
                                    <tr v-else>
                                        <td colspan="7" class="px-6 py-16 text-center">
                                            <div class="flex flex-col items-center justify-center max-w-sm mx-auto">
                                                <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-full text-slate-400 dark:text-slate-500 mb-4 ring-8 ring-slate-50 dark:ring-slate-900/20 flex items-center justify-center w-14 h-14">
                                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                                    </svg>
                                                </div>
                                                <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                                    No transactions found
                                                </h3>
                                                <p class="text-xs text-slate-400 dark:text-slate-500 leading-normal">
                                                    There are no points or bonus logs available at the moment.
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
                                v-for="page in PointsVisiblePages"
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
import api from '../../../../services/api.js';

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







const pointPage = ref(1);
const pointLastPage = ref(1);
const pointTotal = ref(0);
const pointPerPage = ref(20);
const pointFromItem = ref(0);
const pointToItem = ref(0);

const PointsVisiblePages = computed(() => {
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
const points = ref([]);

const pagination = ref({
    page: 1,
    lastPage: 1,
    total: 0,
    perPage: 20,
    from: 0,
    to: 0,
});

const backendTotalPoints = ref(0);

async function fetchPoints(page = 1) {
    try {
        loading.value = true;
        errorMsg.value = '';

        const res = await api.get('/reports/point-statement', {
            params: { page }
        });

        const response = res.data;

        // REAL DATA ARRAY (IMPORTANT FIX)
        points.value = response?.data?.data ?? [];

        backendTotalPoints.value = response?.total_point ?? 0;

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
        errorMsg.value = "Failed to fetch points";

        points.value = [];

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


// =============================
// Filter points
// =============================
const searchQuery = ref('');
const typesFilter = ref('');

const filteredPoints = computed(() => {
    return points.value.filter(point => {

        // Type Filter
        const matchesType =
            !typesFilter.value ||
            point.type?.toLowerCase() === typesFilter.value.toLowerCase();

        // Search
        const search = searchQuery.value.toLowerCase().trim();
        if (!search) return matchesType;

        const matchesSearch =
            String(point.id || '').includes(search) ||
            String(point.user?.name || '').toLowerCase().includes(search) ||
            String(point.user?.user_id || '').toLowerCase().includes(search) ||            
            String(point.type || '').toLowerCase().includes(search) ||
            String(point.bonus_status || '').toLowerCase().includes(search) ||
            String(point.source || '').toLowerCase().includes(search) ||
            String(point.reference_id || '').toLowerCase().includes(search) ||
            String(point.note || '').toLowerCase().includes(search);

        return matchesType && matchesSearch;
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

        backendTotalPoints.value = response?.total_amount ?? 0;

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
        await fetchPoints(page);
    }

}




const resetFilters = async () => {

    searchQuery.value = '';
    typesFilter.value = '';

    startDate.value = today;
    endDate.value = today;

    isDateFilterActive.value = false;

    await fetchPoints(1);
};







// ========================================================
// Smart Point Cards
// ========================================================

// Total Points (All Records)
const displayTotalPoints = computed(() => {
    if (searchQuery.value || typesFilter.value) {
        return filteredPoints.value.reduce((sum, point) => {
            return sum + Number(point.points || 0);
        }, 0);
    }

    return backendTotalPoints.value;
});

// Current Page Points
const currentPagePoints = computed(() => {
    const data = (searchQuery.value || typesFilter.value)
        ? filteredPoints.value
        : points.value;

    return data.reduce((sum, point) => {
        return sum + Number(point.points || 0);
    }, 0);
});

// Total Count
const displayTotalCount = computed(() => {
    if (searchQuery.value || typesFilter.value) {
        return filteredPoints.value.length;
    }

    return pagination.value.total;
});

// Average
const displayAveragePoints = computed(() => {
    if (!displayTotalCount.value) return 0;

    return Math.round(displayTotalPoints.value / displayTotalCount.value);
});









// function viewOrderDetails(order){
//     router.push(`/admin/orders/${order.reg}/${order.slug}`);
// }
















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
    fetchPoints();


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