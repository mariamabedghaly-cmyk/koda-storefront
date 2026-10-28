# 🛒 Koda Storefront - Customer Web Application

Welcome to the **Koda Storefront** repository! This project represents the customer-facing web application of the Koda Store e-commerce platform.

* **Repository:** [https://github.com/mariamabedghaly-cmyk/koda-storefront](https://github.com/mariamabedghaly-cmyk/koda-storefront)
* **Team:** Member 1 (Team Leader) & Members 2 through 9
* **Tech Stack:** React 18, Vite, Tailwind CSS v3, React Router DOM v6, Axios, Lucide Icons (`lucide-react`), React Hook Form, Zod

## 📦 Standardized Team Libraries (Installed & Ready)

To prevent merge conflicts and inconsistent dependencies, the team uses a single unified stack:
* **UI Styling:** Tailwind CSS (`tailwindcss`)
* **Icons:** Lucide React (`lucide-react`) — *e.g. `import { ShoppingCart, User } from 'lucide-react'`*
* **Routing:** React Router DOM (`react-router-dom`)
* **HTTP Client:** Axios (`axios`)
* **Form Handling:** React Hook Form (`react-hook-form`)
* **Form Validation:** Zod (`zod`) + `@hookform/resolvers`

---

> ⚠️ **TRAINING WORKSPACE SPECIFICATION:**  
> This repository is a **clean starter boilerplate**. There are **no pre-built components or pages** in the codebase. Each team member is required to **create their assigned files from scratch**, build the UI, and write the **manual API integration** directly using `axios` as specified below.

---

## 🔗 Live Backend API & Documentation

* **Base URL:** `https://e-commerce-api-3wara.vercel.app`
* **Swagger API Documentation:** [https://e-commerce-api-3wara.vercel.app/api-docs](https://e-commerce-api-3wara.vercel.app/api-docs)
* **Test Customer Account:**
  * **Email:** `customer@koda.com`
  * **Password:** `customer1212`

---

## 🚀 Quick Start Guide

```bash
# 1. Clone the repository
git clone https://github.com/mariamabedghaly-cmyk/koda-storefront.git
cd koda-storefront

# 2. Switch to develop branch
git checkout develop

# 3. Install packages
npm install

# 4. Create your task branch
git checkout -b feature/your-task-name

# 5. Start development server
npm run dev
```

---

## 📚 Manual API Integration Rules for Everyone

In this training project, **all team members must write manual API requests directly** in their page components using `axios`:

1. **Unprotected Requests (GET):**
   ```jsx
   const res = await axios.get('https://e-commerce-api-3wara.vercel.app/products');
   ```

2. **Sending Data (POST):**
   ```jsx
   const res = await axios.post('https://e-commerce-api-3wara.vercel.app/auth/login', {
     email,
     password,
   });
   // Always save token with exact key:
   localStorage.setItem('token', res.data.token);
   localStorage.setItem('user', JSON.stringify(res.data.user));
   ```

3. **Protected Requests (with Token in Headers):**
   ```jsx
   const token = localStorage.getItem('token');
   const res = await axios.post(
     'https://e-commerce-api-3wara.vercel.app/carts/items',
     { productId, quantity: 1 },
     {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }
   );
   ```

---

## 👥 Detailed Member-by-Member Task Assignment

### 👑 Member 1: Team Leader & Core Architecture
* **Target Files to Setup:**
  * `src/components/common/` (Shared UI: Buttons, Inputs, Modals, Spinners)
  * `src/context/` (AuthContext, ThemeContext, ToastContext)
  * `src/routes/` (AppRoutes, ProtectedRoute)
* **Responsibilities:**
  * Define base layouts and route guards.
  * Review all incoming Pull Requests (PRs) and merge them into `develop`.

---

### 🔐 Member 2: Authentication & Two-Step OTP
* **Target Files to Create:**
  * `src/pages/auth/Login.jsx`
  * `src/pages/auth/Register.jsx`
  * `src/pages/auth/VerifyOtp.jsx`
  * `src/pages/auth/ForgotPassword.jsx`
* **Task Description:**
  * Build the user sign-in page with validation.
  * Build the registration flow with two steps: Step 1 (submit name, email, password, phone) $\rightarrow$ Step 2 (enter 6-digit OTP code sent to email).
  * Build the forgot password flow with OTP reset.
  * Save the authentication token to `localStorage.setItem('token', token)`.
* **Manual Endpoints to Call:**
  * `POST https://e-commerce-api-3wara.vercel.app/auth/login`
  * `POST https://e-commerce-api-3wara.vercel.app/auth/register/send-otp`
  * `POST https://e-commerce-api-3wara.vercel.app/auth/register/verify-otp`
  * `POST https://e-commerce-api-3wara.vercel.app/auth/forgot-password/send-otp`
  * `POST https://e-commerce-api-3wara.vercel.app/auth/forgot-password/verify-otp`

---

### 🏠 Member 3: Home Page & Global Navigation
* **Target Files to Create:**
  * `src/pages/HomePage.jsx`
  * `src/components/layout/Navbar.jsx`
  * `src/components/layout/Footer.jsx`
* **Task Description:**
  * Design an engaging landing page with a promotional Hero Banner/Carousel.
  * Build a Categories Grid section (Electronics, Audio, Fashion, etc.).
  * Fetch and display featured products dynamically on the home page.
  * Enhance the Navbar with responsive mobile menu and live cart/wishlist counters.
* **Manual Endpoints to Call:**
  * `GET https://e-commerce-api-3wara.vercel.app/products?featured=true`

---

### 📦 Member 4: Product Catalog, Search & Filtering
* **Target Files to Create:**
  * `src/pages/ShopPage.jsx` (or `ProductsPage.jsx`)
  * `src/components/product/ProductFilters.jsx`
* **Task Description:**
  * Build the complete catalog shop page displaying products in a responsive grid.
  * Build a sidebar filter system allowing users to filter by category, price range, and brand.
  * Implement instant live search and pagination controls.
* **Manual Endpoints to Call:**
  * `GET https://e-commerce-api-3wara.vercel.app/products`
  * `GET https://e-commerce-api-3wara.vercel.app/products/search?q={query}`

---

### ⭐ Member 5: Product Details, Gallery & Reviews
* **Target Files to Create:**
  * `src/pages/ProductDetailsPage.jsx`
  * `src/components/reviews/ReviewsSection.jsx`
* **Task Description:**
  * Build a comprehensive product details page: image gallery with zoom, price, discount badge, stock level, SKU, and quantity selector.
  * Build customer reviews section showing star rating breakdown and review list.
  * Build a form for authenticated customers to submit a new review and rating.
* **Manual Endpoints to Call:**
  * `GET https://e-commerce-api-3wara.vercel.app/products/{id}`
  * `POST https://e-commerce-api-3wara.vercel.app/products/{id}/reviews` *(Requires Token in Headers)*
  * `DELETE https://e-commerce-api-3wara.vercel.app/products/{id}/reviews/{reviewId}` *(Requires Token in Headers)*

---

### 🛒 Member 6: Shopping Cart & Discount Coupons
* **Target Files to Create:**
  * `src/pages/CartPage.jsx`
  * `src/components/cart/CartDrawer.jsx`
* **Task Description:**
  * Build the shopping cart view showing item thumbnail, title, price, quantity controls (`+` / `-`), and remove button.
  * Implement coupon discount code input and calculate order subtotal, discount, and total.
  * Provide a "Clear Cart" button and a checkout button redirecting to `/checkout`.
* **Manual Endpoints to Call:**
  * `GET https://e-commerce-api-3wara.vercel.app/carts`
  * `POST https://e-commerce-api-3wara.vercel.app/carts/items`
  * `PATCH https://e-commerce-api-3wara.vercel.app/carts/items/{productId}`
  * `DELETE https://e-commerce-api-3wara.vercel.app/carts/items/{productId}`
  * `POST https://e-commerce-api-3wara.vercel.app/carts/coupon`
  * `DELETE https://e-commerce-api-3wara.vercel.app/carts/clear`
  *(All cart requests require Token in Headers)*

---

### ❤️ Member 7: Wishlist Management
* **Target Files to Create:**
  * `src/pages/WishlistPage.jsx`
  * `src/components/product/WishlistButton.jsx`
* **Task Description:**
  * Wire up the interactive heart icon on each product card to toggle wishlist state.
  * Build the wishlist page displaying saved items.
  * Provide quick action buttons to move items directly into the shopping cart or remove them.
* **Manual Endpoints to Call:**
  * `GET https://e-commerce-api-3wara.vercel.app/wishlists/my`
  * `POST https://e-commerce-api-3wara.vercel.app/wishlists/add/{productId}`
  * `DELETE https://e-commerce-api-3wara.vercel.app/wishlists/remove/{productId}`
  * `DELETE https://e-commerce-api-3wara.vercel.app/wishlists/clear`
  *(All wishlist requests require Token in Headers)*

---

### 💳 Member 8: Checkout & Customer Order Tracking
* **Target Files to Create:**
  * `src/pages/CheckoutPage.jsx`
  * `src/pages/OrderSuccessPage.jsx`
  * `src/pages/OrdersPage.jsx`
* **Task Description:**
  * Build the multi-step checkout screen: choose shipping address, select payment method (Cash on Delivery), and confirm purchase.
  * Build the order success confirmation screen with order tracking ID.
  * Build the "My Orders" history page showing order status badges (Pending, Processing, Shipped, Delivered) and a "Cancel Order" button for pending orders.
* **Manual Endpoints to Call:**
  * `POST https://e-commerce-api-3wara.vercel.app/orders`
  * `GET https://e-commerce-api-3wara.vercel.app/orders/my`
  * `GET https://e-commerce-api-3wara.vercel.app/orders/my/{id}`
  * `PATCH https://e-commerce-api-3wara.vercel.app/orders/my/{id}/cancel`
  *(All orders requests require Token in Headers)*

---

### 👤 Member 9: Customer Profile & Address Book
* **Target Files to Create:**
  * `src/pages/ProfilePage.jsx`
  * `src/components/profile/AddressBook.jsx`
* **Task Description:**
  * Build user profile view to edit personal information (username, phone, avatar).
  * Build address book management: form to add a new address (country, city, street, building, postal code), edit, delete, and set default address.
* **Manual Endpoints to Call:**
  * `GET https://e-commerce-api-3wara.vercel.app/auth/me`
  * `PUT https://e-commerce-api-3wara.vercel.app/users/{id}`
  *(All profile requests require Token in Headers)*

---

## 🌿 Contribution Rules (Git Workflow)

1. Make sure your local `develop` branch is up to date:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. Create your isolated feature branch:
   ```bash
   git checkout -b feature/cart-page-yourname
   ```
3. Commit your code frequently:
   ```bash
   git add .
   git commit -m "feat: implement cart items quantity increase and decrease"
   ```
4. Push your branch to GitHub:
   ```bash
   git push origin feature/cart-page-yourname
   ```
5. Open a **Pull Request (PR)** on GitHub targeting `develop` for the Team Leader to review!
