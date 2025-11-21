"use client";
import { useState, useMemo } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiShoppingBag,
  FiChevronDown,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FinancePage() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Income", title: "Dinner Orders", amount: 12500, date: "Nov 10, 2025" },
    { id: 2, type: "Expense", title: "Staff Salaries", amount: 8000, date: "Nov 09, 2025" },
    { id: 3, type: "Income", title: "Catering Event", amount: 6200, date: "Nov 08, 2025" },
    { id: 4, type: "Expense", title: "Groceries", amount: 3500, date: "Nov 07, 2025" },
  ]);

  const [range, setRange] = useState("Last 7 Days"); // default
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDelete = (id) => setTransactions((t) => t.filter((x) => x.id !== id));

  // summary calculations
  const totalIncome = transactions.filter((t) => t.type === "Income").reduce((a, b) => a + b.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "Expense").reduce((a, b) => a + b.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const summaryCards = [
    { title: "Total Revenue", icon: <FiTrendingUp className="text-green-600 text-xl" />, value: `₹${totalIncome.toLocaleString()}` },
    { title: "Total Expenses", icon: <FiTrendingDown className="text-red-500 text-xl" />, value: `₹${totalExpense.toLocaleString()}` },
    { title: "Net Profit", icon: <FiDollarSign className="text-[#009BA8] text-xl" />, value: `₹${netProfit.toLocaleString()}` },
    { title: "Today's Orders", icon: <FiShoppingBag className="text-[#117D85] text-xl" />, value: "48 Orders" },
  ];

  // mock datasets for different ranges (replace with API data later)
  const chartDataSets = useMemo(() => {
    return {
      "Last 7 Days": [
        { name: "Mon", income: 12000, expense: 7000 },
        { name: "Tue", income: 15000, expense: 8000 },
        { name: "Wed", income: 11000, expense: 9000 },
        { name: "Thu", income: 16000, expense: 9500 },
        { name: "Fri", income: 18000, expense: 10000 },
        { name: "Sat", income: 20000, expense: 12000 },
        { name: "Sun", income: 17500, expense: 8500 },
      ],
      "Last 30 Days": [
        { name: "Week 1", income: 72000, expense: 32000 },
        { name: "Week 2", income: 85000, expense: 39000 },
        { name: "Week 3", income: 78000, expense: 42000 },
        { name: "Week 4", income: 91000, expense: 45000 },
      ],
      "This Year": [
        { name: "Jan", income: 320000, expense: 120000 },
        { name: "Feb", income: 280000, expense: 110000 },
        { name: "Mar", income: 350000, expense: 140000 },
        { name: "Apr", income: 300000, expense: 130000 },
        { name: "May", income: 360000, expense: 150000 },
        { name: "Jun", income: 390000, expense: 160000 },
        { name: "Jul", income: 420000, expense: 170000 },
        { name: "Aug", income: 410000, expense: 165000 },
        { name: "Sep", income: 430000, expense: 180000 },
        { name: "Oct", income: 450000, expense: 190000 },
        { name: "Nov", income: 470000, expense: 200000 },
        { name: "Dec", income: 500000, expense: 220000 },
      ],
    };
  }, []);

  const chartData = chartDataSets[range];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E4F1ED] to-[#D8E8F2] p-6 relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-[#117D85]">Finance Overview</h2>

          {/* Right-aligned stylish dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((s) => !s)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm text-[#117D85] hover:shadow-md transition"
            >
              <span className="text-sm font-medium">{range}</span>
              <FiChevronDown />
            </button>

            {dropdownOpen && (
              <ul
                className="absolute right-0 mt-2 w-44 bg-white/85 backdrop-blur-md rounded-lg shadow-lg border border-white/40 z-50"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                {["Last 7 Days", "Last 30 Days", "This Year"].map((opt) => (
                  <li key={opt}>
                    <button
                      onClick={() => {
                        setRange(opt);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        range === opt ? "bg-[#E3F2F1]" : "hover:bg-[#F6FAFA]"
                      }`}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {summaryCards.map((card, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white/40 backdrop-blur-lg shadow-md border border-white/50 flex flex-col items-start transition hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2 mb-2 text-[#117D85]">
                {card.icon}
                <h3 className="text-sm font-semibold">{card.title}</h3>
              </div>
              <p className="text-xl font-bold text-[#007C88]">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Chart + controls */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#117D85]">Earnings Overview</h3>
            <div className="text-sm text-gray-500">Showing: <span className="text-[#117D85] font-medium ml-1">{range}</span></div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,125,133,0.12)" />
                <XAxis dataKey="name" stroke="#117D85" />
                <YAxis stroke="#117D85" />
                <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="income" stroke="#009BA8" strokeWidth={3} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={3} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions table (desktop) */}
        <div className="hidden md:block bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 shadow-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#E4F1ED]/60 text-[#117D85]">
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Date</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-white/30 hover:bg-white/20 transition">
                  <td className="p-4 font-medium text-gray-800">{t.title}</td>
                  <td className={`p-4 font-medium ${t.type === "Income" ? "text-green-600" : "text-red-500"}`}>{t.type}</td>
                  <td className="p-4 text-gray-800">₹{t.amount.toLocaleString()}</td>
                  <td className="p-4 text-gray-500">{t.date}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button className="p-2 bg-teal-100 hover:bg-teal-200 rounded-full text-[#117D85]"><FiEdit2 /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-4 md:hidden">
          {transactions.map((t) => (
            <div key={t.id} className="bg-white/40 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[#117D85]">{t.title}</h3>
                <span className={`text-sm font-medium ${t.type === "Income" ? "text-green-600" : "text-red-500"}`}>{t.type}</span>
              </div>
              <p className="text-gray-800 font-semibold mb-1">₹{t.amount.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mb-3">{t.date}</p>
              <div className="flex justify-end gap-2">
                <button className="p-2 bg-teal-100 hover:bg-teal-200 rounded-full text-[#117D85]"><FiEdit2 /></button>
                <button onClick={() => handleDelete(t.id)} className="p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600"><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
