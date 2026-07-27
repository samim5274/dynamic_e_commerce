<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500
                bg-gray-50 text-gray-800 dark:bg-[#0a0a0b] dark:text-gray-200">
        
        <div class="max-w-5xl mx-auto">
            
            <!-- Page Header -->
            <div class="text-center mb-12">
                <span class="inline-block px-4 py-1.5 mb-4 text-[11px] font-black tracking-[0.2em] uppercase rounded-full border
                            text-indigo-600 bg-indigo-50 border-indigo-100
                            dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/20">
                    Customer & Merchant Assurance
                </span>
                <h1 class="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
                    Return & Refund Policy
                </h1>
                <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Guidelines on parcel returns, exchanges, damage claims, and refunds for <span class="font-semibold text-indigo-600 dark:text-indigo-400">DynamicBazar Merchant</span> services.
                </p>
                <div class="mt-3 text-xs text-gray-400 dark:text-gray-500">
                    Last Updated: March 2026
                </div>
            </div>

            <!-- Content Card Container -->
            <div class="rounded-[2.5rem] p-6 sm:p-10 border shadow-xl transition-all duration-300
                        bg-white border-gray-200 shadow-gray-200/50
                        dark:bg-[#121215] dark:border-white/10 dark:shadow-none">
                
                <div class="space-y-10 text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">

                    <!-- Section 1: Policy Overview -->
                    <section>
                        <h2 class="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                            <i class="fa-solid fa-box-open text-indigo-500 text-lg"></i>
                            1. Return Policy Overview
                        </h2>
                        <p>
                            At <strong>DynamicBazar Merchant</strong> (accessible at <code>https://dynamicbazarmerchantbd.com/</code>), we strive to maintain high-quality logistics and seamless delivery experiences. This Return & Refund Policy outlines the terms for failed deliveries, customer parcel returns, merchant exchanges, and damage compensation claims.
                        </p>
                    </section>

                    <!-- Section 2: Customer Return & Refusal Rules -->
                    <section class="border-t border-gray-100 dark:border-white/5 pt-8">
                        <h2 class="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                            <i class="fa-solid fa-truck-ramp-box text-indigo-500 text-lg"></i>
                            2. Customer Parcel Refusal & Return Shipping
                        </h2>
                        <p class="mb-4">If a end-customer cancels or refuses to accept a parcel during delivery:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <h3 class="font-bold text-gray-900 dark:text-white mb-1">Standard Return Charge</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400">If a parcel is returned due to customer refusal or wrong address, standard return delivery charges will apply to the merchant.</p>
                            </div>
                            <div class="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <h3 class="font-bold text-gray-900 dark:text-white mb-1">Return Reverse Logistics</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Returned parcels will be delivered back to the merchant's designated pickup address within the standard Return SLA timeline.</p>
                            </div>
                        </div>
                    </section>

                    <!-- Section 3: Product Exchange & Reverse Pickup -->
                    <section class="border-t border-gray-100 dark:border-white/5 pt-8">
                        <h2 class="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                            <i class="fa-solid fa-arrows-rotate text-indigo-500 text-lg"></i>
                            3. Exchange Delivery & Reverse Pickup
                        </h2>
                        <ul class="list-disc pl-5 space-y-2">
                            <li><strong>Product Exchange (Swap):</strong> Merchants can request an exchange delivery where our agent collects the old product from the customer while delivering the replacement unit.</li>
                            <li><strong>Exchange Charges:</strong> Standard exchange fees apply as detailed in the merchant delivery tariff schedule.</li>
                            <li><strong>Condition Check:</strong> During reverse pickup, basic external checks are performed; however, merchants are responsible for inspecting internal item conditions upon receiving returned items.</li>
                        </ul>
                    </section>

                    <!-- Section 4: Damage & Loss Compensation Policy -->
                    <section class="border-t border-gray-100 dark:border-white/5 pt-8">
                        <h2 class="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                            <i class="fa-solid fa-hand-holding-dollar text-indigo-500 text-lg"></i>
                            4. Parcel Damage & Loss Compensation
                        </h2>
                        <p class="mb-3">DynamicBazar takes utmost care during transit, but in rare cases of loss or negligence-based damage:</p>
                        
                        <div class="space-y-3">
                            <div class="p-4 rounded-xl bg-gray-50 dark:bg-white/5 text-xs sm:text-sm">
                                <strong>Lost Parcels:</strong> If a parcel is confirmed lost in transit by our logistics network, compensation up to the declared product value (subject to platform coverage caps) will be credited to the merchant account.
                            </div>
                            <div class="p-4 rounded-xl bg-gray-50 dark:bg-white/5 text-xs sm:text-sm">
                                <strong>Transit Damage:</strong> Compensation claims for physical damage require proof of proper bubble/box packaging prior to pickup. Damage caused by improper merchant packaging is not eligible for reimbursement.
                            </div>
                        </div>
                    </section>

                    <!-- Section 5: Merchant COD Refunds & Claims Timeline -->
                    <section class="border-t border-gray-100 dark:border-white/5 pt-8">
                        <h2 class="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                            <i class="fa-solid fa-clock-rotate-left text-indigo-500 text-lg"></i>
                            5. Claim Submission & Refund SLA
                        </h2>
                        <ul class="list-disc pl-5 space-y-2">
                            <li><strong>Claim Window:</strong> Merchants must report damaged or missing returned parcels within <strong>48 hours</strong> of receiving the return shipment via the Merchant Dashboard or Support Team.</li>
                            <li><strong>Refund & Adjustments:</strong> Approved compensation or excess COD adjustments will be settled in the merchant's next scheduled payout cycle.</li>
                        </ul>
                    </section>

                    <!-- Section 6: Contact & Support -->
                    <section class="border-t border-gray-100 dark:border-white/5 pt-8">
                        <h2 class="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                            <i class="fa-solid fa-headset text-indigo-500 text-lg"></i>
                            6. Return & Claim Support
                        </h2>
                        <p class="mb-4">
                            Need help with a returned parcel, exchange request, or compensation claim? Reach out to our merchant helpline:
                        </p>
                        <div class="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                            <div>
                                <p class="font-bold text-gray-900 dark:text-white">DynamicBazar Return & Claim Desk</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Website: dynamicbazarmerchantbd.com</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Location: Dhaka, Bangladesh</p>
                            </div>
                            <a href="mailto:support@dynamicbazarmerchantbd.com" 
                               class="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-2">
                                <i class="fa-solid fa-envelope"></i> File a Return Claim
                            </a>
                        </div>
                    </section>

                </div>
            </div>

            <!-- Bottom Policy Links -->
            <div class="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                <router-link to="/privacy-policy" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Privacy Policy
                </router-link>
                <span>•</span>
                <router-link to="/terms-and-conditions" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Terms & Conditions
                </router-link>
                <span>•</span>
                <router-link to="/return-policy" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Return Policy
                </router-link>
            </div>

        </div>
    </div>
    <FooterSection />
</template>

<script setup>
import FooterSection from './footer.vue';
</script>

<style scoped>

</style>