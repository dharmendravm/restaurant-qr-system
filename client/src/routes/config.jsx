import { lazy } from "react";

// --- Lazy Load Pages ---
// Auth
const Welcome = lazy(() => import("@/pages/user/Welcome"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));

// User
const HomePage = lazy(() => import("@/pages/user/HomePage"));
const CartPage = lazy(() => import("@/features/Cart/CartPage"));
const UserProfile = lazy(() => import("@/pages/user/UserProfile"));
const ChangePassword = lazy(() => import("@/pages/user/ChangePassword"));
// Orders
const Checkout = lazy(() => import("@/pages/order/CheckOutPage"));
const OrderSuccess = lazy(() => import("@/pages/order/OrderSuccessPage"));
const OrderDetails = lazy(() => import("@/pages/order/OrderDetails"));

// Admin
const Dashboard = lazy(() => import("@/pages/admin/dashboard/Dashboard"));
const UsersPage = lazy(() => import("@/pages/admin/users/UserPage"));
const TablesPage = lazy(() => import("@/pages/admin/tables/TablesPage"));
const RegisterTable = lazy(() => import("@/pages/admin/tables/CreateTablePage"));
const OrdersAdmin = lazy(() => import("@/features/admin-orders/Orders"));
const OrderDetailsAdmin = lazy(() => import("@/features/admin-orders/OrderDetailPage"));
const MenuPage = lazy(() => import("@/pages/admin/menu/AddNewMenuPage"));
const AddCouponForm = lazy(() => import("@/pages/admin/coupons/CouponsPage"));


export const routesConfig = {
  public: [
    { path: "/welcome", element: <Welcome /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/recovery", element: <ForgotPassword /> },
    { path: "/reset-password/:token", element: <ResetPassword /> },
  ],
  user: [
    { path: "/", element: <HomePage /> },
    { path: "/user/cart", element: <CartPage /> },
    { path: "/user/profile", element: <UserProfile /> },
    { path: "/user/change-password", element: <ChangePassword /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/order-success/:orderId", element: <OrderSuccess /> },
    { path: "/orders/:orderId", element: <OrderDetails /> },
  ],
  admin: [
    { path: "/admin", element: <Dashboard /> },
    { path: "/admin/users", element: <UsersPage /> },
    { path: "/admin/orders", element: <OrdersAdmin /> },
    { path: "/admin/orders/:id", element: <OrderDetailsAdmin /> },
    { path: "/admin/tables", element: <TablesPage /> },
    { path: "/admin/tables/create", element: <RegisterTable /> },
    { path: "/admin/create/menu", element: <MenuPage /> },
    { path: "/admin/create/coupon", element: <AddCouponForm /> },
  ]
};