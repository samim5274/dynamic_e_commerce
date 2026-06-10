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
                                    {{ products.length }} Products
                                </span>
                            </div>
                            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Monitor and manage your customer transactions and shipping status.</p>
                        </div>
                    </div>


                    
                    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div class="overflow-x-auto max-h-[850px]">
                            <table class="w-full text-left border-collapse">
                                <thead class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                                        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Product Info</th>
                                        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                                        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Brand</th>
                                        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price</th>
                                        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Stock</th>
                                        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>

                                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                    <template v-if="products && products.length > 0">
                                        <tr v-for="product in products" :key="product.id"
                                            class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                                                    <i class="fa-regular fa-calendar text-slate-400 text-[11px]"></i>
                                                    <span>{{ formatDate(product.created_at) }}</span>
                                                </div>
                                            </td>

                                            <td class="px-6 py-4 min-w-[200px]">
                                                <div class="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                                                    {{ product.name }}
                                                </div>
                                                <div class="mt-0.5 inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                    {{ product.sku || 'No SKU' }}
                                                </div>
                                            </td>

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    {{ product.category?.name || 'N/A' }}
                                                </div>
                                                <div class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                                    {{ product.subcategory?.name || '—' }}
                                                </div>
                                            </td>

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span class="inline-flex items-center rounded-full bg-slate-50 border border-slate-200/60 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800/40 dark:border-slate-700/60 dark:text-slate-400">
                                                    {{ product.brand?.name || 'Generic' }}
                                                </span>
                                            </td>

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="flex flex-col">
                                                    <template v-if="product.discount_price">
                                                        <span class="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                            ৳ {{ product.discount_price }}
                                                        </span>
                                                        <span class="text-xs text-slate-400 dark:text-slate-500 line-through mt-0.5">
                                                            ৳ {{ product.price }}
                                                        </span>
                                                    </template>
                                                    <template v-else>
                                                        <span class="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                            ৳ {{ product.price }}
                                                        </span>
                                                    </template>
                                                </div>
                                            </td>

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span 
                                                    :class="product.stock_quantity > 0 
                                                        ? 'text-green-700 dark:text-green-400 font-semibold' 
                                                        : 'text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-md'"
                                                    class="text-sm"
                                                >
                                                    {{ product.stock_quantity > 0 ? product.stock_quantity + ' Pcs' : 'Out of Stock' }}
                                                </span>
                                            </td>

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    :class="product.is_active
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                                                        : 'bg-rose-50 text-rose-700 border border-rose-200/60 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'"
                                                    class="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm"
                                                >
                                                    <span class="relative flex h-1.5 w-1.5">
                                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                                            :class="product.is_active ? 'bg-emerald-400' : 'bg-rose-400'"></span>
                                                        <span class="relative inline-flex rounded-full h-1.5 w-1.5"
                                                            :class="product.is_active ? 'bg-emerald-500' : 'bg-rose-500'"></span>
                                                    </span>
                                                    {{ product.is_active ? 'Active' : 'Inactive' }}
                                                </span>
                                            </td>
                                        </tr>
                                    </template>

                                    <tr v-else>
                                        <td colspan="8" class="px-6 py-12 text-center">
                                            <div v-if="loading" class="w-full flex flex-col items-center justify-center py-20">
                                                <div class="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
                                                <p class="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading products data...</p>
                                            </div>
                                            
                                            <div v-else class="flex flex-col items-center justify-center max-w-sm mx-auto py-8">
                                                <div class="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-full text-slate-400 dark:text-slate-500 mb-4 ring-8 ring-slate-50 dark:ring-slate-900/30 flex items-center justify-center w-12 h-12 mx-auto">
                                                    <i class="fas fa-box-open text-xl"></i>
                                                </div>
                                                <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                                    No products found
                                                </h3>
                                                <p class="text-xs text-slate-400 dark:text-slate-500">
                                                    Your search or filter criteria didn't match any products.
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
                                @click="fetchProducts(1)" :disabled="pagination.page === 1 || loading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-angles-left"></i>
                            </button>

                            <!-- Prev -->
                            <button
                                @click="fetchProducts(pagination.page - 1)" :disabled="pagination.page === 1 || loading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>

                            <!-- Pages -->
                            <button
                                v-for="page in ProductVisiblePages"
                                :key="String(page)"
                                @click="page !== '...' && fetchProducts(page)"
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
                                @click="fetchProducts(pagination.page + 1)"
                                :disabled="pagination.page === pagination.lastPage || loading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-angle-right"></i>
                            </button>

                            <!-- Last -->
                            <button
                                @click="fetchProducts(pagination.lastPage)"
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







const productPage = ref(1);
const productLastPage = ref(1);
const productTotal = ref(0);
const productPerPage = ref(20);
const productFromItem = ref(0);
const productToItem = ref(0);

const ProductVisiblePages = computed(() => {
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
// Get Products
// =============================
const products = ref([]);

const pagination = ref({
    page: 1,
    lastPage: 1,
    total: 0,
    perPage: 20,
    from: 0,
    to: 0,
});

async function fetchProducts(page = 1) {
    try {
        loading.value = true;
        errorMsg.value = '';

        const res = await api.get('/products/report', {
            params: { page }
        });

        const data = res.data?.data;
        

        products.value = data?.data ?? [];
        // console.log(products.value);

        pagination.value = {
            page: data?.current_page ?? 1,
            lastPage: data?.last_page ?? 1,
            total: data?.total ?? 0,
            perPage: data?.per_page ?? 20,
            from: data?.from ?? 0,
            to: data?.to ?? 0,
        };

    } catch (err) {
        console.log(err);
        errorMsg.value = "Failed to fetch products";

        products.value = [];

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


const formatDate = (date) => {
    if (!date) return '-';

    return new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });
};



// Get data date wise
const today = new Date().toISOString().split('T')[0];
const startDate = ref(today);
const endDate = ref(today);




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
    fetchProducts();


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