"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

const API_BASE = "http://localhost:5000"; // change when deployed

// STATIC hero images per section
const heroImages = {
  Starters: "/images/heroImg/starter.jpg",
  Dishes: "/images/heroImg/dishes.jpg",
  Snacks: "/images/heroImg/snacks.jpg",
  Desserts: "/images/heroImg/desert.jpg",
  Beverages: "/images/heroImg/juice.png",
};

export default function MenuPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [menuData, setMenuData] = useState([]);
  const [sections, setSections] = useState([]);

  // Fetch from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/menu`);
        const data = await res.json();

        // Group by category
        const grouped = {};

        data.forEach((item) => {
          if (!grouped[item.category]) {
            grouped[item.category] = {
              key: item.category.toLowerCase(),
              title: item.category,
              heroImg: heroImages[item.category], // STATIC hero images
              items: [],
            };
          }

          grouped[item.category].items.push({
            id: item.id,
            name: item.name,
            price: item.price,
            desc: item.description,
            img: item.imageUrl?.startsWith("http")
              ? item.imageUrl
              : `${API_BASE}${item.imageUrl}`,
          });
        });

        setSections(Object.values(grouped));
        setMenuData(data);
      } catch (err) {
        console.log("Error loading menu:", err);
      }
    };

    fetchMenu();
  }, []);

  // Apply search filter
  const filteredSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      {/* ===== Hero Section ===== */}
      <div
        className="relative h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/menu-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Our <span className="text-[#f8b71e]">Menu</span>
          </h1>
        </div>
      </div>

      {/* ===== Subtitle Section ===== */}
      <div className="text-center py-10 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1d]">
          Timeless <span className="text-[#f8b71e]">Culinary Delights</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Discover our chef-crafted menu — handcrafted flavors using fresh
          ingredients for every taste. From starters to desserts, every dish is
          made to perfection to give you a delightful experience.
        </p>
      </div>

      {/* ---------- MENU SECTION ---------- */}
      <section className="bg-[#ffffff] py-12 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-20 font-poppins">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            {filteredSections.length > 0 ? (
              filteredSections.map((section, idx) => (
                <section
                  key={section.key}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  {/* LEFT IMAGE SECTION (even index) */}
                  {idx % 2 === 0 ? (
                    <>
                      <div className="flex justify-end">
                        <div className="relative w-full max-w-lg h-72 lg:h-96 overflow-hidden rounded-tl-[120px] rounded-br-[40px]">
                          <Image
                            src={section.heroImg}
                            alt={section.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="inline-block mb-6">
                          <span className="px-4 py-2 bg-[#f8b71e] text-white text-sm font-semibold rounded-sm">
                            {section.title}
                          </span>
                        </div>

                        <div className="space-y-6">
                          {section.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 md:gap-6 border-b pb-4"
                            >
                              <div className="flex-shrink-0 relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
                                <Image
                                  src={item.img}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-4">
                                  <h3 className="text-base md:text-lg font-semibold text-[#1d1d1d]">
                                    {item.name}
                                  </h3>
                                  <span className="text-sm md:text-base font-bold">
                                    ${item.price.toFixed(2)}
                                  </span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-500 mt-1">
                                  {item.desc}
                                </p>
                              </div>
                              <button className="p-2 bg-[#f8b71e] rounded-full text-white hover:bg-[#e3a94b] transition-all">
                                <FiShoppingCart />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* RIGHT IMAGE FOR ODD INDEX */}
                      <div className="order-2 lg:order-1">
                        <div className="inline-block mb-6">
                          <span className="px-4 py-2 bg-[#f8b71e] text-white text-sm font-semibold rounded-sm">
                            {section.title}
                          </span>
                        </div>

                        <div className="space-y-6">
                          {section.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 md:gap-6 border-b pb-4"
                            >
                              <div className="flex-shrink-0 relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
                                <Image
                                  src={item.img}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-4">
                                  <h3 className="text-base md:text-lg font-semibold text-[#1d1d1d]">
                                    {item.name}
                                  </h3>
                                  <span className="text-sm md:text-base font-bold">
                                    ${item.price.toFixed(2)}
                                  </span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-500 mt-1">
                                  {item.desc}
                                </p>
                              </div>
                              <button className="p-2 bg-[#f8b71e] rounded-full text-white hover:bg-[#e3a94b] transition-all">
                                <FiShoppingCart />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="order-1 lg:order-2 flex justify-start">
                        <div className="relative w-full max-w-lg h-72 lg:h-96 overflow-hidden rounded-tr-[120px] rounded-bl-[40px]">
                          <Image
                            src={section.heroImg}
                            alt={section.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </section>
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg mt-10">
                No results found for &quot;{searchQuery}&quot;
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
