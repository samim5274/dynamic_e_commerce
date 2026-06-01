<template>
    <main class="min-h-screen bg-gray-50 dark:bg-[#0C1326]">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 py-5">

            <!-- Top bar (Title + optional actions/search) -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard Overview</h1>
                    <p class="text-sm text-gray-700 dark:text-slate-300">Dynamic Bazar Merchant BD summary & performance</p>
                </div>

                <!-- Optional: right side button -->
                <!-- <div class="flex items-center gap-3">
                    <button class="rounded-xl px-4 py-2 text-sm font-semibold bg-slate-200 dark:bg-white/10 
                    dark:text-white border border-white/10 hover:bg-white/15 transition">Export</button>
                </div> -->
            </div>


            <!-- =========================== Profile Card Section =========================== -->
            <profileCard />
            <!-- =========================== Profile Card Section =========================== -->


            <!-- =========================== Balance Section =========================== -->
            <div class="space-y-6 mb-8">

                <div class="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900 p-6 shadow-xl shadow-indigo-100/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
                    <div class="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
                    <div class="absolute -bottom-12 left-1/3 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"></div>
                    
                    <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div class="space-y-2">
                            <div class="flex items-center gap-2.5">
                                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                    <i class="fa-solid fa-wallet text-sm"></i>
                                </div>
                                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Available Wallet Balance</span>
                                <span class="relative flex h-2 w-2">
                                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                </span>
                            </div>
                            <div class="flex items-baseline text-white">
                                <span class="text-2xl font-medium text-slate-500 mr-2">৳</span>
                                <h2 class="font-mono text-4xl font-black tracking-tight">{{ formatCount(balance ?? 0) }}</h2>
                            </div>
                        </div>

                        <div class="flex items-center sm:text-right gap-4 sm:border-l sm:border-slate-800 sm:pl-6">
                            <div class="hidden sm:block">
                                <p class="text-[10px] text-slate-400 font-medium">Instant Withdrawals Available</p>
                                <p class="text-[11px] font-semibold italic text-indigo-400 mt-0.5">Min: ৳500</p>
                            </div>
                            <button @click="WithdrawCreate()" class="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg active:scale-[0.97]">
                                Payout Request
                            </button>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-amber-200 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-amber-500/30">
                        <div class="relative flex h-full flex-col justify-between min-h-[140px]">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2.5">
                                    <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400">
                                        <i class="fa-solid fa-clock-rotate-left text-sm"></i>
                                    </div>
                                    <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Pending Escrow</span>
                                </div>
                                <span class="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 border border-amber-200/40 dark:bg-amber-500/10 dark:text-amber-400 dark:border-transparent">In Process</span>
                            </div>
                            <div class="my-3 flex items-baseline text-slate-900 dark:text-white">
                                <span class="text-2xl font-medium text-slate-400 dark:text-slate-500 mr-1.5">৳</span>
                                <h2 class="font-mono text-3xl font-extrabold tracking-tight">{{ formatCount(pending ?? 0) }}</h2>
                            </div>
                            <div class="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/50">
                                <span class="text-[11px] font-medium text-slate-400">Locked for review</span>
                                <a href="#" class="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                    <span>Details</span>
                                    <svg class="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-emerald-200 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-emerald-500/30">
                        <div class="relative flex h-full flex-col justify-between min-h-[140px]">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2.5">
                                    <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400">
                                        <i class="fa-solid fa-money-bill-wheat text-sm"></i>
                                    </div>
                                    <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Gross Earnings</span>
                                </div>
                                <span class="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200/40 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-transparent">Lifetime</span>
                            </div>
                            <div class="my-3 flex items-baseline text-slate-900 dark:text-white">
                                <span class="text-2xl font-medium text-slate-400 dark:text-slate-500 mr-1.5">৳</span>
                                <h2 class="font-mono text-3xl font-extrabold tracking-tight">{{ formatCount(credit ?? 0) }}</h2>
                            </div>
                            <div class="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/50">
                                <span class="text-[11px] font-medium text-slate-400">All time transactions</span>
                                <a href="#" class="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                    <span>Statement</span>
                                    <svg class="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- =========================== Balance Section =========================== -->





            <!-- =========================== Card Section =========================== -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div 
                    v-for="card in statusCards" 
                    :key="card.key" 
                    class="group relative overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100 dark:border-slate-800/80 dark:bg-slate-900 dark:hover:shadow-none">
                    <div class="flex h-full flex-col justify-between min-h-[140px]">
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                        <div :class="['flex h-10 w-10 items-center justify-center rounded-xl border border-transparent', card.iconWrap]">
                            <i :class="card.icon" class="text-base"></i>
                        </div>
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {{ card.title }}
                        </span>
                        </div>
                        <span class="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-100 dark:bg-slate-800/50 dark:text-slate-400 dark:border-transparent">
                        {{ card.pill }}
                        </span>
                    </div>

                    <div class="my-4 flex items-baseline text-slate-900 dark:text-white">
                        <h2 class="font-mono text-3xl font-black tracking-tight">
                        {{ formatCount(card.value ?? 0) }}
                        </h2>
                    </div>

                    <div class="flex items-center gap-1.5 border-t border-slate-50 pt-3 dark:border-slate-800/40 text-slate-800 dark:text-slate-100">
                        <i :class="[card.subIcon, card.subtextClass]" class="text-[11px]"></i>
                        <span :class="['text-[11px] font-semibold tracking-wide', card.subtextClass]">
                        {{ card.subtext }}
                        </span>
                    </div>
                    </div>
                </div>
            </div>
            <!-- =========================== Card Section =========================== -->
        </div>

        <div class="mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div class="grid grid-cols-1 xl:grid-cols-12 gap-4">
                <div class="xl:col-span-8 bg-gray-50 dark:bg-[#0c1326] border dark:border-slate-700 rounded-md p-3 text-white">
                    <h4 class="pb-2">My Order</h4>
                    <div class="w-full overflow-hidden rounded-2xl dark:border-slate-700  shadow-sm">
                        
                        
                        <!-- List -->
                        <div class="w-full overflow-x-auto max-h-[950px] mb-3">
                            <div class="space-y-3">
                                <!-- Items -->
                                <article
                                    v-for="complaint in complaints"
                                    :key="complaint.id"
                                    @click="viewComplaint(complaint)"
                                    class="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition
                                        hover:shadow-md hover:bg-slate-50/60
                                        dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800/40">
                                    <div class="flex items-start gap-4">
                                        <!-- left icon -->
                                        <div class="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600
                                                    dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                            <i class="fa-regular fa-file-lines"></i>
                                        </div>

                                        <!-- content -->
                                        <div class="min-w-0 flex-1">
                                            <!-- top row -->
                                            <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                <!-- left -->
                                                <div class="min-w-0">
                                                    <div class="flex flex-wrap items-center gap-2">
                                                        <h3 class="truncate text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:underline">
                                                            {{ complaint.title || "Untitled Complaint" }}
                                                        </h3>

                                                        <span
                                                            class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600
                                                                dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                            #{{ complaint.complaint_no || "N/A" }}
                                                        </span>

                                                        <span
                                                            v-if="complaint.is_anonymous"
                                                            class="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-semibold text-purple-700
                                                                dark:bg-purple-900/30 dark:text-purple-300"
                                                        >
                                                            Anonymous
                                                        </span>

                                                        <span
                                                            v-if="complaint.is_public"
                                                            class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                                            Public
                                                        </span>
                                                    </div>

                                                    <!-- tags -->
                                                    <div class="mt-2 flex flex-wrap gap-2">
                                                        <span class="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                            {{ complaint.category?.name || "No Category" }}
                                                        </span>

                                                        <span
                                                            v-if="complaint.sub_category?.name"
                                                            class="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                                            {{ complaint.sub_category?.name }}
                                                        </span>
                                                    </div>

                                                    <!-- meta line -->
                                                    <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                                        <span class="inline-flex items-center gap-2">
                                                            <i class="fa-regular fa-clock"></i>
                                                            {{ formatDate(complaint.created_at) }} • {{ formatTime(complaint.created_at) }}
                                                        </span>
                                                    </p>
                                                </div>

                                                <!-- right: badges -->
                                                <div class="flex flex-wrap items-center gap-2">
                                                    <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize" :class="priorityBadge(complaint.priority)">
                                                        {{ complaint.priority || "N/A" }}
                                                    </span>

                                                    <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize" :class="statusBadge(complaint.status)" >
                                                        {{ formatStatus(complaint.status) }}
                                                    </span>
                                                </div>
                                            </div>

                                            <!-- location -->
                                            <div class="mt-3 flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                                                <p class="truncate">
                                                    <i class="fa-solid fa-location-dot me-2"></i>
                                                    {{ complaint.division?.name || "-" }},
                                                    {{ complaint.district?.name || "-" }}
                                                    <span v-if="complaint.upazila?.name">, {{ complaint.upazila?.name }}</span>
                                                    <span v-if="complaint.police_station?.name">, {{ complaint.police_station?.name }}</span>
                                                    <span v-if="complaint.attachments?.length" class="inline-flex items-center ml-2">
                                                        <i class="fa-solid fa-paperclip me-2"></i>
                                                        {{ complaint.attachments.length }} attachment(s)
                                                    </span>
                                                </p>

                                                <p class="truncate sm:max-w-[320px]">
                                                    {{ complaint.address_line || "No address" }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </article>

                                <!-- Empty -->
                                <div
                                    v-if="!loading && (!complaints || complaints.length === 0)"
                                    class="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
                                    <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">No complaints found.</p>
                                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Try adjusting filters or search.</p>
                                </div>
                            </div>
                        </div>


                        <!-- Pegination section -->
                        <div class="flex flex-col gap-2 border-slate-200 bg-white dark:bg-slate-900 shadow-sm px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <p class="text-xs text-slate-500">
                                Showing
                                <span class="font-semibold text-slate-700">{{ publicFromItem }}</span>
                                –
                                <span class="font-semibold text-slate-700">{{ publicToItem }}</span>
                                of
                                <span class="font-semibold text-slate-700">{{ publicTotal }}</span>
                            </p>

                            <div class="flex flex-wrap items-center justify-end gap-2">
                                <!-- First -->
                                <button
                                    @click="getComplaints(1)"
                                    :disabled="publicPage === 1 || publicLoading"
                                    class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                    <i class="fa-solid fa-angles-left"></i>
                                </button>

                                <!-- Prev -->
                                <button
                                    @click="getComplaints(Math.max(1, publicPage - 1))"
                                    :disabled="publicPage === 1 || publicLoading"
                                    class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </button>

                                <!-- Pages -->
                                <button
                                    v-for="page in publicVisiblePages"
                                    :key="String(page)"
                                    :disabled="page === '...' || publicLoading"
                                    @click="page !== '...' && getComplaints(page)"
                                    class="rounded-lg border px-3 py-1.5 text-xs font-semibold"
                                    :class="[
                                        page === '...'
                                            ? 'border-slate-200 bg-white dark:bg-slate-900 text-slate-400 cursor-default'
                                            : publicPage === page
                                                ? 'border-slate-900 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                                                : 'border-slate-200 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 hover:bg-slate-50'
                                    ]">
                                    {{ page }}
                                </button>

                                <!-- Next -->
                                <button
                                    @click="getComplaints(Math.min(publicLastPage, publicPage + 1))"
                                    :disabled="publicPage === publicLastPage || publicLoading"
                                    class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>

                                <!-- Last -->
                                <button
                                    @click="getComplaints(publicLastPage)"
                                    :disabled="publicPage === publicLastPage || publicLoading"
                                    class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                    <i class="fa-solid fa-angles-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="xl:col-span-4 bg-gray-50 dark:bg-[#0c1326] border dark:border-slate-700 rounded-md p-3 text-white">
                    <h4 class="pb-2">My Transection</h4>
                    <!-- <p class="text-xs text-red-500">Count: {{ myComplaints.length }}</p> -->
                    <div class="w-full overflow-x-auto max-h-[950px] mb-3">
                        <div class="w-full overflow-x-auto">
                            <div class="space-y-3">
                                <!-- List items -->
                                <article
                                    v-for="c in myComplaints"
                                    :key="c.id" 
                                    class="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">

                                    <div class="flex items-start gap-4">
                                        <!-- icon chip -->
                                        <div class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                            <i class="fa-regular fa-file-lines"></i>
                                        </div>

                                        <!-- main -->
                                        <div class="min-w-0 flex-1">
                                            <!-- top row -->
                                            <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                <div class="min-w-0">
                                                    <div class="flex flex-wrap items-center gap-2">
                                                        <h3 @click="viewComplaint(c)" class="truncate text-sm font-bold text-slate-900 dark:text-slate-100 hover:underline hover:cursor-pointer">
                                                            {{ c.title || "Untitled Complaint" }}
                                                        </h3>

                                                        <span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                            #{{ c.complaint_no || "N/A" }}
                                                        </span>

                                                        <!-- <span
                                                            v-if="c.is_anonymous"
                                                            class="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                                            Anonymous
                                                        </span>

                                                        <span
                                                            v-if="c.is_public"
                                                            class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                                            Public
                                                        </span> -->
                                                    </div>

                                                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                        {{ c.category?.name || "Category N/A" }}
                                                        <span class="mx-1">•</span>
                                                        {{ c.sub_category?.name || "Sub N/A" }}
                                                        <span class="mx-1">•</span>
                                                        {{ c.district?.name || "District N/A" }}
                                                        <span v-if="c.upazila?.name">, {{ c.upazila?.name }}</span>
                                                        <span v-if="c.ward_no"> (Ward {{ c.ward_no }})</span>
                                                    </p>
                                                </div>

                                                <!-- badges -->
                                                <!-- <div class="flex flex-wrap items-center gap-2">
                                                    <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize" :class="priorityBadge(c.priority)">
                                                    {{ c.priority || "N/A" }}
                                                    </span>

                                                    <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize" :class="statusBadge(c.status)">
                                                    {{ formatStatus(c.status) }}
                                                    </span>
                                                </div> -->

                                                <div v-if="c.status === 'pending'" class="flex flex-wrap items-center gap-2">
                                                    <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize text-red-500">
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </span>
                                                </div>
                                            </div>

                                            <!-- bottom meta -->
                                            <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                                                <span class="inline-flex items-center gap-2">
                                                    <i class="fa-regular fa-clock"></i>
                                                    {{ formatDate(c.created_at) }} • {{ formatTime(c.created_at) }}
                                                </span>

                                                <span v-if="c.assigned_to" class="inline-flex items-center gap-2">
                                                    <i class="fa-solid fa-user-check"></i>
                                                    Assigned
                                                </span>

                                                <!-- <span v-if="c.attachments?.length" class="inline-flex items-center gap-2">
                                                    <i class="fa-solid fa-paperclip"></i>
                                                    {{ c.attachments.length }} attachment(s)
                                                </span> -->
                                            </div>

                                            <!-- actions -->
                                            <!-- <div class="mt-4 flex flex-wrap items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    @click="viewComplaint(c)"
                                                    class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800">
                                                    <i class="fa-regular fa-eye"></i>
                                                    View
                                                </button>

                                                <button
                                                    v-if="c.status === 'pending'"
                                                    type="button"
                                                    @click="onDelete(c)"
                                                        class="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 shadow-sm
                                                        hover:bg-red-100 active:bg-red-200 transition
                                                        dark:border-red-800 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-900/40
                                                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                    Delete
                                                </button>
                                            </div> -->
                                        </div>
                                    </div>
                                </article>

                                <!-- Empty -->
                                <div
                                    v-if="!loading && (myComplaints?.length ?? 0) === 0"
                                    class="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
                                    <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">No complaints found</p>
                                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Try changing filters or create a new complaint.</p>
                                </div>
                            </div>
                        </div>                        
                    </div>


                    <!-- Pegination section -->
                    <div class="flex flex-col gap-2 border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <p class="text-xs text-slate-500">
                            Showing
                            <span class="font-semibold text-slate-700">{{ myFromItem }}</span>
                            –
                            <span class="font-semibold text-slate-700">{{ myToItem }}</span>
                            of
                            <span class="font-semibold text-slate-700">{{ myTotal }}</span>
                        </p>

                        <div class="flex flex-wrap items-center justify-end gap-2">
                            <!-- First -->
                            <button
                                @click="getMyComplaints(1)"
                                :disabled="myPage === 1 || myLoading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-angles-left"></i>
                            </button>

                            <!-- Prev -->
                            <button
                                @click="getMyComplaints(Math.max(1, myPage - 1))"
                                :disabled="myPage === 1 || myLoading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>

                            <!-- Pages -->
                            <button
                                v-for="page in myVisiblePages"
                                :key="String(page)"
                                :disabled="page === '...' || myLoading"
                                @click="page !== '...' && getMyComplaints(page)"
                                class="rounded-lg border px-3 py-1.5 text-xs font-semibold"
                                :class="[
                                    page === '...'
                                        ? 'border-slate-200 bg-white dark:bg-slate-900 text-slate-400 cursor-default'
                                        : myPage === page
                                            ? 'border-slate-900 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                                            : 'border-slate-200 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 hover:bg-slate-50'
                                ]">
                                {{ page }}
                            </button>

                            <!-- Next -->
                            <button
                                @click="getMyComplaints(Math.min(myLastPage, myPage + 1))"
                                :disabled="myPage === myLastPage || myLoading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-angle-right"></i>
                            </button>

                            <!-- Last -->
                            <button
                                @click="getMyComplaints(myLastPage)"
                                :disabled="myPage === myLastPage || myLoading"
                                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40">
                                <i class="fa-solid fa-angles-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import api from "../../../services/api";

