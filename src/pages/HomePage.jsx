import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import { useToast } from '../context/ToastContext';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { success, error: toastError, info } = useToast();

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://e-commerce-api-3wara.vercel.app/products', {
        params: { limit: 8 },
      });
      setProducts(response.data.products || []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load products';
      setError(msg);
      toastError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    info(`Added "${product.name}" to cart`);
  };

  const handleToggleWishlist = (product) => {
    success(`Toggled wishlist for "${product.name}"`);
  };

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Summer Deals 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Discover Quality Electronics & Essentials
          </h1>

          <p className="text-sm sm:text-base text-primary-100 leading-relaxed">
            Upgrade your daily lifestyle with top-tier gadgets, sound systems, and accessories delivered directly to your doorstep.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/products">
              <Button variant="secondary" size="lg" icon={ArrowRight}>
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Hand-picked selection of top selling items
            </p>
          </div>

          <Link to="/products">
            <Button variant="ghost" size="sm" icon={ArrowRight}>
              View All
            </Button>
          </Link>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs">
            {error}
          </div>
        )}

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

        {!loading && !error && products.length === 0 && (
          <div className="p-12 text-center text-sm text-slate-500">
            No products available at the moment.
          </div>
        )}
      </section>
    </div>
  );
}
