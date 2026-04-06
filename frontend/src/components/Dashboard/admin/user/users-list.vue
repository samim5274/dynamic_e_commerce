<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
    <Header
      @open-sidebar="sidebarOpen = true"
      @search="onSearch"
      :isDark="isDark" @toggle-theme="toggleTheme"
    />

    <div class="flex  min-h-[calc(100vh-56px)]">
      <Navbar
        v-model="active"
        :open="sidebarOpen"
        @close="sidebarOpen = false"
      />

      <Message
        :successMsg="successMsg"
        :errorMsg="errorMsg"
        @update:successMsg="successMsg = $event"
        @update:errorMsg="errorMsg = $event"
      />

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <main class="flex-1 min-w-0 bg-gray-50 dark:bg-[#0C1326] px-4 sm:px-6 lg:px-8 py-6">
            <!-- Header -->
            <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">My Profile</h1>
                    <p class="text-sm text-slate-600 dark:text-slate-300">Update your personal information</p>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

              <!-- Left: form -->
              <leftSection />

              <!-- Right: form -->
              <rightSection />

            </div>


        </main>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue';
import { useRouter } from "vue-router";
import api, { makeImg } from "../../../../services/api.js";

import Navbar from '../admin-navbar.vue';
import Header from '../admin-header.vue';
import Message from '../../../Message/message.vue'
import rightSection from './right-section.vue';
import leftSection from './left-section.vue';

const sidebarOpen = ref(false);
const active = ref("dashboard");
const router = useRouter();
const successMsg = ref('');
const errorMsg = ref('');











const users = ref([]);
const loadingUsers = ref(false);
// fetch all admin and customer
async function fetchedUsers() {
  loadingUsers.value = true;
  try {
    const res = await api.get('/users');
    if (res.data?.success) {
      users.value = res.data.data;
    }
  } catch (err) {
    console.error(err);
  } finally {
    loadingUsers.value = false;
  }
}

const search = ref("");
const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(search.value.toLowerCase()) ||
    user.email.toLowerCase().includes(search.value.toLowerCase())
  );
});









const form = ref({
    name: "",
    phone: "",
    dob: "",
    email: "",
    gender: "",
    blood_group: "",
    present_address: "",
    permanent_address: "",
    national_id: "",
    religion: "",
});


async function CreateUser() {
  loading.value = true;

  // Simple frontend check
  if(!form.value.email) {
    errorMsg.value = "Email is required";
    loading.value = false;
    return;
  }

  const payload = new FormData();
  Object.keys(form.value).forEach(key => payload.append(key, form.value[key] || ""));
  if(photoFile.value) payload.append("photo", photoFile.value);

  try {
    const res = await api.post("/users/create", payload, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    successMsg.value = res.data.message || "User created successfully!";
    fetchedUsers();
    Object.keys(form.value).forEach(key => form.value[key] = "");
    photoPreview.value = null;
  } catch(err) {
    errorMsg.value = err.response?.data?.message || "Failed to create user";
  } finally {
    loading.value = false;
  }
}











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
  fetchedUsers();






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