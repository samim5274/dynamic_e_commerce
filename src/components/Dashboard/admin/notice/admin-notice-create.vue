<template>
    <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
        <HeaderSection
            @open-sidebar="sidebarOpen = true"
            @search="onSearch"
            :isDark="isDark" @toggle-theme="toggleTheme"
        />

        <div class="flex min-h-[calc(100vh-56px)]">
            <Navbar
                v-model="activeNavbar"
                :open="sidebarOpen"
                @close="sidebarOpen = false"
            />

            <Message
                :successMsg="successMsg"
                :errorMsg="errorMsg"
                @update:successMsg="successMsg = $event"
                @update:errorMsg="errorMsg = $event"
            />
    
            <div class="min-h-screen w-full bg-gray-50 dark:bg-slate-950 transition-colors duration-200 p-6">
                <div class="mx-auto bg-white dark:bg-slate-900 shadow-lg rounded-2xl p-4">
                    <div class="mx-auto bg-white dark:bg-slate-900 shadow sm:rounded-lg p-6">
                        <div class="border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
                            <h3 class="text-lg font-medium leading-6 text-slate-900 dark:text-white">
                                <button @click="$router.back()" class="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm">
                                    <i class="fa-solid fa-arrow-left-long h-5 w-5 text-slate-600 dark:text-slate-400"></i>
                                </button>
                                Create New Notice
                            </h3>
                            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Fill in the details to publish a new notice.</p>
                        </div>

                        <form @submit.prevent="submitForm" class="space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
    
                            <div class="space-y-6">
                                
                                <div>
                                    <label for="title" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Notice Title <span class="text-rose-500">*</span>
                                    </label>
                                    <div class="relative rounded-md shadow-sm">
                                        <input 
                                            v-model="form.title" 
                                            type="text" 
                                            id="title" 
                                            required
                                            class="block w-full rounded-md border-0 px-4 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700 dark:focus:ring-indigo-500 transition-all"
                                            placeholder="e.g., Office Closed for Eid Vacation"
                                        />
                                    </div>
                                    <p v-if="errors.title" class="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                                        <span class="inline-block w-1 h-1 rounded-full bg-rose-600"></span> {{ errors.title[0] }}
                                    </p>
                                </div>

                                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label for="notice_type" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            Notice Type <span class="text-rose-500">*</span>
                                        </label>
                                        <div class="mt-1">
                                            <select 
                                                v-model="form.notice_type" id="notice_type" required
                                                class="block w-full rounded-md border-0 px-4 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700 transition-all"
                                            >
                                                <option value="" disabled>Select Type</option>
                                                <option value="General">📅 General</option>
                                                <option value="Urgent">🚨 Urgent</option>
                                                <option value="Holiday">🎉 Holiday</option>
                                                <option value="Academic">🎓 Academic</option>
                                            </select>
                                        </div>
                                        <p v-if="errors.notice_type" class="mt-1.5 text-xs text-rose-600">{{ errors.notice_type[0] }}</p>
                                    </div>

                                    <div>
                                        <label for="publish_date" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            Publish Date <span class="text-rose-500">*</span>
                                        </label>
                                        <div class="mt-1">
                                            <input 
                                                v-model="form.publish_date" 
                                                type="date" id="publish_date" required
                                                class="block w-full rounded-md border-0 px-4 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700 transition-all"
                                            />
                                        </div>
                                        <p v-if="errors.publish_date" class="mt-1.5 text-xs text-rose-600">{{ errors.publish_date[0] }}</p>
                                    </div>
                                </div>

                                <div>
                                    <label for="description" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Detailed Description <span class="text-rose-500">*</span>
                                    </label>
                                    <div class="mt-1">
                                        <textarea 
                                            v-model="form.description" 
                                            id="description" rows="5" required
                                            class="block w-full rounded-md border-0 px-4 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700 transition-all"
                                            placeholder="Provide deep insights or details about the notice here..."
                                        ></textarea>
                                    </div>
                                    <p v-if="errors.description" class="mt-1.5 text-xs text-rose-600">{{ errors.description[0] }}</p>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Attachment <span class="text-xs text-slate-400 dark:text-slate-500">(PDF, DOC, Images - Max 5MB)</span>
                                    </label>
                                    <div class="mt-1 flex justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 px-6 py-6 transition-all hover:border-indigo-500 dark:hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-800/20">
                                        <div class="text-center">
                                            <svg class="mx-auto h-10 w-10 text-slate-400 dark:text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <div class="mt-4 flex text-sm leading-6 text-slate-600 dark:text-slate-400 justify-center">
                                                <label for="file-upload" class="relative cursor-pointer rounded-md font-semibold text-indigo-600 dark:text-indigo-400 focus-within:outline-none hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileChange" />
                                                </label>
                                                <p class="pl-1">or drag and drop</p>
                                            </div>
                                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                {{ form.attachment ? `Selected: ${form.attachment.name}` : 'Any official document or image asset' }}
                                            </p>
                                        </div>
                                    </div>
                                    <p v-if="errors.attachment" class="mt-1.5 text-xs text-rose-600">{{ errors.attachment[0] }}</p>
                                </div>

                                <div class="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60">
                                    <div class="flex flex-col">
                                        <span class="text-sm font-semibold text-slate-900 dark:text-white">Active Status</span>
                                        <span class="text-xs text-slate-500 dark:text-slate-400">If active, this notice will be immediately broadcasted to all active channels.</span>
                                    </div>
                                    <button 
                                        type="button"
                                        @click="form.is_active = !form.is_active"
                                        :class="form.is_active ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'"
                                        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                                    >
                                        <span 
                                            :class="form.is_active ? 'translate-x-5' : 'translate-x-0'"
                                            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                        ></span>
                                    </button>
                                </div>

                            </div>

                            <div class="flex items-center justify-end gap-3 pt-6 bg-white dark:bg-transparent">
                                <button 
                                    type="button" 
                                    @click="resetForm"
                                    class="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    :disabled="loading"
                                    class="inline-flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ loading ? 'Saving...' : 'Publish Notice' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <FooterSection />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../../../../services/api.js';

