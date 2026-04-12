<template>
    <div class="mt-0 relative overflow-hidden rounded-[3rem] p-8 md:p-16 border transition-colors duration-500
                bg-white border-gray-300 shadow-[0_20px_50px_rgba(0,0,0,0.05)]
                dark:bg-[#0a0a0b] dark:border-white/5 dark:shadow-2xl">
        
        <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] rounded-full blur-[120px]
                    bg-indigo-100 dark:bg-indigo-600/20"></div>
        <div class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] rounded-full blur-[100px]
                    bg-blue-50 dark:bg-blue-600/10"></div>

        <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div class="max-w-xl text-center lg:text-left">
                <span class="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] uppercase rounded-full border
                            text-indigo-600 bg-indigo-50 border-indigo-100
                            dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/20">
                    Newsletter
                </span>
                <h2 class="text-4xl md:text-5xl font-black mb-6 leading-[1.1] transition-colors
                        text-gray-900 dark:text-white">
                    Stay ahead with <br/> 
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">
                        Exclusive Deals.
                    </span>
                </h2>
                <p class="text-lg leading-relaxed transition-colors
                        text-gray-500 dark:text-gray-400">
                    Join 10,000+ shoppers and get <span class="font-bold text-gray-900 dark:text-white">15% off</span> on your first order. 
                </p>
            </div>

            <div class="w-full max-w-md">
                <form @submit.prevent class="relative p-2 rounded-[2rem] flex flex-col sm:flex-row gap-2 transition-all
                                            bg-gray-50 border border-gray-200 shadow-inner
                                            dark:bg-white/5 dark:backdrop-blur-xl dark:border-white/10">
                    <div class="flex-1 flex items-center px-4 py-3 md:py-0">
                        <i class="fa-regular fa-envelope text-gray-400 dark:text-gray-500 mr-3"></i>
                        <input 
                            type="email" 
                            placeholder="yourname@email.com" 
                            class="w-full bg-transparent outline-none text-sm md:text-base font-medium
                                text-gray-900 placeholder:text-gray-400
                                dark:text-white dark:placeholder:text-gray-600"
                        >
                    </div>
                    <button class="transition-all duration-500 font-black px-8 py-4 rounded-[1.5rem] flex items-center justify-center gap-2 group
                                bg-gray-900 text-white hover:bg-indigo-600
                                dark:bg-white dark:text-black dark:hover:bg-indigo-500 dark:hover:text-white">
                        Subscribe
                        <i class="fa-solid fa-paper-plane text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                    </button>
                </form>
                <p class="mt-4 text-center lg:text-left text-xs text-gray-400 dark:text-gray-500 font-medium">
                    <i class="fa-solid fa-lock text-[10px] mr-1"></i> We respect your privacy.
                </p>
            </div>
        </div>
    </div>
</template>

<script  setup>

</script>

<style>

</style>