<template>
    <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
        <Header
            @open-sidebar="sidebarOpen = true"
            @search="onSearch"
            :isDark="isDark" @toggle-theme="toggleTheme"
        />

        <Message
            :successMsg="successMsg"
            :errorMsg="errorMsg"
            @update:successMsg="successMsg = $event"
            @update:errorMsg="errorMsg = $event"
        />

        <div class="flex  min-h-[calc(100vh-56px)]">
            <Navbar
                v-model="active"
                :open="sidebarOpen"
                @close="sidebarOpen = false"
            />

            <!-- Content -->
            <div class="flex-1 min-w-0">
                <main class="flex-1 min-w-0 bg-gray-50 dark:bg-[#0C1326] px-4 sm:px-6 lg:px-8 py-6">
                    <!-- Header -->
                    <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">{{ form.name }} - Modifeing</h1>
                            <p class="text-sm text-slate-600 dark:text-slate-300">{{ form.email }} - {{ form.user_id }}</p>
                        </div>
                    </div>

                    <section class="lg:col-span-2">
                        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 mt-4">
                            
                            <div class="space-y-6">
                                <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="h-8 w-1 bg-[#A3D921] rounded-full"></div>
                                        <h2 class="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                                            Personal Information
                                        </h2>
                                    </div>

                                    <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all">
                                        <span class="text-[10px] font-black uppercase tracking-widest transition-colors duration-300" 
                                            :class="form.is_active ? 'text-[#A3D921]' : 'text-slate-400'">
                                            {{ form.is_active ? 'Account Active' : 'Account Inactive' }}
                                        </span>
                                        
                                        <button 
                                            @click="form.is_active = !form.is_active"
                                            type="button"
                                            :class="form.is_active ? 'bg-[#A3D921]' : 'bg-slate-300 dark:bg-slate-700'"
                                            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none"
                                        >
                                            <span 
                                                aria-hidden="true" 
                                                :class="form.is_active ? 'translate-x-5 shadow-md' : 'translate-x-0'"
                                                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-300 ease-in-out"
                                            ></span>
                                        </button>
                                    </div>
                                </div>
                                
                            </div>













                            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field label="Name">
                                <input v-model="form.name" type="text" class="input" placeholder="Your name" />
                                </Field>

                                <Field label="Phone">
                                <input v-model="form.phone" type="text" class="input" required placeholder="01XXXXXXXXX" />
                                </Field>

                                <Field label="Email">
                                <input v-model="form.email" class="input" placeholder="e.g example@example.com" />
                                </Field>

                                <Field label="Date of birth">
                                <input v-model="form.dob" type="date" class="input" />
                                </Field>

                                <Field label="Gender">
                                <select v-model="form.gender" class="input">
                                    <option value="" disabled="">-- Select Gender --</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                </Field>

                                <Field label="Blood group">
                                <select v-model="form.blood_group" class="input">
                                    <option value="" disabled selected>-- Select Blood Group --</option>
                                    <option>O+</option><option>O-</option>
                                    <option>A+</option><option>A-</option>
                                    <option>B+</option><option>B-</option>
                                    <option>AB+</option><option>AB-</option>
                                </select>
                                </Field>

                                <Field label="National ID">
                                <input v-model="form.national_id" type="text" class="input" required placeholder="NID number" />
                                </Field>

                                <Field label="Religion">
                                <input v-model="form.religion" type="text" class="input" placeholder="Religion" />
                                </Field>

                            </div>
                        </div>

                        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 mt-4">
                            <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Address</h2>

                            <div class="mt-4 grid grid-cols-1 gap-4">
                                <Field label="Present address">
                                <textarea v-model="form.present_address" rows="3" class="input" placeholder="Present address"></textarea>
                                </Field>

                                <Field label="Permanent address">
                                <textarea v-model="form.permanent_address" rows="3" class="input" placeholder="Permanent address"></textarea>
                                </Field>
                            </div>
                        </div>

                        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 mt-4">
                            <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
                                Security Settings
                            </h2>

                            <div class="grid grid-cols-1 gap-6">
                                <div class="space-y-1">
                                    <label class="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                                    <div class="relative">
                                        <input 
                                            v-model="form.password" 
                                            :type="showPassword ? 'text' : 'password'"
                                            :class="[
                                                'w-full px-4 py-2.5 rounded-xl border bg-transparent focus:ring-2 outline-none transition-all dark:text-white',
                                                form.password_confirmation && !isMatched ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                                            ]" 
                                            placeholder="••••••••"
                                        />
                                        <button 
                                            type="button"
                                            @click="showPassword = !showPassword"
                                            class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-indigo-500 transition-colors">
                                            <i v-if="!showPassword" class="fa-solid fa-eye h-5 w-5"></i>
                                            <i v-else class="fa-solid fa-eye-slash h-5 w-5"></i>
                                        </button>
                                    </div>
                                    <div class="mt-2 flex flex-wrap gap-2">
                                        <span :class="form.password.length >= 8 ? 'text-green-500' : 'text-slate-400'" class="text-[11px] flex items-center">
                                            <span class="mr-1">●</span> 8+ Digits
                                        </span>
                                        <span :class="/[A-Za-z]/.test(form.password) ? 'text-green-500' : 'text-slate-400'" class="text-[11px] flex items-center">
                                            <span class="mr-1">●</span> Character
                                        </span>
                                        <span :class="/\d/.test(form.password) ? 'text-green-500' : 'text-slate-400'" class="text-[11px] flex items-center">
                                            <span class="mr-1">●</span> Number
                                        </span>
                                        <span :class="/[!@#$%^&*]/.test(form.password) ? 'text-green-500' : 'text-slate-400'" class="text-[11px] flex items-center">
                                            <span class="mr-1">●</span> Special Char
                                        </span>
                                    </div>
                                </div>

                                <div class="space-y-1">
                                    <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
                                    <div class="relative">
                                        <input 
                                            v-model="form.password_confirmation" 
                                            :type="showPassword ? 'text' : 'password'" 
                                            :class="[
                                                'w-full px-4 py-2.5 rounded-xl border bg-transparent focus:ring-2 outline-none transition-all dark:text-white',
                                                form.password_confirmation && !isMatched ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                                            ]" 
                                            placeholder="••••••••" 
                                        />
                                        <button 
                                            type="button"
                                            @click="showPassword = !showPassword"
                                            class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-indigo-500 transition-colors">
                                            <i v-if="!showPassword" class="fa-solid fa-eye h-5 w-5"></i>
                                            <i v-else class="fa-solid fa-eye-slash h-5 w-5"></i>
                                        </button>
                                    </div>
                                    <p v-if="form.password_confirmation && !isMatched" class="text-xs text-red-500 mt-1">
                                        Passwords do not match.
                                    </p>
                                    <p v-if="form.password_confirmation && isMatched" class="text-xs text-green-500 mt-1">
                                        Passwords matched!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 mt-4">
                            <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Photo</h2>

                            <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <img :src="photoPreview || photoUrl" class="h-16 w-16 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-white/10" />

                                <div class="flex-1">
                                <input type="file" accept="image/*" @change="onPhotoChange" class="block w-full text-sm text-slate-600 dark:text-slate-200" />
                                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">PNG/JPG recommended.</p>
                                </div>
                            </div>

                            <div class="mt-5 flex justify-end gap-2">
                                <button
                                type="button" @click="updateUser()"
                                :disabled="loading"
                                class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
                                >
                                <i class="fa-solid fa-floppy-disk"></i>
                                {{ loading ? "loading..." : "Modify Changes" }}
                                </button>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
        
    </div>
    <FooterSection />
