import { createRouter, createWebHistory } from 'vue-router';

// Auth Routes
import Login from '../components/Auth/login.vue';
import Register from '../components/Auth/register.vue'
import FindAccount from '../components/Auth/find-account.vue'
import otpVerification from '../components/Auth/otp-verification.vue';
import resetPassword from '../components/Auth/reset-password.vue';
import Unauthorized from '../components/Auth/unauthorized.vue';
import treeUser from '../components/Auth/tree-user.vue';












// E-commerce Routes
import Home from '../components/e-commerce/home.vue';
import productDetails from '../components/e-commerce/product-details.vue';
import CartDetails from '../components/e-commerce/cart.vue';
import Checkout from '../components/e-commerce/checkout/checkout.vue';








// Admin Routes
import AdminDashboard from '../components/Dashboard/admin/admin-dashboard.vue';
import AdminProfile from '../components/Dashboard/admin/admin-profile.vue';
import AdminSetting from '../components/Dashboard/admin/admin-setting.vue';
import UserList from '../components/Dashboard/admin/user/users-list.vue';
import AssignUserTree from '../components/Dashboard/admin/user/assign-user.vue';
import UserSetting from '../components/Dashboard/admin/user/user-setting.vue';










// Product Routes
import CreateProduct from '../components/Dashboard/product/create-product.vue'
import ProductList from '../components/Dashboard/product/product-list.vue'
import ProductEdit from '../components/Dashboard/product/product-edit.vue'


// Order Details
import AdminOrders from '../components/Dashboard/order/order.vue';
import AdminOrderDetails from '../components/Dashboard/order/order-details.vue';
import AdminCustomerDetails from '../components/Dashboard/order/customer-details.vue';
import AdminStatus from '../components/Dashboard/order/status.vue';





// customer dashboard
import Dashboard from '../components/Dashboard/customer/dashboard.vue'
import Profile from '../components/Dashboard/customer/profile.vue'
import Reference from '../components/Dashboard/customer/reference.vue';
import CustomerOrders from '../components/Dashboard/customer/order/order-list.vue';
import C_OrderDetails from '../components/Dashboard/customer/order/order-details.vue';
import C_OrderTracking from '../components/Dashboard/customer/order/tracking.vue';
import C_Setting from '../components/Dashboard/customer/setting/setting.vue';




const routes = [
  // Public E-commerce Routes
  { path: '/', component: Home, meta: {title: "Home - Mercuvaix"} },
  { path: '/product-details/:slug', component: productDetails, meta: { title: "Product Details"} },
  { path: '/cart', component: CartDetails, meta: { title: "Cart", requiresAuth: true} },
  { path: '/checkout/:reg', component: Checkout, meta: { title: "Checkout", requiresAuth: true} },



  // Auth Routes
  { path: '/login', component: Login, meta: {title: "Login"} },
  { path: '/register', component: Register, meta: {title: "Register"} },
  { path: '/forget-password', component: FindAccount, meta: {title: "Forget Password"} },
  { path: '/otp-verification', component: otpVerification, meta: {title: "OTP Verification", requiresEmail: true} },
  { path: '/reset-password', component: resetPassword, meta: {title: "Reset Password", requiresEmail: true} },
  { path: '/unauthorized', component: Unauthorized, meta: {title: "Unauthorized"} },

  { path: '/tree-user', component: treeUser, meta: {title: "Tree User", requiresAuth: true}},




  // admin dashboard
  { path: '/admin/dashboard', component: AdminDashboard, meta:{title: 'Admin Dashboard', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/profile', component: AdminProfile, meta:{title: 'Admin Profile', requiresAuth: true, roles: ['admin', 'super_admin']}},
  // user route
  { path: '/admin/users', component: UserList, meta:{title: 'Users List', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/assign-user-tree', component: AssignUserTree, meta:{title: 'Create user', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/user-setting', component: UserSetting, meta:{title: 'User Setting', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/setting', component: AdminSetting, meta:{title: 'Admin Setting', requiresAuth: true, roles: ['admin', 'super_admin']}},




  // Product Routes
  { path: '/admin/create-product', component: CreateProduct, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Create Product" } },
  { path: '/admin/products', component: ProductList, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Product Details" } },
  { path: '/admin/product-edit/:slug', component: ProductEdit, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Edit Product" } },

  // Order Routes
  { path: '/admin/orders', component: AdminOrders, meta: {requiresAuth: true, roles: ['admin', 'super_admin'], title: "Orders"}},
  { path: '/admin/orders/:reg/:slug', component: AdminOrderDetails, meta: {requiresAuth: true, roles: ['admin', 'super_admin'], title: "Order Details"}},
  { path: '/admin/customer-details/:user_id', component: AdminCustomerDetails, meta: {requiresAuth: true, roles: ['admin', 'super_admin'], title: "Customer Details"}},
  { path: '/admin/orders/status', component: AdminStatus, meta: {requiresAuth: true, roles: ['admin', 'super_admin'], title: "Status Filter"}},


  // customer dashboard
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Dashboard"}},
  { path: '/profile', component: Profile, meta: { requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Profile"}},
  { path: '/reference', component: Reference, meta: { requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Reference"}},
  { path: '/orders-list', component: CustomerOrders, meta: { requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Orders"}},
  { path: '/orders-details/:reg/:slug', component: C_OrderDetails, meta: { requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Order Details"}},
  { path: '/orders-tracking', component: C_OrderTracking, meta: { requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Order Tracking"}},
  { path: '/setting', component: C_Setting, meta: { requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Setting"}},
]












const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes,
});

// security check
router.beforeEach((to, from, next) => {
  
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem('user'));

  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // Check if route requires email
  if (to.meta.requiresEmail) {
    const email = localStorage.getItem('email')
    if (!email) {
      // Email not found, redirect to forget-password
      return next('/forget-password');
    }
  }

  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  // console.log(to.meta.roles);
  if (to.meta.roles) {
    if (!user) {
      return next('/login');
    }

    if (!to.meta.roles.includes(user.role)) {
      return next('/unauthorized');
    }
  }

  next();
});

export default router
