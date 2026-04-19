<template>
    <div :class="{ 'dark': isDark }">
        <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
        
        <Navbar 
            :isDark="isDark"
            :mobileMenu="mobileMenu"
            @toggle-dark="toggleDarkMode"
            @toggle-menu="toggleMenu"
        />

        <Message
            :successMsg="successMsg"
            :errorMsg="errorMsg"
            @update:successMsg="successMsg = $event"
            @update:errorMsg="errorMsg = $event"
        />

















        
        
        <section class="py-12 bg-slate-50 dark:bg-[#0b1120] min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <nav class="flex mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                            <router-link to="/" class="hover:text-indigo-600">Home</router-link>
                            <span class="mx-2">/</span>
                            <router-link to="/cart">
                                <span class="text-gray-900 dark:text-white">Shopping Cart</span>
                            </router-link>
                            <span class="mx-2">/</span>
                            <span class="text-gray-900 dark:text-white">Billing address</span>
                        </nav>
                        <h1 class="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                            Billing <span class="text-indigo-600">Address</span>
                        </h1>
                    </div>
                    <!-- <div class="bg-white dark:bg-gray-800 px-5 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p class="text-sm font-bold text-gray-500 dark:text-gray-400">
                            Total Items: <span class="text-indigo-600 dark:text-indigo-400">00</span>
                        </p>
                    </div> -->
                </div>

                <div v-if="cartItems.length === 0" 
                    class="flex flex-col items-center justify-center py-24 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-dashed border-gray-300 dark:border-gray-700 shadow-xl">
                    <div class="w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                        <i class="fa-solid fa-bag-shopping text-4xl text-indigo-600"></i>
                    </div>
                    <h2 class="text-2xl font-black text-gray-900 dark:text-white">Your cart feels a bit light</h2>
                    <p class="text-gray-500 dark:text-gray-400 mt-2 font-medium">Add some items to make it happy!</p>
                    <router-link to="/" class="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                        Go Shopping
                    </router-link>
                </div>


                <div v-else class="grid lg:grid-cols-12 gap-8">
                    
                    <div class="lg:col-span-8 space-y-6">
                        <div class="group relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div class="space-y-1">
                                    <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                        Full Name
                                    </label>
                                    <input 
                                        type="text" readonly :value="user?.name"
                                        class="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" 
                                        placeholder="Enter your full name" 
                                    />
                                </div>

                                <div class="space-y-1">
                                    <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                        Phone Number
                                    </label>
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+88</span>
                                        <input 
                                            type="text" readonly :value="user?.phone"
                                            class="w-full pl-12 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" 
                                            placeholder="01XXXXXXXXX" 
                                        />
                                    </div>
                                </div>

                                <div class="space-y-1">
                                    <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                        Email Address
                                    </label>
                                    <input 
                                        type="email" readonly :value="user?.email"
                                        class="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" 
                                        placeholder="example@mail.com" 
                                    />
                                </div>

                                <div class="space-y-1">
                                    <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                        User ID
                                    </label>
                                    <input 
                                        type="text" readonly :value="user?.user_id"
                                        class="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" 
                                        placeholder="DBMBL-ABCD1G9" 
                                    />
                                </div>

                                <div class="sm:col-span-2 space-y-1">
                                    <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                        Address
                                    </label>
                                    <textarea 
                                        rows="3" :value="user?.present_address || ''" readonly
                                        class="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none" 
                                        placeholder="Enter your detailed shipping address"
                                    ></textarea>
                                </div>
                            </div>

                            <div class="mt-8 space-y-3 pt-6 border-t border-slate-600 dark:border-slate-600">
                                
                                <label class="group flex items-start gap-3 p-2 rounded-lg cursor-pointer select-none transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                    <div class="relative flex items-center mt-0.5">
                                        <input 
                                            type="checkbox" 
                                            v-model="form.sameAddress"
                                            class="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-slate-300 dark:border-slate-600 bg-transparent transition-all checked:bg-blue-600 checked:border-blue-600" 
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">Shipping address is the same as my billing address</span>
                                        <span class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Simplify delivery by using one address</span>
                                    </div>
                                </label>

                                <label class="group flex items-start gap-3 p-2 rounded-lg cursor-pointer select-none transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                    <div class="relative flex items-center mt-0.5">
                                        <input 
                                            type="checkbox" 
                                            v-model="form.saveInfo"
                                            class="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-slate-300 dark:border-slate-600 bg-transparent transition-all checked:bg-blue-600 checked:border-blue-600" 
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <div class="flex items-center gap-2">
                                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">Save this information for next time</span>
                                            <span class="text-[9px] px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-md font-bold tracking-wider uppercase">Secure</span>
                                        </div>
                                        <span class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Your data will be encrypted and saved safely</span>
                                    </div>
                                </label>

                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-4">
                        <div class="sticky top-10 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-300 dark:border-gray-700">
                            <h2 class="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                Payment Details <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
                            </h2>

                            <div class="space-y-4">                                
                                <div class="flex justify-between font-bold">
                                    <span class="text-gray-500">Subtotal</span>
                                    <span class="text-gray-900 dark:text-white">৳ {{ subtotal.toLocaleString() }}</span>
                                </div>
                                <div class="flex justify-between font-bold text-sm">
                                    <span class="text-gray-500">Shipping</span>
                                    <span class="text-emerald-500">FREE</span>
                                </div>
                                <div class="flex justify-between font-bold text-sm">
                                    <span class="text-gray-500">Point</span>
                                    <span class="text-gray-500">{{ totalPoint.toLocaleString() }}</span>
                                </div>
                                <div class="flex justify-between font-bold text-sm">
                                    <span class="text-gray-500">Estimated Tax</span>
                                    <span class="text-gray-900 dark:text-white">৳ 0</span>
                                </div>
                                
                                <div class="h-px bg-gray-100 dark:bg-gray-700 my-6"></div>

                                <div class="flex justify-between items-end">
                                    <span class="text-lg font-black text-gray-900 dark:text-white">Total</span>
                                    <div class="text-right">
                                        <p class="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                                            ৳ {{ total.toLocaleString() }}
                                        </p>
                                        <p class="text-[10px] font-bold text-gray-400 uppercase">VAT Included</p>
                                    </div>
                                </div>

                                <p class="text-center text-xs font-bold text-gray-400 mt-6 flex items-center justify-center gap-2">
                                    <i class="fa-solid fa-shield-check text-emerald-500"></i>
                                    Secure SSL Encrypted Checkout
                                </p>
                            </div>

                            <div class="mt-8">
                                <button @click="confirmPayment"
                                class="w-full bg-indigo-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                    <span>Proceed to Payment</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>       










        <FooterSection />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../../services/api';

