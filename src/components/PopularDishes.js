"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";

const API_BASE = "https://dinefine-backend-6abd.onrender.com"; // change when deployed

export default function PopularDishes() {
  const scrollRef = useRef(null);
  const [dishes, setDishes] = useState([]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Fetch popular dishes from backend
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        // ✅ Correct API route
        const res = await fetch(`${API_BASE}/api/menu/popular`);
        const data = await res.json();

        const formatted = data.map((dish) => ({
          id: dish.id,
          name: dish.name,
          img: dish.imageUrl?.startsWith("http")
            ? dish.imageUrl
            : `${API_BASE}${dish.imageUrl}`,
          desc: dish.description || "",
          price: parseFloat(dish.price),
          rating: 5, // keeping star design same
        }));

        setDishes(formatted);
      } catch (err) {
        console.log("Error fetching popular dishes:", err);
      }
    };

    fetchPopular();
  }, []);

  return (
    <section className="bg-[#fffaf2] py-20 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1d1d1d]">
            Popular Dishes
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-2 border-2 border-[#f8b71e] text-[#453318] rounded-full hover:bg-[#f8b71e] hover:border-[#f7b928] transition"
            >
              <IoArrowBack size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 border-2 border-[#f8b71e] text-[#453318] rounded-full hover:bg-[#f8b71e] hover:border-[#f7b928] transition"
            >
              <IoArrowForward size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 scroll-smooth select-none pointer-events-auto"
          style={{
            overflowX: "hidden",
            scrollBehavior: "smooth",
          }}
        >
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="min-w-[240px] sm:min-w-[260px] md:min-w-[280px] bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition"
            >
              <div className="w-full h-36 relative mb-4">
                <Image
                  src={dish.img}
                  alt={dish.name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>

              <h3 className="text-lg font-bold text-[#1d1d1d] mb-1">
                {dish.name}
              </h3>

              <div className="flex justify-center mb-2">
                {Array.from({ length: dish.rating }).map((_, i) => (
                  <FaStar key={i} className="text-[#f8b71e]" />
                ))}
              </div>

              <p className="text-gray-500 text-xs mb-4">{dish.desc}</p>

              <div className="flex items-center justify-between px-2">
                <span className="text-[#1d1d1d] font-bold text-base">
                  ₹{dish.price.toFixed(2)}
                </span>

                <button className="bg-[#f8b71e] p-2 rounded-full hover:bg-[#f7c43d] transition cursor-pointer">
                  <FiShoppingCart className="text-white text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
