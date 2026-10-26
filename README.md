# 🛒 Koda Storefront - متجر العملاء

مستودع واجهة العميل لمتجر **Koda Store**.
هذا المستودع مخصص لأعضاء فريق المتجر (الأعضاء من 2 إلى 9) بقيادة العضو 1 (التيم ليد).

---

## 👥 توزيع المهام داخل هذا الريبو (Storefront Team Tasks)

| العضو | الميزة / الصفحة | الملفات المقترحة | الـ Endpoints المربوطة |
| :--- | :--- | :--- | :--- |
| **عضو 2** | الدخول، التسجيل، و OTP | `pages/auth/Login.jsx`, `Register.jsx`, `VerifyOtp.jsx`, `ForgotPassword.jsx` | `POST /auth/login`<br>`POST /auth/register/send-otp`<br>`POST /auth/register/verify-otp`<br>`POST /auth/forgot-password/send-otp` |
| **عضو 3** | الصفحة الرئيسية والتنقل | `pages/HomePage.jsx`, `components/layout/Navbar.jsx` | `GET /products?featured=true` |
| **عضو 4** | كتالوج المنتجات والبحث | `pages/ShopPage.jsx`, `components/product/FilterSidebar.jsx` | `GET /products`<br>`GET /products/search?q={query}` |
| **عضو 5** | تفاصيل المنتج والتقييمات | `pages/ProductDetailsPage.jsx`, `components/reviews/ReviewsSection.jsx` | `GET /products/{id}`<br>`POST /products/{id}/reviews` |
| **عضو 6** | سلة التسوق والكوبونات | `pages/CartPage.jsx`, `components/cart/CartDrawer.jsx` | `GET /carts`<br>`POST /carts/items`<br>`PATCH /carts/items/{productId}`<br>`POST /carts/coupon` |
| **عضو 7** | قائمة الرغبات والمفضلة | `pages/WishlistPage.jsx` | `GET /wishlists/my`<br>`POST /wishlists/add/{productId}`<br>`DELETE /wishlists/remove/{productId}` |
| **عضو 8** | الدفع وتتبع الطلبات | `pages/CheckoutPage.jsx`, `pages/OrdersPage.jsx`, `pages/OrderDetailsPage.jsx` | `POST /orders`<br>`GET /orders/my`<br>`GET /orders/my/{id}`<br>`PATCH /orders/my/{id}/cancel` |
| **عضو 9** | الملف الشخصي والعناوين | `pages/ProfilePage.jsx`, `components/profile/AddressBook.jsx` | `GET /auth/me`<br>`PUT /users/{id}` |

---

## 🚀 تشغيل المشروع محلياً

```bash
npm install
npm run dev
```
يعمل على: `http://localhost:3000`

## 🌿 نظام الفروع (Git Workflow)
* يتم العمل على فرع `develop`.
* كل عضو ينشئ فرعه الخاص:
  ```bash
  git checkout develop
  git checkout -b feature/cart-page-name
  ```
* عند الانتهاء:
  ```bash
  git add .
  git commit -m "feat: implement cart coupon logic"
  git push origin feature/cart-page-name
  ```
* افتح Pull Request إلى فرع `develop`.
