import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sparkles, ArrowRight, RefreshCw, Code } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import Modal from '../components/common/Modal';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const { success, error: toastError, info } = useToast();
  const { isAuthenticated, user } = useAuth();

  // =========================================================================
  // 💡 مثال تعليمي للربط اليدوي بالـ API (Manual API Call Example):
  // يمكن لأي عضو نسخ هذا النمط البسيط واستخدامه في صفحته
  // =========================================================================
  const fetchProductsManual = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. الاتصال المباشر بالرابط يدوياً
      const response = await axios.get('https://e-commerce-api-3wara.vercel.app/products', {
        params: { limit: 8 },
      });

      // 2. استخراج البيانات وحفظها في الـ State
      setProducts(response.data.products || []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'فشل جلب المنتجات';
      setError(msg);
      toastError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsManual();
  }, []);

  const handleAddToCart = (product) => {
    info(`Added "${product.name}" to cart (Demo state)`);
  };

  const handleToggleWishlist = (product) => {
    success(`Toggled wishlist for "${product.name}"`);
  };

  return (
    <div className="space-y-12">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Koda Storefront - Ready for Team Work</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Next-Gen E-Commerce Frontend Platform
          </h1>

          <p className="text-sm sm:text-base text-primary-100 leading-relaxed">
            هذا المستودع مخصص لأعضاء فريق المتجر (الأعضاء من 2 إلى 9). يتم الربط بالـ API يدوياً ومباشرة عبر روابط السيرفر في كل صفحة.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsDemoModalOpen(true)}
            >
              عرض مثال كود الربط اليدوي
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white/30 hover:bg-white/10"
              onClick={fetchProductsManual}
              icon={RefreshCw}
              loading={loading}
            >
              تحديث المنتجات يدوياً
            </Button>
          </div>
        </div>

        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      </section>

      {/* Auth Status Banner */}
      <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Auth State: {isAuthenticated ? `مسجل دخول باسم (${user?.email || 'User'})` : 'وضع الزائر (غير مسجل دخول)'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              localStorage.getItem('token') = {localStorage.getItem('token') ? 'موجود ومتصل ✅' : 'null (سجل دخول لتجربة العمليات المحمية)'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => success('نظام التنبيهات يعمل بنجاح!')}
          >
            تجربة إشعار
          </Button>
        </div>
      </section>

      {/* Featured Products Showcase (Live API) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              منتجات حيّة مجلوبة يدوياً من السيرفر
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono">
              GET https://e-commerce-api-3wara.vercel.app/products
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            icon={ArrowRight}
            className="hidden sm:inline-flex"
            onClick={() => info('صفحة الكتالوج')}
          >
            تصفح كل المنتجات
          </Button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs">
            فشل تحميل المنتجات: {error}
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <Skeleton className="w-full aspect-square" />
                <Skeleton className="w-2/3 h-4" />
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-full h-8" />
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </section>

      {/* Code Demo Modal */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="طريقة الربط اليدوي لأعضاء الفريق"
        maxWidth="max-w-xl"
        footer={
          <Button size="sm" onClick={() => setIsDemoModalOpen(false)}>
            فهمت، إغلاق
          </Button>
        }
      >
        <div className="space-y-3 text-xs">
          <p className="font-semibold text-slate-700 dark:text-slate-200">
            لكل عضو: استخدم مكتبة <code>axios</code> مباشرة مع الرابط الكامل:
          </p>
          <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono overflow-x-auto text-[11px] leading-relaxed">
{`import axios from 'axios';

// 1. طلب عادي (GET):
const res = await axios.get('https://e-commerce-api-3wara.vercel.app/products');

// 2. طلب إرسال بيانات (POST):
const res = await axios.post('https://e-commerce-api-3wara.vercel.app/auth/login', {
  email,
  password
});

// 3. طلب محمي بتوكن (مع الترويسات):
const token = localStorage.getItem('token');
const res = await axios.get('https://e-commerce-api-3wara.vercel.app/orders/my', {
  headers: { Authorization: \`Bearer \${token}\` }
});`}
          </pre>
          <p className="text-slate-500">
            يمكنكم مراجعة ملف <code>README.md</code> للحصول على كل تفاصيل المسارات والـ Endpoints.
          </p>
        </div>
      </Modal>
    </div>
  );
}
