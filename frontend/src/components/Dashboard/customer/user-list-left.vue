<template>
    <section class="lg:col-span-2 space-y-6">
        <Message
            :successMsg="successMsg"
            :errorMsg="errorMsg"
            @update:successMsg="successMsg = $event"
            @update:errorMsg="errorMsg = $event"
        />
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
                    <option value="" disabled selected>Select</option>
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
            <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Reference</h2>

            <div class="mt-4 grid grid-cols-1 gap-4">
                <Field label="Referer Code">
                <input v-model="form.refer_id" type="text" readonly class="input" placeholder="e.g DBMBL-ABC456SA8Q" />
                </Field>

                <Field label="Root User">
                <select v-model="form.root_user_id" class="input">
                    <option disabled value="">Select user</option>
                    <option v-for="u in props.users" :key="u.id" :value="u.id">
                        {{ u.name }} - {{ u.user_id }}
                    </option>
                </select>
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
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue';
import api, { makeImg } from "../../../services/api";
import Message from '../../Message/message.vue';

const props = defineProps({
    users: {
        type: Array,
        default: () => []
    }
});

const successMsg = ref('');
const errorMsg = ref('');
const loading = ref(false);

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
    const p = authUser.value?.photo;
    return p ? makeImg(p) : "/images/avatar.png";
});


const authUser = ref(null);
async function fetchedAuthUser(){
    try{
        const res = await api.get('/customer/users/auth');
        authUser.value = res.data.data;
        form.value.refer_id = authUser.value.user_id;
    } catch(err) {
        errorMsg.value = err.response?.data?.message || "Failed to create user";
    } finally {
        loading.value = false;
    }
}



const emit = defineEmits(['userCreated']);

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
    refer_id: "",
    root_user_id: "",
});


async function CreateUser() {
    loading.value = true;
    errorMsg.value = "";

    const payload = new FormData();
    Object.keys(form.value).forEach(key => payload.append(key, form.value[key] || ""));
    if(photoFile.value) payload.append("photo", photoFile.value);

    try {
        const res = await api.post("/customer/users/create", payload);

        successMsg.value = res.data.message || "User created successfully!";
        emit('userCreated');

        Object.keys(form.value).forEach(key => form.value[key] = "");
        photoPreview.value = null;

    } catch(err) {
        console.log("FULL ERROR:", err);

        if (err.response?.data?.errors) {
            errorMsg.value = Object.values(err.response.data.errors).flat().join(", ");
        } else {
            errorMsg.value = err.response?.data?.message || "Failed to create user";
        }
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchedAuthUser();
});
</script>

<style>
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