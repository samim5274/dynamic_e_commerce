<template>
    <header
        class="sticky top-0 z-30 border-b backdrop-blur
            bg-white/80 text-slate-900 border-slate-200
            dark:bg-slate-900/80 dark:text-slate-100 dark:border-white/10">
        <div class="h-14 px-4 lg:px-6 flex items-center gap-4">
        <!-- Left: Mobile menu -->
        <button
            class="lg:hidden p-2 rounded-lg
                hover:bg-slate-100 text-slate-700
                dark:hover:bg-white/10 dark:text-slate-200"
            aria-label="Open menu"
            @click="$emit('open-sidebar')"
        >
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <!-- Brand -->
        <div class="flex items-center gap-3 min-w-[120px]">
            <div class="font-semibold tracking-wide text-lg text-slate-900 dark:text-white">
            <div 
                class="flex items-center gap-3 group transition-all duration-300 hover:opacity-90">
                <router-link to="/">
                <div class="relative flex items-center justify-center overflow-hidden h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-transform group-hover:scale-105">
                    <img src="/logo/logo.png" alt="Brand Logo" class="w-7 h-7 object-contain drop-shadow-sm dark:hidden" />
                    <img src="/logo/white-logo.png" alt="Brand Logo" class="hidden dark:block w-7 h-7 object-contain drop-shadow-[0_4px_10px_rgba(163,217,33,0.3)]" />
                </div>
                </router-link>
                
                <router-link to="/admin/dashboard">
                <span class="text-lg font-black tracking-tighter uppercase italic text-slate-800 dark:text-white group-hover:text-[#2D92A2] transition-colors">
                    DYNAMIC <span class="text-[#2D92A2]">BAZAR</span>
                </span>
                </router-link>
            </div>
            </div>
        </div>

        <!-- Search -->
        <div class="hidden md:flex flex-1 justify-center">
            <div class="w-full max-w-2xl">
            <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-width="2" d="M21 21l-4.35-4.35" />
                    <path stroke-linecap="round" stroke-width="2" d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                </svg>
                </span>

                <input
                v-model="q"
                type="text"
                placeholder="Search for projects"
                class="w-full rounded-xl border outline-none
                        bg-white text-slate-900 border-slate-200 placeholder:text-slate-400
                        pl-10 pr-3 py-2.5
                        focus:ring-2 focus:ring-emerald-500/40
                        dark:bg-white/10 dark:text-slate-100 dark:border-white/10"
                @keydown.enter="$emit('search', q)"
                />
            </div>
            </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 min-w-[160px] justify-end">
            <!-- Theme -->
            <button
            class="p-2 rounded-lg transition
                    hover:bg-slate-100 text-slate-700
                    dark:hover:bg-white/10 dark:text-slate-200"
            aria-label="Theme"
            @click="$emit('toggle-theme')"
            >
            <!-- Moon (when light) -->
            <svg v-if="!isDark" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-width="2"
                d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>

            <!-- Sun (when dark) -->
            <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-width="2"
                d="M12 3v2M12 19v2M4.22 4.22l1.41 1.41M18.36 18.36l1.41 1.41M3 12h2M19 12h2M4.22 19.78l1.41-1.41M18.36 5.64l1.41-1.41" />
                <path stroke-linecap="round" stroke-width="2"
                d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
            </svg>
            </button>

            <!-- Notifications -->
            <div class="relative" ref="notifWrap">
            <button
                class="relative p-2 rounded-lg transition
                    hover:bg-slate-100 text-slate-700
                    dark:hover:bg-white/10 dark:text-slate-200"
                aria-label="Notifications"
                @click.stop="toggleNotif">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-width="2"
                    d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                <path stroke-linecap="round" stroke-width="2" d="M9 17a3 3 0 0 0 6 0" />
                </svg>

                <span class="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
            </button>

            <div
                v-show="notifOpen"
                class="absolute z-50 right-0 mt-2 w-80 rounded-xl border shadow-xl overflow-hidden
                    bg-white text-slate-900 border-slate-200
                    dark:bg-slate-900 dark:text-slate-100 dark:border-white/10">
                <div class="px-4 py-3 border-b border-slate-200 font-semibold dark:border-white/10">
                Notifications
                </div>

                <ul class="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 custom-scrollbar">
        
                    <li
                        v-for="notice in notices"
                        :key="notice.id" @click="NoticeDetailsShow(notice)"
                        class="relative px-5 py-3.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors flex gap-3.5 items-start"
                    >
                        <div class="flex-shrink-0 mt-0.5">
                        <span 
                            class="flex h-8 w-8 items-center justify-center rounded-lg"
                            :class="{
                            'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400': notice.notice_type === 'Urgent',
                            'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400': notice.notice_type === 'Holiday',
                            'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400': notice.notice_type === 'Academic',
                            'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400': notice.notice_type === 'General' || !notice.notice_type
                            }"
                        >
                            <svg v-if="notice.notice_type === 'Urgent'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <svg v-else-if="notice.notice_type === 'Holiday'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                        </span>
                        </div>

                        <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2">
                            <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate" :title="notice.title">
                            {{ notice.title }}
                            </p>
                            <span 
                            v-if="notice.notice_type"
                            class="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                            :class="{
                                'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400': notice.notice_type === 'Urgent',
                                'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400': notice.notice_type === 'Holiday',
                                'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400': notice.notice_type === 'Academic',
                                'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400': notice.notice_type === 'General'
                            }"
                            >
                            {{ notice.notice_type }}
                            </span>
                        </div>

                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {{ notice.description }}
                        </p>

                        <div class="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span>{{ notice.publish_date }}</span>
                        </div>
                        </div>
                    </li>

                    <li v-if="!notices || notices.length === 0" class="px-5 py-8 text-center text-sm text-slate-400 dark:text-slate-500 italic">
                        <svg class="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                        </svg>
                        No notices available
                    </li>
                    </ul>

                <div class="px-4 py-3 border-t border-slate-200 dark:border-white/10">
                <button
                    class="w-full text-sm py-2 rounded-lg
                        bg-slate-900 text-white hover:bg-slate-800
                        dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15">
                    View all
                </button>
                </div>
            </div>
            </div>

            <!-- Profile -->
            <div class="relative" ref="profileWrap">
            <button
                class="ml-1 flex items-center gap-2 rounded-full p-1 pr-2 transition
                    hover:bg-slate-100 dark:hover:bg-white/10"
                aria-label="Profile menu"
                @click.stop="toggleProfile">
                <img class="h-8 w-8 rounded-full object-cover ring-2 ring-slate-200 dark:ring-white/10" :src="avatarUrl" alt="User" />
                <svg class="h-4 w-4 hidden sm:block text-slate-500 dark:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div
                v-show="profileOpen"
                class="absolute z-50 right-0 mt-2 w-56 rounded-xl border shadow-xl overflow-hidden
                    bg-white text-slate-900 border-slate-200
                    dark:bg-slate-900 dark:text-slate-100 dark:border-white/10">
                <div class="px-4 py-3 border-b border-slate-200 dark:border-white/10">
                <div class="text-sm font-semibold">{{ authUser?.name || "Guest User" }}</div>
                <div class="text-xs text-slate-500 dark:text-slate-400">{{ authUser?.email || "No email" }}</div>
                </div>

                <div class="py-2">
                <button class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/10" @click="pickProfile('profile')">
                    Profile
                </button>
                <button class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/10" @click="pickProfile('settings')">
                    Settings
                </button>
                <button class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/10" @click="pickProfile('help')">
                    Help
                </button>
                </div>

                <div class="border-t border-slate-200 dark:border-white/10">
                <button
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50
                        dark:text-red-300 dark:hover:bg-white/10"
                    @click="pickProfile('logout')">
                    Logout
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import api, { makeImg } from '../../../services/api';

