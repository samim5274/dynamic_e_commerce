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
import Home from '../components/e-commerce/home.vue'
import ProductDetails from '../components/e-commerce/product-details.vue'








// Admin Routes
import AdminDashboard from '../components/Dashboard/admin/admin-dashboard.vue';
import AdminProfile from '../components/Dashboard/admin/admin-profile.vue';

import UserList from '../components/Dashboard/admin/user/users-list.vue';
import AssignUserTree from '../components/Dashboard/admin/user/assign-user.vue';
import UserSetting from '../components/Dashboard/admin/user/user-setting.vue';









// Product Routes
import CreateProduct from '../components/Dashboard/product/create-product.vue'
import ProductList from '../components/Dashboard/product/product-list.vue'
import ProductEdit from '../components/Dashboard/product/product-edit.vue'








// customer dashboard
import Dashboard from '../components/Dashboard/customer/dashboard.vue'
import Profile from '../components/Dashboard/customer/profile.vue'
import Reference from '../components/Dashboard/customer/reference.vue';




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

  { path: '/tree-user', component: treeUser, meta: {title: "Tree User", requiresAuth: true}},




  // admin dashboard
  { path: '/admin/dashboard', component: AdminDashboard, meta:{title: 'Admin Dashboard', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/profile', component: AdminProfile, meta:{title: 'Admin Profile', requiresAuth: true, roles: ['admin', 'super_admin']}},
  // user route
  { path: '/admin/users', component: UserList, meta:{title: 'Users List', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/assign-user-tree', component: AssignUserTree, meta:{title: 'Create user', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/user-setting', component: UserSetting, meta:{title: 'User Setting', requiresAuth: true, roles: ['admin', 'super_admin']}},




  // Product Routes
  { path: '/create-product', component: CreateProduct, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Create Product" } },
  { path: '/products', component: ProductList, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Product Details" } },
  { path: '/product-edit/:slug', component: ProductEdit, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Edit Product" } },




  // customer dashboard
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Dashboard"}},
  { path: '/profile', component: Profile, meta: { requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Profile"}},
  { path: '/reference', component: Reference, meta: { requiresAuth: true, role: ['customer', 'admin', 'super_admin'], title: "Reference"}},
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
