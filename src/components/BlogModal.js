"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FaTimes, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function BlogModal({ post, onClose }) {

  const BASE_URL = "https://dinefine-backend-6abd.onrender.com";

  // Fix image mapping
  const imageSrc = post.imageUrl?.startsWith("http")
    ? post.imageUrl
    : `${BASE_URL}${post.imageUrl}`;

  // Close on ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#4b3b23] text-2xl hover:text-[#b89038] transition-colors"
        >
          <FaTimes />
        </button>

        {/* Image */}
        <div className="relative w-full h-56 md:h-72">
          <Image
            src={imageSrc}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[#c28b2f] text-sm">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold text-[#4b3b23] mb-3">
            {post.title}
          </h2>

          <p className="text-[#6e5a3a] text-sm md:text-base mb-4 leading-relaxed">
            {post.fullContent}
          </p>

          {/* Social Share */}
          <div className="flex gap-4 mt-4">
            <Link href="#" className="text-[#4b3b23] hover:text-[#c28b2f] text-lg">
              <FaFacebookF />
            </Link>
            <Link href="#" className="text-[#4b3b23] hover:text-[#c28b2f] text-lg">
              <FaInstagram />
            </Link>
            <Link href="#" className="text-[#4b3b23] hover:text-[#c28b2f] text-lg">
              <FaTwitter />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
