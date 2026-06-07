<template>
    <div class="flex items-center justify-center py-8">
        <div
            v-if="user"
            class="group relative w-full overflow-hidden rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:border-slate-800/80 dark:bg-slate-900">
            <!-- Background Effects -->
            <div
                class="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl"></div>
            <div
                class="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl"></div>

            <!-- Header -->
            <div class="flex items-center justify-between">
                <!-- Avatar -->
                <div class="relative">
                    <img
                        :src="photoUrl"
                        :alt="user.name"
                        class="h-16 w-16 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-white/10"
                    />

                    <!-- Online Dot -->
                    <span class="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                        <span
                            class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                            :class="user.is_active ? 'bg-emerald-400' : 'bg-red-400'"
                        ></span>
                        
                        <span
                            class="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900"
                            :class="user.is_active ? 'bg-emerald-500' : 'bg-red-500'"
                        ></span>
                    </span>
                </div>

                <div class="flex flex-col items-end">
                    <span
                        class="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-slate-400">
                        Rank Status
                    </span>

                    <span
                        class="mt-1 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-slate-100 to-slate-200/60 px-3 py-1 text-xs font-bold text-slate-700 dark:from-slate-800 dark:to-slate-700 dark:text-slate-300">
                        ⭐ {{ user.rank || 'Silver Member' }}
                    </span>
                </div>
            </div>

            <!-- User Info -->
            <div class="mt-6 space-y-2">
                <div>
                    <p class="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                        Welcome Back
                    </p>
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        {{ user.name }}
                    </h2>
                </div>

                <div class="flex items-center pt-1">
                    <!-- Star Club Member Badge -->
                    <span v-if="user.designation === 'star_club'" 
                        class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20">
                        <span class="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Star Club Member
                    </span>

                    <!-- Dynamic Club Member Badge -->
                    <span v-if="user.designation === 'dynamic_club'" 
                        class="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-600/20 dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/20">
                        <span class="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                        Dynamic Club Member
                    </span>
                </div>
            </div>

            <hr class="my-5 border-slate-100 dark:border-slate-800" />

            <!-- Details -->
            <div class="space-y-4">
                <div class="flex items-center justify-between text-sm">
                    <span class="text-slate-900 dark:text-slate-400">Member ID</span>
                    
                    <span class="rounded-md bg-slate-50 px-2 py-1 font-mono font-semibold bg-slate-500 dark:bg-slate-800 text-slate-100 dark:text-slate-100">
                        {{ user.user_id || `USER${user.id}` }}
                    </span>
                </div>

                <div class="flex items-center justify-between text-sm">
                    <span class="text-slate-900 dark:text-slate-400">Join Date</span>

                    <span
                        class="font-medium text-slate-700 dark:text-slate-300">
                        {{ formatDate(user.created_at) }}
                    </span>
                </div>

                <div
                    v-if="user.email"
                    class="flex items-center justify-between text-sm">
                    <span class="text-slate-900 dark:text-slate-400">Email</span>

                    <span
                        class="max-w-[180px] truncate font-medium text-slate-700 dark:text-slate-300">
                        {{ user.email }}
                    </span>
                </div>
            </div>

            <!-- Button -->
            <!-- <div class="mt-6">
                <button class="w-full rounded-2xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                    View Profile
                </button>
            </div> -->
        </div>

        <!-- Loading -->
        <div v-else-if="loading" class="text-slate-500">
            Loading profile...
        </div>

        <!-- Error -->
        <div v-else class="text-red-500">
            {{ errorMsg }}
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { makeImg } from "../../../../services/api.js";

const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    }
});

const photoUrl = computed(() => {
    return props.user?.photo
        ? makeImg(props.user.photo)
        : "/images/avatar.png";
});

const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};
</script>