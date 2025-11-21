"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="bg-[#fff8f1] text-gray-800">
      {/* 🔸 HERO SECTION (Parallax Style) */}
      <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/about-hero.jpg"
          alt="Restaurant ambiance"
          fill
          priority
          className="object-cover object-center brightness-[0.6]"
        />

        {/* Overlay Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">
            Our Story
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            A taste of passion, crafted with love at <span className="text-[#e3a94b] font-semibold">DineFine</span>
          </p>
        </motion.div>
      </section>

      {/* 🔸 ABOUT SECTION */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* LEFT SIDE - TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-6 text-center lg:text-left"
          >
            <h2 className="text-4xl font-extrabold text-gray-900">
              About <span className="text-[#e3a94b]">DineFine</span>
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to <strong>DineFine</strong> — where every dish is a
              celebration of taste, creativity, and care. Our journey began
              with a dream to create a cozy space where food lovers could
              enjoy authentic flavors crafted from the finest ingredients.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each meal at DineFine is made with passion by our skilled chefs
              who combine modern techniques with timeless recipes. From
              soulful breakfasts to indulgent desserts, we strive to make
              every bite memorable.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Step inside and let the aroma, ambiance, and artistry of our
              dishes make you feel right at home.
            </p>
          </motion.div>

          {/* RIGHT SIDE - IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative lg:w-1/2 flex justify-center"
          >
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/interior.jpg"
                alt="Restaurant Interior"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔸 MISSION SECTION */}
      <section className="py-20 bg-[#fdf1de] px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Our Mission
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            To create an unforgettable dining experience that connects people
            through good food and warm hospitality. At DineFine, we believe
            that food is more than just taste — it’s emotion, art, and a
            celebration of togetherness.
          </motion.p>

          {/* Image Grid */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { src: "/team.jpg", alt: "Our Team" },
              { src: "/chef.jpg", alt: "Chef at Work" },
              { src: "/serving.jpg", alt: "Serving Customers" },
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="w-64 h-40 relative rounded-xl overflow-hidden shadow-md"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
