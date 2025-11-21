"use client";
import {
  FiTrendingUp,
  FiDollarSign,
  FiStar,
  FiCalendar,
  FiShoppingBag,
} from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";

export default function Dashboard() {
  const cards = [
    {
      title: "Total Orders",
      value: "1,254",
      icon: <FiShoppingBag className="text-white text-2xl" />,
    },
    {
      title: "Total Revenue",
      value: "$82,450",
      icon: <FiDollarSign className="text-white text-2xl" />,
    },
    {
      title: "Reservations",
      value: "125",
      icon: <FiCalendar className="text-white text-2xl" />,
    },
    {
      title: "Average Rating",
      value: "4.6",
      icon: <FiStar className="text-white text-2xl" />,
    },
    {
      title: "Today's Orders",
      value: "86",
      icon: <FiTrendingUp className="text-white text-2xl" />,
    },
    {
      title: "Popular Dish",
      value: "Margherita Pizza",
      icon: <MdRestaurantMenu className="text-white text-2xl" />,
    },
  ];

  // Temporary Recent Orders Data
  const recentOrders = [
    {
      id: "#1023",
      customer: "John Doe",
      item: "Pasta Alfredo",
      amount: "$18.50",
      status: "Delivered",
    },
    {
      id: "#1024",
      customer: "Sarah Smith",
      item: "Margherita Pizza",
      amount: "$12.00",
      status: "Pending",
    },
    {
      id: "#1025",
      customer: "David Johnson",
      item: "Veg Burger",
      amount: "$10.50",
      status: "Delivered",
    },
    {
      id: "#1026",
      customer: "Emily Clark",
      item: "Cold Coffee",
      amount: "$6.20",
      status: "Cancelled",
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#B4EBE6] to-[#FDCFFA] p-4 sm:p-6 md:p-8 flex flex-col gap-8">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-8">
        {/* ---- Header ---- */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#117D85] flex items-center gap-2">
              <FiTrendingUp className="text-[#00979E]" /> Dashboard
            </h1>
            <p className="text-sm text-[#00979E]">
              Overview of restaurant performance
            </p>
          </div>
        </header>

        {/* ---- Stats Grid ---- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl shadow-md p-5 bg-white/50 hover:bg-white/100 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#117D85]">{card.title}</p>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#007C88] mt-1">
                    {card.value}
                  </h2>
                </div>
                <div
                  className="bg-[#E3F2F1] p-3 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #009BA8 0%, #007C88 100%)",
                  }}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ---- Recent Orders (Glass Table) ---- */}
        <section className="bg-white/50 backdrop-blur-md rounded-2xl shadow-md p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-[#007C88] mb-4 flex items-center gap-2">
            <FiShoppingBag className="text-[#00979E]" /> Recent Orders
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-[#117D85]">
              <thead>
                <tr className="bg-white/60">
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Item</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-white/40 hover:bg-white/70 transition"
                  >
                    <td className="p-3 font-medium">{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3">{order.item}</td>
                    <td className="p-3">{order.amount}</td>
                    <td
                      className={`p-3 font-medium ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
