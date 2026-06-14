<template>
    <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
        <Header
            @open-sidebar="sidebarOpen = true"
            @search="onSearch"
            :isDark="isDark" @toggle-theme="toggleTheme"
        />

        <div class="flex min-h-[calc(100vh-56px)]">
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
            <div class="min-h-screen w-full bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300 p-4 lg:p-8 font-sans antialiased text-slate-800 dark:text-slate-200">
                <div class=" mx-auto bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xl rounded-2xl overflow-hidden backdrop-blur-md">
                
                    <header class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 px-6 py-5 bg-slate-50/30 dark:bg-slate-900/40">
                        <div class="flex items-center gap-3">
                        <div class="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                            <i class="fa-brands fa-opencart text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Marketing Strategy</h2>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Earning structure, points policy & rank rewards</p>
                        </div>
                        </div>

                        <span class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active Plan
                        </span>
                    </header>

                    <div class="p-6 space-y-8">
                        
                        <div class="relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50/40 dark:from-amber-950/20 dark:to-transparent border-l-4 border-amber-500 p-5 rounded-r-xl shadow-sm">
                            <div class="flex items-start gap-3.5">
                                <div class="p-2 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-lg text-sm">
                                    <i class="fa-solid fa-triangle-exclamation"></i>
                                </div>
                                <div class="space-y-1">
                                    <h3 class="text-sm font-bold text-amber-900 dark:text-amber-400 tracking-wide">গুরুত্ব পূর্ণ নোটিশ (Account Deactivation Policy)</h3>
                                    <p class="text-xs text-amber-800 dark:text-amber-500/90 leading-relaxed font-medium">
                                        প্রতি মাসে সর্বনিম্ন <strong class="underline decoration-2 underline-offset-2 text-amber-950 dark:text-amber-300">১০০ পয়েন্ট</strong> পারচেজ না করলে আইডি স্বয়ংক্রিয়ভাবে ডিঅ্যাক্টিভ (Deactive) হয়ে যাবে।
                                    </p>
                                </div>
                            </div>
                        </div>

                        <section class="space-y-4">
                            <div class="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                                <div class="w-1 h-5 bg-indigo-500 rounded-full"></div>
                                <h3 class="text-base font-bold tracking-tight text-slate-900 dark:text-white">ইর্নিং ও পয়েন্ট পলিসি (Income Structure)</h3>
                            </div>
                        
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div class="group bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div class="flex justify-between items-start">
                                        <span class="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-lg border border-emerald-200/40 dark:border-emerald-800/30">Direct Income</span>
                                        <i class="fa-solid fa-user-plus text-slate-400 group-hover:text-emerald-500 transition-colors"></i>
                                    </div>
                                    <h4 class="text-sm font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-tight">Per Refer Bonus</h4>
                                    <p class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">৳ ২০০</p>
                                    <p class="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">প্রতিটি সফল ডিরেক্ট রেফারেলের জন্য তাত্ক্ষণিক বোনাস।</p>
                                </div>

                                <div class="group bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div class="flex justify-between items-start">
                                        <span class="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 rounded-lg border border-blue-200/40 dark:border-blue-800/30">Binary Matching</span>
                                        <i class="bi bi-diagram-2-fill text-slate-400 group-hover:text-blue-500 transition-colors"></i>
                                    </div>
                                    <h4 class="text-sm font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-tight">Matching Bonus</h4>
                                    <p class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">৳ ১০০</p>
                                    <p class="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">লেফট এবং রাইট উভয় গ্রুপের সফল বাইনারি ম্যাচিং বোনাস।</p>
                                </div>

                                <div class="group bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div class="flex justify-between items-start">
                                        <span class="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-lg border border-indigo-200/40 dark:border-indigo-800/30">Upline Reward</span>
                                        <i class="fa-solid fa-arrow-turn-up text-slate-400 group-hover:text-indigo-500 transition-colors"></i>
                                    </div>
                                    <h4 class="text-sm font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-tight">Refer Point Gen</h4>
                                    <p class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">১০০ <span class="text-lg font-medium text-slate-400">Pt</span></p>
                                    <p class="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">নতুন রেফারে জেনারেশনের উপরের লেভেলের সবাই ১০০ পয়েন্ট পাবেন।</p>
                                </div>

                                <div class="group bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div class="flex justify-between items-start">
                                        <span class="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 rounded-lg border border-purple-200/40 dark:border-purple-800/30">Purchase Value</span>
                                        <i class="fa-solid fa-bag-shopping text-slate-400 group-hover:text-purple-500 transition-colors"></i>
                                    </div>
                                    <h4 class="text-sm font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-tight">User Purchase Profit</h4>
                                    <p class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">১ Pt = ৳ ২</p>
                                    <p class="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">ইউজার প্রোডাক্ট পারচেজ করলে উপরের সবাই প্রতি পয়েন্টে ২ টাকা পাবেন।</p>
                                </div>
                            </div>
                        </section>

                        <section class="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div class="relative overflow-hidden bg-gradient-to-b from-indigo-600 to-indigo-700 dark:from-slate-900 dark:to-slate-900/80 p-6 rounded-2xl text-white dark:border dark:border-slate-800 shadow-md">
                                <div class="absolute -right-6 -bottom-6 text-white/[0.06] text-8xl font-black select-none"><i class="fa-solid fa-star"></i></div>
                                <span class="text-[10px] uppercase font-bold tracking-widest text-indigo-200 dark:text-indigo-400">Club Level 4</span>
                                <h4 class="text-lg font-bold mt-1 flex items-center gap-2 text-white"><i class="fa-solid fa-star text-amber-400 text-sm"></i> Star Club</h4>
                                <p class="text-xs mt-3 text-indigo-100/90 dark:text-slate-400 leading-relaxed font-medium">১০ জন ডিরেক্ট স্পন্সর (10 Direct Sponsor) সফলভাবে সম্পন্ন করলে স্টার ক্লাব মেম্বারশিপ অ্যাক্টিভ হবে।</p>
                            </div>

                        <div class="relative overflow-hidden bg-gradient-to-b from-purple-600 to-purple-700 dark:from-slate-900 dark:to-slate-900/80 p-6 rounded-2xl text-white dark:border dark:border-slate-800 shadow-md">
                            <div class="absolute -right-6 -bottom-6 text-white/[0.06] text-8xl font-black select-none"><i class="fa-solid fa-rocket"></i></div>
                            <span class="text-[10px] uppercase font-bold tracking-widest text-purple-200 dark:text-purple-400">Club Level 5</span>
                            <h4 class="text-lg font-bold mt-1 flex items-center gap-2 text-white"><i class="fa-solid fa-rocket text-indigo-300 text-sm"></i> Dynamic Club</h4>
                            <p class="text-xs mt-3 text-purple-100/90 dark:text-slate-400 leading-relaxed font-medium">আপনার ডাউনলাইন টিমে ১০ জন ডিরেক্ট স্টার (10 Direct Star) মেম্বার থাকলে ডায়নামিক ক্লাবে উন্নীত হবেন।</p>
                        </div>

                        <div class="relative overflow-hidden bg-gradient-to-b from-slate-800 to-slate-950 dark:from-slate-900 dark:to-slate-950 p-6 rounded-2xl text-white border border-slate-700 dark:border-slate-800 shadow-md">
                            <div class="absolute -right-6 -bottom-6 text-white/[0.04] text-8xl font-black select-none"><i class="fa-solid fa-building"></i></div>
                            <span class="text-[10px] uppercase font-bold tracking-widest text-amber-400">Level 6 Executive</span>
                            <h4 class="text-lg font-bold mt-1 flex items-center gap-2 text-amber-400"><i class="fa-solid fa-briefcase text-sm"></i> Company Dealership</h4>
                            <p class="text-xs mt-3 text-slate-300 dark:text-slate-400 leading-relaxed font-medium">অফিস সেলসের ওপর গ্লোবাল রয়্যালটি, আকর্ষণীয় হ্যান্ডেলিং মার্জিন বা ডিলারশিপের বিশেষ প্রাতিষ্ঠানিক সুবিধা।</p>
                        </div>
                        </section>

                        <section class="space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                            <div class="flex items-center gap-2">
                            <div class="w-1 h-5 bg-indigo-500 rounded-full"></div>
                            <h3 class="text-base font-bold tracking-tight text-slate-900 dark:text-white">র‍্যাঙ্ক এচিভমেন্ট ও রিওয়ার্ড লিস্ট</h3>
                            </div>
                            <span class="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-md border border-slate-200/40 dark:border-slate-700/40">
                            <i class="fa-solid fa-shield-halved text-[10px]"></i> Structure Target
                            </span>
                        </div>

                        <div class="overflow-x-auto rounded-xl border border-slate-200/70 dark:border-slate-800/80 shadow-sm bg-white dark:bg-slate-900">
                            <table class="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr class="bg-slate-50 dark:bg-slate-800/40 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200/70 dark:border-slate-800/80">
                                <th class="px-6 py-4">Rank Designation</th>
                                <th class="px-6 py-4">A - Group (Pt)</th>
                                <th class="px-6 py-4">B - Group (Pt)</th>
                                <th class="px-6 py-4">Cash Bonus</th>
                                <th class="px-6 py-4">Gift & Premium Tour</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                                <tr v-for="rank in rankData" :key="rank.name" class="hover:bg-slate-50/60 dark:hover:bg-slate-800/20 transition-colors duration-150">
                                <td class="px-6 py-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{{ rank.name }}
                                </td>
                                <td class="px-6 py-3.5 text-slate-600 dark:text-slate-400 font-mono">{{ rank.aGroup }}</td>
                                <td class="px-6 py-3.5 text-slate-600 dark:text-slate-400 font-mono">{{ rank.bGroup }}</td>
                                <td class="px-6 py-3.5 font-bold text-emerald-600 dark:text-emerald-400 font-mono">{{ rank.cash }}</td>
                                <td class="px-6 py-3.5 text-slate-700 dark:text-slate-300 font-semibold tracking-wide">
                                    <span :class="rank.gift.includes('+') ? 'text-indigo-600 dark:text-indigo-400' : ''">{{ rank.gift }}</span>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </section>

                    </div>

                    <footer class="bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/60 px-6 py-4">
                        <div class="flex items-center gap-2.5 justify-center text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <i class="fa-solid fa-circle-info text-indigo-500 text-[14px]"></i>
                        <p class="leading-relaxed">নিয়মাবলী ২: স্টার ক্লাব ও ডায়নামিক ক্লাব এর সদস্য এবং র‍্যাঙ্ক অর্জনকারী লিডারদের প্রতি সপ্তাহে মিনিমাম ১ টি কোম্পানির মিটিং এ উপস্থিত থাকতে হবে।</p>
                        </div>
                    </footer>
                
                </div>
            </div>
        </div>
        <FooterSection />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../../services/api.js';

