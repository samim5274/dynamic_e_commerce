<template>
    <main class="container mx-auto px-4 py-6 md:py-10">
        <div class="flex flex-col lg:flex-row gap-8">
            
            <aside class="hidden lg:block w-64 shrink-0">
                <div class="sticky top-28 space-y-8">
                    <div>
                        <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                            <span class="w-1 h-6 bg-indigo-600 rounded-full"></span> Categories
                        </h3>
                        <ul class="space-y-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar transition-all">
                            <li v-for="cat in categories" @click="selectedCategory = cat.id" :key="cat" 
                            class="group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20" 
                            :class="selectedCategory === cat.id ? 'opacity-100 bg-indigo-50 dark:bg-indigo-900/20' : ''">
                                <div class="flex items-center gap-3">
                                    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        :class="selectedCategory === cat.id ? 'opacity-100 bg-indigo-50 dark:bg-indigo-900/20' : ''"></span>
                                    
                                    <span class="text-sm font-semibold transition-colors
                                                text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white"
                                        :class="selectedCategory === cat.id ? 'text-indigo-600 dark:text-white' : ''">
                                        {{ cat.name }}
                                    </span>
                                </div>

                                <i class="fa-solid fa-chevron-right text-[8px] text-gray-300 dark:text-gray-600 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
                        <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase">Promo</p>
                        <h4 class="font-bold mb-2">Get Extra $20 Off!</h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Use code: VUE2026</p>
                        <button class="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold">Copy Code</button>
                    </div>
                </div>
            </aside>

            <div class="flex-1">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl md:text-3xl font-black">Featured <span class="text-indigo-600">Deals</span></h2>
                    <div class="flex gap-2">
                    <button class="p-2 border dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"><i class="fa-solid fa-sliders"></i></button>
                    </div>
                </div>









                <div class="space-y-16 py-10">

                    <div v-for="(items, categoryName, index) in groupedProducts" :key="index">
                        
                        <!-- Category Title -->
                        <div class="flex items-end justify-between mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                            <div class="relative">
                                <h2 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                                    <span class="w-2 h-8 bg-indigo-600 rounded-full"></span>
                                    {{ categoryName }}
                                </h2>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-5 font-medium uppercase tracking-[0.2em]">
                                    Discover our curated {{ categoryName.toLowerCase() }}
                                </p>
                            </div>

                            <router-link to="/show-all" 
                                class="group flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-all duration-300">
                                <span class="relative">
                                    View All
                                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                                <div class="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                    <i class="fa-solid fa-arrow-right-long text-xs group-hover:translate-x-1 transition-transform"></i>
                                </div>
                            </router-link>
                        </div>

                        <!-- Product Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            <div v-for="product in items" :key="product.id" @click="ProductDetails(product)"
                                class="group relative bg-white dark:bg-[#111827] rounded-xl p-4 border border-gray-200 dark:border-white/10 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2">
                                
                                <div class="relative aspect-square overflow-hidden rounded-[2rem]">
                                    <div class="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                        <span v-if="product.discount_price" class="bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-lg shadow-red-500/30">
                                            Save {{ Math.round(((product.price - product.discount_price) / product.price) * 100) }}%
                                        </span>
                                        <span class="bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-lg shadow-indigo-500/30">
                                            New
                                        </span>
                                    </div>

                                    <button class="absolute top-4 right-4 z-10 bg-white/80 dark:bg-black/50 backdrop-blur-md p-3 rounded-full text-gray-900 dark:text-white hover:text-red-500 dark:hover:text-red-500 transition-all duration-300 shadow-sm active:scale-90">
                                        <i class="fa-regular fa-heart text-lg"></i>
                                    </button>

                                    <img :src="getProductImage(product)" 
                                        :alt="product.name"
                                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out">
                                    
                                    <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 hidden md:block">
                                        <button type="button" @click="ProductDetails(product)" class="w-full bg-white/90 dark:bg-[#fff]/90 backdrop-blur-md text-gray-900 font-bold py-3 rounded-2xl shadow-xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-colors duration-300">
                                            Quick View
                                        </button>
                                    </div>
                                </div>

                                <div class="mt-6 px-1 pb-1">
                                    <div class="flex items-center justify-between mb-3">
                                        <div class="flex items-center gap-2">
                                            <span class="inline-block w-1 h-3 bg-indigo-500 rounded-full"></span>
                                            <span class="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
                                                {{ product.category?.name || 'Collection' }}
                                            </span>
                                        </div>
                                        <div class="flex items-center gap-1.5 px-2 py-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-full">
                                            <i class="fa-solid fa-star text-[10px] text-amber-400"></i>
                                            <span class="text-[10px] font-black text-gray-700 dark:text-gray-300">4.8</span>
                                            <span class="text-[9px] text-gray-400 font-medium">| 120</span>
                                        </div>
                                    </div>

                                    <h3 @click="ProductDetails(product)" class="text-xl cursor-pointer font-extrabold text-gray-900 dark:text-white tracking-tight truncate transition-all duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                        {{ product.name }}
                                    </h3>

                                    <div class="mt-6 flex items-center justify-between">
                                        <div class="flex flex-col space-y-1">
                                            <div class="flex items-center justify-between">
                                                <p class="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                                                    Price
                                                </p>
                                                <span v-if="product.discount_price" 
                                                    class="bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded-md">
                                                    {{ Math.round(((product.price - product.discount_price) / product.price) * 100) }}% SAVED
                                                </span>
                                            </div>

                                            <div class="flex flex-col -space-y-0.5">
                                                <div class="flex items-baseline gap-1.5">
                                                    <span class="text-sm font-bold text-gray-900 dark:text-white">৳</span>
                                                    <span class="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                                                        {{ product.discount_price || product.price }}
                                                    </span>
                                                </div>
                                                
                                                <div v-if="product.discount_price" class="flex items-center gap-2 px-0.5">
                                                    <span class="text-xs text-gray-400 line-through decoration-gray-400/40">
                                                        ৳{{ product.price }} BDT
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button class="relative h-10 w-10 group/btn overflow-hidden rounded-[1.25rem] bg-gray-900 dark:bg-indigo-600 text-white shadow-xl shadow-gray-900/10 dark:shadow-indigo-500/20 transition-all duration-500 hover:w-32 hover:rounded-2xl active:scale-95">
                                            <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover/btn:translate-x-12 group-hover/btn:opacity-0">
                                                <i class="fa-solid fa-plus text-xl"></i>
                                            </div>
                                            <div class="absolute inset-0 flex items-center justify-center gap-2 -translate-x-12 opacity-0 transition-all duration-500 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 px-4">
                                                <i class="fa-solid fa-cart-shopping text-sm"></i>
                                                <span class="text-xs font-black uppercase whitespace-nowrap">Add</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>












                
                <newsLatter />
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api, {makeImg} from '../../services/api'