const router = useRouter();

const loading = ref(false);
const errorMsg = ref("");


/* ====================== */
/* Dashboard component */
/* ====================== */
import profileCard from "./dashboard/profile-card.vue";







const balance = ref(0);
const pending = ref(0);
const credit  = ref(0);
const fetchDashBoardData = async () => {
    try {
        loading.value = true;
        errorMsg.value = null;

        const response = await api.get('/customer/dashboard'); 

        if (response.data.success === true) {
            const data = response.data.data;
            balance.value = data.balance ?? 0;
            pending.value = data.pending ?? 0;
            credit.value  = data.credit ?? 0;

            status.value  = data.status ?? {};
        } else {
            errorMsg.value = response.data.message || "Failed to fetch balance";
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        errorMsg.value = err.response?.data?.message || "Something went wrong while connecting to the server.";
    } finally {
        loading.value = false;
    }
};

function WithdrawCreate()
{
    router.push('/withdraw/create');
}












const status = ref({
    total_member: 0,
    total_refer: 0,
    total_point: 0,
    total_match: 0,
    left_member: 0,
    right_member: 0,
    left_point: 0,
    right_point: 0,
    left_carry: 0,
    right_carry: 0,
});

// Shobgulo variable map kora dynamic block setup
const statusCards = computed(() => [
    // === GROUP 1: GLOBAL PLATFORM OVERVIEW ===
    {
        key: "total_member",
        group: "Global Overview",
        title: "Total Members",
        value: status.value.total_member,
        icon: "fa-solid fa-users",
        iconWrap: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        pill: "Global Size",
        subIcon: "fa-solid fa-network-wired",
        subtext: "Entire downline size",
    },
    {
        key: "total_refer",
        group: "Global Overview",
        title: "Total Referrals",
        value: status.value.total_refer,
        icon: "fa-solid fa-user-plus",
        iconWrap: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
        pill: "Direct",
        subIcon: "fa-solid fa-star",
        subtext: "Personally sponsored",
    },
    {
        key: "total_point",
        group: "Global Overview",
        title: "Total Points (OWN)",
        value: status.value.total_point,
        icon: "fa-solid fa-chart-bar",
        iconWrap: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
        pill: "Business Volume",
        subIcon: "fa-solid fa-layer-group",
        subtext: "Cumulative point count",
    },
    {
        key: "total_match",
        group: "Global Overview",
        title: "Total Matching",
        value: status.value.total_match,
        icon: "fa-solid fa-circle-nodes",
        iconWrap: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        pill: "Matching Metrics",
        subIcon: "fa-solid fa-bolt",
        subtext: "Cycles successfully closed",
    },

    // === GROUP 2: LEFT BINARY LEG STATS ===
    {
        key: "left_member",
        group: "Left Leg Analytics",
        title: "Left Team Members",
        value: status.value.left_member,
        icon: "fa-solid fa-arrow-turn-down",
        iconWrap: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
        pill: "Left Team",
        subIcon: "fa-solid fa-user-group",
        subtext: "Total users on Left Side",
    },
    {
        key: "right_member",
        group: "Right Leg Analytics",
        title: "Right Team Members",
        value: status.value.right_member,
        icon: "fa-solid fa-arrow-turn-down",
        iconWrap: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
        pill: "Right Team",
        subIcon: "fa-solid fa-user-group",
        subtext: "Total users on Right Side",
    },
    {
        key: "left_point",
        group: "Left Leg Analytics",
        title: "Left Side Points",
        value: status.value.left_point,
        icon: "fa-solid fa-arrow-trend-up",
        iconWrap: "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
        pill: "Left Volume",
        subIcon: "fa-solid fa-cubes",
        subtext: "Current active points",
    },
    {
        key: "right_point",
        group: "Right Leg Analytics",
        title: "Right Side Points",
        value: status.value.right_point,
        icon: "fa-solid fa-arrow-trend-up",
        iconWrap: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
        pill: "Right Volume",
        subIcon: "fa-solid fa-cubes",
        subtext: "Current active points",
    },
    {
        key: "left_carry",
        group: "Left Leg Analytics",
        title: "Left Carry Forward",
        value: status.value.left_carry,
        icon: "fa-solid fa-forward",
        iconWrap: "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400",
        pill: "Left Carry",
        subIcon: "fa-solid fa-box-archive",
        subtext: "Stored points for next match",
    },
    {
        key: "right_carry",
        group: "Right Leg Analytics",
        title: "Right Carry Forward",
        value: status.value.right_carry,
        icon: "fa-solid fa-forward",
        iconWrap: "bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
        pill: "Right Carry",
        subIcon: "fa-solid fa-box-archive",
        subtext: "Stored points for next match",
    },
]);

















function formatCount(value) {
    const num = Number(value) || 0;

    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }

    return num.toString();
}

















onMounted(() => {
    fetchDashBoardData();
});
</script>

<style>

</style>