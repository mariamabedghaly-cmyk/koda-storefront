import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

/**
 * App Routing Registry
 * Team members should import and plug their developed page components here!
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Customer Storefront Routes (within Main Layout) */}
      <Route path="/" element={<Layout />}>
        {/* Member #3 / Member #1 */}
        <Route index element={<HomePage />} />

        {/* Member #4: Product Catalog */}
        <Route path="products" element={<HomePage />} />
        <Route path="shop" element={<HomePage />} />

        {/* Member #5: Product Details & Reviews
            <Route path="products/:id" element={<ProductDetailsPage />} />
        */}

        {/* Member #6: Shopping Cart
            <Route path="cart" element={<CartPage />} />
        */}

        {/* Member #7: Wishlist
            <Route path="wishlist" element={<WishlistPage />} />
        */}

        {/* Member #8: Checkout & Orders
            <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="orders/:id" element={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>} />
            <Route path="order-success/:id" element={<ProtectedRoute><OrderSuccessPage /></ProtectedRoute>} />
        */}

        {/* Member #9: Profile & Address Book
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        */}
      </Route>

      {/* Member #2: Authentication (No standard layout)
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      */}

      {/* Members #10 - #13: Admin Dashboard Routes
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/add" element={<AdminAddProductPage />} />
            <Route path="products/edit/:id" element={<AdminEditProductPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="carts" element={<AdminCartsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
      */}

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
