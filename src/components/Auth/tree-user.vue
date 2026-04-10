<template>
    <section class="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-10">
        <div class="mx-auto px-4">
            <div class="text-center mb-10">
                <h2 class="text-2xl font-bold dark:text-white">User Genealogy Tree</h2>
            </div>

            <div class="w-full overflow-x-auto pb-20">
                <div class="min-w-[800px] flex justify-center">
                    <UserTreeNode v-if="rootUser" :user="rootUser" />
                    
                    <div v-else-if="loading" class="text-center p-10">
                        <div class="animate-spin h-10 w-10 border-4 border-[#A3D921] border-t-transparent rounded-full mx-auto"></div>
                        <p class="mt-4 dark:text-slate-400">Loading Tree...</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api';

import UserTreeNode from './UserTreeNode.vue';

const rootUser = ref(null);
const loading = ref(true);
const errorMsg = ref("");

// fetch users
async function fetchedUsers(){
    loading.value = true;
    try{
        const res = await api.get('/tree-user');
        rootUser.value = res.data.data;
    } catch (err){
        console.error("User fetched error: ", err);
        errorMsg.value = "Failed to load tree data.";
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchedUsers();
});

</script>

<style scoped>

</style>