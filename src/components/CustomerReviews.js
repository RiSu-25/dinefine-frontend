"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  const API_BASE = "https://dinefine-backend-6abd.onrender.com";

  // 🔥 SAFE IMAGE RESOLVER
  const resolveImage = (img) => {
    if (!img) return "/customer/default-user.png";

    if (img.startsWith("http")) return img; // cloudinary or external

    return `${API_BASE}/uploads/${img}`; // local uploads
  };

  // Fetch from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/reviews`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return (
      <section className="bg-[#fff8f1] py-20 text-center text-xl">
        Loading reviews...
      </section>
    );
  }

  const nextReview = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  let visibleReviews = [];

  if (reviews.length <= 3) {
    visibleReviews = reviews;
  } else {
    visibleReviews = [
      reviews[index],
      reviews[(index + 1) % reviews.length],
      reviews[(index + 2) % reviews.length],
    ];
  }

  return (
    <section className="bg-[#fff8f1] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading & Arrows */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1d1d1d]">
            What Our Customer Says?
          </h2>

          {reviews.length > 3 && (
            <div className="flex gap-3">
              <button
                onClick={prevReview}
                className="p-2 border-2 border-[#f8b71e] rounded-full hover:bg-[#f8b71e]"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={nextReview}
                className="p-2 border-2 border-[#f8b71e] rounded-full hover:bg-[#f8b71e]"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>

        {/* Review Cards */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {visibleReviews.map((review, idx) => {
            const imgSrc = resolveImage(review.img);

            return (
              <div
                key={`${review.id}-${idx}`}
                className="bg-[#fff1e1] shadow-sm rounded-2xl p-8 max-w-sm w-full flex flex-col justify-between h-[300px]"
              >
                <p className="text-[#453318] italic mb-6 leading-relaxed">
                  “{review.text}”
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  {/* 🔥 Replaced next/image with normal img (works without config) */}
                  <img
                    src={imgSrc}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-[#1d1d1d]">
                      {review.name}
                    </h3>

                    <div className="text-yellow-500 text-sm">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
