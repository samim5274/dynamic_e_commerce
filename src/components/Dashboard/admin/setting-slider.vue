<template>
    <div class="p-4 md:p-8 min-h-screen transition-colors duration-300">

        <Message
            :successMsg="successMsg"
            :errorMsg="errorMsg"
            @update:successMsg="successMsg = $event"
            @update:errorMsg="errorMsg = $event"
        />
        
        <!-- Top Toolbar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200 dark:border-slate-800">
    
            <div class="flex items-center gap-3">
                <div class="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
                    <i class="fa-solid fa-border-all"></i>
                </div>
                <div>
                    <h2 class="text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">Hero Slider</h2>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Configure web hero carousel components</p>
                </div>
            </div>

            <div class="flex items-center justify-end w-full sm:w-auto">
                <button 
                    type="button" 
                    @click="showModal = true"
                    class="group flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/70 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-950/60 bg-white hover:bg-emerald-50/40 dark:bg-slate-900 dark:hover:bg-emerald-950/20 rounded-xl active:scale-[0.98] transition-all duration-200">
                    <i class="fa-solid fa-plus text-xs opacity-70 group-hover:rotate-90 transition-transform duration-200"></i> 
                    <span>Create New</span>
                </button>
            </div>
        </div>

        <!-- LIST VIEWS / OTHER MAIN PAGE CONTENT GOES HERE -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/40 backdrop-blur-sm transition-all duration-300">
            
            <!-- Modal Box Shell Container -->
            <div class="relative w-full max-w-6xl bg-gray-50 dark:bg-[#0C1326] border border-slate-200 dark:border-slate-900 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] transition-all duration-300 scale-100">
                
                <!-- Inner Layout Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    <!-- Left: Form Editor (7 Columns) -->
                    <div class="lg:col-span-7 space-y-6">
                        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
                            
                            <div>
                                <label class="input-label">Context Tag</label>
                                <input type="text" v-model="form.tag" class="input-field" placeholder="e.g. SUMMER COLLECTION">
                            </div>

                            <div>
                                <label class="input-label">Slider Heading</label>
                                <input type="text" v-model="form.title" class="input-field" placeholder="e.g. Upgrade Your Workspace">
                            </div>

                            <div>
                                <label class="input-label">Description Text</label>
                                <textarea rows="3" v-model="form.description" class="input-field resize-none" placeholder="Enter short engaging subtitle text..."></textarea>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="input-label">Action Button Label</label>
                                    <input type="text" v-model="form.button_text" class="input-field" placeholder="e.g. Discover More">
                                </div>
                                <div>
                                    <label class="input-label">Redirect Link (URL)</label>
                                    <input type="text" v-model="form.button_link" class="input-field" placeholder="e.g. /offers/summer">
                                </div>
                            </div>

                            <!-- Modern Status Toggle Tiles -->
                            <div>
                                <label class="input-label mb-3">Slider Availability</label>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    
                                    <label 
                                        :class="[
                                            'flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none active:scale-[0.99]',
                                            form.status === 1 
                                                ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 shadow-sm shadow-emerald-500/5' 
                                                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                        ]"
                                    >
                                        <input type="radio" :value="1" v-model="form.status" class="hidden">
                                        <div 
                                            class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0" 
                                            :class="form.status === 1 ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-300 dark:border-slate-700'"
                                        >
                                            <div v-if="form.status === 1" class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="text-sm font-semibold">Active & Live</span>
                                        </div>
                                    </label>

                                    <label 
                                        :class="[
                                            'flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none active:scale-[0.99]',
                                            form.status === 0 
                                                ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 shadow-sm shadow-rose-500/5' 
                                                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                        ]"
                                    >
                                        <input type="radio" :value="0" v-model="form.status" class="hidden">
                                        <div 
                                            class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0" 
                                            :class="form.status === 0 ? 'border-rose-500 bg-rose-500/10' : 'border-slate-300 dark:border-slate-700'"
                                        >
                                            <div v-if="form.status === 0" class="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="text-sm font-semibold">Keep Layout Draft</span>
                                        </div>
                                    </label>
                                    
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Right: Real-time Live Preview (5 Columns) -->
                    <div class="lg:col-span-5 space-y-4 lg:sticky lg:top-0">
                        <div class="flex items-center justify-between px-1">
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Desktop Preview</span>
                            <span class="flex items-center gap-1.5 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Dynamic Bazar
                            </span>
                        </div>

                        <!-- Interactive Banner Box -->
                        <div class="w-full bg-slate-900 rounded-2xl overflow-hidden shadow-xl aspect-[4/3] border border-slate-800 relative group flex items-center">
                            
                            <!-- Background Template Image / Gradient -->
                            <div class="absolute inset-0 z-0 opacity-40 bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950"></div>
                            <img v-if="imagePreview" :src="imagePreview" class="absolute inset-0 w-full h-full object-cover opacity-60 z-0">
                            
                            <!-- Inner Content Overlay -->
                            <div class="relative z-10 p-8 w-full max-w-md text-white space-y-3">
                                <span v-if="form.tag" class="inline-block bg-emerald-500 text-slate-950 font-bold tracking-widest text-[10px] px-2.5 py-1 rounded-md uppercase">
                                    {{ form.tag }}
                                </span>
                                <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight break-words drop-shadow-sm">
                                    {{ form.title || 'Untitled Banner Headline' }}
                                </h1>
                                <p class="text-xs text-slate-300 line-clamp-3 leading-relaxed font-light">
                                    {{ form.description || 'Add custom description text on the editor form to preview content visualization layouts.' }}
                                </p>
                                <div class="pt-2" v-if="form.button_text">
                                    <span class="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-950 font-semibold text-xs rounded-lg shadow-sm">
                                        {{ form.button_text }}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Media Dropzone underneath Preview -->
                        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                            <div class="flex items-center gap-3 overflow-hidden">
                                <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover">
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-400"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                </div>
                                <div class="overflow-hidden">
                                    <h4 class="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">Background Artwork</h4>
                                    <p class="text-xs text-slate-400 truncate">{{ form.image ? form.image.name : 'No file selected' }}</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-2">
                                <button v-if="imagePreview" @click="clearImage" class="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                </button>
                                <div class="relative">
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer w-full" @change="onImageChange" accept="image/*">
                                    <button class="px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition pointer-events-none text-slate-700 dark:text-slate-300">
                                        Browse
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons Group inside Modal Grid Context -->
                        <div class="flex items-center gap-3 w-full pt-2">
                            <button 
                                type="button" @click="showModal = false; resetForm();"
                                class="group flex items-center justify-center gap-2 flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-950/60 bg-white hover:bg-rose-50/40 dark:bg-slate-900 dark:hover:bg-rose-950/20 rounded-xl active:scale-[0.98] transition-all duration-200"
                            >
                                <i class="fa-solid fa-x text-xs opacity-70 group-hover:rotate-90 transition-transform duration-200"></i>
                                <span>Discard</span>
                            </button>

                            <button 
                                @click="saveSlider"
                                :disabled="loading"
                                class="relative flex items-center justify-center gap-2 flex-[1.5] px-5 py-2.5 bg-slate-950 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl border border-slate-950 dark:border-emerald-600 dark:hover:bg-emerald-500 shadow-sm hover:shadow-md dark:shadow-md hover:shadow-slate-950/20 dark:shadow-emerald-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none"
                            >
                                <svg v-if="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <i v-else class="fa-regular fa-floppy-disk opacity-90"></i>
                                <span>{{ loading ? 'Saving...' : 'Save Changes' }}</span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../../../services/api';

import Message from '../../Message/message.vue';

const router = useRouter();
const route  = useRoute();

const successMsg = ref('');
const errorMsg = ref('');

const showModal = ref(false);
const loading = ref(false);
const imagePreview = ref(null);

const form = ref({
    tag: "",
    title: "",
    description: "",
    image: null,
    button_text: "Shop Now",
    button_link: "",
    status: 1,
});

const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    form.value.image = file;
    imagePreview.value = URL.createObjectURL(file);
};

const clearImage = () => {
    form.value.image = null;
    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
        imagePreview.value = null;
    }
};



async function saveSlider() {
    loading.value = true;
    successMsg.value = "";
    errorMsg.value = "";

    try {

        const formData = new FormData();

        formData.append("tag", form.value.tag ?? "");
        formData.append("title", form.value.title);
        formData.append("description", form.value.description ?? "");
        formData.append("button_text", form.value.button_text);
        formData.append("button_link", form.value.button_link ?? "");
        formData.append("status", form.value.status);

        if (form.value.image) {
            formData.append("image", form.value.image);
        }

        const { data } = await api.post("/slider/create", formData);

        successMsg.value = data.message || "Slider created successfully.";

        resetForm();
        showModal.value = false;

        // await getSliders();

    } catch (err) {
        console.log(err.response);
        console.log(err.response?.data);
        console.log(err.response?.data?.errors);

        if (err.response?.status === 422) {
            errorMsg.value = err.response.data.errors;
        } else {
            errorMsg.value = {
                general: [
                    err.response?.data?.message || err.message || "Something went wrong."
                ]
            };
        }

        console.error(err);
    } finally {
        loading.value = false;
    }
}


const resetForm = () => {
    form.value = {
        tag: "",
        title: "",
        description: "",
        image: null,
        button_text: "Shop Now", 
        button_link: "",
        status: 1, 
    };

    clearImage();
};

</script>

<style scoped>
.input-label {
    @apply block mb-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide;
}

.input-field {
    @apply w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder-slate-400 dark:placeholder-slate-600;
}
</style>