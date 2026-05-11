<template>
  <div class="max-w-md p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm transition-all duration-300">
    <h3 class="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
      Refer & Earn
    </h3>
    
    <div class="relative flex items-center gap-3 p-1.5 pl-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl group hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all">
      
      <!-- Link Info -->
      <div class="flex-1 truncate">
        <p class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">Referral Link</p>
        <p class="text-sm text-gray-700 dark:text-gray-200 font-mono truncate">
          {{ referralLink }}
        </p>
      </div>

      <!-- Copy Button -->
      <button 
        @click="copyLink"
        :disabled="!user?.user_id"
        class="relative flex items-center justify-center px-4 py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="copied 
          ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' 
          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 dark:shadow-none'"
      >
        <div class="flex items-center gap-2">
          <!-- Icon Logic -->
          <svg v-if="copied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          
          <span class="text-xs">{{ copied ? 'Copied!' : 'Copy' }}</span>
        </div>
      </button>
    </div>

    <!-- Mini Instruction -->
    <p class="mt-3 text-[11px] text-gray-400 dark:text-gray-500">
      Share this link with your friends to earn rewards instantly.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    }
});

const copied = ref(false);

const referralLink = computed(() => {
    return props.user?.user_id 
        ? `https://dynamicbazarmerchantbd.com/register/${props.user.user_id}` 
        : 'Loading link...';
});

const copyLink = async () => {
    if (!props.user?.user_id) return;

    try {
        await navigator.clipboard.writeText(referralLink.value);
        copied.value = true;
        
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy!', err);
    }
};
</script>