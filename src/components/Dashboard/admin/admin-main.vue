<template>
    <main class="min-h-screen bg-gray-50 dark:bg-[#0C1326]">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 py-5">

            <!-- Top bar (Title + optional actions/search) -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard Overview</h1>
                    <p class="text-sm text-gray-700 dark:text-slate-300">Dynamic Bazar Merchant BD summary & performance</p>
                </div>

                <!-- Optional: right side button -->
                <!-- <div class="flex items-center gap-3">
                    <button class="rounded-xl px-4 py-2 text-sm font-semibold bg-slate-200 dark:bg-white/10 
                    dark:text-white border border-white/10 hover:bg-white/15 transition">Export</button>
                </div> -->
            </div>


            <!-- =========================== Profile Card Section =========================== -->
            <profileCard :user="user" />
            <!-- =========================== Profile Card Section =========================== -->


            <!-- =========================== Balance Section =========================== -->
            <div class="space-y-6 mb-8">

                <div class="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900 p-6 shadow-xl shadow-indigo-100/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
                    <div class="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
                    <div class="absolute -bottom-12 left-1/3 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"></div>
                    
                    <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div class="space-y-2">
                            <div class="flex items-center gap-2.5">
                                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                    <i class="fa-solid fa-wallet text-sm"></i>
                                </div>
                                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Available Wallet Balance</span>
                                <span class="relative flex h-2 w-2">
                                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                </span>
                            </div>
                            <div class="flex items-baseline text-white">
                                <span class="text-2xl font-medium text-slate-500 mr-2">৳</span>
                                <h2 class="font-mono text-4xl font-black tracking-tight">{{ balance ?? 0 }}</h2>
                            </div>
                        </div>

                        <div class="flex items-center sm:text-right gap-4 sm:border-l sm:border-slate-800 sm:pl-6">
                            <div class="hidden sm:block">
                                <p class="text-[10px] text-slate-400 font-medium">Instant Withdrawals Available</p>
                                <p class="text-[11px] font-semibold italic text-indigo-400 mt-0.5">Min: ৳500</p>
                            </div>
                            <button @click="WithdrawCreate()" class="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg active:scale-[0.97]">
                                Payout Request
                            </button>
                        </div>
                    </div>
                </div>

                <div class="space-y-8">
                    <!-- ================= SECTION 1: PRIMARY ESCROW & EARNINGS OVERVIEW ================= -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        <!-- CARD 1: PENDING ESCROW (SOFT AMBER ACCENT) -->
                        <div class="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-amber-200 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-amber-500/30">
                            <div class="relative flex h-full flex-col justify-between min-h-[140px]">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2.5">
                                        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400">
                                            <i class="fa-solid fa-clock-rotate-left text-sm"></i>
                                        </div>
                                        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Pending Escrow</span>
                                    </div>
                                    <span class="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 border border-amber-200/40 dark:bg-amber-500/10 dark:text-amber-400 dark:border-transparent">In Process</span>
                                </div>
                                <div class="my-3 flex items-baseline text-slate-900 dark:text-white">
                                    <span class="text-2xl font-medium text-slate-400 dark:text-slate-500 mr-1.5">৳</span>
                                    <h2 class="font-mono text-3xl font-extrabold tracking-tight">{{ pending ?? 0 }}</h2>
                                </div>
                                <div class="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/50">
                                    <span class="text-[11px] font-medium text-slate-400">Locked for review</span>
                                    <a href="#" class="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                        <span>Details</span>
                                        <svg class="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- CARD 2: WITHDRAW ESCROW (SOFT PURPLE ACCENT) -->
                        <div class="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-purple-200 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-purple-500/30">
                            <div class="relative flex h-full flex-col justify-between min-h-[140px]">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2.5">
                                        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 text-purple-600 dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-400">
                                            <i class="fa-solid fa-hand-holding-dollar text-sm"></i>
                                        </div>
                                        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Withdraw Escrow</span>
                                    </div>
                                    <span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-700 border border-purple-200/40 dark:bg-purple-500/10 dark:text-purple-400 dark:border-transparent">In Process</span>
                                </div>

                                <div class="mt-3 flex items-baseline text-slate-900 dark:text-white">
                                    <span class="text-2xl font-medium text-slate-400 dark:text-slate-500 mr-1.5">৳</span>
                                    <h2 class="font-mono text-3xl font-extrabold tracking-tight">{{ totalWithdraw ?? 0 }}</h2>
                                </div>

                                <div class="mb-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                                    <span>Withdraw Fee (10%)</span>
                                    <span class="font-mono font-medium text-amber-600 dark:text-amber-400">
                                        - ৳{{ (totalWithdraw ?? 0) > 0 ? ((totalWithdraw / 0.9) * 0.1) : 0 }}
                                    </span>
                                </div>

                                <div class="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/50">
                                    <span class="text-[11px] font-medium text-slate-400">Payout processing</span>
                                    <a href="#" class="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                        <span>Details</span>
                                        <svg class="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- CARD 3: REFER BONUS (SOFT INDIGO ACCENT) -->
                        <div class="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-indigo-200 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-indigo-500/30">
                            <div class="relative flex h-full flex-col justify-between min-h-[140px]">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2.5">
                                        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400">
                                            <i class="fa-solid fa-comment-dollar text-sm"></i>
                                        </div>
                                        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Refer Bonus</span>
                                    </div>
                                    <span class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 border border-indigo-200/40 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-transparent">Direct Reward</span>
                                </div>
                                <div class="my-3 flex items-baseline text-slate-900 dark:text-white">
                                    <span class="text-2xl font-medium text-slate-400 dark:text-slate-500 mr-1.5">৳</span>
                                    <h2 class="font-mono text-3xl font-extrabold tracking-tight">{{ bonus ?? 0 }}</h2>
                                </div>
                                <div class="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/50">
                                    <span class="text-[11px] font-medium text-slate-400">Sponsor earnings</span>
                                    <a href="#" class="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                        <span>Details</span>
                                        <svg class="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- CARD 4: TOTAL EARNINGS (SOFT EMERALD ACCENT) -->
                        <div class="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-emerald-200 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-emerald-500/30">
                            <div class="relative flex h-full flex-col justify-between min-h-[140px]">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2.5">
                                        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400">
                                            <i class="fa-solid fa-money-bill-wheat text-sm"></i>
                                        </div>
                                        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Earnings</span>
                                    </div>
                                    <span class="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200/40 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-transparent">Lifetime</span>
                                </div>
                                <div class="my-3 flex items-baseline text-slate-900 dark:text-white">
                                    <span class="text-2xl font-medium text-slate-400 dark:text-slate-500 mr-1.5">৳</span>
                                    <h2 class="font-mono text-3xl font-extrabold tracking-tight">{{ availableBalance.toLocaleString() }}</h2>
                                </div>
                                <div class="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/50">
                                    <span class="text-[11px] font-medium text-slate-400">All time transactions</span>
                                    <a href="#" class="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                        <span>Statement</span>
                                        <svg class="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- ================= SECTION 2: BINARY & TRANSACTION ANALYTICS ================= -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                            
                        <!-- CARD 5: BINARY MATCHING (SKY BLUE ACCENT) -->
                        <div class="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-5 transition-all duration-300 hover:border-sky-200 hover:shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-sky-500/20">
                            <div class="flex items-center gap-3">
                                <!-- Icon Wrapper -->
                                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 border border-sky-100 text-sky-600 dark:bg-sky-500/10 dark:border-transparent dark:text-sky-400">
                                    <i class="fa-solid fa-circle-nodes text-base"></i>
                                </div>
                                <div>
                                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Matching Bonus</p>
                                    <h4 class="font-mono text-xl font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                                        <span class="text-slate-400 dark:text-slate-500 font-sans text-lg font-medium mr-0.5">৳</span>{{ matching ?? 0 }}
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <!-- CARD 6: GENUINE EARN (CYAN ACCENT) -->
                        <div class="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-5 transition-all duration-300 hover:border-cyan-200 hover:shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-cyan-500/20">
                            <div class="flex items-center gap-3">
                                <!-- Icon Wrapper -->
                                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 border border-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:border-transparent dark:text-cyan-400">
                                    <i class="fa-solid fa-arrow-trend-up text-base"></i>
                                </div>
                                <div>
                                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Net Earned</p>
                                    <h4 class="font-mono text-xl font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                                        <span class="text-slate-400 dark:text-slate-500 font-sans text-lg font-medium mr-0.5">৳</span>{{ earn ?? 0 }}
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <!-- CARD 7: DEBIT / SPEND (ROSE ACCENT) -->
                        <div class="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-5 transition-all duration-300 hover:border-rose-200 hover:shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-rose-500/20">
                            <div class="flex items-center gap-3">
                                <!-- Icon Wrapper -->
                                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 border border-rose-100 text-rose-600 dark:bg-rose-500/10 dark:border-transparent dark:text-rose-400">
                                    <i class="fa-solid fa-wallet text-base"></i>
                                </div>
                                <div>
                                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Spend / Debit</p>
                                    <h4 class="font-mono text-xl font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                                        <span class="text-slate-400 dark:text-slate-500 font-sans text-lg font-medium mr-0.5">৳</span>{{ spend ?? debit ?? 0 }}
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <!-- CARD 8: REFUNDED AMOUNT (TEAL ACCENT) -->
                        <div class="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-5 transition-all duration-300 hover:border-teal-200 hover:shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-teal-500/20">
                            <div class="flex items-center gap-3">
                                <!-- Icon Wrapper -->
                                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 border border-teal-100 text-teal-600 dark:bg-teal-500/10 dark:border-transparent dark:text-teal-400">
                                    <i class="fa-solid fa-arrow-rotate-left text-base"></i>
                                </div>
                                <div>
                                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Refund Capital</p>
                                    <h4 class="font-mono text-xl font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                                        <span class="text-slate-400 dark:text-slate-500 font-sans text-lg font-medium mr-0.5">৳</span>{{ refund ?? 0 }}
                                    </h4>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <!-- =========================== Balance Section =========================== -->





            <!-- =========================== Card Section =========================== -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div 
                    v-for="card in statusCards" 
                    :key="card.key" 
                    class="group relative overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100 dark:border-slate-800/80 dark:bg-slate-900 dark:hover:shadow-none">
                    <div class="flex h-full flex-col justify-between min-h-[140px]">
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                        <div :class="['flex h-10 w-10 items-center justify-center rounded-xl border border-transparent', card.iconWrap]">
                            <i :class="card.icon" class="text-base"></i>
                        </div>
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {{ card.title }}
                        </span>
                        </div>
                        <span class="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-100 dark:bg-slate-800/50 dark:text-slate-400 dark:border-transparent">
                        {{ card.pill }}
                        </span>
                    </div>

                    <div class="my-4 flex items-baseline text-slate-900 dark:text-white">
                        <h2 class="font-mono text-3xl font-black tracking-tight">
                        {{ card.value ?? 0 }}
                        </h2>
                    </div>

                    <div class="flex items-center gap-1.5 border-t border-slate-50 pt-3 dark:border-slate-800/40 text-slate-800 dark:text-slate-100">
                        <i :class="[card.subIcon, card.subtextClass]" class="text-[11px]"></i>
                        <span :class="['text-[11px] font-semibold tracking-wide', card.subtextClass]">
                        {{ card.subtext }}
                        </span>
                    </div>
                    </div>
                </div>
            </div>
            <!-- =========================== Card Section =========================== -->
        </div>
        <FooterSection />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import api from "../../../services/api";

