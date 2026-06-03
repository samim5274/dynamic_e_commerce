<template>
    <div class="flex flex-col items-center flex-nowrap">
        <!-- Node Card -->
        <div class="relative flex flex-col items-center group">
            <div 
                @click="$emit('select-node', user)"
                :class="[
                    'w-32 sm:w-44 p-3 border-2 rounded-xl shadow-sm text-center z-10 transition-all duration-300 cursor-pointer bg-white dark:bg-slate-800',
                    user?.id ? 'border-[#A3D921] hover:shadow-lg hover:-translate-y-1' : 'border-dashed border-slate-300 dark:border-slate-700 opacity-60 bg-slate-50/50'
                ]"
            >
                <!-- Avatar -->
                <div :class="[
                    'w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-2 flex items-center justify-center transition-colors',
                    user?.id ? 'bg-[#A3D921]/10' : 'bg-slate-100 dark:bg-slate-700'
                ]">
                    <i :class="['fa-solid text-sm sm:text-lg', user?.id ? 'fa-user text-[#A3D921]' : 'fa-plus text-slate-400']"></i>
                </div>
                
                <h4 class="text-[10px] sm:text-[11px] font-bold truncate dark:text-white uppercase tracking-tight leading-tight">
                    {{ user?.name || 'Available' }}
                </h4>
                
                <p v-if="user?.id" class="text-[8px] sm:text-[10px] text-[#3cabd3] font-mono mt-0.5">{{ user.user_id }}</p>
                
                <!-- Stats Grid - Only show if user exists -->
                <div v-if="user?.id" class="grid grid-cols-2 gap-1 mt-2 pt-2 border-t border-gray-100 dark:border-slate-700">
                    <div class="text-left">
                        <span class="block text-[8px] text-gray-400 uppercase">Group A</span>
                        <span class="text-[10px] font-bold dark:text-gray-200">{{ user.left_total_point || 0 }}</span>
                    </div>
                    <div class="text-right">
                        <span class="block text-[8px] text-gray-400 uppercase">Group B</span>
                        <span class="text-[10px] font-bold dark:text-gray-200">{{ user.right_total_point || 0 }}</span>
                    </div>
                </div>

                <!-- Status Badge -->
                <div v-if="user?.id" class="mt-3 flex justify-center">
                    <div v-if="user?.is_active" class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active
                    </div>
                    <div v-else class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-[9px] font-bold uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Inactive
                    </div>
                </div>
                
                <!-- Add Label for empty nodes -->
                <div v-else class="mt-2">
                    <span class="text-[9px] text-slate-400 font-medium italic">Empty Slot</span>
                </div>
            </div>

            <!-- Vertical Line Down -->
            <div v-if="shouldShowChildren" class="w-0.5 h-8 bg-[#A3D921]/40"></div>
        </div>

        <!-- Children Level -->
        <div v-if="shouldShowChildren" class="flex flex-nowrap relative">
            <div class="absolute top-0 left-[25%] right-[25%] h-0.5 bg-[#A3D921]/40"></div>

            <div class="flex gap-4 sm:gap-12 flex-nowrap">
                <!-- Left Branch -->
                <div class="relative pt-8">
                    <div class="absolute top-0 right-0 w-1/2 h-0.5 bg-[#A3D921]/40"></div>
                    <div class="absolute top-0 right-1/2 w-0.5 h-8 bg-[#A3D921]/40"></div>
                    <UserTreeNode 
                        :user="user?.left_child_recursive || user?.leftChildRecursive || null" 
                        :depth="depth + 1" 
                        @select-node="$emit('select-node', $event)" 
                    />
                </div>

                <!-- Right Branch -->
                <div class="relative pt-8">
                    <div class="absolute top-0 left-0 w-1/2 h-0.5 bg-[#A3D921]/40"></div>
                    <div class="absolute top-0 left-1/2 w-0.5 h-8 bg-[#A3D921]/40"></div>
                    <UserTreeNode 
                        :user="user?.right_child_recursive || user?.rightChildRecursive || null" 
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
    user: {
        type: Object,
        default: null
    },
    depth: {
        type: Number,
        default: 1
    }
});

defineEmits(['select-node']);

// 3rd level porjonto empty children dekhate hobe
const shouldShowChildren = computed(() => {
    return props.user?.id && props.depth < 3;
});
</script>