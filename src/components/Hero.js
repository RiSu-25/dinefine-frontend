"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function Hero() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/menu?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <section className="bg-[#fffaf2] pt-28 pb-16 md:pt-32 mt-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#1d1d1d] font-poppins">
            We Serve The Taste <br />
            You Love{" "}
            <Image
              src="/icons/smile.png"
              alt="Smile Icon"
              width={50}
              height={50}
              className="inline-block ml-2 align-middle object-contain"
              priority
            />
          </h1>

          <p className="text-gray-600 text-xs sm:text-sm md:w-4/5 mx-auto md:mx-0">
            This is a type of restaurant which typically serves food and drinks,
            in addition to light refreshments such as baked goods or snacks. The
            term comes from the French word meaning food.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
            <Link href="/menu">
              <button className="bg-[#f8b71e] text-[#453318] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#f7b928] transition cursor-pointer">
                Explore Food
              </button>
            </Link>

            {/* Search Form inside same button style */}
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 border-2 border-[#f8b71e] px-6 py-3 rounded-full font-semibold text-[#453318] hover:bg-[#f8b71e]/20 transition"
            >
              <FaSearch
                className="cursor-pointer"
                onClick={handleSearch}
              />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none placeholder-[#453318]/60 text-[#453318] font-medium w-20 sm:w-28 md:w-32"
              />
            </form>
          </div>
        </div>

        {/* Right Side (Food Image + Categories + Leaf) */}
        <div className="relative flex-1 flex justify-center md:justify-end items-center">
          {/* Circular Background Rings */}
          <div className="absolute w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#f6e0a9] to-[#fff8ed] hidden md:block blur-3xl"></div>
          <div className="absolute w-[390px] h-[390px] rounded-full border-2 border-[#f4e2b8] hidden md:block"></div>
          <div className="absolute w-[470px] h-[470px] rounded-full border-2 border-[#f4e2b8]/60 hidden md:block"></div>

          {/* Food Plate */}
          <div className="relative w-[280px] sm:w-[360px] md:w-[420px] h-[280px] sm:h-[360px] md:h-[420px] z-10 translate-x-[-40px] md:translate-x-[-70px]">
            <Image
              src="/homeImg.png"
              alt="Food Dish"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>

          {/* Leaf Image */}
          <div className="absolute -top-10 md:-top-18 right-6 md:right-20 w-[80px] md:w-[110px] rotate-290 z-20">
            <Image
              src="/leaf.png"
              alt="Leaf"
              width={80}
              height={90}
              className="object-contain"
            />
          </div>

          {/* Category Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[-80px] md:right-[-100px] flex flex-col space-y-4 z-30">
            {[
              { name: "Dishes", img: "/icons/dish.png" },
              { name: "Dessert", img: "/icons/dessert.png" },
              { name: "Drinks", img: "/icons/drink.png" },
              { name: "Starter", img: "/icons/starters.png" },
              { name: "Snacks", img: "/icons/snack.png" },
            ].map((item, index) => (
              <button
                key={index}
                className="flex items-center gap-3 bg-white shadow-lg px-5 py-2 rounded-full hover:scale-105 transition whitespace-nowrap"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-[#1d1d1d]">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
