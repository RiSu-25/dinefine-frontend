"use client";

import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
    message: "",
  });

  const [successModal, setSuccessModal] = useState(false); // ✅ MODAL STATE

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ===== SUBMIT RESERVATION =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessModal(true); // ✅ SHOW MODAL INSTEAD OF ALERT
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: "",
          date: "",
          time: "",
          message: "",
        });
      } else {
        alert("Error: " + (data.error || "Something went wrong"));
      }
    } catch (error) {
      console.error(error);
      alert("Server not reachable. Make sure backend is running.");
    }
  };

  return (
    <>
      {/* ============================
         SUCCESS MODAL
      ============================= */}
      {successModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-xl border border-[#f8b71e]">
            {/* Close Button */}
            <button
              onClick={() => setSuccessModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black transition"
            >
              <FiX size={24} />
            </button>

            <h2 className="text-2xl font-bold text-[#4b3b23] text-center mb-3">
              Reservation Successful!
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Your table has been reserved. We’ll contact you shortly for
              confirmation.
            </p>

            <button
              onClick={() => setSuccessModal(false)}
              className="bg-[#f8b71e] hover:bg-[#eaa300] text-[#4b3b23] font-semibold py-3 px-10 rounded-full block mx-auto transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ============================
             ORIGINAL PAGE (UNCHANGED)
      ============================= */}
      <section className="bg-white font-poppins">
        {/* HERO */}
        <div
          className="relative h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('/reserve-bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Book a Table</h1>
            <p className="text-sm md:text-base text-[#f8b71e] max-w-2xl mx-auto">
              We invite you to indulge in an exceptional dining experience.
            </p>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="relative py-24 px-6 md:px-12 lg:px-24">
          <h1 className="absolute top-12 left-1/2 -translate-x-1/2 text-[70px] md:text-[110px] font-bold text-[#f3eee6] opacity-40 select-none tracking-widest text-center">
            RESERVE A TABLE
          </h1>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h4 className="text-sm uppercase tracking-[4px] text-[#c46c09] font-semibold mb-3">
                Reserve a Table
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-[#4b3b23]">
                Dine With Us –{" "}
                <span className="text-[#d45a00]">Reserve Now</span>
              </h2>
            </div>

            {/* FORM + CARD */}
            <div className="grid lg:grid-cols-2 gap-10 items-stretch">
              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#f9f6f1] border-none rounded-md"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#f9f6f1] border-none rounded-md"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#f9f6f1] border-none rounded-md"
                  />
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#f9f6f1] border-none rounded-md"
                  >
                    <option value="">Number of Guests *</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#f9f6f1] border-none rounded-md"
                  />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#f9f6f1] border-none rounded-md"
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Special Requests"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#f9f6f1] border-none rounded-md"
                ></textarea>

                <button
                  type="submit"
                  className="bg-[#f8b71e] hover:bg-[#eaa300] text-[#4b3b23] font-semibold py-3 px-10 rounded-full transition"
                >
                  Book a Table
                </button>
              </form>

              {/* INFO CARD */}
              <div
                className="bg-black/70 text-white rounded-3xl p-8 lg:p-10 flex flex-col justify-between shadow-lg"
                style={{
                  backgroundImage: "url('/pattern-bg.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-1">Address</h3>
                  <p className="text-sm text-gray-300 mb-6">
                    2464 Royal Ln. Mesa, New Jersey 45463
                  </p>

                  <h3 className="text-lg font-semibold mb-1">Contact</h3>
                  <p className="text-sm text-gray-300 mb-6">
                    Phone: +0123-456-789 <br />
                    Email: dinefine@gmail.com
                  </p>

                  <h3 className="text-lg font-semibold mb-1">Open Time</h3>
                  <p className="text-sm text-gray-300 mb-6">
                    Mon–Fri : 11:00 AM – 10:00 PM <br />
                    Sat–Sun : 09:00 AM – 11:00 PM
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
                  <div className="flex space-x-4">
                    {[FaFacebookF, FaInstagram, FaPinterestP, FaYoutube].map(
                      (Icon, i) => (
                        <a
                          key={i}
                          href="#"
                          className="bg-[#f8b71e] hover:bg-[#eaa300] p-2.5 rounded-full transition"
                        >
                          <Icon className="text-[#4b3b23]" />
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
