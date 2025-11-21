"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BlogModal from "@/components/BlogModal";
import { FaHamburger, FaFireAlt, FaLeaf, FaPizzaSlice, FaUtensils, FaCoffee, FaRecycle } from "react-icons/fa";



const API_BASE = "http://localhost:5000"; // change when deployed
const BLOGS_ROUTE = `${API_BASE}/api/blog/`;

/* Optional: assign icons to posts by index (you can tweak logic) */
const icons = [FaHamburger, FaCoffee, FaFireAlt, FaLeaf, FaPizzaSlice, FaUtensils, FaRecycle];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(BLOGS_ROUTE, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Failed to fetch blogs (${res.status})`);
        }
        const data = await res.json();

        // data expected to be an array of blog objects with:
        // id, title, fullContent, imageUrl, createdAt
        // Normalize items and generate description (first 150 chars)
        const normalized = (data || []).map((item, idx) => {
          const full = item.fullContent || "";
          const description = full.length > 150 ? full.slice(0, 150).trim() + "..." : full;
          // handle imageUrl: allow absolute or relative
          let imageUrl = item.imageUrl || "";
          if (imageUrl && imageUrl.startsWith("/")) {
            // prefix with API_BASE (handle leading slash)
            imageUrl = `${API_BASE}${imageUrl}`;
          }
          // choose an icon component
          const IconComp = icons[idx % icons.length] || FaUtensils;
          return {
            id: item.id,
            title: item.title,
            fullContent: full,
            description,
            imageUrl,
            createdAt: item.createdAt,
            IconComp,
          };
        });

        if (mounted) {
          setBlogs(normalized);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          if (err.name !== "AbortError") {
            console.error("Error fetching blogs:", err);
            setError(err.message || "Something went wrong");
            setLoading(false);
          }
        }
      }
    };

    fetchBlogs();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  function formatDate(dateString) {
    if (!dateString) return "";
    try {
      const d = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(d);
    } catch {
      return dateString;
    }
  }

  return (
    <section className="bg-[#fff8f1] min-h-screen font-poppins">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center">
        <Image src="/blog-hero.jpg" alt="Cafe background" fill className="object-cover brightness-75" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00000050] to-[#aca8a4e0]" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">Welcome to Our Blog</h1>
          <p className="text-[#e7a738] text-sm md:text-lg max-w-2xl mx-auto drop-shadow-md">
            Delicious stories, creative recipes, and the people behind DineFine’s most-loved dishes.
          </p>
        </div>
      </div>

      {/* Blog Section */}
      <div className="pt-20 pb-20 px-6 md:px-12 lg:px-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4b3b23] mb-3">Latest from the Kitchen</h2>
          <p className="text-[#6e5a3a] max-w-2xl mx-auto text-sm md:text-base">
            Explore our newest updates — from behind-the-scenes insights to seasonal specialties and kitchen experiments.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Loading blogs…</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">Error loading blogs: {error}</p>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => {
              const Icon = post.IconComp;
              return (
                <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative w-full h-52">
                    <Image
                      src={post.imageUrl || "/blog/blog1.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col justify-between h-[250px]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {Icon ? <Icon className="text-[#c28b2f] text-xl" /> : null}
                        <p className="text-[#c28b2f] text-sm">{formatDate(post.createdAt)}</p>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-[#4b3b23] mb-2 line-clamp-2">{post.title}</h3>

                      <p className="text-[#6e5a3a] text-sm line-clamp-3">{post.description}</p>
                    </div>

                    <button onClick={() => setSelectedPost(post)} className="mt-4 text-[#b89038] font-semibold hover:underline">
                      Read More →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </section>
  );
}
