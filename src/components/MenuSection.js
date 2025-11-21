"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

// Fixed categories
const categories = [
  "All",
  "Dishes",
  "Desserts",
  "Beverages",
  "Starters",
  "Snacks",
];

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch menu from backend
  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/menu");
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Menu fetch failed", err);
      }
    };
    getMenu();
  }, []);

  // Filter items
  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section className="bg-[#fff8e6] py-14 sm:py-20 px-4 sm:px-10 lg:px-20 font-poppins">
      {/* Section Title */}
      <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1d] mb-10 leading-tight">
        Our Regular <span className="text-[#000000]">Menu Pack</span>
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-full font-medium transition-all duration-300 border ${
              activeCategory === cat
                ? "bg-[#f6c76b] text-white border-[#f6c76b] shadow-md"
                : "bg-white text-[#1d1d1d] border-gray-200 hover:bg-[#f6c76b] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-2 
          md:grid-cols-4 
          lg:grid-cols-4 
          gap-6 
          sm:gap-8 
          transition-all 
          duration-300
        "
      >
        {filteredItems.slice(0, 8).map((item) => (
          <div
            key={item.id}
            className="
              bg-[#fffaf2] 
              p-5 
              sm:p-6 
              rounded-2xl 
              shadow-md 
              hover:shadow-xl 
              transition-all 
              duration-300 
              text-center 
              flex 
              flex-col 
              items-center 
              justify-between
            "
          >
            {/* Image */}
            <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44 mb-4">
              <Image
                src={
                  item.imageUrl?.startsWith("http")
                    ? item.imageUrl
                    : `http://localhost:5000${item.imageUrl}`
                }
                alt={item.name}
                fill
                className="object-contain rounded-xl"
              />
            </div>

            {/* Name */}
            <h3 className="text-base sm:text-lg font-bold text-[#1d1d1d] mb-1 sm:mb-2">
              {item.name}
            </h3>

            {/* Rating */}
            <div className="flex justify-center text-yellow-400 mb-1 text-sm">
              {"★".repeat(5)}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
              {item.description}
            </p>

            {/* Price + Button */}
            <div className="flex flex-wrap items-center justify-between w-full mt-auto gap-2">
              <span className="text-sm sm:text-lg font-semibold text-[#1d1d1d]">
                ${item.price?.toFixed(2)}
              </span>
              <button className="bg-[#f8b71e] p-2 rounded-full hover:bg-[#f7c43d] transition cursor-pointer">
                <FiShoppingCart className="text-white text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MORE BUTTON */}
      <div className="text-center mt-10">
        <Link
          href={`/menu?category=${activeCategory.toLowerCase()}`}
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold bg-[#f6c76b] hover:bg-[#f5b941] text-white rounded-full transition-all duration-300"
        >
          View More
        </Link>
      </div>
    </section>
  );
}
