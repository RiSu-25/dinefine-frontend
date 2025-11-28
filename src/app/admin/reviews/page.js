"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

const API_BASE = "http://localhost:5000"; // change on deploy

// 🔥 FIXED: handles Cloudinary + local image URLs
const getImageUrl = (img) => {
  if (!img) return "/customer/default-user.png";

  if (img.startsWith("http")) return img; // Cloudinary URL

  return `${API_BASE}/uploads/${img}`; // old local uploads
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FETCH REVIEWS
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // DELETE REVIEW
  const confirmDelete = async () => {
    try {
      await fetch(`${API_BASE}/api/reviews/${deleteId}`, {
        method: "DELETE",
      });

      setReviews((prev) => prev.filter((r) => r.id !== deleteId));
      setIsModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.log("Error deleting:", error);
    }
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    return (
      <div className="flex text-[#FFD700]">
        {Array.from({ length: full }).map((_, i) => (
          <FaStar key={i} />
        ))}
        {half && <FaStarHalfAlt />}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E4F1ED] to-[#D8E8F2] p-6 relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm -z-10" />

      <div className="max-w-6xl mx-auto bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/40">
        <h2 className="text-2xl font-semibold text-[#117D85] mb-6">
          Customer Reviews
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="text-left bg-[#E4F1ED]/60 text-[#117D85]">
                <th className="p-3 rounded-tl-lg">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Comment</th>
                <th className="p-3 rounded-tr-lg text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className="border-b border-white/30 hover:bg-white/20 transition"
                >
                  <td className="p-3">
                    <Image
                      src={getImageUrl(review.img)}
                      alt="User"
                      width={45}
                      height={45}
                      className="rounded-full object-cover"
                    />
                  </td>

                  <td className="p-3 font-medium text-gray-800">
                    {review.name}
                  </td>

                  <td className="p-3 text-gray-600">{review.date}</td>

                  <td className="p-3">{renderStars(review.rating)}</td>

                  <td className="p-3 text-gray-700">{review.text}</td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        setDeleteId(review.id);
                        setIsModalOpen(true);
                      }}
                      className="p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 md:hidden">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white/40 backdrop-blur-md rounded-lg p-3 border border-white/30 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Image
                    src={getImageUrl(review.img)}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-[#117D85] text-sm leading-tight">
                      {review.name}
                    </h3>
                    <span className="text-[10px] text-gray-500">
                      {review.date}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setDeleteId(review.id);
                    setIsModalOpen(true);
                  }}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600 transition"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

              <div className="mb-1">{renderStars(review.rating)}</div>

              <p className="text-gray-700 text-xs leading-snug line-clamp-5">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-5">
              Are you sure you want to delete this review?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
