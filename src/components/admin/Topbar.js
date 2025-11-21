"use client";
import { FiBell, FiSearch } from "react-icons/fi";
import { MdFrontHand } from "react-icons/md";
import Image from "next/image";

export default function Topbar() {
  return (
    <header
      className="flex items-center justify-between px-4 sm:px-6 py-3 rounded-t-2xl shadow-md border-b backdrop-blur-md
      transition-all duration-300"
      style={{
        background:
          "linear-gradient(90deg, rgba(227, 242, 241, 0.85) 0%, rgba(203, 233, 232, 0.85) 100%)",
        borderColor: "rgba(214, 232, 232, 0.7)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* --- Left Section --- */}
      <div className="flex items-center gap-2">
        {/* ✅ Desktop text */}
        <h2 className="hidden sm:flex text-[#015d62] text-lg font-medium items-center gap-2">
          Welcome back,{" "}
          <span className="font-semibold text-[#00979E]">Andrea</span>
          <MdFrontHand className="text-xl text-yellow-500 animate-wave" />
        </h2>

        {/* ✅ Mobile text (compact & single line) */}
        <h2 className="flex sm:hidden text-[#015d62] text-base font-medium items-center gap-1 truncate">
          Hi, <span className="font-semibold text-[#00979E]">Andrea</span>
          <MdFrontHand className="text-lg text-yellow-500 animate-wave" />
        </h2>
      </div>

      {/* --- Right Section --- */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Search Icon */}
        <button className="p-2 rounded-full hover:bg-[#D6E8E8]/60 transition">
          <FiSearch className="text-[#117D85] text-lg sm:text-xl" />
        </button>

        {/* Notification Icon */}
        <button className="p-2 rounded-full hover:bg-[#D6E8E8]/60 transition relative">
          <FiBell className="text-[#117D85] text-lg sm:text-xl" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Image only on mobile (hide text) */}
        <div className="flex items-center gap-2">
          <Image
            src="/avatar.png"
            alt="Admin Profile"
            width={32}
            height={32}
            className="rounded-full border border-[#CBE9E8]"
          />
          {/* Hide name on small screens */}
          <div className="hidden md:flex flex-col leading-tight">
            <p className="text-sm font-semibold text-[#117D85]">Andrea Pirlo</p>
            <p className="text-xs text-[#333333]">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
