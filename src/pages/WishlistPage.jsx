import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = 'https://e-commerce-api-3wara.vercel.app/wishlists';

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) {
      setError('Please log in first');
      setLoading(false);
      return;
    }

    axios
      .get(`${API}/my`, config)
      .then((res) => {
        const list = res.data.wishlist?.products || res.data.products || [];
        setItems(list.map((i) => i.product || i));
      })
      .catch((err) => {
        console.log(err);
        setError('Could not load your wishlist');
      })
      .finally(() => setLoading(false));
  }, []);

  async function removeItem(id) {
    try {
      await axios.delete(`${API}/remove/${id}`, config);
      setItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

async function moveToCart(id) {
  try {
    await axios.post(
      'https://e-commerce-api-3wara.vercel.app/carts/items',
      { productId: id, quantity: 1 },
      config
    );
    await removeItem(id);
  } catch (err) {
    console.log(err);
    alert('Could not add this item to your cart');
  }
}

  async function clearAll() {
    if (!window.confirm('Clear your whole wishlist?')) return;
    try {
      await axios.delete(`${API}/clear`, config);
      setItems([]);
    } catch (err) {
      console.log(err);
      alert('Could not clear the wishlist');
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-600">Loading wishlist...</div>;
  if (error) return <div className="p-8 text-center text-red-500 font-medium">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-500">Your wishlist is empty.</p>
          <Link
            to="/shop"
            className="inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-white hover:bg-indigo-700 transition"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, index) => {
            const id = p._id || p.id;
            const name = p.name || p.title || 'Product';
            const image = p.images?.[0]?.url || p.image;

            return (
              <div
                key={`${id}-${index}`}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="bg-gray-100 p-4 flex items-center justify-center">
                  {image ? (
                    <img src={image} alt={name} className="h-64 w-full object-contain" />
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">No image</div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="mb-2 truncate text-sm font-medium text-gray-800" title={name}>{name}</h3>
                  <p className="mb-5 text-base font-bold text-indigo-900">EGP {p.price}</p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveToCart(id)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 transition"
                    >
                      
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(id)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                      title="Remove"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}