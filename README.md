# 🛒 Koda Storefront - متجر العملاء

مستودع واجهة العميل لمتجر **Koda Store**.
هذا المستودع مخصص لأعضاء فريق المتجر (الأعضاء من 2 إلى 9) بقيادة العضو 1 (التيم ليد).

المشروع مبني بـ **React 18 + Vite + Tailwind CSS**.

---

## 🔗 رابط السيرفر وتوثيق الـ API
* **Base URL:** `https://e-commerce-api-3wara.vercel.app`
* **توثيق Swagger الكامل لجميع الـ Endpoints:** [https://e-commerce-api-3wara.vercel.app/api-docs](https://e-commerce-api-3wara.vercel.app/api-docs)

---

## 📚 دليل الربط اليدوي بالـ API لكل عضو (Manual API Integration)

المطلوب من كل عضو كتابة كود الاتصال بالـ API **بيده ومباشرة** داخل مكونات صفحته باستخدام `axios` أو `fetch`:

### 1. طلب جلب بيانات (GET):
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('https://e-commerce-api-3wara.vercel.app/products');
        setData(response.data.products);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p>جاري التحميل...</p>;
  return <div>{/* عرض البيانات */}</div>;
}
```

---

### 2. طلب إرسال بيانات (POST) وتخزين الـ Token:
```jsx
// مثال لتسجيل الدخول وحفظ التوكن في localStorage
const handleLogin = async (email, password) => {
  try {
    const res = await axios.post('https://e-commerce-api-3wara.vercel.app/auth/login', {
      email,
      password,
    });

    // احفظ التوكن بهذا الاسم بالضبط ليتعرف عليه باقي الموقع:
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    alert('تم تسجيل الدخول بنجاح!');
  } catch (err) {
    alert(err.response?.data?.message || 'فشل تسجيل الدخول');
  }
};
```

---

### 3. طلب محمي يتطلب التوكن (Protected Request with Headers):
```jsx
// مثال لإضافة منتج للسلة أو جلب طلبات العميل
const addToCart = async (productId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('يرجى تسجيل الدخول أولاً');
    return;
  }

  try {
    const res = await axios.post(
      'https://e-commerce-api-3wara.vercel.app/carts/items',
      { productId, quantity: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`, // تمرير التوكن يدوياً في الهيدرز
        },
      }
    );
    alert('تمت الإضافة للسلة بنجاح!');
  } catch (err) {
    console.error(err.response?.data?.message);
  }
};
```

---

## 👥 مهام أعضاء فريق المتجر والـ Endpoints المسندة:

| العضو | الميزة / الصفحة | الملفات المقترحة | الـ Endpoints اليدوية |
| :--- | :--- | :--- | :--- |
| **عضو 2** | الدخول، التسجيل، و OTP | `pages/auth/Login.jsx`, `Register.jsx`, `VerifyOtp.jsx`, `ForgotPassword.jsx` | `POST /auth/login`<br>`POST /auth/register/send-otp`<br>`POST /auth/register/verify-otp`<br>`POST /auth/forgot-password/send-otp` |
| **عضو 3** | الصفحة الرئيسية والتنقل | `pages/HomePage.jsx`, `components/layout/Navbar.jsx` | `GET /products?featured=true` |
| **عضو 4** | كتالوج المنتجات والبحث | `pages/ShopPage.jsx`, `components/product/FilterSidebar.jsx` | `GET /products`<br>`GET /products/search?q={query}` |
| **عضو 5** | تفاصيل المنتج والتقييمات | `pages/ProductDetailsPage.jsx`, `components/reviews/ReviewsSection.jsx` | `GET /products/{id}`<br>`POST /products/{id}/reviews` |
| **عضو 6** | سلة التسوق والكوبونات | `pages/CartPage.jsx`, `components/cart/CartDrawer.jsx` | `GET /carts`<br>`POST /carts/items`<br>`PATCH /carts/items/{productId}`<br>`POST /carts/coupon` |
| **عضو 7** | قائمة الرغبات والمفضلة | `pages/WishlistPage.jsx` | `GET /wishlists/my`<br>`POST /wishlists/add/{productId}`<br>`DELETE /wishlists/remove/{productId}` |
| **عضو 8** | الدفع وتتبع الطلبات | `pages/CheckoutPage.jsx`, `pages/OrdersPage.jsx` | `POST /orders`<br>`GET /orders/my`<br>`PATCH /orders/my/{id}/cancel` |
| **عضو 9** | الملف الشخصي والعناوين | `pages/ProfilePage.jsx` | `GET /auth/me`<br>`PUT /users/{id}` |

---

## 🚀 تشغيل المشروع محلياً

```bash
npm install
npm run dev
```

## 🌿 نظام الفروع (Git Workflow)
```bash
git checkout develop
git checkout -b feature/cart-page-name
# اكتب كودك ثم:
git add .
git commit -m "feat: add cart coupon manual call"
git push origin feature/cart-page-name
# ثم افتح Pull Request لفرع develop على GitHub
```
