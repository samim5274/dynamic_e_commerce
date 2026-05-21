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
                    <div class="max-w-4xl mx-auto">
                        <!-- Header Section -->
                        <div class="mb-8">
                            <h1 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Request Withdrawal</h1>
                            <p class="text-sm text-slate-500 mt-1">Submit your withdrawal request. Funds will be processed within 48 hours.</p>
                        </div>

                        <form @submit.prevent="submit" class="space-y-6">
                            
                            <!-- Amount Selection Card -->
                            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
    
                                    <!-- Left Side: Icon & Title -->
                                    <div class="flex items-center gap-3">
                                        <div class="flex-shrink-0 p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                                            <i class="fa-solid fa-money-bill-transfer text-white"></i>
                                        </div>
                                        <div>
                                            <h3 class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Withdrawal</h3>
                                            <p class="text-lg font-black text-slate-800 dark:text-white">Amount Details</p>
                                        </div>
                                    </div>

                                    <!-- Right Side: Balance Badge -->
                                    <div class="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <span class="text-[10px] font-bold uppercase text-slate-400">Available:</span>
                                        <div class="flex items-baseline">
                                            <span class="text-sm font-bold text-indigo-600 dark:text-indigo-400 mr-0.5">৳</span>
                                            <span class="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                                                {{ balance ?? 0 }}
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                <div class="space-y-4">
                                    <div>
                                        <label class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">Enter Amount (৳)</label>
                                        <div class="relative">
                                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">৳</span>
                                            <input type="number" v-model="form.amount" name="amount" placeholder="0.00" :min="500" :max="balance"
                                                class="w-full pl-10 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-xl font-bold text-slate-800 dark:text-white transition-all">
                                        </div>
                                        <div class="flex justify-between mt-2 px-1">
                                            <span class="text-[11px] text-slate-400">Available: ৳{{ balance }}</span>
                                            <span class="text-[11px] text-red-400 font-medium italic">Min: ৳500</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Method Selection -->
                            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm">
                                <!-- Section Header -->
                                <div class="flex items-center justify-between mb-8">
                                    <div class="flex items-center gap-3">
                                        <div class="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
                                            <i class="fa-solid fa-building-columns text-emerald-600 dark:text-emerald-500"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-black text-slate-800 dark:text-white tracking-tight">Payment Method</h3>
                                            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Select your destination</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Method Selection Grid -->
                                <div class="grid grid-cols-2 gap-4 mb-8">
                                    <!-- Method: Bank -->
                                    <label class="relative group cursor-pointer">
                                        <input type="radio" v-model="form.payment_method" name="payment_method" value="bank" class="peer absolute opacity-0" checked>
                                        <div class="flex flex-col items-center justify-center p-5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 transition-all duration-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-50/50 dark:peer-checked:bg-indigo-500/5 group-hover:border-slate-300 dark:group-hover:border-slate-600">
                                            <div class="w-10 h-10 mb-3 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                                                <i class="fa-solid fa-bank text-lg text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors"></i>
                                            </div>
                                            <span class="text-xs font-black text-slate-600 dark:text-slate-400 peer-checked:text-indigo-600 dark:peer-checked:text-indigo-400 uppercase tracking-tighter">Bank Transfer</span>
                                            <div class="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity">
                                                <i class="fa-solid fa-circle-check text-indigo-500"></i>
                                            </div>
                                        </div>
                                    </label>

                                    <!-- Method: Mobile Wallet -->
                                    <label class="relative group cursor-pointer">
                                        <input type="radio" v-model="form.payment_method" name="payment_method" value="mobile" class="peer absolute opacity-0">
                                        <div class="flex flex-col items-center justify-center p-5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 transition-all duration-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-50/50 dark:peer-checked:bg-indigo-500/5 group-hover:border-slate-300 dark:group-hover:border-slate-600">
                                            <div class="w-10 h-10 mb-3 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                                                <i class="fa-solid fa-mobile-screen-button text-lg text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors"></i>
                                            </div>
                                            <span class="text-xs font-black text-slate-600 dark:text-slate-400 peer-checked:text-indigo-600 dark:peer-checked:text-indigo-400 uppercase tracking-tighter">Mobile Wallet</span>
                                            <div class="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity">
                                                <i class="fa-solid fa-circle-check text-indigo-500"></i>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <!-- Input Wrapper -->
                                <div class="p-1 bg-slate-50 dark:bg-slate-950/50 rounded-[1.5rem]">
                                    
                                    <!-- Dynamic Fields Wrapper -->
                                    <div id="bank_fields" class="p-5 space-y-5">
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <!-- Bank / Wallet Name (উভয় মেথডেই দেখাবে, কিন্তু লেবেল পরিবর্তন হবে) -->
                                            <div class="space-y-2">
                                                <label class="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 ml-1">
                                                    <i :class="form.payment_method === 'mobile' ? 'fa-solid fa-wallet' : 'fa-solid fa-building-columns'" class="opacity-50"></i> 
                                                    {{ form.payment_method === 'mobile' ? 'Wallet Name' : 'Bank Name' }} <span class="text-rose-500 text-xs">*</span>
                                                </label>
                                                
                                                <!-- যদি মোবাইল ওয়ালেট হয়, ড্রপডাউন দিলে ইউজার এক্সপেরিয়েন্স সবচেয়ে ভালো হয় -->
                                                <select v-if="form.payment_method === 'mobile'" v-model="form.bank_name" name="bank_name"
                                                    class="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-200 transition-all">
                                                    <option value="" disabled selected>Select Wallet</option>
                                                    <option value="bKash">bKash</option>
                                                    <option value="Nagad">Nagad</option>
                                                    <option value="Rocket">Rocket</option>
                                                    <option value="Upay">Upay</option>
                                                </select>

                                                <!-- ব্যাংক সিলেক্ট করা থাকলে নরমাল ইনপুট বক্স দেখাবে -->
                                                <input v-else type="text" v-model="form.bank_name" name="bank_name" placeholder="e.g. Dutch Bangla Bank" 
                                                    class="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-200 transition-all">
                                            </div>

                                            <!-- Account Holder Name (উভয় মেথডেই দেখাবে) -->
                                            <div class="space-y-2">
                                                <label class="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 ml-1">
                                                    <i class="fa-solid fa-user-tag opacity-50"></i> Account Holder Name <span class="text-rose-500 text-xs">*</span>
                                                </label>
                                                <input type="text" v-model="form.account_holder_name" name="account_holder_name" 
                                                    :placeholder="form.payment_method === 'mobile' ? 'Receiver Name / Your Name' : 'Name on bank account'" 
                                                    class="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-200 transition-all">
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <!-- Account / Mobile Number (উভয় মেথডেই দেখাবে, লেবেল চেঞ্জ হবে) -->
                                            <div class="space-y-2">
                                                <label class="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 ml-1">
                                                    <i :class="form.payment_method === 'mobile' ? 'fa-solid fa-phone' : 'fa-solid fa-hashtag'" class="opacity-50"></i> 
                                                    {{ form.payment_method === 'mobile' ? 'Mobile Number' : 'Account Number' }} <span class="text-rose-500 text-xs">*</span>
                                                </label>
                                                <input type="text" v-model="form.account_number" name="account_number" 
                                                    :placeholder="form.payment_method === 'mobile' ? 'e.g. 017XXXXXXXX' : 'Enter bank account number'" 
                                                    class="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-200 transition-all">
                                            </div>

                                            <!-- Routing Number (শুধুমাত্র ব্যাংক সিলেক্ট করা থাকলে দেখাবে) -->
                                            <div v-if="form.payment_method === 'bank'" class="space-y-2">
                                                <label class="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 ml-1">
                                                    <i class="fa-solid fa-code-branch opacity-50"></i> Routing Number
                                                </label>
                                                <input type="text" v-model="form.routing_number" name="routing_number" placeholder="9-digit routing number" 
                                                    class="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-200 transition-all">
                                            </div>
                                        </div>

                                        <!-- এই পুরো গ্রিডটি (Branch Name & Swift Code) শুধুমাত্র ব্যাংক সিলেক্ট করা থাকলে দৃশ্যমান হবে -->
                                        <div v-if="form.payment_method === 'bank'" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <!-- Branch Name -->
                                            <div class="space-y-2">
                                                <label class="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 ml-1">
                                                    <i class="fa-solid fa-map-location-dot opacity-50"></i> Branch Name
                                                </label>
                                                <input type="text" v-model="form.branch_name" name="branch_name" placeholder="Branch location" 
                                                    class="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-200 transition-all">
                                            </div>
                                            <!-- Swift Code -->
                                            <div class="space-y-2">
                                                <label class="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 ml-1">
                                                    <i class="fa-solid fa-globe opacity-50"></i> SWIFT Code (Optional)
                                                </label>
                                                <input type="text" v-model="form.swift_code" name="swift_code" placeholder="Bank SWIFT/BIC" 
                                                    class="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-200 transition-all">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button
                                type="submit"
                                :disabled="loading"
                                class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.98]">
                                {{ loading ? 'Submitting...' : 'Submit Withdrawal Request' }}
                            </button>

                        </form>
                    </div>
                </main>
            </div>
        </div>

        <div v-if="showOtpModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    
            <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl">

                <!-- LEFT -->
                <div class="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-[#111a3e] to-[#0f172a] border-r border-slate-800">
                    <h2 class="text-4xl font-black text-white">
                        Verify OTP
                    </h2>
                    <p class="text-slate-400 mt-4">
                        We sent a 6-digit OTP to your email.
                    </p>
                </div>

                <!-- RIGHT -->
                <div class="p-8 bg-slate-900">

                    <h3 class="text-white text-2xl font-black mb-6 text-center">
                        OTP Verification
                    </h3>

                    <div class="flex gap-2 justify-center mb-6">
                        <input
                            v-for="(d,i) in otp"
                            :key="i"
                            maxlength="1"
                            v-model="otp[i]"
                            class="w-12 h-12 text-center text-xl font-black rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-lime-400 outline-none"
                        />
                    </div>

                    <button
                        @click="submitOtp"
                        class="w-full py-3 bg-lime-400 text-black font-black rounded-xl"
                    >
                        {{ otpLoading ? 'Verifying...' : 'Verify OTP' }}
                    </button>

                    <button
                        @click="showOtpModal = false"
                        class="w-full mt-3 text-slate-400 text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        
    </div>


    <FooterSection />
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
const route = useRoute();

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');
























