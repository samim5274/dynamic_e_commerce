import { createRouter, createWebHistory } from 'vue-router';

// Auth Routes
const Login = () => import('../components/Auth/login.vue');
const Register = () => import('../components/Auth/register.vue');
const FindAccount = () => import('../components/Auth/find-account.vue');
const otpVerification = () => import('../components/Auth/otp-verification.vue');
const resetPassword = () => import('../components/Auth/reset-password.vue');
const Unauthorized = () => import('../components/Auth/unauthorized.vue');
const treeUser = () => import('../components/Auth/tree-user.vue');












// E-commerce Routes
const Home = () => import('../components/e-commerce/home.vue');
const productDetails = () => import('../components/e-commerce/product-details.vue');
const CartDetails = () => import('../components/e-commerce/cart.vue');
const Checkout = () => import('../components/e-commerce/checkout/checkout.vue');







// =======================
// Admin Routes (group: admin)
// =======================
const AdminDashboard = () => import(/* webpackChunkName: "admin" */ '../components/Dashboard/admin/admin-dashboard.vue');
const AdminProfile = () => import(/* webpackChunkName: "admin" */ '../components/Dashboard/admin/admin-profile.vue');
const AdminSetting = () => import(/* webpackChunkName: "admin" */ '../components/Dashboard/admin/admin-setting.vue');

const UserList = () => import(/* webpackChunkName: "admin" */ '../components/Dashboard/admin/user/users-list.vue');
const AssignUserTree = () => import(/* webpackChunkName: "admin" */ '../components/Dashboard/admin/user/assign-user.vue');
const UserSetting = () => import(/* webpackChunkName: "admin" */ '../components/Dashboard/admin/user/user-setting.vue');
const EditUser = () => import(/* webpackChunkName: "admin" */ '../components/Dashboard/admin/user/edit-user.vue');


// =======================
// Product Routes (group: product)
// =======================
const CreateProduct = () => import(/* webpackChunkName: "product" */ '../components/Dashboard/product/create-product.vue');
const ProductList = () => import(/* webpackChunkName: "product" */ '../components/Dashboard/product/product-list.vue');
const ProductEdit = () => import(/* webpackChunkName: "product" */ '../components/Dashboard/product/product-edit.vue');


// =======================
// Order Routes (group: order)
// =======================
const AdminOrders = () => import(/* webpackChunkName: "order" */ '../components/Dashboard/order/order.vue');
const AdminOrderDetails = () => import(/* webpackChunkName: "order" */ '../components/Dashboard/order/order-details.vue');
const AdminCustomerDetails = () => import(/* webpackChunkName: "order" */ '../components/Dashboard/order/customer-details.vue');
const AdminStatus = () => import(/* webpackChunkName: "order" */ '../components/Dashboard/order/status.vue');


// =======================
// Customer Dashboard (group: customer)
// =======================
const Dashboard = () => import(/* webpackChunkName: "customer" */ '../components/Dashboard/customer/dashboard.vue');
const Profile = () => import(/* webpackChunkName: "customer" */ '../components/Dashboard/customer/profile.vue');
const Reference = () => import(/* webpackChunkName: "customer" */ '../components/Dashboard/customer/reference.vue');

const CustomerOrders = () => import(/* webpackChunkName: "customer" */ '../components/Dashboard/customer/order/order-list.vue');
const C_OrderDetails = () => import(/* webpackChunkName: "customer" */ '../components/Dashboard/customer/order/order-details.vue');
const C_OrderTracking = () => import(/* webpackChunkName: "customer" */ '../components/Dashboard/customer/order/tracking.vue');

const C_Setting = () => import(/* webpackChunkName: "customer" */ '../components/Dashboard/customer/setting/setting.vue');
const C_tree = () => import(/* webpackChunkName: "customer" */ '../components/Dashboard/customer/tree/tree-user.vue');
const C_Account = () => import(/* webpackChunkName: "customer" */ '../components/Dashboard/customer/account/account.vue');


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

  { path: '/public-tree-user', component: treeUser, meta: {title: "Tree User", requiresAuth: true}},




  // admin dashboard
  { path: '/admin/dashboard', component: AdminDashboard, meta:{title: 'Admin Dashboard', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/profile', component: AdminProfile, meta:{title: 'Admin Profile', requiresAuth: true, roles: ['admin', 'super_admin']}},
  // user route
  { path: '/admin/users', name: 'UserList', component: UserList, meta:{title: 'Users List', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/assign-user-tree', component: AssignUserTree, meta:{title: 'Create user', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/user-setting', component: UserSetting, meta:{title: 'User Setting', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/user-setting/edit/:id', component: EditUser, meta:{title: 'Edit User', requiresAuth: true, roles: ['admin', 'super_admin']}},
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
  { path: '/tree-user', component: C_tree, meta: { requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Tree"}},
  { path: '/account', component: C_Account, meta: {requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Account"}},
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
