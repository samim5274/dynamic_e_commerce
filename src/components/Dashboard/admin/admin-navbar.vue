<template>
  <!-- Overlay (mobile) -->
  <div
    class="fixed inset-0 z-40 lg:hidden bg-black/40 dark:bg-black/60"
    v-show="open"
    @click="$emit('close')"
  />

  <aside
    class="fixed inset-y-0 left-0 z-50 w-72
      border-r transform transition-transform duration-200
      lg:static lg:translate-x-0 lg:h-auto
      overflow-y-auto
      bg-white text-slate-900 border-slate-200
      dark:bg-slate-900 dark:text-slate-100 dark:border-white/10"
    :class="open ? 'translate-x-0' : '-translate-x-full'">
    <!-- Brand -->
    <!-- <div class="h-16 px-5 flex items-center gap-3 border-b border-slate-200 dark:border-white/10">
      <router-link to="/admin/dashboard">        
        <span v-if="authUser && authUser.vendor && authUser.vendor.shop_logo">
          <img 
            :src="makeImg(authUser.shop_logo)"
            alt="Brand Logo"
            class="dark:block w-7 h-7 object-contain drop-shadow-[0_4px_10px_rgba(163,217,33,0.3)]" 
          />
        </span>
        <span v-else>
          <span class="h-9 w-9 rounded-xl bg-emerald-500/20 flex items-center justify-center ring-1 ring-emerald-500/30">
            <span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
          </span>
        </span>
      </router-link>

      <router-link to="/admin/dashboard">
        <div class="text-lg font-semibold tracking-wide"> 
          <template v-if="authUser?.vendor?.shop_name">
            {{ 
              authUser?.vendor?.shop_name?.length > 20 
              ? authUser.vendor.shop_name.slice(0, 18) + '...' 
              : authUser?.vendor?.shop_name || "DYNAMIC BAZAR" 
            }}
          </template>
          <template v-else>
            DYNAMIC <span class="text-emerald-500">BAZAR</span>
          </template>
        </div>
      </router-link>

      <button
        class="ml-auto p-2 rounded-lg lg:hidden hover:bg-slate-100 text-slate-700
               dark:hover:bg-white/10 dark:text-slate-200"
        aria-label="Close menu"
        @click="$emit('close')">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div> -->

    <!-- Menu -->
    <nav class="p-3">
      <ul class="space-y-1">


        <!-- Dashboard -->
        <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="activeKey === 'dashboard'
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-white/10 dark:text-white dark:ring-white/10'
              : ''"
            @click="pick('dashboard')">
            <span class="opacity-90 w-5 text-center">
              <i class="fa-solid fa-house"></i>
            </span>
            <span class="text-sm font-medium">Dashboard</span>
          </button>
        </li>



        <!-- Profile -->
        <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="activeKey === 'profile'
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-white/10 dark:text-white dark:ring-white/10'
              : ''"
            @click="pick('profile')">
            <span class="opacity-90 w-5 text-center">
              <i class="fa-regular fa-circle-user"></i>
            </span>
            <span class="text-sm font-medium">Profile</span>
          </button>
        </li>

        <!-- Tree -->
        <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="activeKey === 'tree'
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-white/10 dark:text-white dark:ring-white/10'
              : ''"
            @click="pick('tree')">
            <span class="opacity-90 w-5 text-center">
              <!-- <i class="fa-solid fa-chart-diagram"></i> -->
              <i class="bi bi-diagram-2-fill"></i>
            </span>
            <span class="text-sm font-medium">Tree</span>
          </button>
        </li>



        <!-- Product Details Dropdown -->
        <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="pagesOpen
              ? 'bg-slate-100 ring-1 ring-slate-200 dark:bg-white/10 dark:ring-white/10'
              : ''"
            @click="pagesOpen = !pagesOpen"
            type="button">
            <span class="opacity-90">
              <i class="fa-regular fa-folder-open"></i>
            </span>
            <span class="text-sm font-medium flex-1">Product Details</span>

            <svg
              class="h-4 w-4 transition-transform opacity-80"
              :class="pagesOpen ? 'rotate-180' : ''"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-show="pagesOpen" class="mt-1 ml-6 mr-2 rounded-xl ring-1
                   bg-slate-50 ring-slate-200
                   dark:bg-black/20 dark:ring-white/10">
            <ul class="py-2">
              <li>
                <button
                  class="w-full px-4 py-2 text-sm text-left transition
                         hover:bg-white dark:hover:bg-white/10"
                  :class="activeKey === 'products'
                    ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                    : 'text-slate-700 dark:text-slate-200/90'"
                  @click="pick('products')">
                  Product List
                </button>
              </li>

              <li>
                <button
                  class="w-full px-4 py-2 text-sm text-left transition
                         hover:bg-white dark:hover:bg-white/10"
                  :class="activeKey === 'create'
                    ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                    : 'text-slate-700 dark:text-slate-200/90'"
                  @click="pick('create')">
                  Create Product
                </button>
              </li>

              <li>
                <button
                  class="w-full px-4 py-2 text-sm text-left transition
                         hover:bg-white dark:hover:bg-white/10"
                  :class="activeKey === 'product_setting'
                    ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                    : 'text-slate-700 dark:text-slate-200/90'"
                  @click="pick('product_setting')">
                  Settings
                </button>
              </li>
            </ul>
          </div>
        </li>



        <!-- Order -->
        <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="orderPagesOpen
              ? 'bg-slate-100 ring-1 ring-slate-200 dark:bg-white/10 dark:ring-white/10'
              : ''"
            @click="orderPagesOpen = !orderPagesOpen"
            type="button">
            <span class="opacity-90">
              <i class="fa-solid fa-check-to-slot"></i>
            </span>
            <span class="text-sm font-medium flex-1">Order</span>

            <svg
              class="h-4 w-4 transition-transform opacity-80"
              :class="orderPagesOpen ? 'rotate-180' : ''"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-show="orderPagesOpen" class="mt-1 ml-6 mr-2 rounded-xl ring-1
                   bg-slate-50 ring-slate-200
                   dark:bg-black/20 dark:ring-white/10">
            <ul class="py-2">
              <li>
                <button
                  class="w-full px-4 py-2 text-sm text-left transition
                         hover:bg-white dark:hover:bg-white/10"
                  :class="activeKey === 'orders'
                    ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                    : 'text-slate-700 dark:text-slate-200/90'"
                  @click="pick('orders')">
                  Orders
                </button>
              </li>

              <li>
                <button
                  class="w-full px-4 py-2 text-sm text-left transition
                         hover:bg-white dark:hover:bg-white/10"
                  :class="activeKey === 'order_status'
                    ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                    : 'text-slate-700 dark:text-slate-200/90'"
                  @click="pick('order_status')">
                  Status
                </button>
              </li>

              <li>
                <button
                  class="w-full px-4 py-2 text-sm text-left transition
                         hover:bg-white dark:hover:bg-white/10"
                  :class="activeKey === 'order_create'
                    ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                    : 'text-slate-700 dark:text-slate-200/90'"
                  @click="pick('order_create')">
                  Create
                </button>
              </li>
            </ul>
          </div>
        </li>



        <!-- Delivery -->
        <!-- <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="activeKey === 'delivery'
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-white/10 dark:text-white dark:ring-white/10'
              : ''"
            @click="pick('delivery')">
            <span class="opacity-90 w-5 text-center">
              <i class="fa-solid fa-truck-fast"></i>
            </span>
            <span class="text-sm font-medium">Delivery</span>
          </button>
        </li> -->



        <!-- Payment -->
        <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="activeKey === 'payment'
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-white/10 dark:text-white dark:ring-white/10'
              : ''"
            @click="pick('payment')">
            <span class="opacity-90 w-5 text-center">
              <i class="fa-solid fa-credit-card"></i>
            </span>
            <span class="text-sm font-medium">Payment</span>
          </button>
        </li>




        <!-- Users Details Dropdown -->
        <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="userPagesOpen
              ? 'bg-slate-100 ring-1 ring-slate-200 dark:bg-white/10 dark:ring-white/10'
              : ''"
            @click="userPagesOpen = !userPagesOpen"
            type="button">
            <span class="opacity-90">
              <i class="fa-solid fa-users"></i>
            </span>
            <span class="text-sm font-medium flex-1">Reference</span>

            <svg
              class="h-4 w-4 transition-transform opacity-80"
              :class="userPagesOpen ? 'rotate-180' : ''"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-show="userPagesOpen" class="mt-1 ml-6 mr-2 rounded-xl ring-1
                   bg-slate-50 ring-slate-200
                   dark:bg-black/20 dark:ring-white/10">
            <ul class="py-2">
              <li>
                <button
                  class="w-full px-4 py-2 text-sm text-left transition
                         hover:bg-white dark:hover:bg-white/10"
                  :class="activeKey === 'users'
                    ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                    : 'text-slate-700 dark:text-slate-200/90'"
                  @click="pick('users')">
                  Create Users
                </button>
              </li>

              <!-- <li>
                <button
                  class="w-full px-4 py-2 text-sm text-left transition
                         hover:bg-white dark:hover:bg-white/10"
                  :class="activeKey === 'assignUserToTree'
                    ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                    : 'text-slate-700 dark:text-slate-200/90'"
                  @click="pick('assignUserToTree')">
                  Assign User Tree
                </button>
              </li> -->

              <li>
                <button
                  class="w-full px-4 py-2 text-sm text-left transition
                         hover:bg-white dark:hover:bg-white/10"
                  :class="activeKey === 'userSetting'
                    ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                    : 'text-slate-700 dark:text-slate-200/90'"
                  @click="pick('userSetting')">
                  Settings
                </button>
              </li>
            </ul>
          </div>
        </li>













            <!-- Reports Dropdown -->
            <li>
              <button
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                    focus:outline-none focus:ring-2 focus:ring-slate-500/40
                    hover:bg-slate-100 dark:hover:bg-white/10"
                :class="reportPagesOpen
                ? 'bg-slate-100 ring-1 ring-slate-200 dark:bg-white/10 dark:ring-white/10'
                : ''"
                @click="reportPagesOpen = !reportPagesOpen"
                type="button">

                <span class="opacity-90">
                    <i class="fa-solid fa-chart-bar"></i>
                </span>

                <span class="text-sm font-medium flex-1">Reports</span>

                <svg
                    class="h-4 w-4 transition-transform opacity-80"
                    :class="reportPagesOpen ? 'rotate-180' : ''"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div v-show="reportPagesOpen" class="mt-1 ml-6 mr-2 rounded-xl ring-1
                  bg-slate-50 ring-slate-200
                  dark:bg-black/20 dark:ring-white/10">
                <ul class="py-2">
                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'report_sale'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('report_sale')">
                    Sale Report
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'report_order'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('report_order')">
                    Order Report
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'report_product_sale'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('report_product_sale')">
                    Product Sale Report
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'report_products'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('report_products')">
                    Products Report
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'report_statement'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('report_statement')">
                    Statement
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'report_ranking'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('report_ranking')">
                    Ranking Report
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'report_star_club'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('report_star_club')">
                    Star Club Report
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'report_dynamic_club'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('report_dynamic_club')">
                    Dynamic Club Report
                    </button>
                  </li>

                  <!-- <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'users'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('users')">
                    Payment Report
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'users'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('users')">
                    User Report
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'users'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('users')">
                    Reference Report
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'users'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('users')">
                    Star Club Report
                    </button>
                  </li>

                  <li>
                    <button
                    class="w-full px-4 py-2 text-sm text-left transition
                            hover:bg-white dark:hover:bg-white/10"
                    :class="activeKey === 'users'
                        ? 'bg-white text-slate-900 font-medium dark:bg-white/10 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200/90'"
                    @click="pick('users')">
                    Dynamic Club Report
                    </button>
                  </li> -->

                </ul>
              </div>
            </li>









          <!-- Notice -->
        <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="activeKey === 'notice'
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-white/10 dark:text-white dark:ring-white/10'
              : ''"
            @click="pick('notice')">
            <span class="opacity-90 w-5 text-center">
              <i class="fa-solid fa-bell"></i>
            </span>
            <span class="text-sm font-medium">Notice</span>
          </button>
        </li>







        <!-- Setting -->
        <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="activeKey === 'setting'
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-white/10 dark:text-white dark:ring-white/10'
              : ''"
            @click="pick('setting')">
            <span class="opacity-90 w-5 text-center">
              <i class="fa-solid fa-gear"></i>
            </span>
            <span class="text-sm font-medium">Setting</span>
          </button>
        </li>



        <!-- Logout -->
        <li>
          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                   focus:outline-none focus:ring-2 focus:ring-slate-500/40
                   hover:bg-slate-100 dark:hover:bg-white/10"
            :class="activeKey === 'logout'
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-white/10 dark:text-white dark:ring-white/10'
              : ''"
            @click="pick('logout')">
            <span class="opacity-90 w-5 text-center">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </span>
            <span class="text-sm font-medium">Logout</span>
          </button>
        </li>


      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import api, { makeImg } from '../../../services/api';

