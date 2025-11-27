"use client";

import { useState, useEffect } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiPlus,
  FiX,
  FiCalendar,
  FiClock,
  FiUser,
  FiUsers,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const API_BASE = "https://dinefine-backend-6abd.onrender.com/api/reservations";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(reservations);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    status: "Pending",
    message: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // 🔥 FETCH FROM BACKEND
  const fetchReservations = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      console.log("❌ Error fetching reservations:", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    setFiltered(
      reservations.filter((r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, reservations]);

  const openAdd = () => {
    setForm(emptyForm);
    setEditing(null);
    setIsAddOpen(true);
  };

  const openEdit = (res) => {
    setEditing(res);
    setForm({ ...res, guests: String(res.guests) });
    setIsEditOpen(true);
  };

  const openDelete = (res) => {
    setDeleting(res);
    setIsDeleteOpen(true);
  };

  const closeAll = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setEditing(null);
    setDeleting(null);
    setForm(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* -------------------------------------------------------
    🔥 ADD RESERVATION → POST /api/reservations
  ------------------------------------------------------- */
  const handleAdd = async () => {
    if (!form.name || !form.email || !form.phone || !form.date || !form.time || !form.guests)
      return;

    try {
      await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests: Number(form.guests) }),
      });

      fetchReservations();
      closeAll();
    } catch (err) {
      console.log("❌ Error adding reservation:", err);
    }
  };

  /* -------------------------------------------------------
    🔥 UPDATE RESERVATION → PUT /api/reservations/:id
  ------------------------------------------------------- */
  const handleUpdate = async () => {
    if (!editing) return;

    try {
      await fetch(`${API_BASE}/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests: Number(form.guests) }),
      });

      fetchReservations();
      closeAll();
    } catch (err) {
      console.log("❌ Error updating reservation:", err);
    }
  };

  /* -------------------------------------------------------
    🔥 DELETE RESERVATION → DELETE /api/reservations/:id
  ------------------------------------------------------- */
  const handleDelete = async () => {
    if (!deleting) return;

    try {
      await fetch(`${API_BASE}/${deleting.id}`, {
        method: "DELETE",
      });

      fetchReservations();
      closeAll();
    } catch (err) {
      console.log("❌ Error deleting reservation:", err);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#E4F1ED] to-[#D8E8F2] p-4 sm:p-6 md:p-8 overflow-x-hidden">
      <div className="absolute inset-0 bg-white/8 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-8">
        {/* --- Header --- */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-3xl font-semibold text-[#117D85]">
              Reservations
            </h1>
            <p className="text-sm text-[#00979E]">Manage table bookings</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <FiSearch className="absolute left-3 top-3 text-[#117D85]" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="pl-10 pr-3 py-2 rounded-lg border border-[#CBE9E8] bg-white/70 text-sm focus:ring-2 focus:ring-[#00979E] focus:outline-none w-full"
              />
            </div>

            <button
              onClick={openAdd}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#009BA8] to-[#007C88] text-white rounded-lg shadow hover:from-[#12b8c4] hover:to-[#00a9ac] transition text-sm sm:text-base"
            >
              <FiPlus /> Add
            </button>
          </div>
        </header>

        {/* --- Table Section (unchanged) --- */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-x-auto border border-[#D6E8E8]">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#E3F2F1] text-[#117D85]">
              <tr>
                <th className="px-4 sm:px-5 py-3">Customer</th>
                <th className="px-4 sm:px-5 py-3">Email</th>
                <th className="px-4 sm:px-5 py-3">Phone</th>
                <th className="px-4 sm:px-5 py-3">Date</th>
                <th className="px-4 sm:px-5 py-3">Time</th>
                <th className="px-4 sm:px-5 py-3">Guests</th>
                <th className="px-4 sm:px-5 py-3">Status</th>
                <th className="px-4 sm:px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No reservations found.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-[#D6E8E8] hover:bg-[#E3F2F1]/60 transition"
                  >
                    <td className="px-4 sm:px-5 py-4 font-medium text-[#333]">
                      {r.name}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-[#117D85]">
                      {r.email}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-[#117D85]">
                      {r.phone}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-[#117D85]">
                      {r.date?.substring(0, 10)}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-[#117D85]">
                      {formatTime(r.time)}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-[#117D85]">
                      {r.guests}
                    </td>
                    <td className="px-4 sm:px-5 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 sm:px-5 py-4 flex items-center justify-center gap-3 text-lg">
                      <button
                        onClick={() => openEdit(r)}
                        className="text-[#117D85] hover:text-[#009BA8] transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => openDelete(r)}
                        className="text-red-500 hover:text-red-600 transition"
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

      {/* --- Modals (unchanged) --- */}
      {isAddOpen && (
        <Modal onClose={closeAll} title="Add Reservation">
          <ReservationForm
            form={form}
            onChange={handleChange}
            onSubmit={handleAdd}
            submitLabel="Create Reservation"
          />
        </Modal>
      )}

      {isEditOpen && (
        <Modal onClose={closeAll} title="Edit Reservation">
          <ReservationForm
            form={form}
            onChange={handleChange}
            onSubmit={handleUpdate}
            submitLabel="Update Reservation"
          />
        </Modal>
      )}

      {isDeleteOpen && deleting && (
        <DeleteModal
          deleting={deleting}
          closeAll={closeAll}
          handleDelete={handleDelete}
        />
      )}
    </main>
  );
}

/* --- Delete Modal --- */
function DeleteModal({ deleting, closeAll, handleDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
      <div className="absolute inset-0 bg-black/40" onClick={closeAll} />
      <div className="relative z-10 w-full max-w-sm bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-[#D6E8E8]">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-[#117D85]">
            Delete Reservation
          </h3>
          <button
            onClick={closeAll}
            className="text-[#117D85] hover:text-[#009BA8]"
          >
            <FiX />
          </button>
        </div>

        <p className="text-sm text-[#333] mt-3">
          Are you sure you want to delete{" "}
          <span className="font-medium text-[#117D85]">{deleting.name}</span>?
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={closeAll}
            className="px-4 py-2 rounded-lg border border-[#CBE9E8] text-[#117D85] hover:bg-[#E3F2F1]"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg text-white"
            style={{
              background: "linear-gradient(135deg,#E95454 0%,#D13C3C 100%)",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- Helpers --- */
function formatTime(t) {
  if (!t) return "";
  const [hh, mm] = t.split(":");
  const hhNum = Number(hh);
  const suffix = hhNum >= 12 ? "PM" : "AM";
  const hh12 = hhNum % 12 === 0 ? 12 : hhNum % 12;
  return `${hh12}:${mm} ${suffix}`;
}

function StatusBadge({ status }) {
  const colors = {
    Confirmed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${colors[status]}`}
    >
      {status}
    </span>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-[#D6E8E8]">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-[#117D85]">{title}</h3>
          <button
            onClick={onClose}
            className="text-[#117D85] hover:text-[#009BA8]"
          >
            <FiX />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function ReservationForm({ form, onChange, onSubmit, submitLabel }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-3"
    >
      <label className="flex items-center gap-2">
        <FiUser className="text-[#117D85]" />
        <input
          name="name"
          placeholder="Customer name"
          value={form.name}
          onChange={onChange}
          className="w-full border border-[#CBE9E8] rounded-lg px-3 py-2 bg:white/70 focus:outline-none focus:ring-2 focus:ring-[#00979E]"
          required
        />
      </label>

      <label className="flex items-center gap-2">
        <FiMail className="text-[#117D85]" />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={onChange}
          className="w-full border border-[#CBE9E8] rounded-lg px-3 py-2 bg:white/70 focus:outline-none focus:ring-2 focus:ring-[#00979E]"
          required
        />
      </label>

      <label className="flex items-center gap-2">
        <FiPhone className="text-[#117D85]" />
        <input
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={onChange}
          className="w-full border border-[#CBE9E8] rounded-lg px-3 py-2 bg:white/70 focus:outline-none focus:ring-2 focus:ring-[#00979E]"
          required
        />
      </label>

      <label className="flex items-center gap-2">
        <FiCalendar className="text-[#117D85]" />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={onChange}
          className="w-full border border-[#CBE9E8] rounded-lg px-3 py-2 bg:white/70 focus:outline-none focus:ring-2 focus:ring-[#00979E]"
          required
        />
      </label>

      <label className="flex items-center gap-2">
        <FiClock className="text-[#117D85]" />
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={onChange}
          className="w-full border border-[#CBE9E8] rounded-lg px-3 py-2 bg:white/70 focus:outline-none focus:ring-2 focus:ring-[#00979E]"
          required
        />
      </label>

      <label className="flex items-center gap-2">
        <FiUsers className="text-[#117D85]" />
        <input
          name="guests"
          type="number"
          min="1"
          value={form.guests}
          onChange={onChange}
          placeholder="Number of guests"
          className="w-full border border-[#CBE9E8] rounded-lg px-3 py-2 bg:white/70 focus:outline-none focus:ring-2 focus:ring-[#00979E]"
          required
        />
      </label>

      <textarea
        name="message"
        placeholder="Special Request / Message"
        value={form.message}
        onChange={onChange}
        rows={3}
        className="w-full border border-[#CBE9E8] rounded-lg px-3 py-2 bg:white/70 focus:outline-none focus:ring-2 focus:ring-[#00979E]"
      />

      <select
        name="status"
        value={form.status}
        onChange={onChange}
        className="w-full border border-[#CBE9E8] rounded-lg px-3 py-2 bg:white/70 focus:outline-none focus:ring-2 focus:ring-[#00979E]"
      >
        <option>Pending</option>
        <option>Confirmed</option>
        <option>Completed</option>
      </select>

      <button
        type="submit"
        className="mt-3 w-full py-2 rounded-lg text-white font-medium"
        style={{
          background: "linear-gradient(135deg,#009BA8 0%,#007C88 100%)",
        }}
      >
        {submitLabel}
      </button>
    </form>
  );
}
