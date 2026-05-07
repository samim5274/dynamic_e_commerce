<template>
    <div class="flex flex-col items-center">
        <!-- Node Card -->
        <div class="relative flex flex-col items-center group">
            <div 
                @click="$emit('select-node', user)"
                :class="[
                    'w-40 p-3 border-2 rounded-xl shadow-sm text-center z-10 transition-all duration-300 cursor-pointer bg-white dark:bg-slate-800',
                    user?.id ? 'border-[#A3D921] hover:shadow-lg hover:-translate-y-1' : 'border-dashed border-slate-300 dark:border-slate-700 opacity-60'
                ]"
            >
                <!-- Avatar -->
                <div :class="[
                    'w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center transition-colors',
                    user?.id ? 'bg-[#A3D921]/10' : 'bg-slate-100 dark:bg-slate-700'
                ]">
                    <i :class="['fa-solid text-lg', user?.id ? 'fa-user text-[#A3D921]' : 'fa-plus text-slate-400']"></i>
                </div>
                
                <h4 class="text-[11px] font-bold truncate dark:text-white uppercase tracking-tight">
                    {{ user?.name || 'Available' }}
                </h4>
                
                <p v-if="user?.id" class="text-[10px] text-[#3cabd3] font-mono font-semibold">{{ user.user_id }}</p>
                
                <!-- Point Stats -->
                <div v-if="user?.id" class="grid grid-cols-2 gap-1 mt-2 pt-2 border-t border-gray-100 dark:border-slate-700">
                    <div class="text-[9px]">
                        <span class="block text-gray-400">Group A</span>
                        <span class="font-bold dark:text-gray-200">{{ user.left_total_point || 0 }}</span>
                    </div>
                    <div class="text-[9px]">
                        <span class="block text-gray-400">Group B</span>
                        <span class="font-bold dark:text-gray-200">{{ user.right_total_point || 0 }}</span>
                    </div>
                </div>

                <div v-if="user?.id" class="mt-2">
                    <span class="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[8px] font-bold uppercase">
                        Active
                    </span>
                </div>
            </div>

            <!-- Vertical Line Down -->
            <div v-if="shouldShowChildren" class="w-0.5 h-8 bg-[#A3D921]/40"></div>
        </div>

        <!-- Children Level -->
        <div v-if="shouldShowChildren" class="flex relative">
            <!-- Horizontal Connector Line -->
            <div class="absolute top-0 left-[25%] right-[25%] h-0.5 bg-[#A3D921]/40"></div>

            <div class="flex gap-4 sm:gap-12">
                <!-- Left Node Branch -->
                <div class="relative pt-8">
                    <div class="absolute top-0 right-0 w-1/2 h-0.5 bg-[#A3D921]/40"></div>
                    <div class="absolute top-0 right-1/2 w-0.5 h-8 bg-[#A3D921]/40"></div>
                    <UserTreeNode 
                        :user="user.children?.[0]" 
                        :depth="depth + 1" 
                        @select-node="$emit('select-node', $event)" 
                    />
                </div>

                <!-- Right Node Branch -->
                <div class="relative pt-8">
                    <div class="absolute top-0 left-0 w-1/2 h-0.5 bg-[#A3D921]/40"></div>
                    <div class="absolute top-0 left-1/2 w-0.5 h-8 bg-[#A3D921]/40"></div>
                    <UserTreeNode 
                        :user="user.children?.[1]" 
                        :depth="depth + 1" 
                        @select-node="$emit('select-node', $event)" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    user: Object,
    depth: {
        type: Number,
        default: 1
    }
});

defineEmits(['select-node']);

// Max depth set to 3
const shouldShowChildren = computed(() => {
    return props.user?.id && props.depth < 3;
});
</script>