import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Upload, Edit2, X, Menu } from "lucide-react";

// --- Sidebar ---
const Sidebar = ({ mobileOpen, onClose, onSignOut }) => (
  <aside
    className={`fixed top-0 left-0 h-full bg-indigo-50 dark:bg-slate-900 p-4 shadow-md transform transition-transform z-50
      w-64 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
  >
    <div className="text-2xl font-bold text-indigo-600 mb-6 flex items-center justify-between">
      CollabSpace
      <button className="md:hidden p-2" onClick={onClose}>
        <X />
      </button>
    </div>
    <nav className="flex flex-col gap-2">
      <Link
        to="/dashboard"
        className="px-3 py-2 hover:bg-indigo-100 rounded font-medium text-indigo-700 dark:text-white"
        onClick={onClose}
      >
        Dashboard
      </Link>
    </nav>

    {/* Sign Out */}
    <button
      onClick={onSignOut}
      className="flex items-center gap-2 px-3 py-2 mt-6 rounded text-white bg-indigo-600 hover:bg-indigo-500 font-medium w-full"
    >
      <LogOut size={16} /> Sign Out
    </button>
  </aside>
);

// --- Modal for Edit Profile ---
const Modal = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative w-full max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- Profile Page ---
export default function Profile() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [user, setUser] = useState({
    name: "Amina Ahmad",
    email: "amina@example.com",
    role: "Team Lead",
    status: "Active",
    department: "Design",
    location: "Karachi, Pakistan",
    avatar: "",
  });

  const [form, setForm] = useState({ ...user });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUser((u) => ({ ...u, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser({ ...form });
    setEditOpen(false);
  };

  const handleSignOut = () => {
    alert("Signed out successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} onSignOut={handleSignOut} />

      {/* Top mobile bar */}
      <div className="md:hidden flex items-center justify-between bg-indigo-50 dark:bg-slate-900 p-4 shadow-md">
        <div className="text-xl font-bold text-indigo-600">CollabSpace</div>
        <button onClick={() => setMobileOpen(true)} className="p-2 bg-indigo-600 text-white rounded-lg">
          <Menu size={20} />
        </button>
      </div>

      <div className="md:ml-64 p-6 max-w-4xl mx-auto flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Profile</h1>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-32 h-32 rounded-full object-cover border-2 border-indigo-600"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                {user.name[0]}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-500">
              <Upload size={18} className="text-white" />
              <input type="file" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="text-xl font-semibold">{user.name}</div>
            <div className="text-gray-500">{user.email}</div>

            {/* Additional info sections */}
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="text-gray-500">Role: {user.role}</span>
              <span className="text-gray-500">Status: {user.status}</span>
              <span className="text-gray-500">Department: {user.department}</span>
              <span className="text-gray-500">Location: {user.location}</span>
            </div>

            <button
              onClick={() => {
                setForm({ ...user });
                setEditOpen(true);
              }}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 p-2 bg-slate-50 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 p-2 bg-slate-50 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 p-2 bg-slate-50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <input
                type="text"
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 p-2 bg-slate-50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <input
                type="text"
                value={form.department}
                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 p-2 bg-slate-50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 p-2 bg-slate-50 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setEditOpen(false)} className="px-4 py-2 rounded-lg border">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">
                Save
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
