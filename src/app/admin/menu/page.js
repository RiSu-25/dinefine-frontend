"use client";
import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiImage,
  FiStar,
} from "react-icons/fi";

const API_BASE = "http://localhost:5000"; // change when deployed

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const emptyDish = {
    name: "",
    category: "",
    price: "",
    status: "Available",
    description: "",
    imageFile: null,
    imagePreview: "",
    isPopular: false, // ⭐ added
  };

  const [newDish, setNewDish] = useState(emptyDish);
  const [editDish, setEditDish] = useState(null);
  const [deleteDish, setDeleteDish] = useState(null);

  // Fetch menu items from backend
  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/menu`);
      const data = await res.json();

      const normalized = data.map((it) => ({
        id: it.id,
        name: it.name,
        category: it.category || "",
        price: `$${parseFloat(it.price).toFixed(2)}`,
        status: it.status || "Available",
        description: it.description || "",
        image: it.imageUrl
          ? it.imageUrl.startsWith("http")
            ? it.imageUrl
            : `${API_BASE}${it.imageUrl}`
          : "",
        isPopular: it.isPopular || false, // ⭐ added
      }));

      setMenuItems(normalized);
    } catch (err) {
      console.error("Failed to fetch menu", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Input change handler
  const handleInputChange = (e, type = "new") => {
    const { name, value, checked, files } = e.target;

    // Handle checkbox
    if (name === "isPopular") {
      if (type === "edit") {
        setEditDish((prev) => ({ ...prev, isPopular: checked }));
      } else {
        setNewDish((prev) => ({ ...prev, isPopular: checked }));
      }
      return;
    }

    // Handle image
    if (name === "image") {
      const file = files && files[0] ? files[0] : null;
      const preview = file ? URL.createObjectURL(file) : "";

      if (type === "edit") {
        setEditDish((prev) => ({
          ...prev,
          imageFile: file,
          imagePreview: preview,
        }));
      } else {
        setNewDish((prev) => ({
          ...prev,
          imageFile: file,
          imagePreview: preview,
        }));
      }
      return;
    }

    // Normal text inputs
    if (type === "edit") {
      setEditDish((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewDish((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ADD dish
  const handleAddDish = async () => {
    if (!newDish.name || !newDish.price)
      return alert("Name and price are required");

    try {
      const form = new FormData();

      form.append("name", newDish.name);
      form.append("category", newDish.category);
      form.append("status", newDish.status);
      form.append("description", newDish.description || "");
      form.append("price", parseFloat(newDish.price));
      form.append("isPopular", newDish.isPopular); // ⭐ added

      if (newDish.imageFile) form.append("image", newDish.imageFile);

      const res = await fetch(`${API_BASE}/api/menu`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to add dish");

      await fetchMenu();
      setNewDish(emptyDish);
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add dish");
    }
  };

  // EDIT dish
  const handleEditDish = async () => {
    if (!editDish || !editDish.id) return;

    try {
      const form = new FormData();

      form.append("name", editDish.name);
      form.append("category", editDish.category || "");
      form.append("status", editDish.status || "Available");
      form.append("description", editDish.description || "");
      form.append(
        "price",
        parseFloat(String(editDish.price).replace("$", "") || 0)
      );
      form.append("isPopular", editDish.isPopular); // ⭐ added

      // image logic
      if (editDish.imageFile) {
        form.append("image", editDish.imageFile);
      } else if (editDish.imagePreview) {
        form.append("imageUrl", editDish.imagePreview);
      }

      const res = await fetch(`${API_BASE}/api/menu/${editDish.id}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to update dish");

      await fetchMenu();
      setEditDish(null);
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update dish");
    }
  };

  // DELETE dish
  const handleDeleteDish = async () => {
    if (!deleteDish) return;
    try {
      const res = await fetch(`${API_BASE}/api/menu/${deleteDish.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      await fetchMenu();
      setDeleteDish(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete dish");
    }
  };

  // Open edit
  const openEditModal = (item) => {
    setEditDish({
      id: item.id,
      name: item.name,
      category: item.category || "",
      price: item.price.replace("$", ""),
      status: item.status || "Available",
      description: item.description || "",
      isPopular: item.isPopular || false, // ⭐ added
      imageFile: null,
      imagePreview: item.image || "",
    });
    setShowEditModal(true);
  };
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#E4F1ED] to-[#D8E8F2] p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#117D85]">
              Menu Management
            </h1>
            <p className="text-sm text-[#00979E]">
              Manage your restaurant’s dishes and availability
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 text-white font-medium px-4 py-2 rounded-xl shadow transition-all hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #009BA8 0%, #007C88 100%)",
            }}
          >
            <FiPlus className="text-white" /> Add New Dish
          </button>
        </header>

        {/* Table */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left bg-[#E3F2F1]/70 text-[#117D85] text-sm uppercase tracking-wide">
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Dish Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    Loading...
                  </td>
                </tr>
              ) : menuItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    No menu items
                  </td>
                </tr>
              ) : (
                menuItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-[#D6E8E8] hover:bg-[#F8FAFA] transition-all"
                  >
                    <td className="px-6 py-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg border border-[#CBE9E8]"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-[#E4F1ED] flex items-center justify-center rounded-lg border border-[#CBE9E8]">
                          <FiImage className="text-[#117D85]" />
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-[#007C88] font-medium flex items-center gap-2">
                      {item.name}
                      {item.isPopular && (
                        <span
                          title="Popular"
                          className="ml-2 inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
                        >
                          <FiStar /> Popular
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-[#117D85]">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-[#117D85]">{item.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.status === "Available"
                            ? "bg-[#CBE9E8] text-[#007C88]"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center gap-4">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-[#009BA8] hover:text-[#007C88] transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteDish(item);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <Modal
          title="Add New Dish"
          onClose={() => {
            setShowAddModal(false);
            setNewDish(emptyDish);
          }}
        >
          <DishForm
            dish={newDish}
            onChange={(e) => handleInputChange(e, "new")}
            onSubmit={handleAddDish}
            onCancel={() => {
              setShowAddModal(false);
              setNewDish(emptyDish);
            }}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && editDish && (
        <Modal
          title="Edit Dish"
          onClose={() => {
            setShowEditModal(false);
            setEditDish(null);
          }}
        >
          <DishForm
            dish={editDish}
            onChange={(e) => handleInputChange(e, "edit")}
            onSubmit={handleEditDish}
            onCancel={() => {
              setShowEditModal(false);
              setEditDish(null);
            }}
          />
        </Modal>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && deleteDish && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-sm p-6 relative border border-[#D6E8E8] text-center">
            <FiX
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-3 right-3 text-[#117D85] hover:text-[#007C88] cursor-pointer"
            />
            <h2 className="text-lg font-semibold text-[#117D85] mb-3">
              Delete Dish
            </h2>
            <p className="text-[#117D85]/80 mb-5">
              Are you sure you want to delete <b>{deleteDish.name}</b>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg text-[#117D85] border border-[#CBE9E8] hover:bg-[#E3F2F1] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDish}
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{
                  background:
                    "linear-gradient(135deg, #E95454 0%, #D13C3C 100%)",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* Modal Component */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#D6E8E8]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#117D85] hover:text-[#007C88] transition"
        >
          <FiX size={20} />
        </button>
        <h2 className="text-xl font-semibold text-[#117D85] mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

/* Dish Form */
function DishForm({ dish, onChange, onSubmit, onCancel }) {
  // allow dish.price to be either number string or formatted with $
  const priceValue = dish.price ? String(dish.price).replace("$", "") : "";

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Dish Name"
        value={dish.name}
        onChange={onChange}
        className="p-2 border border-[#CBE9E8] rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#009BA8]"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={dish.category}
        onChange={onChange}
        className="p-2 border border-[#CBE9E8] rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#009BA8]"
      />

      <input
        type="number"
        name="price"
        placeholder="Price (e.g. 12.00)"
        value={priceValue}
        onChange={onChange}
        className="p-2 border border-[#CBE9E8] rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#009BA8]"
      />

      <select
        name="status"
        value={dish.status}
        onChange={onChange}
        className="p-2 border border-[#CBE9E8] rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#009BA8]"
      >
        <option value="Available">Available</option>
        <option value="Unavailable">Unavailable</option>
      </select>

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={dish.description || ""}
        onChange={onChange}
        className="p-2 border border-[#CBE9E8] rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#009BA8]"
      />

      {/* Popular checkbox */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="isPopular"
          checked={!!dish.isPopular}
          onChange={onChange}
        />
        <span className="text-[#117D85] font-medium">
          Mark as Popular Dish ⭐
        </span>
      </label>

      {/* image */}
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[#117D85] flex items-center gap-2">
          <FiImage /> Food Image
        </span>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={onChange}
          className="p-2 border border-[#CBE9E8] rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#009BA8]"
        />
        {dish.imagePreview ? (
          <img
            src={dish.imagePreview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-lg border border-[#CBE9E8]"
          />
        ) : dish.image ? (
          <img
            src={dish.image}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-lg border border-[#CBE9E8]"
          />
        ) : null}
      </label>

      <div className="flex justify-end gap-3 mt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-[#117D85] border border-[#CBE9E8] hover:bg-[#E3F2F1] transition"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded-lg text-white font-medium"
          style={{
            background: "linear-gradient(135deg, #009BA8 0%, #007C88 100%)",
          }}
        >
          Save Dish
        </button>
      </div>
    </div>
  );
}
