<template>
    <main class="container mx-auto px-4 py-6 md:py-10">
        <div class="flex flex-col lg:flex-row gap-8">
            
            <aside class="hidden lg:block w-64 shrink-0">
                <div class="sticky top-28 space-y-8">
                    <div>
                        <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                            <span class="w-1 h-6 bg-indigo-600 rounded-full"></span> Categories
                        </h3>
                        <ul class="space-y-2">
                            <li v-for="cat in categories" :key="cat" @click="selectedCategory = cat.id" class="flex items-center gap-2 cursor-pointer hover:translate-x-1 transition-transform dark:text-gray-400 dark:hover:text-white">
                                <i class="fa-solid fa-chevron-right text-[10px] text-indigo-500"></i> {{ cat.name }}
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

                    <div v-for="(products, categoryName) in groupedProducts" :key="categoryName">
                        
                        <!-- Category Title -->
                        <div class="flex items-end justify-between mb-8">
                            <h2 class="text-3xl font-black text-gray-900 dark:text-white">
                                {{ categoryName }}
                            </h2>
                        </div>

                        <!-- Product Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">

                            <div v-for="product in products" :key="product.id" 
                                class="group relative bg-white dark:bg-gray-900 rounded-[2rem] p-4 border hover:shadow-xl transition">

                                <img :src="getProductImage(product)" class="w-full h-48 object-cover rounded-xl">

                                <h3 class="mt-3 font-bold">{{ product.name }}</h3>

                                <p class="text-indigo-600 font-bold">
                                    ৳{{ product.discount_price || product.price }}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>












                
                <div class="mt-16 bg-gray-900 dark:bg-indigo-950 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                    <div class="relative z-10 max-w-lg">
                        <h2 class="text-3xl md:text-4xl font-black text-white mb-4">Subscribe & Get <span class="text-indigo-400">15% Off</span></h2>
                        <p class="text-gray-400 mb-8">Join our newsletter to receive updates on new arrivals and special offers.</p>
                        <div class="flex flex-col sm:flex-row gap-3">
                            <input type="email" placeholder="Enter your email" class="flex-1 bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500">
                            <button class="bg-indigo-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-indigo-700 transition">Join Now</button>
                        </div>
                    </div>
                    <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api, {makeImg} from '../../services/api'

const router = useRouter()
const loading = ref(false)


// Default product image
const defaultProductImage = "/images/product/default-product.png";

// per product image
const getProductImage = (product) => {
    return product?.photo ? makeImg(product.photo) : defaultProductImage;
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
const searchQuery = ref('');
async function fetchProducts(){
    loading.value = true;

    try{
        const res = await api.get('/public/products');
        products.value = res.data.data;
        // console.log(products.value)
    }catch(err){
        console.error('Failed to fetch products:', err);
        errorMsg.value = err.response?.data?.message || 'Failed to load products.';
    }finally{
        loading.value = false;
    }
}


const groupedProducts = computed(() => {
    const groups = {};

    const list = Array.isArray(filterProducts.value)
        ? filterProducts.value
        : [];

    list.forEach(product => {
        const category = product?.category?.name || 'Uncategorized';

        if (!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(product);
    });

    return groups;
});








const selectedCategory = ref(null);
const filterProducts = computed(() => {
    let list = products.value;

    if (selectedCategory.value) {
        list = list.filter(p => p.category?.id === selectedCategory.value);
    }

    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    return list;
});



onMounted(() => {
    fetchProducts();
    fetchCategories();
});
</script>

<style>

</style>