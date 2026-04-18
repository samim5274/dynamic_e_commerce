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
                            <span class="text-gray-900 dark:text-white">Shopping Cart</span>
                        </nav>
                        <h1 class="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                            Shopping Cart <span class="text-indigo-600"></span>
                        </h1>
                    </div>
                    <div class="bg-white dark:bg-gray-800 px-5 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p class="text-sm font-bold text-gray-500 dark:text-gray-400">
                            Total Items: <span class="text-indigo-600 dark:text-indigo-400">{{ cartItems.length }}</span>
                        </p>
                    </div>
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
                        <div v-for="item in cartItems" :key="item.id"
                            class="group relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                            
                            <div class="flex flex-col sm:flex-row gap-6">
                                <div @click="ProductDetails(item)" class="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                                    <img :src="getProductImage(item)" :alt="item.product?.name || 'Product Image'"
                                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        @error="(e) => e.target.src = defaultProductImage" />
                                </div>

                                <div class="flex-1 flex flex-col justify-between">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <h3  @click="ProductDetails(item)" class="text-lg font-black text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-1 hover:underline">
                                                {{ item.product?.name }}
                                            </h3>
                                            <div class="flex flex-wrap gap-2 mt-2">
                                                <span v-if="item.variant?.color" 
                                                    class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm">
                                                    <span class="w-2 h-2 rounded-full mr-2 shadow-inner" :style="{ backgroundColor: item.variant.color.toLowerCase() }"></span>
                                                    {{ item.variant.color }}
                                                </span>

                                                <span v-if="item.variant?.size" 
                                                    class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                                                    <i class="fa-solid fa-ruler-combined mr-1.5 opacity-70"></i>
                                                    Size: {{ item.variant.size }}
                                                </span>

                                                <span v-if="!item.variant" 
                                                    class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                                                    Standard Edition
                                                </span>
                                            </div>
                                        </div>
                                        <button @click="remove(item)" 
                                            class="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-500 transition-all">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>

                                    <div class="flex flex-wrap items-center justify-between gap-4 mt-4">
                                        <div class="flex items-center p-1 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                            <button @click="decreaseQty(item)" 
                                            :disabled="item.quantity <= 1"
                                                class="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                <i class="fa-solid fa-minus text-xs"></i>
                                            </button>
                                            <span class="w-10 text-center font-black text-gray-900 dark:text-white">{{ item.quantity }}</span>
                                            <button @click="increaseQty(item)" 
                                                class="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors">
                                                <i class="fa-solid fa-plus text-xs"></i>
                                            </button>
                                        </div>

                                        <div class="flex flex-col items-end px-3 py-2 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-xl border border-indigo-100/50 dark:border-indigo-500/10">
                                            <p class="flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.15em] mb-0.5">
                                                <i class="fa-solid fa-arrows-to-circle"></i>
                                                Points Earned
                                            </p>

                                            <div class="flex items-baseline gap-1">
                                                <span class="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                                                    {{ (Number(item.point) * item.quantity).toLocaleString() }}
                                                </span>
                                                <span class="text-[10px] font-bold text-indigo-500/80 dark:text-indigo-400/80 uppercase">pts</span>
                                            </div>
                                        </div>
                                        <div class="text-right flex flex-col items-end">
                                            <div class="flex items-center gap-1.5 mb-1">
                                                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Unit:</span>
                                                <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                                                    ৳{{ Number(item.price).toLocaleString() }}
                                                </span>
                                            </div>

                                            <p class="text-[10px] font-black text-indigo-500/60 dark:text-indigo-400/60 uppercase tracking-widest mb-0.5">
                                                Subtotal
                                            </p>

                                            <p class="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                                                <span class="text-lg mr-0.5">৳</span>{{ (Number(item.price) * item.quantity).toLocaleString() }}
                                            </p>
                                            
                                            <span v-if="item.discount > 0" class="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded mt-1">
                                                You saved ৳{{ (item.discount * item.quantity).toLocaleString() }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-4">
                        <div class="sticky top-10 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-300 dark:border-gray-700">
                            <h2 class="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                Order Summary <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
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
                                            ৳ {{ subtotal.toLocaleString() }}
                                        </p>
                                        <p class="text-[10px] font-bold text-gray-400 uppercase">VAT Included</p>
                                    </div>
                                </div>

                                <button @click="checkOut(cartItems)" class="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-black text-lg transition-all shadow-xl shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-3 group">
                                    Checkout Now
                                    <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                </button>

                                <p class="text-center text-xs font-bold text-gray-400 mt-6 flex items-center justify-center gap-2">
                                    <i class="fa-solid fa-shield-check text-emerald-500"></i>
                                    Secure SSL Encrypted Checkout
                                </p>
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
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../services/api';

import Message from '../Message/message.vue';
import Navbar from './navbar.vue';
import FooterSection from './footer.vue';
import { useAuth } from '../../stores/auth';

const route = useRoute();
const router = useRouter();









const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');


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













// subtotal
const subtotal = computed(() =>
    (cartItems.value || []).reduce((sum, i) => {
        return sum + (Number(i.price) * Number(i.quantity))
    }, 0)
)

// total point
const totalPoint = computed(() =>
    (cartItems.value || []).reduce((sum, i) => {
        return sum + (Number(i.point) * Number(i.quantity))
    }, 0)
)


// qty update 
const qtyTimers = {};

// 1. Quantity  increaseQty
async function increaseQty(item) {
    item.quantity = Number(item.quantity || 1) + 1;
    queueQtyUpdate(item);
}

// 2. Quantity  decreaseQty
async function decreaseQty(item) {
    if (item.quantity > 1) {
        item.quantity = Number(item.quantity) - 1;
        queueQtyUpdate(item);
    }
}

// 3. Debounce 
function queueQtyUpdate(item) {
    // Unique key: reg এবং product_id
    const key = `${item.reg}_${item.product_id}`;

    if (qtyTimers[key]) clearTimeout(qtyTimers[key]);

    qtyTimers[key] = setTimeout(() => {
        updateQty(item);
    }, 500);
}

async function updateQty(item) {
    try {
        const res = await api.post(`/cart/qty-update/${item.reg}/${item.product_id}/${item.variant_id}`, {
            quantity: Number(item.quantity),
        });
        if (res?.data?.status === 'success') {
            item.quantity = Number(res.data.quantity);
            if (res.data.available_stock !== undefined) {
                item.available_stock = res.data.available_stock;
            }
        }
        await getCartItems(); 
    } catch (err) {
        await getCartItems();
        const msg = err?.response?.data?.message || "Something went wrong or Out of stock.";
        errorMsg.value = msg;
        
        setTimeout(() => {
            errorMsg.value = "";
        }, 3000);
    }
}










async function remove(item) {
    try {
        const res = await api.post(`/cart/remove-to-cart/${item.id}/${item.reg}/${item.product_id}/${item.variant_id}`, {
            quantity: Number(item.quantity),
        });
        if (res?.data?.status === 'success') {
            item.quantity = Number(res.data.quantity);
            if (res.data.available_stock !== undefined) {
                item.available_stock = res.data.available_stock;
            }
        }
        await getCartItems(); 
    } catch (err) {
        await getCartItems();
        const msg = err?.response?.data?.message || "Something went wrong.";
        errorMsg.value = msg;
        
        setTimeout(() => {
            errorMsg.value = "";
        }, 3000);
    }
}












async function  checkOut(cartItems) {
    loading.value = true;
    errorMsg.value = "";
    successMsg.value = "";

    try{
        const reg = cartItems?.[0]?.reg;
        if(!reg || cartItems.length === 0){
            errorMsg.value = "Cart is empty.";
            return;
        }
        
        router.push(`/checkout/${reg}`);
    } catch (err) {
        console.log(err?.response?.data?.message);
        errorMsg.value = err?.response?.data?.message || "Order failed";
        errorMsg.value = "Order failed";
    } finally {
        loading.value = false;
    }
}










const defaultProductImage = "/images/product/default-product.png";

const getProductImage = (item) => {
    // Nested optional chaining 
    const images = item.product?.images;
    if (images && images.length > 0) {
        return images[0].url;
    }
    return defaultProductImage;
};






function ProductDetails(item) {
    router.push(`/product-details/${item.product.slug}`)
}



const isDark = ref(false)
const mobileMenu = ref(false)

const toggleDarkMode = () => {
    isDark.value = !isDark.value
}

const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value
}

const { loadUser } = useAuth()

onMounted(() => {
    loadUser();
    getCartItems();
})
</script>

<style>

</style>