const balance = ref(0);
const fetchBalance = async () => {
    try {
        loading.value = true;
        errorMsg.value = null;

        const response = await api.get('/finance'); 

        if (response.data.success === true) {
            const data = response.data.data;
            balance.value = data.balance ?? 0;
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











const showOtpModal = ref(false);
const otpLoading = ref(false);
const otp = ref(['', '', '', '', '', '']);

const tempWithdrawalId = ref(null);

const form = reactive({
    amount: '',
    payment_method: 'bank',

    bank_name: '',
    account_holder_name: '',
    account_number: '',
    routing_number: '',
    branch_name: '',
    swift_code: '',
})

const submit = async () => {
    loading.value = true;
    successMsg.value = '';
    errorMsg.value = '';

    try {

        const response = await api.post('/finance/withdraw/store', form);
        successMsg.value = response.data.message || 'Withdrawal request submitted successfully';

        // store temp withdrawal id
        tempWithdrawalId.value = response.data.transaction_id;
        // open OTP modal
        showOtpModal.value = true;

        // Reset Form
        form.amount = '';
        form.bank_name = '';
        form.account_holder_name = '';
        form.account_number = '';
        form.routing_number = '';
        form.branch_name = '';
        form.swift_code = '';

        fetchBalance();

    } catch (error) {
        console.log(error.response?.data);
        if (error.response?.data?.message) {
            errorMsg.value = error.response.data.message;
        } else {
            errorMsg.value = 'Something went wrong';
        }
    } finally {
        loading.value = false;
    }
}










// OTP submit
const submitOtp = async () => {
    otpLoading.value = true;

    try {
        const code = otp.value.join('');

        const res = await api.post('/finance/withdraw/verify-otp', {
            transaction_id: tempWithdrawalId.value,
            otp: code
        });

        successMsg.value = res.data.message;
        showOtpModal.value = false;

        otp.value = ['', '', '', '', '', ''];
        tempWithdrawalId.value = null;

        fetchBalance(); // refresh balance

    } catch (error) {
        errorMsg.value = error.response?.data?.message || 'Invalid OTP';

        showOtpModal.value = false;
        // clear OTP input
        otp.value = ['', '', '', '', '', ''];
        tempWithdrawalId.value = null;
    } finally {
        otpLoading.value = false;
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

    fetchBalance();
    
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