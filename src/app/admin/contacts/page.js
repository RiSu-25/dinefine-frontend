"use client";

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages from backend
  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contacts");
      const data = await res.json();
      setContacts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    }
  };

  // Delete message
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg font-medium text-gray-600">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold text-[#117D85] mb-2">
        Contact Messages
      </h1>
      <p className="text-gray-600 mb-8">
        View and manage all customer contact submissions.
      </p>

      <div className="flex flex-col gap-6">
        {contacts.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No contact messages found.
          </p>
        )}

        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="relative p-6 rounded-2xl transition-all"
            style={{
              background:
                "linear-gradient(180deg, rgba(227,242,241,0.75) 0%, rgba(203,233,232,0.75) 100%)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Delete button */}
            <button
              onClick={() => handleDelete(contact.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition text-xl"
            >
              <FaTrash />
            </button>

            <h2 className="text-xl font-semibold text-[#117D85] mb-3">
              {contact.first_name} {contact.last_name}
            </h2>

            <p className="text-gray-700">
              <strong>Email:</strong> {contact.email}
            </p>

            <p className="text-gray-700">
              <strong>Phone:</strong> {contact.phone || "Not provided"}
            </p>

            <p className="text-gray-700">
              <strong>Subject:</strong> {contact.subject || "Not provided"}
            </p>

            <p className="mt-3 text-gray-800 leading-relaxed">
              {contact.message}
            </p>

            <p className="text-xs text-gray-500 mt-4">
              {new Date(contact.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
