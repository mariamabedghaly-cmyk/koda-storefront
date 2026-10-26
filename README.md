# 🛒 Koda Storefront - Customer Web Application

Welcome to the **Koda Store** storefront repository! This workspace is dedicated to the **Storefront Team (Members 2 through 9)**, led by Member 1 (Team Leader).

The project is built with **React 18**, **Vite**, **Tailwind CSS**, and **React Router DOM v6**.

---

## 🔗 Live API & Swagger Documentation

* **Base API URL:** `https://e-commerce-api-3wara.vercel.app`
* **Interactive Swagger API Docs:** [https://e-commerce-api-3wara.vercel.app/api-docs](https://e-commerce-api-3wara.vercel.app/api-docs)
* **Test Customer Credentials:** `customer@koda.com` / `customer1212`

---

## 🚀 Getting Started

Follow these steps to set up your local development environment:

```bash
# 1. Clone the repository
git clone https://github.com/mariamabedghaly-cmyk/koda-storefront.git
cd koda-storefront

# 2. Switch to the develop branch
git checkout develop

# 3. Install dependencies
npm install

# 4. Create your feature branch (replace with your task and name)
git checkout -b feature/cart-page-john

# 5. Start the local development server
npm run dev
```

The app will be running at `http://localhost:3000`.

---

## 📚 Manual API Integration Guide

In this project, team members are required to write **direct, manual HTTP requests** using `axios` or native `fetch` within their components.

### 1. Fetching Data (GET Request Example):
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://e-commerce-api-3wara.vercel.app/products');
        setProducts(response.data.products);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {products.map((item) => (
        <div key={item._id} className="border p-4 rounded-xl">
          <h3>{item.name}</h3>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}
```

---

### 2. Submitting Data & Storing Token (POST Request Example):
```jsx
const handleLogin = async (email, password) => {
  try {
    const res = await axios.post('https://e-commerce-api-3wara.vercel.app/auth/login', {
      email,
      password,
    });

    // Save token and user in localStorage with exact keys:
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    alert('Logged in successfully!');
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};
```

---

### 3. Protected Requests with Authorization Header:
```jsx
const addToCart = async (productId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please sign in first');
    return;
  }

  try {
    await axios.post(
      'https://e-commerce-api-3wara.vercel.app/carts/items',
      { productId, quantity: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    alert('Product added to cart!');
  } catch (err) {
    console.error(err.response?.data?.message);
  }
};
```

---

## 👥 Team Task Distribution & API Endpoints

| Member | Feature / Page | Target Files | Assigned Manual Endpoints |
| :--- | :--- | :--- | :--- |
| **Member 2** | Authentication & OTP | `pages/auth/Login.jsx`, `Register.jsx`, `VerifyOtp.jsx`, `ForgotPassword.jsx` | `POST /auth/login`<br>`POST /auth/register/send-otp`<br>`POST /auth/register/verify-otp`<br>`POST /auth/forgot-password/send-otp` |
| **Member 3** | Home Page & Navigation | `pages/HomePage.jsx`, `components/layout/Navbar.jsx` | `GET /products?featured=true` |
| **Member 4** | Shop Catalog & Filters | `pages/ShopPage.jsx`, `components/product/ProductFilters.jsx` | `GET /products`<br>`GET /products/search?q={query}` |
| **Member 5** | Product Details & Reviews | `pages/ProductDetailsPage.jsx`, `components/reviews/ReviewsSection.jsx` | `GET /products/{id}`<br>`POST /products/{id}/reviews` |
| **Member 6** | Cart & Coupon Logic | `pages/CartPage.jsx`, `components/cart/CartDrawer.jsx` | `GET /carts`<br>`POST /carts/items`<br>`PATCH /carts/items/{productId}`<br>`POST /carts/coupon` |
| **Member 7** | Wishlist Management | `pages/WishlistPage.jsx` | `GET /wishlists/my`<br>`POST /wishlists/add/{productId}`<br>`DELETE /wishlists/remove/{productId}` |
| **Member 8** | Checkout & Order Tracking | `pages/CheckoutPage.jsx`, `pages/OrdersPage.jsx` | `POST /orders`<br>`GET /orders/my`<br>`PATCH /orders/my/{id}/cancel` |
| **Member 9** | Profile & Address Book | `pages/ProfilePage.jsx` | `GET /auth/me`<br>`PUT /users/{id}` |

---

## 📂 Project Structure

```
koda-storefront/
├── index.html
├── package.json
├── tailwind.config.js
├── src/
│   ├── components/
│   │   ├── common/         # Reusable UI (Button, Input, Modal, LoadingSpinner, Skeleton, Toast)
│   │   ├── layout/         # Navbar, Footer, Main Layout
│   │   └── product/        # ProductCard
│   ├── context/
│   │   ├── AuthContext.jsx # Handles session, user, and token state
│   │   ├── ThemeContext.jsx# Dark / Light mode toggle
│   │   └── ToastContext.jsx# Pop-up notifications (success, error, info)
│   ├── pages/              # Team pages (Home, Shop, Cart, Wishlist, Checkout, Profile, Auth)
│   ├── routes/             # AppRoutes, ProtectedRoute, AdminRoute
│   ├── App.jsx
│   └── main.jsx
```

---

## 🌿 Git Branching & Contribution Workflow

1. Always branch off the `develop` branch:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```
2. Commit your progress with descriptive conventional commit messages:
   ```bash
   git add .
   git commit -m "feat: implement shopping cart quantity update"
   ```
3. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a **Pull Request (PR)** targeting the `develop` branch on GitHub for code review.
