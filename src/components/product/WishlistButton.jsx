import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://e-commerce-api-3wara.vercel.app/wishlists';

export default function WishlistButton({ productId }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${API}/my`, config)
      .then((res) => {
        const list = res.data.wishlist?.products || res.data.products || res.data.items || [];
        const ids = list.map((i) => i.product?._id || i.product || i._id || i);
        setLiked(ids.includes(productId));
      })
      .catch((err) => console.log(err));
  }, [productId]);

  async function toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      alert('Please log in first');
      return;
    }
    setLoading(true);
    try {
      if (liked) {
        await axios.delete(`${API}/remove/${productId}`, config);
      } else {
        await axios.post(`${API}/add/${productId}`, {}, config);
      }
      setLiked(!liked);
    } catch (err) {
      console.log(err);
      alert('Something went wrong, please try again');
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label="Toggle wishlist"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:scale-110 disabled:opacity-50"
    >
      <svg
        viewBox="0 0 24 24"
        strokeWidth="2"
        className={`h-5 w-5 ${liked ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-600'}`}
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    </button>
  );
}