const props = defineProps({
    open: { type: Boolean, default: false },
    modelValue: { type: String, default: "" },
});

const emit = defineEmits(["close", "update:modelValue", "navigate"]);

const route = useRoute();
const router = useRouter();

const pagesOpen = ref(false);
const userPagesOpen = ref(false);
const orderPagesOpen = ref(false);
const reportPagesOpen = ref(false);










const routeMap = {
  dashboard: "/admin/dashboard",
  profile: "/admin/profile",
  tree: "/admin/tree",

  products: "/admin/products",
  create: "/admin/create-product",
  product_setting: "/admin/product/setting",

  orders: "/admin/orders",
  order_status: "/admin/orders/status",
  order_create: "/admin/orders/create",

  payment: "/admin/payment",

  users: "/admin/users",
  assignUserToTree: "/admin/assign-user-tree",
  userSetting: "/admin/user-setting",

  // reports
  report_sale: "/admin/reports/sale",
  report_order: "/admin/reports/order",
  report_product_sale: "/admin/reports/product/sale",
  report_products: "/admin/reports/products",
  report_statement: "/admin/reports/statement",
  report_ranking: "/admin/reports/ranking",
  report_star_club: "/admin/reports/star-club",
  report_dynamic_club: "/admin/reports/dynamic-club",

  report_stock: "/admin/reports/stock",
  report_payment: "/admin/reports/payment",
  report_user: "/admin/reports/user",
  report_reference: "/admin/reports/reference",


  // Notice
  notice: "/admin/notice",

  setting: "/admin/setting",
  logout: "/login",
};














