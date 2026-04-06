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
              <section class="lg:col-span-2 space-y-6">
                  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                      <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Personal Information</h2>

                      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="Name">
                          <input v-model="form.name" type="text" class="input" placeholder="Your name" />
                          </Field>

                          <Field label="Phone">
                          <input v-model="form.phone" type="text" class="input" placeholder="01XXXXXXXXX" />
                          </Field>

                          <Field label="Email">
                          <input v-model="form.email" class="input" placeholder="e.g example@example.com" />
                          </Field>

                          <Field label="Date of birth">
                          <input v-model="form.dob" type="date" class="input" />
                          </Field>

                          <Field label="Gender">
                          <select v-model="form.gender" class="input">
                              <option value="" disabled="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                          </select>
                          </Field>

                          <Field label="Blood group">
                          <select v-model="form.blood_group" class="input">
                              <option value="">Select</option>
                              <option>O+</option><option>O-</option>
                              <option>A+</option><option>A-</option>
                              <option>B+</option><option>B-</option>
                              <option>AB+</option><option>AB-</option>
                          </select>
                          </Field>

                          <Field label="National ID" class="sm:col-span-2">
                          <input v-model="form.national_id" type="text" class="input" placeholder="NID number" />
                          </Field>

                          <Field label="Religion" class="sm:col-span-2">
                          <input v-model="form.religion" type="text" class="input" placeholder="Religion" />
                          </Field>
                      </div>
                  </div>

                  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
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

                  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
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
                          type="button"  @click="CreateUser()"                        
                          :disabled="loading"
                          class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
                          >
                          <i class="fa-solid fa-floppy-disk"></i>
                          {{ loading ? "loading..." : "Save Changes" }}
                          </button>
                      </div>
                  </div>
              </section>

              <!-- Right: form -->
              <section class="lg:col-span-1 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
  
                <!-- Header -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <input type="text" v-model="search" class="input" placeholder="Search users..." />
                </div>

                <!-- Table -->
                <div class="overflow-x-auto">
                  <table class="min-w-full text-sm">
                    
                    <!-- Body -->
                    <tbody>
                      <tr 
                          v-for="user in filteredUsers" 
                          :key="user.id"
                          class="group border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/80 dark:hover:bg-[#1e293b]/50 transition-all duration-300">
                          <td class="py-4 px-6">
                              <div class="flex items-center gap-4">

                                  <div class="h-11 w-11 rounded-xl bg-gradient-to-br from-[#A3D921] to-[#639d00] flex items-center justify-center text-black font-bold shadow-lg shadow-[#A3D921]/10 group-hover:scale-110 transition-transform">
                                      {{ user.name.charAt(0).toUpperCase() }}
                                  </div>

                                  <div class="flex flex-col gap-1">
                                    <div class="flex items-center gap-3">
                                        <span class="text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                                            {{ user.name }}
                                        </span>
                                        
                                        <span 
                                            class="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider border transition-all duration-300 shadow-sm"
                                            :class="{
                                                'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20': user.role === 'admin',
                                                'bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20': user.role === 'customer'
                                            }">
                                            <span class="relative flex h-1.5 w-1.5 mr-1.5">
                                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="user.role === 'admin' ? 'bg-emerald-400' : 'bg-blue-400'"></span>
                                                <span class="relative inline-flex rounded-full h-1.5 w-1.5" :class="user.role === 'admin' ? 'bg-emerald-500' : 'bg-blue-500'"></span>
                                            </span>
                                            {{ user.role }}
                                        </span>
                                    </div>

                                    <div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                        <i class="fa-regular fa-envelope text-[10px] opacity-70"></i>
                                        <span class="text-[11px] font-medium tracking-wide uppercase">
                                            {{ user.email }}
                                        </span>
                                    </div>
                                </div>
                              </div>
                          </td>

                          <td class="py-4 px-6">
                              <div class="flex items-center gap-2">
                                  <div v-if="user.left_child_id || user.right_child_id" class="flex -space-x-2">
                                      <div v-if="user.left_child_id" class="h-6 w-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold" title="Left Occupied">L</div>
                                      <div v-if="user.right_child_id" class="h-6 w-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold" title="Right Occupied">R</div>
                                  </div>
                                  <span v-else class="text-[10px] text-slate-400 italic font-medium">No direct down line</span>
                              </div>
                          </td>
                      </tr>

                      <!-- Empty -->
                      <tr v-if="filteredUsers.length === 0">
                        <td colspan="3" class="text-center py-6 text-slate-400">
                          No users found
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

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

const sidebarOpen = ref(false);
const active = ref("dashboard");
const router = useRouter();
const successMsg = ref('');
const errorMsg = ref('');
const loading = ref(false);
const user = ref(null);




const Field = (props, { slots }) =>
  h("div", { class: props.class || "" }, [
    h("label", { class: "mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-200" }, props.label),
    slots.default?.(),
  ]);

const photoFile = ref(null);
const photoPreview = ref("");

const photoUrl = computed(() => {
  const p = user.value?.photo;
  if (!p) return "/images/avatar.png";
  return makeImg(p);
});

function onPhotoChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  photoFile.value = file;
  photoPreview.value = URL.createObjectURL(file);
}










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