const router = useRouter();

const loading = ref(false);
const errorMsg = ref("");


/* ====================== */
/* Dashboard component */
/* ====================== */
import FooterSection from "../../e-commerce/footer.vue";
import profileCard from "./dashboard/profile-card.vue";







const balance = ref(0);
const pending = ref(0);

const credit = ref(0);
const debit = ref(0);

const earn = ref(0);
const spend = ref(0);
const bonus = ref(0);
const matching = ref(0);
const withdraw = ref(0);
const totalWithdraw = ref(0);
const refund = ref(0);
const user = ref([]);

const fetchDashBoardData = async () => {
    try {
        loading.value = true;
        errorMsg.value = null;

        const response = await api.get('/customer/dashboard'); 

        if (response.data.success === true) {
            const data          = response.data.data;
            balance.value       = Number(data.balance ?? 0);
            pending.value       = Number(data.pending ?? 0);

            credit.value        = Number(data.credit ?? 0);
            debit.value         = Number(data.debit ?? 0);

            earn.value          = Number(data.earn ?? 0);
            spend.value         = Number(data.spend ?? 0);
            bonus.value         = Number(data.bonus ?? 0);
            matching.value      = Number(data.matching ?? 0);
            withdraw.value      = Number(data.withdraw ?? 0);
            totalWithdraw.value = Number(data.totalWithdraw ?? 0);
            refund.value        = Number(data.refund ?? 0);

            status.value        = data.status ?? {};
            user.value          = data.user ?? {};
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

function WithdrawCreate()
{
    router.push('/withdraw/create');
}




const availableBalance = computed(() => {
    return Math.max(
        (Number(credit.value) || 0) - (Number(refund.value) || 0),
        0
    );
});







const status = ref({
    total_member: 0,
    total_refer: 0,
    total_point: 0,
    total_match: 0,
    left_member: 0,
    right_member: 0,
    left_point: 0,
    right_point: 0,
    left_carry: 0,
    right_carry: 0,
});

// Shobgulo variable map kora dynamic block setup
const statusCards = computed(() => [
    // === GROUP 1: GLOBAL PLATFORM OVERVIEW ===
    {
        key: "total_member",
        group: "Global Overview",
        title: "Total Members",
        value: status.value.total_member,
        icon: "fa-solid fa-users",
        iconWrap: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        pill: "Global Size",
        subIcon: "fa-solid fa-network-wired",
        subtext: "Entire downline size",
    },
    {
        key: "total_refer",
        group: "Global Overview",
        title: "Total Referrals",
        value: status.value.total_refer,
        icon: "fa-solid fa-user-plus",
        iconWrap: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
        pill: "Direct",
        subIcon: "fa-solid fa-star",
        subtext: "Personally sponsored",
    },
    {
        key: "total_point",
        group: "Global Overview",
        title: "Total Points (OWN)",
        value: status.value.total_point,
        icon: "fa-solid fa-chart-bar",
        iconWrap: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
        pill: "Business Volume",
        subIcon: "fa-solid fa-layer-group",
        subtext: "Cumulative point count",
    },
    {
        key: "total_match",
        group: "Global Overview",
        title: "Total Matching",
        value: status.value.total_match,
        icon: "fa-solid fa-circle-nodes",
        iconWrap: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        pill: "Matching Metrics",
        subIcon: "fa-solid fa-bolt",
        subtext: "Cycles successfully closed",
    },

    // === GROUP 2: LEFT BINARY LEG STATS ===
    {
        key: "left_member",
        group: "Left Leg Analytics",
        title: "A Team Members",
        value: status.value.left_member,
        icon: "fa-solid fa-arrow-turn-down",
        iconWrap: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
        pill: "A Team",
        subIcon: "fa-solid fa-user-group",
        subtext: "Total users on Left Side",
    },
    {
        key: "right_member",
        group: "Right Leg Analytics",
        title: "B Team Members",
        value: status.value.right_member,
        icon: "fa-solid fa-arrow-turn-down",
        iconWrap: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
        pill: "B Team",
        subIcon: "fa-solid fa-user-group",
        subtext: "Total users on Right Side",
    },
    {
        key: "left_point",
        group: "Left Leg Analytics",
        title: "A Team Points",
        value: status.value.left_point,
        icon: "fa-solid fa-arrow-trend-up",
        iconWrap: "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
        pill: "A Volume",
        subIcon: "fa-solid fa-cubes",
        subtext: "Current active points",
    },
    {
        key: "right_point",
        group: "Right Leg Analytics",
        title: "B Team Points",
        value: status.value.right_point,
        icon: "fa-solid fa-arrow-trend-up",
        iconWrap: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
        pill: "B Volume",
        subIcon: "fa-solid fa-cubes",
        subtext: "Current active points",
    },
    {
        key: "left_carry",
        group: "Left Leg Analytics",
        title: "A Team Carry",
        value: status.value.left_carry,
        icon: "fa-solid fa-forward",
        iconWrap: "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400",
        pill: "Left Carry",
        subIcon: "fa-solid fa-box-archive",
        subtext: "Stored points for next match",
    },
    {
        key: "right_carry",
        group: "Right Leg Analytics",
        title: "B Carry",
        value: status.value.right_carry,
        icon: "fa-solid fa-forward",
        iconWrap: "bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
        pill: "Right Carry",
        subIcon: "fa-solid fa-box-archive",
        subtext: "Stored points for next match",
    },
]);

















function formatCount(value) {
    const num = Number(value) || 0;

    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }

    return num.toString();
}

















onMounted(() => {
    fetchDashBoardData();
});
</script>

<style>

</style>