const routeMatch = [
  { key: "dashboard", prefixes: ["/admin/dashboard"] },
  { key: "profile", prefixes: ["/admin/profile"] },
  { key: "tree", prefixes: ["/admin/tree"] },
  { key: "setting", prefixes: ["/admin/setting"] },

  { key: "products", prefixes: ["/admin/products", "/admin/product-edit"] },
  { key: "create", prefixes: ["/admin/create-product"] },
  { key: "product_setting", prefixes: ["/admin/product/setting"] },

  { key: "order_create", prefixes: ["/admin/orders/create"] },
  { key: "order_status", prefixes: ["/admin/orders/status"] },
  { key: "orders", prefixes: ["/admin/orders", "/admin/customer-details/"] },

  { key: "payment", prefixes: ["/admin/payment"]},

  { key: "users", prefixes: ["/admin/users"] },
  { key: "assignUserToTree", prefixes: ["/admin/assign-user-tree"] },
  { key: "userSetting", prefixes: ["/admin/user-setting"] },

  { key: "report_sale", prefixes: ["/admin/reports/sale"] },
  { key: "report_order", prefixes: ["/admin/reports/order"] },
  { key: "report_product_sale", prefixes: ["/admin/reports/product/sale"] },
  { key: "report_products", prefixes: ["/admin/reports/products"] },
  { key: "report_statement", prefixes: ["/admin/reports/statement"] },
  { key: "report_star_club", prefixes: ["/admin/reports/star-club"] },
  { key: "report_dynamic_club", prefixes: ["/admin/reports/dynamic-club"] },

  { key: "report_stock", prefixes: ["/admin/reports/stock"] },
  { key: "report_ranking", prefixes: ["/admin/reports/ranking"] },
  { key: "report_payment", prefixes: ["/admin/reports/payment"] },
  { key: "report_user", prefixes: ["/admin/reports/user"] },
  { key: "report_reference", prefixes: ["/admin/reports/reference"] },


  { key: "notice", prefixes: ["/admin/notice"] },

  { key: "logout", prefixes: ["/logout"] },
];












