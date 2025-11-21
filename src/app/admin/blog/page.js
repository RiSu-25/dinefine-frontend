// src/app/admin/blog/page.js
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const API_BASE = "http://localhost:5000"; // change when deployed

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const emptyForm = { id: null, title: "", fullContent: "", imageFile: null, imagePreview: "", date: "" };
  const [formData, setFormData] = useState(emptyForm);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/blog`);
      const data = await res.json();

      const normalized = data.map(b => ({
        ...b,
        image: b.imageUrl ? (b.imageUrl.startsWith("http") ? b.imageUrl : `${API_BASE}${b.imageUrl}`) : "",
        date: new Date(b.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      }));

      setBlogs(normalized);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setFormData({ ...emptyForm });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (blog) => {
    setFormData({
      id: blog.id,
      title: blog.title || "",
      fullContent: blog.fullContent || "",
      imageFile: null,
      imagePreview: blog.image || "",
      date: blog.date || "",
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file, imagePreview: URL.createObjectURL(file) }));
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.title) return alert("Title is required");

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("fullContent", formData.fullContent);

      if (formData.imageFile) {
        fd.append("image", formData.imageFile);
      }

      let res;
      if (isEditMode && formData.id) {
        res = await fetch(`${API_BASE}/api/blog/${formData.id}`, {
          method: "PUT",
          body: fd
        });
      } else {
        res = await fetch(`${API_BASE}/api/blog`, {
          method: "POST",
          body: fd
        });
      }

      if (!res.ok) throw new Error("Request failed");
      await fetchBlogs();
      setIsModalOpen(false);
      setFormData(emptyForm);
    } catch (err) {
      console.error(err);
      alert("Failed to save blog");
    }
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    try {
      const res = await fetch(`${API_BASE}/api/blog/${blogToDelete.id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Delete failed");

      await fetchBlogs();
      setIsDeleteModalOpen(false);
      setBlogToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E4F1ED] to-[#D8E8F2] p-6">
      {/* --- NO UI CHANGES BELOW THIS LINE --- */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#117D85]">Blog Management</h1>
        <button onClick={openAddModal} className="bg-[#009BA8] hover:bg-[#007C88] text-white px-5 py-2 rounded-lg shadow-md transition">
          + Add Blog
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div>Loading...</div>
        ) : blogs.length === 0 ? (
          <div>No blogs</div>
        ) : blogs.map(blog => (
          <div key={blog.id} className="backdrop-blur-md bg-white/40 rounded-xl shadow-md overflow-hidden border border-white/30">
            <div className="relative w-full h-48">
              {blog.image ? (
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">No image</div>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm text-[#009BA8] font-medium mb-1">{blog.date}</p>
              <h2 className="text-lg font-semibold text-[#117D85] mb-2">{blog.title}</h2>

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setSelectedBlog(blog)} className="text-[#117D85] hover:text-[#009BA8]" title="View"><FaEye /></button>
                <button onClick={() => openEditModal(blog)} className="text-[#009BA8] hover:text-[#007C88]" title="Edit"><FaEdit /></button>
                <button onClick={() => { setBlogToDelete(blog); setIsDeleteModalOpen(true); }} className="text-red-500 hover:text-red-700" title="Delete"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals (unchanged design) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="backdrop-blur-md bg-white/70 border border-white/30 rounded-xl p-6 w-full max-w-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-[#117D85] mb-4">{isEditMode ? "Edit Blog" : "Add Blog"}</h2>
            <div className="flex flex-col gap-3">
              <input name="title" value={formData.title} onChange={handleInput} placeholder="Title" className="p-2 border rounded-lg" />
              <textarea name="fullContent" value={formData.fullContent} onChange={handleInput} placeholder="Full content" rows={8} className="p-2 border rounded-lg" />

              <div>
                <label className="text-sm text-[#117D85] font-medium">Upload Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 w-full text-sm" />
                {formData.imagePreview && (
                  <div className="mt-2 w-28 h-28">
                    <img src={formData.imagePreview} className="object-cover w-full h-full rounded-lg" alt="preview" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => { setIsModalOpen(false); setFormData(emptyForm); }} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 bg-[#009BA8] text-white rounded-lg">{isEditMode ? "Save Changes" : "Add Blog"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedBlog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="backdrop-blur-md bg-white/80 rounded-xl border border-white/30 p-6 w-full max-w-2xl relative">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-[#009BA8]" onClick={() => setSelectedBlog(null)}>✕</button>

            {selectedBlog.image && (
              <img src={selectedBlog.image} className="w-full h-64 object-cover rounded mb-4" alt={selectedBlog.title} />
            )}

            <p className="text-sm text-[#009BA8] mb-1">{selectedBlog.date}</p>
            <h2 className="text-xl font-bold text-[#117D85] mt-1 mb-2">{selectedBlog.title}</h2>
            <div className="text-gray-700 whitespace-pre-wrap">{selectedBlog.fullContent}</div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && blogToDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="backdrop-blur-md bg-white/70 border border-white/30 rounded-xl p-6 w-full max-w-sm text-center shadow-xl">
            <h2 className="text-lg font-semibold text-[#117D85] mb-4">Delete Blog</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete <span className="font-medium text-[#009BA8]">“{blogToDelete.title}”</span>?</p>

            <div className="flex justify-center gap-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