const router = useRouter();


const loading = ref(false);

const authUser = ref(null);
const isLoggedIn = ref(false);

async function loadAuthUser() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
        isLoggedIn.value = false;
        authUser.value = null;
        return;
        }

        const res = await api.get("/user");
        authUser.value = res.data;
        isLoggedIn.value = true;
    } catch (err) {
        isLoggedIn.value = false;
        authUser.value = null;
        localStorage.removeItem("token");
    }
}










const notices = ref([]);
async function loadNotice() {
    try {
        const res = await api.get("/notice/user");
        notices.value = res.data.data;
    } catch (err) {
        console.error("Notification load failed:", err);
    }
}



function NoticeDetailsShow(notice){
    router.push(`/admin/notice/${notice.id}/details`);
}










defineProps({
  isDark: { type: Boolean, default: false },
});

defineEmits(["open-sidebar", "toggle-theme", "search", "profile-action"]);

const q = ref("");

/* dropdown states */
const notifOpen = ref(false);
const profileOpen = ref(false);

const notifWrap = ref(null);
const profileWrap = ref(null);

function toggleNotif() {
    notifOpen.value = !notifOpen.value;
    if (notifOpen.value) profileOpen.value = false;
}

function toggleProfile() {
    profileOpen.value = !profileOpen.value;
    if (profileOpen.value) notifOpen.value = false;
}

function closeAll() {
    notifOpen.value = false;
    profileOpen.value = false;
}









async function pickProfile(action) {
    console.log("profile action:", action);
    closeAll(); 

    if (action === "profile") {
        return router.push("/profile");
    }

    if (action === "settings") {
        return router.push("/admin/setting"); 
    }


    if (action === "logout") {
        try {
        loading.value = true;
        await api.post("/auth/logout");
        } catch (error) {
        console.error("Logout failed API side:", error);
        } finally {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        authUser.value = null;   
        isLoggedIn.value = false;
        
        router.push("/login"); 
        }
    }
}








const defaultAvatar = "/images/avatar.png";

const avatarUrl = computed(() => {
    const photo = authUser.value?.photo;
    return photo ? makeImg(photo) : defaultAvatar;
});







/* click outside -> close */
function onDocClick(e) {
    const t = e.target;
    const inNotif = notifWrap.value?.contains(t);
    const inProfile = profileWrap.value?.contains(t);
    if (!inNotif && !inProfile) closeAll();
}

/* ESC -> close */
function onKey(e) {
    if (e.key === "Escape") closeAll();
}

onMounted(() => {
    loadAuthUser();
    loadNotice();
    document.addEventListener("click", onDocClick);
    window.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", onDocClick);
    window.removeEventListener("keydown", onKey);
});
</script>