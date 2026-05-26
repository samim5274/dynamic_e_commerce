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
                                <h1 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Create Customer Orders</h1>
                                <span class="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                                    Create Customer Orders
                                </span>
                            </div>
                            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Monitor and manage your customer orders.</p>
                        </div>
                    </div>

                    
                    
                        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 mt-4">
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
    
                                <!-- PRODUCT SELECT FIELD -->
                                <div class="flex flex-col gap-1.5">
                                    <label class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Select Product
                                    </label>
                                    <div class="relative">
                                        <select 
                                            v-model="form.product_id" 
                                            class="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 ease-in-out appearance-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                                        >
                                            <option value="" disabled selected class="text-slate-400">-- Select Product --</option>
                                            <option 
                                                v-for="product in products" 
                                                :key="product.id" 
                                                :value="product.id"
                                                class="text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 py-2"
                                            >
                                                #{{ product.id }} | {{ product.name }} | ৳{{ product.price }} | {{ product.point }} Pts
                                            </option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 dark:text-slate-500">
                                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <!-- NEW: USER user_id FIELD -->
                                <div class="flex flex-col gap-1.5">
                                    <label class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        User user_id / Player ID
                                    </label>
                                    <div class="relative">
                                        <!-- Icon inside input -->
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                            <i class="fa-solid fa-user text-xs"></i> <!-- FontAwesome Icon, can replace with SVG -->
                                        </div>
                                        <input 
                                            v-model="form.user_id" 
                                            type="text"  required
                                            placeholder="Enter User user_id (e.g. 4829102)" 
                                            class="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 ease-in-out focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                                        />
                                    </div>
                                </div>

                                <!-- NEW: BUTTON (Full width on small screens, adjusts inside grid) -->
                                <div class="sm:col-span-2 flex justify-end mt-2">
                                    <button 
                                        @click="handleSubmit"
                                        type="button"
                                        class="w-full sm:w-auto h-11 px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                                        <i class="fa-solid fa-cart-shopping text-xs"></i> <!-- Optional Button Icon -->
                                        Proceed Payment
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
import { onMounted, ref, computed, h } from "vue";
import { useRouter } from "vue-router";
import api from '../../../services/api';

import Navbar from '../admin/admin-navbar.vue';
import Header from '../admin/admin-header.vue';
import Message from '../../Message/message.vue';
import FooterSection from "../../e-commerce/footer.vue";

const sidebarOpen = ref(false);
const active = ref("dashboard");

const router = useRouter();

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');
const search = ref('');



const Field = (props, { slots }) =>
    h("div", { class: props.class || "" }, [
        h("label", { class: "mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-200" }, props.label),
        slots.default?.(),
    ]);











const products = ref([]);
// fetch all admin and customer
async function fetchProducts() {
    loading.value = true;
    errorMsg.value = '';
    try {
        const res = await api.get('/products');
        if (res.data?.success) {
            products.value = res.data.data;
            // console.log(products.value);
        } else {
            errorMsg.value = res.data?.message || "Failed to fetch products";
        }
    } catch (err) {
        console.error(err);
        errorMsg.value = err.response?.data?.message || err.message || "Something went wrong";
    } finally {
        loading.value = false;
    }
}










const form = ref({
    user_id: "",
    product_id: '',
});


const handleSubmit = async () => {
    // ২. সাবমিশন শুরু (Loading Start)
    loading.value = true;

    try {
        // ৩. API কল (আপনার ব্যাকএন্ড URL অনুযায়ী পরিবর্তন করুন)
        const response = await api.post('/customer/orders/store', {
            product_id: form.value.product_id,
            user_id: form.value.user_id
        });

        // ৪. সফল হলে রেসপন্স হ্যান্ডেল
        if (response.data.success) {
            successMsg.value = response.data.message;
            // ফর্ম রিসেট করুন
            form.value.product_id = '';
            form.value.user_id = '';
        }
    } catch (error) {
        console.log(error.response?.data || error.message);
        errorMsg.value = error.response?.data?.message || "Server Error";
    } finally {
        // ৬. লোডিং শেষ (Loading End)
        loading.value = false;
    }
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