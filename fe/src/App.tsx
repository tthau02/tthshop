import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ClientLayout from "./pages/layouts/ClientLayout";
import AdminLayout from "./pages/layouts/AdminLayout";
import List from "./pages/admin/products/List";
import Add from "./pages/admin/products/Add";
import { Toaster } from "react-hot-toast";
import Update from "./pages/admin/products/Update";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ListCategory from "./pages/admin/category/ListCategory";
import PrivateRoute from "./components/layout/PrivateRoute";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Profile from "./pages/profile/Profile";
import Checkout from "./pages/Checkout";
import OrdersContent from "./pages/admin/orders/OrdersContent";
import UsersContent from "./pages/admin/users/UsersContent";
import DashboardContent from "./pages/admin/DashboardContent";
import OrderHistoryContent from "./pages/profile/OrderHistoryContent";
import EditProfile from "./pages/profile/EditProfile";
import PolicyPage from "./pages/PolicyPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const clientID = import.meta.env.VITE_CLIENT_ID;
  return (
    <>
      <GoogleOAuthProvider clientId={clientID}>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="policy" element={<PolicyPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route path="profile" element={<Profile />}>
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="order-history" element={<OrderHistoryContent />} />
            </Route>

            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardContent />} />
              <Route path="dashboard" element={<DashboardContent />} />
              <Route path="products" element={<List />} />
              <Route path="products/add" element={<Add />} />
              <Route path="products/update/:id" element={<Update />} />
              <Route path="categores" element={<ListCategory />} />
              <Route path="orders" element={<OrdersContent />} />
              <Route path="users" element={<UsersContent />} />
            </Route>
          </Route>

          <Route path="*" element={<h1>Not Fount</h1>} />
        </Routes>
        <Toaster />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
