"use client";

import Image from "next/image";
import Link from "next/link";

export default function Reservation() {
  return (
    <section className="bg-[#fff8f1] py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="text-center lg:text-left lg:w-1/2 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1d] leading-snug">
            Do You Have Any Dinner Plan Today?{" "}
            <br className="hidden sm:block" />
            <span className="text-[#000000]">Reserve Your Table</span>
          </h2>

          <p className="text-[#4b4b4b] text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
            Make online reservations, read restaurant reviews from diners, and
            earn points towards free meals. OpenTable is a real-time online
            reservation.
          </p>

          <Link href="/reservation">
            <button className="bg-[#ffcc80] text-[#1d1d1d] font-semibold rounded-full px-6 py-3 shadow-md hover:shadow-lg hover:bg-[#ffb84d] transition duration-300">
              Make Reservation
            </button>
          </Link>
        </div>

        {/* RIGHT SIDE - IMAGE WITH CIRCULAR PATTERN BACKGROUND */}
        <div className="relative flex justify-center items-center w-full lg:w-1/2">
          {/* Circle background using conic-gradient */}
          <div
            className="absolute w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full flex items-center justify-center"
            style={{
              background: `
                conic-gradient(
                  #ffe0d1 0deg 50deg,
                  white 50deg 60deg,
                  #ffe0d1 60deg 110deg,
                  white 110deg 120deg,
                  #ffe0d1 120deg 170deg,
                  white 170deg 180deg,
                  #ffe0d1 180deg 230deg,
                  white 230deg 240deg,
                  #ffe0d1 240deg 290deg,
                  white 290deg 300deg,
                  #ffe0d1 300deg 350deg,
                  white 350deg 360deg
                )
              `,
            }}
          ></div>

          {/* Food Image */}
          <Image
            src="/homeImg.png" // replace with your actual image path
            alt="Dinner Bowl"
            width={240}
            height={240}
            className="relative z-10 rounded-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
