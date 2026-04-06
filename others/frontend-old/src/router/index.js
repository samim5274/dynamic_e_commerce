import { createRouter, createWebHistory } from 'vue-router';

// Auth Routes
import Login from '../components/Auth/login.vue';
import Register from '../components/Auth/register.vue'
import FindAccount from '../components/Auth/find-account.vue'
import otpVerification from '../components/Auth/otp-verification.vue';
import resetPassword from '../components/Auth/reset-password.vue';
import Unauthorized from '../components/Auth/unauthorized.vue';
import treeUser from '../components/Auth/tree-user.vue';




// super admin Routes
import SuperAdminDashboard from '../components/Dashboard/super_admin/super-admin-dashboard.vue'







// Admin Routes
import AdminDashboard from '../components/Dashboard/admin/admin-dashboard.vue'
import AdminProfile from '../components/Dashboard/admin/admin-profile.vue'
import AdminSetting from '../components/Dashboard/admin/admin-setting.vue';






import dashboard from '../components/Dashboard/dashboard.vue'
import profile from '../components/Auth/profile.vue'












// E-commerce Routes
import Home from '../components/e-commerce/home.vue'
import ProductDetails from '../components/e-commerce/product-details.vue'












// Product Routes
import CreateProduct from '../components/Dashboard/product/create-product.vue'
import ProductList from '../components/Dashboard/product/product-list.vue'
import ProductEdit from '../components/Dashboard/product/product-edit.vue'














const routes = [
  // Public Routes
  { path: '/', component: Home, meta: {title: "Home - Mercuvaix"} },
  { path: '/product-details', component: ProductDetails, meta: {title: "Product Details"} },













  // Auth Routes
  { path: '/login', component: Login, meta: {title: "Login"} },
  { path: '/register', component: Register, meta: {title: "Register"} },
  { path: '/forget-password', component: FindAccount, meta: {title: "Forget Password"} },
  { path: '/otp-verification', component: otpVerification, meta: {title: "OTP Verification", requiresEmail: true} },
  { path: '/reset-password', component: resetPassword, meta: {title: "Reset Password", requiresEmail: true} },
  { path: '/unauthorized', component: Unauthorized, meta: {title: "Unauthorized"} },

  { path: '/tree-user', component: treeUser, meta: {title: "Tree User"}},










  // super admin Routes
  { path: '/super-admin/dashboard', component: SuperAdminDashboard, meta: { requiresAuth: true, roles: ['super_admin'], title: "Super Admin Dashboard" } },

  // Admin Routes
  { path: '/admin/dashboard', component: AdminDashboard, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Admin Dashboard" } },
  { path: '/admin/profile', component: VendorProfile, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Admin Profile" } },
  { path: '/admin/setting', component: vendorSetting, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Admin Setting" } },

  // Product Routes
  { path: '/create-product', component: CreateProduct, meta: { requiresAuth: true, roles: ['vendor_owner', 'vendor_staff'], title: "Create Product" } },
  { path: '/products', component: ProductList, meta: { requiresAuth: true, roles: ['vendor_owner', 'vendor_staff'], title: "Product Details" } },
  { path: '/product-edit/:slug', component: ProductEdit, meta: { requiresAuth: true, roles: ['vendor_owner', 'vendor_staff'], title: "Edit Product" } },

  // admin Routes
  { path: '/dashboard', component: dashboard, meta: { requiresAuth: true, title: "Dashboard" } },
  { path: '/profile', component: profile, meta: { requiresAuth: true, title: "Profile" } },
]












const router = createRouter({
  history: createWebHistory(),
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
    return next('/admin-login');
  }

  if (to.meta.roles) {
    if (!user) {
      return next('/admin-login');
    }

    if (!to.meta.roles.includes(user.role)) {
      return next('/unauthorized');
    }
  }

  next();
});

export default router