const activeKey = computed(() => {
  const path = route.path;
  const hit = routeMatch.find((r) =>
    r.prefixes.some((pre) => path.startsWith(pre))
  );
  return hit?.key ?? "dashboard";
});

async function pick(key) {
  emit("update:modelValue", key);
  emit("navigate", key);

  if (key === "logout") {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem("token");
      emit("close");
      return router.push("/login");
    }
  }

  const to = routeMap[key];
  if (to && route.path !== to) {
    await router.push(to);
  }

  emit("close");
}











// product page open close
watch(
  () => activeKey.value,
  (k) => {
    const productKeys = ["products", "create","product_setting"];
    if (productKeys.includes(k)) {
      pagesOpen.value = true;
    }
  },
  { immediate: true }
);












// user dropdown
watch(
  () => activeKey.value,
  (k) => {
    const userKeys = ['users', 'assignUserToTree','userSetting'];
    if(userKeys.includes(k)){
      userPagesOpen.value = true;
    }
  },
  {immediate: true }
);










// Order page open close
watch(
  () => activeKey.value,
  (k) => {
    const orderKeys = ["orders", "order_status", "sales", "order_create"];
    if (orderKeys.includes(k)) {
      orderPagesOpen.value = true;
    }
  },
  { immediate: true }
);












// Report page open close
watch(
  () => activeKey.value,
  (k) => {
    const reportKeys = [
      "report_sale", 
      "report_order", 
      "report_product_sale", 
      "report_products", 
      "report_statement",
      "report_stock", 
      "report_ranking", 
      "report_payment", 
      "report_user", 
      "report_reference", 
      "report_star_club", 
      "report_dynamic_club"
    ];
    if (reportKeys.includes(k)) {
      reportPagesOpen.value = true;
    }
  },
  { immediate: true }
);













const authUser = ref({
  vendor: null
});

function fetchAuthUser() {
  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      authUser.value = {
        ...parsed,
        vendor: parsed.vendor || null
      }
    } else {
      authUser.value = { vendor: null }
    }
  } catch (e) {
    authUser.value = { vendor: null }
  }
}

onMounted(() => {
  fetchAuthUser();
})

</script>