import Message from '../../Message/message.vue';
import Navbar from '../navbar.vue';
import FooterSection from '../footer.vue';
import { useAuth } from '../../../stores/auth';

const route = useRoute();
const router = useRouter();









const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');












const form = reactive({
    sameAddress: true,
    saveInfo: false
});









// Get order details
const cartItems = ref([]);
async function getCartItems() {
    loading.value = true
    try {
        const res = await api.get(`/cart`);
        cartItems.value = res.data.data;
        // console.log(cartItems.value);
    } catch (err) {
        console.error(err);
        errorMsg.value = err || "Something is wrong";
    } finally {
        loading.value = false;
    }
}

const subtotal = computed(() => {
    return (cartItems.value || []).reduce((sum, item) => {
        return sum + (Number(item.price) * Number(item.quantity));
    }, 0);
});

// total point
const totalPoint = computed(() =>
    (cartItems.value || []).reduce((sum, i) => {
        return sum + (Number(i.point) * Number(i.quantity))
    }, 0)
)

const total = computed(() => {
    return subtotal.value;
});








const user = ref(null)
const getUser = async () => {
    try {
        const res = await api.get('/user')
        user.value = res.data
    } catch (err) {
        console.error(err)
    }
}











async function confirmPayment(){

    const routeReg = route.params.reg;
    if (!routeReg) {
        console.log("No reg found");
        return;
    }
    try {
        const res = await api.post(`/orders/confirm/${routeReg}`);
        successMsg.value = res.data.message || "Your order is confirmed. Thanks You";
        // console.log(res.data);
        setTimeout(() => {
            router.push('/');
        }, 1500);
    } catch (err) {
        console.error(err);
    }
}











const isDark = ref(false)
const mobileMenu = ref(false)

const toggleDarkMode = () => {
    isDark.value = !isDark.value
}

const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value
}

const { loadUser } = useAuth();

onMounted(() => {
    loadUser();
    getCartItems();
    getUser();
})

</script>

<style>

</style>