"use client";

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#fff8f1] text-[#1d1d1d] pt-16 pb-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* FOOTER CONTENT */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* LOGO + NEWSLETTER */}
          <div className="flex-1">
            {/* ---- LOGO ---- */}
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="DineFine Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h2 className="text-2xl font-bold">DineFine</h2>
            </div>

            <p className="font-semibold mb-4">Subscribe Our Newsletter</p>

            <div className="flex items-center gap-2 mb-6 max-w-xs">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#f4b400]"
              />
              <button className="bg-[#f4b400] text-white rounded-full p-2 hover:bg-[#e3a800] transition">
                ➜
              </button>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 hover:bg-[#f4b400] hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 hover:bg-[#f4b400] hover:text-white transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 hover:bg-[#f4b400] hover:text-white transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 hover:bg-[#f4b400] hover:text-white transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* FOOTER LINKS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full lg:w-auto">
            <div>
              <h3 className="font-bold mb-4">Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#">Online Order</a>
                </li>
                <li>
                  <a href="#">Pre-Reservation</a>
                </li>
                <li>
                  <a href="#">24/7 Services</a>
                </li>
                <li>
                  <a href="#">Foodie Place</a>
                </li>
                <li>
                  <a href="#">Super Chefs</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/menu">Menu</Link>
                </li>
                <li>
                  <Link href="/reviews">Reviews</Link>
                </li>
                <li>
                  <Link href="/blog">Blogs</Link>
                </li>
                <li>
                  <Link href="/reservation">Reserve Table</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#">Our Story</a>
                </li>
                <li>
                  <a href="#">Benefits</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
                <li>
                  <a href="#">Our Chefs</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} DineFine. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
