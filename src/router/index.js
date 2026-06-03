import { createRouter, createWebHistory } from 'vue-router';

// Auth Routes
const Login = () => import('../components/Auth/login.vue');
const Register = () => import('../components/Auth/register.vue');
const FindAccount = () => import('../components/Auth/find-account.vue');
const otpVerification = () => import('../components/Auth/otp-verification.vue');
const resetPassword = () => import('../components/Auth/reset-password.vue');
const Unauthorized = () => import('../components/Auth/unauthorized.vue');
const treeUser = () => import('../components/Auth/tree-user.vue');







// ===========================
// Supper Admin
// ===========================
const Super_Admin_Dashboard = () => import('../components/Dashboard/super_admin/super-admin-dashboard.vue');
const Super_Admin_Profile = () => import('../components/Dashboard/super_admin/super-admin-profile.vue');
const Super_Admin_Tree = () => import('../components/Dashboard/super_admin/tree/tree-user.vue');
const Super_Admin_Orders = () => import('../components/Dashboard/super_admin/order/order.vue');
const Super_Admin_Orders_Status = () => import('../components/Dashboard/super_admin/order/status.vue');
const Super_Admin_Order_Details = () => import('../components/Dashboard/super_admin/order/order-details.vue');
const Super_Admin_Customer_Details = () => import('../components/Dashboard/super_admin/order/customer-details.vue');
const Super_Admin_Payments = () => import('../components/Dashboard/super_admin/payment/payment.vue');
const Super_Admin_Payments_Details = () => import('../components/Dashboard/super_admin/payment/payment-details.vue');





// E-commerce Routes
const Home = () => import('../components/e-commerce/home.vue');
const productDetails = () => import('../components/e-commerce/product-details.vue');
const CartDetails = () => import('../components/e-commerce/cart.vue');
const Checkout = () => import('../components/e-commerce/checkout/checkout.vue');







// =======================
// Admin Routes (group: admin)
// =======================
const AdminDashboard = () => import('../components/Dashboard/admin/admin-dashboard.vue');
const AdminProfile = () => import('../components/Dashboard/admin/admin-profile.vue');
const AdminTree = () => import('../components/Dashboard/admin/tree/tree-user.vue');
const AdminSetting = () => import('../components/Dashboard/admin/admin-setting.vue');

const UserList = () => import('../components/Dashboard/admin/user/users-list.vue');
const AssignUserTree = () => import('../components/Dashboard/admin/user/assign-user.vue');
const UserSetting = () => import('../components/Dashboard/admin/user/user-setting.vue');
const EditUser = () => import('../components/Dashboard/admin/user/edit-user.vue');


// =======================
// Product Routes (group: product)
// =======================
const CreateProduct = () => import('../components/Dashboard/product/create-product.vue');
const ProductList = () => import('../components/Dashboard/product/product-list.vue');
const ProductEdit = () => import('../components/Dashboard/product/product-edit.vue');


// =======================
// Order Routes (group: order)
// =======================
const AdminOrders = () => import('../components/Dashboard/order/order.vue');
const AdminOrderDetails = () => import('../components/Dashboard/order/order-details.vue');
const AdminOrderCreate = () => import('../components/Dashboard/order/create-order.vue');
const AdminCustomerDetails = () => import('../components/Dashboard/order/customer-details.vue');
const AdminStatus = () => import('../components/Dashboard/order/status.vue');
const AdminPayment = () => import('../components/Dashboard/admin/payment/payment.vue');
const AdminPayDetails = () => import('../components/Dashboard/admin/payment/payment-details.vue');


// =======================
// Customer Dashboard (group: customer)
// =======================
const Dashboard = () => import('../components/Dashboard/customer/dashboard.vue');
const Profile = () => import('../components/Dashboard/customer/profile.vue');
const Reference = () => import('../components/Dashboard/customer/reference.vue');

const CustomerOrders = () => import('../components/Dashboard/customer/order/order-list.vue');
const C_OrderDetails = () => import('../components/Dashboard/customer/order/order-details.vue');
const C_OrderTracking = () => import('../components/Dashboard/customer/order/tracking.vue');

const C_Setting = () => import('../components/Dashboard/customer/setting/setting.vue');
const C_tree = () => import('../components/Dashboard/customer/tree/tree-user.vue');
const C_Account = () => import('../components/Dashboard/customer/account/account.vue');
const C_Withdrawal = () => import('../components/Dashboard/customer/account/withdrawal.vue');
const C_WithdrawalForm = () => import('../components/Dashboard/customer/account/withdrawal-form.vue');
const C_WithdrawalDetails = () => import('../components/Dashboard/customer/account/payment-details.vue');