</template>

<script setup>
import { ref, computed, onMounted, h, watch, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api, { makeImg } from "../../../../services/api.js";

const router = useRouter();
const route = useRoute();

import Navbar from '../admin-navbar.vue';
import Header from '../admin-header.vue';
import Message from '../../../Message/message.vue'
import FooterSection from "../../../e-commerce/footer.vue";

const sidebarOpen = ref(false);
const active = ref("dashboard");


const successMsg = ref('');
const errorMsg = ref('');
const loading = ref(false);







// fetched edit user details
const editUser = ref(null);

const form = ref({
    name: "",
    phone: "",
    dob: "",
    email: "",
    user_id: "",
    gender: "",
    blood_group: "",
    present_address: "",
    permanent_address: "",
    national_id: "",
    religion: "",
    refer_id: "",
    root_user_id: "",
    position: '',
    password: '',
    password_confirmation: '',
    is_active: false,
});

async function fetchedEditedUsers() {
    loading.value = true;
    try {
        const userId = route.params.id;
        const res = await api.get(`/customer/users/edit/${userId}`);
        if (res.data?.success) {
            const user = res.data.data;

            editUser.value = user;

            form.value = {
                name: user.name || '',
                email: user.email || '', 
                user_id: user.user_id || '',
                phone: user.phone || '',
                dob: user.dob?.substring(0, 10) || '',
                gender: user.gender || '',
                blood_group: user.blood_group || '',
                national_id: user.national_id || '',
                religion: user.religion || '',
                present_address: user.present_address || '',
                permanent_address: user.permanent_address || '',
                is_active: Boolean(Number(user.is_active)),

                password: '',
                password_confirmation: '',
            };
        }
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
}

















const showPassword = ref(false);

// Password Validation Logic (form.value use koro jodi ref hoy)
const passwordErrors = computed(() => {
    const errors = [];
    const p = form.value.password; // ref hole .value lagbe
    
    if (p.length < 8) errors.push("At least 8 characters long.");
    if (!/[A-Z]/.test(p) && !/[a-z]/.test(p)) errors.push("Include letters.");
    if (!/\d/.test(p)) errors.push("Include at least one number.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(p)) errors.push("Include a special character.");
    
    return errors;
});

const isMatched = computed(() => {
    return form.value.password && form.value.password === form.value.password_confirmation;
});

















const Field = (props, { slots }) =>
    h("div", { class: props.class || "" }, [
        h("label", { class: "mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-200" }, props.label),
        slots.default?.(),
    ]);

const photoFile = ref(null);
const photoPreview = ref("");

function onPhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    photoFile.value = file;
    photoPreview.value = URL.createObjectURL(file);
}

const photoUrl = computed(() => {
    const p = editUser.value?.photo;
    if (!p) return "/images/avatar.png";
    return makeImg(p);
});














async function updateUser() {
    loading.value = true;
    successMsg.value = '';
    errorMsg.value = '';

    try {
        const userId = route.params.id;

        // FormData use করবো (image upload এর জন্য)
        const formData = new FormData();

        // basic fields
        formData.append('name', form.value.name || '');
        formData.append('email', form.value.email || '');
        formData.append('phone', form.value.phone || '');
        formData.append('dob', form.value.dob || '');
        formData.append('gender', form.value.gender || '');
        formData.append('blood_group', form.value.blood_group || '');
        formData.append('national_id', form.value.national_id || '');
        formData.append('religion', form.value.religion || '');
        formData.append('present_address', form.value.present_address || '');
        formData.append('permanent_address', form.value.permanent_address || '');
        formData.append('is_active', form.value.is_active ? 1 : 0);

        // optional fields
        if (form.value.password) {
            formData.append('password', form.value.password);
            formData.append('password_confirmation', form.value.password_confirmation);
        }

        // image
        if (photoFile.value) {
            formData.append('photo', photoFile.value);
        }

        // API call
        const res = await api.post(`/customer/users/update/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data?.success) {
            successMsg.value = res.data.message || "User updated successfully!";
            
            // optional redirect
            // router.push('/admin/users');
        }

    } catch (err) {
        console.error(err);
        errorMsg.value = err.response?.data?.message || "Something went wrong!";
    } finally {
        loading.value = false;
    }
}





const originalActive = ref(null);

watch(editUser, (user) => {
    if (user) {
        originalActive.value = Boolean(Number(user.is_active));
    }
});

const isChanged = computed(() => {
    return originalActive.value !== form.value.is_active;
});












const isDark = ref(false);

function applyTheme(dark) {
    isDark.value = dark;   // VERY IMPORTANT
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
}

function toggleTheme() {
    applyTheme(!isDark.value);
}

function onSearch(q) {
    console.log("search:", q);
}



/* ESC to close drawer */
onMounted(() => {

    fetchedEditedUsers();

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


<style scoped>
.input{
    @apply w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100;
}
.inputDisabled{
    @apply w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600
        dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300;
}
</style>