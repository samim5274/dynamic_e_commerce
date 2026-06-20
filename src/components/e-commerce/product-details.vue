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

















        
        
        <section v-if="product" class="py-16 bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 min-h-screen selection:bg-indigo-500 selection:text-white">
            <div class="container mx-auto px-4 max-w-7xl">
                
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <nav class="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                        <router-link to="/" class="hover:text-indigo-500 transition-colors">Shop</router-link>
                        <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span class="text-indigo-500">{{ product.category?.name }}</span>
                    </nav>
                    
                    <div class="flex items-center gap-4 text-xs font-bold">
                        <span class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            In Stock
                        </span>
                        <span class="text-gray-400">SKU: PRD-{{ product.sku }}</span>
                    </div>
                </div>

                <div class="flex flex-col lg:flex-row gap-16 xl:gap-24">

                    <div class="w-full lg:w-1/2 xl:w-[60%]">
                        <div class="lg:sticky lg:top-24 space-y-8">
                            <div class="relative group aspect-square lg:aspect-[16/14] rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-[#141c2e] border border-gray-100 dark:border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] dark:shadow-none">
                                <img :src="activeImage || defaultProductImage"  class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110">
                                
                                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div class="absolute top-8 left-8">
                                    <span v-if="product.discount_price" class="bg-white/90 dark:bg-black/40 backdrop-blur-xl px-5 py-2 rounded-2xl text-sm font-black shadow-2xl">
                                        -{{ Math.round((product.discount_price / product.price) * 100) }}% OFF
                                    </span>
                                </div>
                            </div>

                            <div class="flex justify-center gap-6 px-4">
                                <button v-for="img in product.images" :key="img.id"
                                    @click="activeImage = img.url"
                                    class="relative w-16 h-16 rounded-[2rem] overflow-hidden transition-all duration-700 border-2 shadow-sm"
                                    :class="activeImage === img.url 
                                        ? 'border-indigo-600 dark:border-indigo-400 scale-110 shadow-indigo-500/20' 
                                        : 'border-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100'">
                                    <img :src="img.url" class="w-full h-full object-cover">
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="w-full lg:w-1/2 xl:w-[40%] flex flex-col justify-center">
                        
                        <div class="space-y-10">
                            <div class="space-y-4">
                                <h1 class="text-5xl md:text-6xl font-black tracking-tight leading-[0.9] text-gray-900 dark:text-white">
                                    {{ product.name }} - {{ product.point }}
                                </h1>
                                <div class="flex items-center gap-4">
                                    <div class="flex text-amber-400 text-xs gap-0.5">
                                        <i v-for="i in 5" :key="i" class="fa-solid fa-star"></i>
                                    </div>
                                    <span class="text-xs font-black text-gray-400 uppercase tracking-widest underline decoration-indigo-500/30 underline-offset-4 cursor-pointer hover:text-indigo-500 transition">
                                        48 Verified Reviews
                                    </span>
                                </div>
                            </div>

                            <div class="p-8 rounded-xl bg-gray-50 dark:bg-[#111827] border border-gray-300 dark:border-white/20 flex items-center justify-between group">
                                <div class="flex flex-col">
                                    <span class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Market Price</span>
                                    <div class="flex items-baseline gap-3">
                                        <span class="text-5xl font-black text-indigo-600 dark:text-white tracking-tighter transition-all group-hover:text-indigo-800">
                                            ৳{{ selectedVariant?.price || product.price - product.discount_price || product.price }}
                                        </span>
                                        <span v-if="product.discount_price" class="text-lg text-gray-400 line-through font-bold opacity-50">
                                            ৳{{ product.price }}
                                        </span>
                                    </div>
                                </div>
                                <div class="h-14 w-14 rounded-full border-2 border-gray-200 dark:border-gray-500 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                                    <i class="fa-solid fa-tag text-xl text-gray-200 group-hover:text-indigo-500 transition-colors"></i>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <div class="flex items-center justify-between">
                                    <h4 class="text-xs font-black uppercase tracking-widest text-gray-500">Configure Variant</h4>
                                    <button class="text-[10px] font-bold text-indigo-500 underline uppercase tracking-wider">Size Guide</button>
                                </div>
                                
                                <div class="flex flex-wrap gap-3">
                                    <label v-for="(variant, index) in product.variants" :key="index" 
                                        class="relative cursor-pointer group">
                                        
                                        <input type="radio" name="variant" :value="variant" v-model="selectedVariant" class="peer sr-only">

                                        <div class="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-gray-300 transition-all duration-300
                                                    bg-white dark:bg-white/[0.03] dark:border-white/10
                                                    peer-checked:border-indigo-600 peer-checked:bg-indigo-50/50 dark:peer-checked:bg-indigo-500/10 
                                                    peer-checked:shadow-sm hover:border-gray-300 dark:hover:border-white/20">
                                            
                                            <div class="w-3 h-3 rounded-full border border-black/5 shadow-inner shrink-0 transition-transform group-hover:scale-125"
                                                :style="{ backgroundColor: variant.color_code || variant.color }">
                                            </div>

                                            <div class="flex flex-col leading-none">
                                                <div class="flex items-center gap-2">
                                                    <span class="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                                        {{ variant.size }}
                                                    </span>
                                                    <span class="w-px h-2 bg-gray-200 dark:bg-gray-700"></span>
                                                    <span class="text-[10px] font-bold text-gray-400 uppercase">
                                                        {{ variant.color }}
                                                    </span>
                                                </div>
                                                <div class="mt-1 flex items-center gap-1">
                                                    <span class="text-[10px] font-black text-indigo-600 dark:text-indigo-400">
                                                        ৳{{ variant.price }}
                                                    </span>
                                                    <span class="w-px h-2 bg-gray-200 dark:bg-gray-700"></span>
                                                    <span class="text-[10px] font-black text-indigo-600 dark:text-indigo-400">
                                                        {{ variant.stock_quantity }}
                                                    </span>
                                                </div>
                                            </div>

                                            <i class="fa-solid fa-circle-check text-[10px] text-indigo-600 opacity-0 transition-opacity peer-checked:opacity-100"></i>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div class="space-y-4 pt-4">
                                <div class="flex flex-col sm:flex-row items-center gap-4 w-full">
    
                                    <div class="flex items-center justify-between bg-gray-50 dark:bg-white/[0.03] p-1.5 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-inner w-full sm:w-auto">
                                        <button @click="qty > 1 ? qty-- : null" 
                                            class="w-12 h-12 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm hover:shadow-md transition-all active:scale-90 group">
                                            <i class="fa-solid fa-minus text-xs text-gray-400 group-hover:text-indigo-500"></i>
                                        </button>
                                        
                                        <div class="flex-1 sm:w-14 flex flex-col items-center">
                                            <span class="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-[-2px]">Amount</span>
                                            <input type="number" v-model="qty" class="w-full bg-transparent text-center font-black text-xl sm:text-lg outline-none cursor-default text-gray-900 dark:text-white" readonly>
                                        </div>

                                        <button @click="qty++" 
                                            class="w-12 h-12 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm hover:shadow-md transition-all active:scale-90 group">
                                            <i class="fa-solid fa-plus text-xs text-gray-400 group-hover:text-indigo-500"></i>
                                        </button>
                                    </div>

                                    <button @click="addToCart(product)" class="relative w-full sm:flex-1 h-[68px] sm:h-[64px] group overflow-hidden rounded-[2.2rem] bg-gray-950 dark:bg-indigo-600 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.5)] active:scale-[0.98]">
                                        
                                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-[35deg] -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out"></div>
                                        
                                        <div class="relative flex items-center justify-center gap-4">
                                            <div class="relative flex items-center justify-center">
                                                <i class="fa-solid fa-bag-shopping text-white text-lg group-hover:scale-110 transition-transform duration-500"></i>
                                                <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-gray-950 dark:border-indigo-600 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                            </div>

                                            <div class="flex flex-col items-start leading-tight">
                                                <span class="text-white text-[11px] font-black uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all duration-500">
                                                    Add to Cart
                                                </span>
                                                <span class="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-0.5">
                                                    Secure Checkout
                                                </span>
                                            </div>
                                        </div>

                                        <div class="absolute inset-0 border border-white/10 rounded-[2.2rem] pointer-events-none"></div>
                                    </button>

                                </div>
                            </div>

                            <div class="bg-indigo-500/5 rounded-3xl p-6 border border-indigo-500/10 flex items-start gap-4">
                                <div class="h-10 w-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
                                    <i class="fa-solid fa-bolt"></i>
                                </div>
                                <div>
                                    <h5 class="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">Express Delivery Available</h5>
                                    <p class="text-xs text-gray-500 leading-relaxed font-medium">Order within <span class="text-indigo-500 font-bold">02h 45m</span> to receive your package by tomorrow. Verified by ShopperX Priority.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
    
                    <div v-for="product in categoryProducts" :key="product.id"
                        class="group relative bg-white dark:bg-[#111827] rounded-[1rem] p-4 border border-gray-200/80 dark:border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-none hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] transition-all duration-700 hover:-translate-y-2 flex flex-col justify-between">
                        
                        <div class="relative aspect-[10/12] overflow-hidden rounded-[1rem] bg-gray-50/70 dark:bg-gray-800/50 border border-gray-100/50 dark:border-white/[0.03]">
                            <div class="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
                                <span v-if="product.discount_price > 0" class="bg-red-500 text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-md shadow-red-500/10">
                                    -{{ Math.round((product.discount_price / product.price) * 100) }}% OFF
                                </span>
                            </div>

                            <button class="absolute top-3.5 right-3.5 z-10 bg-white/70 dark:bg-[#1f2937]/60 backdrop-blur-md p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-[#1f2937] transition-all duration-300 active:scale-90 shadow-sm border border-white/40 dark:border-white/5">
                                <i class="fa-regular fa-heart text-sm"></i>
                            </button>

                            <img @click="ProductDetails(product)" :src="getProductImage(product)" :alt="product.name"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out cursor-pointer">
                            
                            <div class="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                                <button @click="ProductDetails(product)" 
                                    class="w-full bg-white/95 dark:bg-indigo-600/95 backdrop-blur-md text-gray-900 dark:text-white font-black text-[10px] uppercase tracking-[0.2em] py-3.5 rounded-xl shadow-xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    Quick View
                                </button>
                            </div>
                        </div>

                        <div class="mt-5 flex-1 flex flex-col justify-between px-1">
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-[9px] font-black uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                                        {{ product.category?.name || categoryName }}
                                    </span>
                                    <div class="flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-md">
                                        <i class="fa-solid fa-star text-[9px] text-amber-500"></i>
                                        <span class="text-[10px] font-black text-amber-700 dark:text-amber-400">4.9</span>
                                    </div>
                                </div>

                                <h3 @click="ProductDetails(product)" 
                                    class="text-base font-black text-gray-800 dark:text-gray-100 truncate cursor-pointer group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
                                    {{ product.name }} 
                                    <span v-if="product.point" class="text-xs font-medium text-gray-400 ml-1">({{ product.point }} Pts)</span>
                                </h3>
                            </div>

                            <div class="mt-4 pt-3 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-between">
                                <div class="flex flex-col">
                                    <span v-if="product.discount_price > 0" class="text-[11px] font-bold text-gray-400 line-through decoration-red-500/20 mb-0.5">
                                        ৳{{ product.price }}
                                    </span>
                                    <span class="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none flex items-start gap-0.5">
                                        <span class="text-sm font-bold mt-0.5">৳</span>{{ product.price - product.discount_price || product.price }}
                                    </span>
                                </div>

                                <button @click="ProductDetails(product)"
                                    class="relative h-11 w-11 group/btn overflow-hidden rounded-full bg-gray-900 dark:bg-indigo-600 text-white shadow-md shadow-gray-900/5 dark:shadow-indigo-500/10 transition-all duration-500 hover:w-28 hover:bg-indigo-600 dark:hover:bg-indigo-500 active:scale-95 flex items-center justify-center">
                                    <div class="absolute flex items-center justify-center transition-all duration-500 group-hover/btn:translate-x-10 group-hover/btn:opacity-0">
                                        <i class="fa-solid fa-plus text-base"></i>
                                    </div>
                                    <div class="absolute flex items-center justify-center gap-1.5 -translate-x-10 opacity-0 transition-all duration-500 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 px-3 whitespace-nowrap">
                                        <i class="fa-solid fa-cart-shopping text-xs"></i>
                                        <span class="text-[10px] font-black uppercase tracking-wider">View</span>
                                    </div>
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
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../services/api';
import Message from '../Message/message.vue';
import Navbar from './navbar.vue';
import FooterSection from './footer.vue';
import { useAuth } from '../../stores/auth';
import { useCartStore } from './stores/cart';