import Navbar from "../admin-navbar.vue";
import HeaderSection from "../admin-header.vue";
import Message from '../../../Message/message.vue';
import FooterSection from "../../../e-commerce/footer.vue";

const router = useRouter();
const route  = useRoute();

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');
const errors = ref({});
const activeNavbar = ref('');

const form = ref({
    title: '',
    description: '',
    publish_date: new Date().toISOString().split('T')[0],
    notice_type: '',
    is_active: true,
    attachment: null
});

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.value.attachment = file;
    }
};

const submitForm = async () => {
    loading.value = true;
    successMsg.value = '';
    errorMsg.value = '';
    errors.value = {};

    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('description', form.value.description);
    formData.append('publish_date', form.value.publish_date);
    formData.append('notice_type', form.value.notice_type);
    formData.append('is_active', form.value.is_active ? 1 : 0);
    
    if (form.value.attachment) {
        formData.append('attachment', form.value.attachment);
    }

    try {
        const res = await api.post('/notice/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        
        successMsg.value = res.data.message || 'Notice created successfully!';
        resetForm();

        setTimeout(() => {
            router.back();
        }, 2700);
    } catch (err) {
        console.error('Full error:', err.response?.data);

        if (err.response?.status === 422) {
            errors.value  = err.response.data.errors ?? {};
            errorMsg.value = 'Validation failed. Please check the form fields.';
        } else if (err.response?.status === 500) {
            errorMsg.value = err.response.data.error || 'Server error occurred.';
        } else {
            errorMsg.value = err.response?.data?.message || 'Something went wrong.';
        }
    } finally {
        loading.value = false;
    }
};

const resetForm = () => {
    form.value = {
        title: '',
        description: '',
        publish_date: new Date().toISOString().split('T')[0],
        notice_type: '',
        is_active: true,
        attachment: null
    };
    errors.value = {};
};

// dark and light mode
const isDark = ref(false);
const sidebarOpen = ref(false);

function applyTheme(dark) {
    isDark.value = dark;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
}

function toggleTheme() {
    applyTheme(!isDark.value);
}

function onSearch(q) {
    // console.log("search:", q);
}

/* ESC to close drawer */
onMounted(() => {
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") sidebarOpen.value = false;
    });
    const saved = localStorage.getItem("theme");
    if (saved === "dark") applyTheme(true);
    else if (saved === "light") applyTheme(false);
    else {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(systemDark);
    }
});
</script>