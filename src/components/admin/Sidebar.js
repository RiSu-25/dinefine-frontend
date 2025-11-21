"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { RxDashboard } from "react-icons/rx";
import { MdRestaurantMenu, MdRateReview } from "react-icons/md";
import { IoMdCalendar, IoMdAddCircle } from "react-icons/io";
import { BsCashCoin } from "react-icons/bs";
import { FaBloggerB, FaEnvelope } from "react-icons/fa";
import { FiLogOut, FiMenu } from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Auto collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <RxDashboard />, href: "/admin/dashboard" },
    { name: "Menu", icon: <MdRestaurantMenu />, href: "/admin/menu" },
    { name: "Reservations", icon: <IoMdCalendar />, href: "/admin/reservations" },
    { name: "Reviews", icon: <MdRateReview />, href: "/admin/reviews" },
    { name: "Finance", icon: <BsCashCoin />, href: "/admin/finance" },
    { name: "Blog", icon: <FaBloggerB />, href: "/admin/blog" },
    { name: "Contacts", icon: <FaEnvelope />, href: "/admin/contacts" },
    { name: "Add Item", icon: <IoMdAddCircle />, href: "/admin/menu" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/admin/login");
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen flex flex-col justify-between transition-all duration-300 shadow-md`}
      style={{
        background: "linear-gradient(180deg, #E3F2F1 0%, #CBE9E8 100%)",
      }}
    >
      {/* Logo + Toggle */}
      <div>
        <div className="flex items-center justify-between p-5 mb-4">
          <h1 className={`text-xl font-bold ${!isOpen && "hidden"} md:block`}>
            <span className="text-black">Dine</span>
            <span className="text-[#00979E]">Fine</span>
          </h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiMenu className="text-[#117D85] text-xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-[#117D85] hover:text-[#009BA8]"
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #009BA8 0%, #007C88 100%)"
                    : "transparent",
                  boxShadow: isActive ? "0px 2px 6px rgba(0,0,0,0.15)" : "none",
                }}
              >
                <span
                  className={`text-xl transition-all ${
                    isActive
                      ? "text-white"
                      : "text-[#117D85] group-hover:text-[#009BA8]"
                  }`}
                >
                  {item.icon}
                </span>

                <span className={`${!isOpen && "hidden"} text-sm`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="my-4 mx-4" style={{ borderTop: "1px solid #D6E8E8" }}></div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-[#D6E8E8]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-[#117D85] hover:text-red-600 hover:bg-red-50 w-full px-3 py-2 rounded-xl transition-all"
        >
          <FiLogOut />
          <span className={`${!isOpen && "hidden"} text-sm font-medium`}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
