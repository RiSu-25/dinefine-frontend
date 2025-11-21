"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiShoppingBag } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About Us", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Reviews", path: "/reviews" }, // anchor link on home page
    { name: "Blog", path: "/blog" },
    { name: "Contacts", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#fffaf2]/90 shadow-md backdrop-blur-sm"
            : "bg-[#fffaf2]/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#4b3b23] font-poppins">
              DineFine
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 font-poppins text-[15px] text-black font-medium">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="hover:text-[#c28b2f] transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link
              href="/reservation"
              className="flex items-center gap-2 bg-[#f8b71e] text-[#453318] font-bold px-5 py-3 rounded-full hover:bg-[#f7b928] transition"
            >
              Reserve Table
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-[#4b3b23]"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 md:hidden z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-yellow-200/30 backdrop-blur-2xl border-l border-white/40 shadow-2xl">
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/30">
            <h2 className="text-lg font-semibold text-[#4b3b23] font-poppins">
              Menu
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-[#4b3b23]"
            >
              <FiX />
            </button>
          </div>

          <div className="flex flex-col space-y-5 px-6 pt-6 font-poppins text-[#4b3b23] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-[#c28b2f] transition"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/reservation"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 bg-[#f8b71e] text-[#453318] font-bold px-4 py-2 rounded-full justify-center hover:bg-[#f7b928] transition mt-4"
            >
              <FiShoppingBag />
              Reserve Table
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