const C_Withdrawal_Reports = () => import('../components/Dashboard/customer/report/report-withdrawal.vue');
const C_Sale_Reports = () => import('../components/Dashboard/customer/report/report-sale.vue');


const routes = [
  // Public E-commerce Routes
  { path: '/', component: Home, meta: {title: "Home - Mercuvaix"} },
  { path: '/product-details/:slug', component: productDetails, meta: { title: "Product Details"} },
  { path: '/cart', component: CartDetails, meta: { title: "Cart", requiresAuth: true} },
  { path: '/checkout/:reg', component: Checkout, meta: { title: "Checkout", requiresAuth: true} },



  // Auth Routes
  { path: '/login', component: Login, meta: {title: "Login"} },
  { path: '/register/:refer_code?', component: Register, meta: {title: "Register"} },
  { path: '/forget-password', component: FindAccount, meta: {title: "Forget Password"} },
  { path: '/otp-verification', component: otpVerification, meta: {title: "OTP Verification", requiresEmail: true} },
  { path: '/reset-password', component: resetPassword, meta: {title: "Reset Password", requiresEmail: true} },
  { path: '/unauthorized', component: Unauthorized, meta: {title: "Unauthorized"} },

  { path: '/public-tree-user', component: treeUser, meta: {title: "Tree User", requiresAuth: true}},




  // Super admin dashboard
  { path: '/super-admin/dashboard', component: Super_Admin_Dashboard, meta:{title: 'Super Admin Dashboard', requiresAuth: true, roles: ['super_admin']} },
  { path: '/super-admin/profile', component: Super_Admin_Profile, meta:{title: 'Super Admin Profile', requiresAuth: true, roles: ['super_admin']} },
  { path: '/super-admin/tree', component: Super_Admin_Tree, meta:{title: 'Super Admin Tree', requiresAuth: true, roles: ['super_admin']} },
  { path: '/super-admin/orders', component: Super_Admin_Orders, meta:{title: 'Orders', requiresAuth: true, roles: ['super_admin']} },
  { path: '/super-admin/orders/status', component: Super_Admin_Orders_Status, meta:{title: 'Status', requiresAuth: true, roles: ['super_admin']} },
  { path: '/super-admin/orders/:reg/:slug', component: Super_Admin_Order_Details, meta:{title: 'Order Details', requiresAuth: true, roles: ['super_admin']} },
  { path: '/super-admin/customer-details/:user_id', component: Super_Admin_Customer_Details, meta:{title: 'Customer Details', requiresAuth: true, roles: ['super_admin']} },
  { path: '/super-admin/payment', component: Super_Admin_Payments, meta:{title: 'Payments', requiresAuth: true, roles: ['super_admin']} },
  { path: '/super-admin/payment/details/:transaction_id/:user_id', component: Super_Admin_Payments_Details, meta:{title: 'Payments Details', requiresAuth: true, roles: ['super_admin']} },






  // admin dashboard
  { path: '/admin/dashboard', component: AdminDashboard, meta:{title: 'Admin Dashboard', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/profile', component: AdminProfile, meta:{title: 'Admin Profile', requiresAuth: true, roles: ['admin', 'super_admin']}},
  { path: '/admin/tree', component: AdminTree, meta:{title: 'Admin Tree', requiresAuth: true, roles: ['admin', 'super_admin']}},
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
  { path: '/admin/orders/create', component: AdminOrderCreate, meta: {requiresAuth: true, roles: ['admin', 'super_admin'], title: "Create Order"}},

  // Payment Routes
  { path: '/admin/payment', component: AdminPayment, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Payments" }},
  { path: '/admin/payment/details/:transaction_id/:user_id', component: AdminPayDetails, meta: { requiresAuth: true, roles: ['admin', 'super_admin'], title: "Payment Details" }},


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
  { path: '/withdraw', component: C_Withdrawal, meta: {requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Withdraw"}},
  { path: '/withdraw/create', component: C_WithdrawalForm, meta: {requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Withdraw Balance"}},
  { path: '/withdraw/details/:transaction_id/:user_id', component: C_WithdrawalDetails, meta: {requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Withdraw Details"}},
  { path: '/reports-withdrawal', component: C_Withdrawal_Reports,  meta: {requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Withdrawal Reports"}},
  { path: '/reports-sales', component: C_Sale_Reports,  meta: {requiresAuth: true, roles: ['customer', 'admin', 'super_admin'], title: "Sale Reports"}},
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