const route = useRoute();
const router = useRouter();

const product = ref(null);
const categoryProducts = ref([]);
const activeImage = ref('');
const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');















const qty = ref(1)
const selectedVariant = ref(null)
const isAddingToCart = ref(false);
const CartItem = ref(null);
const cartStore = useCartStore();


async function addToCart(product) {
    if (!selectedVariant.value) {
        errorMsg.value = "Please select a variant first!";
        return;
    }

    const cartData = {
        product_id: product.id,
        variant_id: selectedVariant.value.id, 
        quantity: qty.value, 
    };

    try {
        isAddingToCart.value = true;

        const res = await api.post("/cart/add-to-cart", cartData);

        if (res.data?.success) {
            successMsg.value = res.data.message || "Added to cart!";
            errorMsg.value = null;

            qty.value = 1;
            CartItem.value = res.data.data;

            cartStore.addToCartLocal({
                product_id: product.id,
                variant_id: selectedVariant.value.id,
                quantity: qty.value,
                price: selectedVariant.value.price || product.price
            })

            // console.log(CartItem.value);
        } else {
            errorMsg.value = res.data?.message || "Something went wrong";
            successMsg.value = null;
        }

    } catch (error) {

        if (error.response) {
            errorMsg.value = error.response.data?.message || "Server error";
        } else {
            errorMsg.value = "Network error";
            console.error(error);
        }

    } finally {
        isAddingToCart.value = false;
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






const { loadUser } = useAuth()







async function getProduct() {
    loading.value = true
    try {
        const res = await api.get(`/public/product/${route.params.slug}`)
        product.value = res.data.data;
        categoryProducts.value = res.data.category_products;

        if (product.value?.images?.length) {
            activeImage.value = product.value.images[0].url;
        } else {
            activeImage.value = ''   // reset
        }
    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}




// Product recall current page
function ProductDetails(product) {
    router.push(`/product-details/${product.slug}`)
}

function initializeProduct() {
    if (product.value?.variants?.length > 0) {
        selectedVariant.value = product.value.variants[0];
    } else {
        selectedVariant.value = null;
    }
    qty.value = 1;
}

watch(
    () => route.params.slug,
    async (newSlug) => {
        if (newSlug) {
            await getProduct();
            initializeProduct();
        }
    }
);





// default image
const defaultProductImage = "/images/product/default-product.png"


const getProductImage = (product) => {
    if (!product || !product.images || product.images.length === 0) {
        return defaultProductImage;
    }

    const primaryImg = product.images.find(i => i.is_primary == 1);
    
    const selectedImg = primaryImg || product.images[0];

    return selectedImg.url ? selectedImg.url : defaultProductImage;
}
















onMounted(async () => {
    await loadUser();
    await getProduct();

    // page load first variant select
    if (product.value?.variants?.length > 0) {
        selectedVariant.value = product.value.variants[0];
    }

    initializeProduct();
})
</script>

<style>

</style>