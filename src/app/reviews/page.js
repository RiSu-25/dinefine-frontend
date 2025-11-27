"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const API_BASE = "https://dinefine-backend-6abd.onrender.com";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    text: "",
    imgFile: null,
  });
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);

  // ⭐ MODAL STATE
  const [showModal, setShowModal] = useState(false);

  const getImageUrl = (imgValue) => {
  if (!imgValue) return "/customer/default-user.png";

  // If Cloudinary URL → return directly
  if (imgValue.includes("cloudinary")) return imgValue;

  // If it's already a full URL
  if (imgValue.startsWith("http") || imgValue.startsWith("data:")) {
    return imgValue;
  }

  // Otherwise assume local uploads path
  return `${API_BASE}/uploads/${imgValue}`;
};
;

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/reviews`);
      if (!res.ok) return setReviews([]);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, imgFile: file }));
    setPreviewImg(file ? URL.createObjectURL(file) : null);
  };

  // ⭐ SUBMIT REVIEW WITH MODAL
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.rating || !form.text) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("rating", form.rating);
      formData.append("text", form.text);
      if (form.imgFile) formData.append("img", form.imgFile);

      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("Submit error:", res.status);
        alert("Failed to submit review.");
        return;
      }

      await res.json();

      // ⭐ SHOW MODAL (replaces alert)
      setShowModal(true);

      // reset
      setForm({ name: "", rating: 0, text: "", imgFile: null });
      setPreviewImg(null);

      fetchReviews();
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const full = Math.floor(Number(rating) || 0);
    return (
      <div className="flex text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={i < full ? "opacity-100" : "opacity-30"} />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* ⭐ SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-sm text-center shadow-lg">
            <h2 className="text-xl font-semibold text-[#8B4513] mb-3">
              Review Submitted 🎉
            </h2>
            <p className="text-gray-700 mb-6">
              Thank you! Your review has been added successfully.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-[#8B4513] text-white rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ENTIRE ORIGINAL PAGE BELOW — UNCHANGED */}
      <section className="bg-[#fff8f1] min-h-screen mt-10">
        {/* HERO */}
        <div className="text-center py-16 px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#8B4513]">
            Customer Reviews
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Hear what our wonderful guests have to say and share your own
            dining experience at <span className="font-semibold">DineFine</span>.
          </p>
          <div className="mt-8 flex justify-center">
            <Image
              src="/review-hero.jpg"
              alt="Happy Customers"
              width={600}
              height={350}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* ALL REVIEWS */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#8B4513] mb-6 text-center">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.length === 0 && (
              <p className="text-center text-gray-500 col-span-3">
                No reviews yet. Be the first to write one!
              </p>
            )}

            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#fff1e1] shadow-md rounded-2xl p-6 hover:shadow-lg transition flex flex-col justify-between"
              >
                <p className="text-[#453318] italic mb-6 leading-relaxed">
                  “{review.text}”
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <Image
                    src={getImageUrl(review.img)}
                    alt={review.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-[#1d1d1d]">
                      {review.name}
                    </h3>
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORM — UNCHANGED */}
        <div className="bg-[#fdf2e9] py-16 px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#8B4513] mb-6 text-center">
            Write a Review
          </h2>

          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 && "s"}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Write your review..."
              value={form.text}
              onChange={(e) =>
                setForm({ ...form, text: e.target.value })
              }
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            <div>
              <label className="block text-sm font-medium text-[#8B4513] mb-2">
                Upload Image
              </label>

              <input
                id="reviewImage"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />

              <label
                htmlFor="reviewImage"
                className="cursor-pointer inline-flex items-center gap-3 bg-white border border-gray-300 rounded-xl px-4 py-3 hover:bg-[#fff1e6] transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#8B4513]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 16l5-5 4 4 8-8M14 4h6v6"
                  />
                </svg>
                <span className="text-[#8B4513] font-medium">
                  Select Image
                </span>
              </label>

              {previewImg && (
                <Image
                  src={previewImg}
                  alt="preview"
                  className="w-12 h-12 rounded-full object-cover mt-3 border"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B4513] text-white font-semibold py-3 rounded-lg hover:bg-[#a0522d] transition"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
