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
                
                    <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h2 class="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                                User Statement
                            </h2>
                            <span v-if="loading" class="text-xs font-bold text-indigo-500 animate-pulse">Loading...</span>
                            <span v-else class="text-xs font-bold text-indigo-500">Total: {{ statements.length }} Records</span>
                        </div>

                        <div class="overflow-x-auto">
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
                                    <tr v-for="(item, index) in statements" :key="index"
                                        class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                        
                                        <td class="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">
                                            {{ item.user.name }}
                                        </td>

                                        <td class="px-4 py-3">
                                            <span class="px-2 py-1 text-[10px] rounded-full font-black uppercase tracking-tighter"
                                                :class="{
                                                    'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10': item.type === 'bonus',
                                                    
                                                    'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10': item.type === 'matching',
                                                    
                                                    'bg-blue-100 text-blue-600 dark:bg-blue-500/10': item.type === 'earn',
                                                    
                                                    'bg-red-100 text-red-600 dark:bg-red-500/10': item.type === 'withdraw'
                                                }">
                                                {{ item.type }}
                                            </span>
                                        </td>

                                        <td class="px-4 py-3 font-bold" :class="item.points > 0 ? 'text-indigo-600' : 'text-slate-400'">
                                            {{ item.points }}
                                        </td>

                                        <td class="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                                            {{ item.bonus_amount > 0 ? '$' + item.bonus_amount : '—' }}
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
                                            {{ item.reference_id ? '#' + item.reference_id : '—' }}
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
        // লোডিং বন্ধ হবে সফল হোক বা ব্যর্থ
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