import Navbar from "../navbar.vue";
import Header from "../header.vue";
import Message from '../../../Message/message.vue';
import FooterSection from "../../../e-commerce/footer.vue";

const router = useRouter();

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');

const active = ref('dashboard');








const rankData = ref([
  { name: 'SILVER', aGroup: '10,000', bGroup: '10,000', cash: '5,000 TK', gift: 'GIFT' },
  { name: 'GOLD', aGroup: '20,000', bGroup: '20,000', cash: '10,000 TK', gift: 'SMART PHONE' },
  { name: 'PLATINUM', aGroup: '50,000', bGroup: '50,000', cash: '25,000 TK', gift: 'BRAND NEW TAB' },
  { name: 'DIAMOND', aGroup: '100,000', bGroup: '100,000', cash: '50,000 TK', gift: 'BRAND NEW LAPTOP' },
  { name: 'BLUE DIAMOND', aGroup: '200,000', bGroup: '200,000', cash: '100,000 TK', gift: 'INTERNATIONAL TOUR' },
  { name: 'GREEN DIAMOND', aGroup: '500,000', bGroup: '500,000', cash: '250,000 TK', gift: 'BIKE + INTERNATIONAL TOUR' },
  { name: 'PURPLE DIAMOND', aGroup: '1,000,000', bGroup: '1,000,000', cash: '500,000 TK', gift: 'SPECIAL BIKE + INTERNATIONAL TOUR' },
  { name: 'RED DIAMOND', aGroup: '2,000,000', bGroup: '2,000,000', cash: '1,000,000 TK', gift: 'LAND + INTERNATIONAL TOUR' },
  { name: 'BLACK DIAMOND', aGroup: '5,000,000', bGroup: '5,000,000', cash: '2,500,000 TK', gift: 'CAR + INTERNATIONAL TOUR' },
  { name: 'ELITE DIAMOND', aGroup: '10,000,000', bGroup: '10,000,000', cash: '5,000,000 TK', gift: 'FLAT + INTERNATIONAL TOUR' },
  { name: 'ROYAL DIAMOND', aGroup: '20,000,000', bGroup: '20,000,000', cash: '1-CORE', gift: 'SPECIAL FLAT + INTERNATIONAL TOUR' },
  { name: 'CROWN DIAMOND', aGroup: '50,000,000', bGroup: '50,000,000', cash: '2.5-CORE', gift: 'APARTMENT + INTERNATIONAL TOUR' },
])








// dark and light mode
const isDark = ref(false);
const sidebarOpen = ref(false);

function applyTheme(dark) {
    isDark.value = dark;   // VERY IMPORTANT
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
}

function toggleTheme() {
    applyTheme(!isDark.value);
}

function onSearch(q) {
    // console.log("search:", q);
}


/* ESC to close drawer */
onMounted(() => {
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
/* Smooth theme switching transition */
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}
</style>