import newsLatter from './news-latter.vue'

const router = useRouter()
const loading = ref(false)


// Default product image
const defaultProductImage = "/images/product/default-product.png";

// per product image
const getProductImage = (product) => {
    const images = product?.images

    if (Array.isArray(images) && images.length > 0) {

        const primary = images.find(i => i.is_primary)

        return makeImg((primary || images[0]).image_path)
    }

    return defaultProductImage
};





const categories = ref([]);
async function fetchCategories(){
    loading.value = true;

    try{
        const res = await api.get('/public/get-categories');
        categories.value = res.data.data;
        // console.log(categories.value)
    }catch(err){
        console.error('Failed to fetch category:', err);
        errorMsg.value = err.response?.data?.message || 'Failed to load category.';
    }finally{
        loading.value = false;
    }
}









// get products
const products = ref([]);

async function fetchProducts(){
    loading.value = true;

    try{
        const res = await api.get('/public/products');
        let data = res.data.data

        if (!Array.isArray(data)) {
            data = Object.values(data).flat()
        }

        products.value = data
        // console.log(products.value)
    }catch(err){
        console.error('Failed to fetch products:', err);
        errorMsg.value = err.response?.data?.message || 'Failed to load products.';
    }finally{
        loading.value = false;
    }
}






const selectedCategory = ref(null);
const searchQuery = ref('');
const filterProducts = computed(() => {

    if (!products.value || !Array.isArray(products.value)) {
        return []
    }

    let filtered = [...products.value] // clone

    if (selectedCategory.value) {
        filtered = filtered.filter(p => 
            Number(p.category?.id) === Number(selectedCategory.value)
        )
    }

    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        filtered = filtered.filter(p => 
            p.name?.toLowerCase().includes(q)
        )
    }

    return filtered
})






const groupedProducts = computed(() => {
    const groups = {};

    filterProducts.value.forEach(product => {
        const category = product?.category?.name || 'Uncategorized'

        if (!groups[category]) {
            groups[category] = []
        }

        groups[category].push(product)
    })

    return groups
});










function ProductDetails(product){
    router.push(`/product-details/${product.slug}`);
}









onMounted(() => {
    fetchProducts();
    fetchCategories();
});
</script>

<style>

</style>