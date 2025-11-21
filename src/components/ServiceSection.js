"use client";

import Image from "next/image";
import {
  FaShoppingCart,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegBuilding,
  FaRegCheckCircle,
  FaUserTie,
} from "react-icons/fa";
import Link from "next/link";


export default function ServiceSection() {
  return (
    <section className="bg-[#fff8f1] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* LEFT SIDE - CHEF IMAGE */}
        <div className="relative flex justify-center w-full lg:w-1/2">
          {/* Chef image */}
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden">
            <Image
              src="/about-chef.png"
              alt="Chef"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating decorative images */}
          <Image
            src="/veggies.png"
            alt="Veggies"
            width={100}
            height={100}
            className="absolute -top-6 right-6 sm:right-10"
          />
          <Image
            src="/paneer.png"
            alt="Paneer"
            width={100}
            height={80}
            className="absolute -bottom-6 left-4 sm:left-0"
          />
        </div>

        {/* RIGHT SIDE - TEXT CONTENT */}
        <div className="text-center lg:text-left lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            We Are More Than <br /> Multiple Service
          </h2>

          <p className="text-gray-600 max-w-md mx-auto lg:mx-0">
            This is a type of restaurant which typically serves food and drinks,
            in addition to light refreshments such as baked goods or snacks. The
            term comes from the French word meaning food.
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-2 gap-6 text-left justify-items-center lg:justify-items-start">
            <ServiceItem
              icon={<FaShoppingCart />}
              title="Online Order"
              className="text-[#7ec0f0] text-[22px]"
            />
            <ServiceItem
              icon={<FaRegCalendarAlt />}
              title="Pre-Reservation"
              className="text-[#f2b5a6] text-[22px]"
            />
            <ServiceItem
              icon={<FaRegClock />}
              title="24/7 Service"
              className="text-[#f4a261] text-[22px]"
            />
            <ServiceItem
              icon={<FaRegBuilding />}
              title="Organized Foodie Place"
              className="text-[#ecd276] text-[22px]"
            />
            <ServiceItem
              icon={<FaRegCheckCircle />}
              title="Clean Kitchen"
              className="text-[#a9d18e] text-[22px]"
            />
            <ServiceItem
              icon={<FaUserTie />}
              title="Super Chefs"
              className="text-[#f96d80] text-[22px]"
            />
          </div>

          {/* Button */}
          <Link href="/about">
            <button className="mt-4 px-6 py-3 bg-[#e3a94b] text-[#453318] font-semibold rounded-full shadow-md hover:bg-[#d7942b] transition duration-300">
              About Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Subcomponent for service items
function ServiceItem({ icon, title, className }) {
  return (
    <div className="flex items-center gap-3 text-gray-700">
      <span className={className}>{icon}</span>
      <p className="font-medium text-sm">{title}</p>
    </div>
  );
}
