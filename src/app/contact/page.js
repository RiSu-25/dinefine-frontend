"use client";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message.");
    }
  };

  return (
    <section className="bg-white pt-32 pb-20 px-6 md:px-12 lg:px-28 font-poppins">
      <div className="text-center mb-14">
        <p className="uppercase tracking-[3px] text-[#c28b2f] text-sm font-semibold">
          Contact Us
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#4b3b23] mt-2">
          Get in <span className="text-[#f8b71e]">Touch with Us</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#4b3b23] text-sm font-semibold mb-2">First Name *</label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Ex. John"
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#f8b71e]"
                />
              </div>

              <div>
                <label className="block text-[#4b3b23] text-sm font-semibold mb-2">Last Name *</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Ex. Doe"
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#f8b71e]"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#4b3b23] text-sm font-semibold mb-2">Email *</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#f8b71e]"
                />
              </div>

              <div>
                <label className="block text-[#4b3b23] text-sm font-semibold mb-2">Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="+91 98765 43210"
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#f8b71e]"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[#4b3b23] text-sm font-semibold mb-2">Subject</label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                type="text"
                placeholder="Enter here..."
                className="w-full border border-gray-200 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#f8b71e]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-[#4b3b23] text-sm font-semibold mb-2">Your Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter here..."
                className="w-full border border-gray-200 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#f8b71e]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#f8b71e] hover:bg-[#eaa300] text-[#4b3b23] font-semibold py-3 px-8 rounded-full transition duration-300 shadow-sm"
            >
              Send a Message
            </button>

            {/* Status */}
            {status && (
              <p
                className={`text-sm text-center mt-3 ${
                  status.includes("success") ? "text-green-600" :
                  status.includes("Sending") ? "text-blue-600" :
                  "text-red-600"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>

        {/* Right Side Image */}
        <div className="relative w-full h-[580px] rounded-xl overflow-hidden">
          <Image src="/contact-cafe.jpg" alt="Contact" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
