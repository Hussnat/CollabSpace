import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  User,
  Grid,
  FileText,
  CheckSquare,
  LogOut,
  Settings,
  X,
  Menu,
} from "lucide-react";

// --- Reusable components ---
const IconButton = ({ onClick, children, title = "", className = "" }) => (
  <button
    title={title}
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md ${className}`}>{children}</div>
);

const Badge = ({ children }) => (
  <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">{children}</span>
);

const Modal = ({ open, onClose, children, title = "" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
              <X size={18} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Sidebar ---
const Sidebar = ({ collapsed, mobileOpen, onClose }) => {
  const links = [
    { to: "/dashboard", text: "Dashboard", icon: Grid },
    { to: "/projects", text: "Projects", icon: FileText },
    { to: "/project-details", text: "Project Details", icon: FileText },
    { to: "/tasks", text: "Tasks", icon: CheckSquare },
    { to: "/profile", text: "Profile", icon: User },
    { to: "/settings", text: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-white to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-r-2xl p-4 shadow-inner transform transition-transform z-50
      ${collapsed ? "w-16" : "w-64"} 
      ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`} onClick={onClose}>
          <div className="logo bg-indigo-600 text-white rounded-md p-2 w-12 h-12 flex items-center justify-center">CS</div>
          {!collapsed && (
            <div className="text-left">
              <div className="text-xl font-bold">CollabSpace</div>
              <div className="text-xs text-gray-500">Team workspace</div>
            </div>
          )}
        </Link>
        <button className="md:hidden p-2" onClick={onClose}>
          <X />
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700 transition text-sm ${
                collapsed ? "justify-center" : ""
              }`}
              onClick={onClose}
            >
              <Icon size={18} />
              {!collapsed && <span className="font-medium">{l.text}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 flex flex-col gap-2">
        <div className={`flex gap-2 ${collapsed ? "justify-center" : ""}`}>
          <button className="px-2 py-1 rounded-lg bg-white/80 hover:bg-white text-sm shadow-sm">+ New</button>
          {!collapsed && <button className="px-2 py-1 rounded-lg bg-white/60 hover:bg-white text-sm shadow-sm">Invite</button>}
        </div>

        <div className={`mt-6 flex flex-col gap-2 ${collapsed ? "items-center" : ""}`}>
          <Link to="/profile" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700 transition text-sm">
            <User size={18} />
            {!collapsed && "Profile"}
          </Link>
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700 transition text-sm">
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </button>
        </div>
      </div>
    </aside>
  );
};

// --- Topbar ---
const Topbar = ({ onOpenCreate, query, setQuery, onMenuClick }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-4 w-full">
    <div className="flex items-center gap-3">
      <button className="sm:hidden p-2 bg-indigo-600 text-white rounded-lg" onClick={onMenuClick}>
        <Menu size={20} />
      </button>
      <h1 className="text-2xl font-bold mt-2 sm:mt-0">Dashboard</h1>
    </div>

    <div className="flex-1 w-full">
      <div className="relative w-full max-w-full sm:max-w-md">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, tasks, people..."
          className="pl-10 pr-4 py-2 w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-indigo-300 focus:outline-none"
        />
      </div>
    </div>

    <div className="flex items-center gap-3 flex-wrap">
      <IconButton onClick={onOpenCreate} title="Create project" className="bg-indigo-600 text-white">
        <Plus size={14} /> <span className="hidden sm:inline">New</span>
      </IconButton>
      <button title="Profile" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
        <User />
      </button>
      <button title="Logout" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
        <LogOut />
      </button>
    </div>
  </div>
);

// --- Main Dashboard ---
export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [query, setQuery] = useState("");

  const projects = useMemo(
    () => [
      { id: "p1", name: "Website Redesign", desc: "Landing + Dashboard redesign", status: "Active", members: 4, progress: 48 },
      { id: "p2", name: "Mobile App", desc: "React Native build", status: "Planning", members: 3, progress: 12 },
      { id: "p3", name: "Marketing Campaign", desc: "Q4 Paid Ads", status: "Active", members: 2, progress: 72 },
    ],
    []
  );

  const tasks = useMemo(
    () => [
      { id: "t1", title: "Design review", project: "Website Redesign", due: "Nov 30", done: false },
      { id: "t2", title: "API spec", project: "Mobile App", due: "Dec 3", done: true },
      { id: "t3", title: "Ad creative", project: "Marketing Campaign", due: "Dec 6", done: false },
    ],
    []
  );

  const filteredProjects = projects.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  const openTasksCount = tasks.filter((t) => !t.done).length;

  const [form, setForm] = useState({ name: "", desc: "", members: 1 });
  const [errors, setErrors] = useState({});

  function validateForm() {
    const errs = {};
    if (!form.name || form.name.trim().length < 3) errs.name = "Project name must be at least 3 characters";
    if (!form.desc || form.desc.trim().length < 5) errs.desc = "Short description required";
    if (!Number.isInteger(Number(form.members)) || form.members < 1) errs.members = "Members must be 1 or more";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("create project", form);
    setCreateOpen(false);
    setForm({ name: "", desc: "", members: 1 });
    setErrors({});
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="md:ml-[16rem] lg:ml-[16rem] p-4 max-w-screen-xl mx-auto flex flex-col gap-6">
        <Topbar
          onOpenCreate={() => setCreateOpen(true)}
          query={query}
          setQuery={setQuery}
          onMenuClick={() => setMobileOpen(true)}
        />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Projects</div>
                <div className="text-2xl font-bold mt-1">{projects.length}</div>
              </div>
              <div className="text-indigo-600">
                <Grid size={34} />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Active Tasks</div>
                <div className="text-2xl font-bold mt-1">{openTasksCount}</div>
              </div>
              <div className="text-indigo-600">
                <CheckSquare size={34} />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Team Members</div>
                <div className="text-2xl font-bold mt-1">12</div>
              </div>
              <div className="text-indigo-600">
                <User size={34} />
              </div>
            </div>
          </Card>
        </div>

        {/* Projects & Tasks Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Projects */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Projects</h3>
              <Link to="/projects" className="text-sm text-indigo-600 hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {filteredProjects.map((p) => (
                <div key={p.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.desc}</div>
                    <div className="mt-2 text-xs flex items-center gap-2 flex-wrap">
                      <Badge>{p.status}</Badge>
                      <span className="text-gray-400">{p.members} members</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-32 mt-2 sm:mt-0 text-right">
                    <div className="text-sm font-medium">{p.progress}%</div>
                    <div className="h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div style={{ width: `${p.progress}%` }} className="h-full bg-indigo-500 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tasks */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Tasks</h3>
              <Link to="/tasks" className="text-sm text-indigo-600 hover:underline">View all</Link>
            </div>
            <ul className="space-y-3">
              {tasks.slice(0, 6).map((t) => (
                <li key={t.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-gray-500">{t.project} • due {t.due}</div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <Badge>{t.done ? "Done" : "Open"}</Badge>
                    <Link to={`/tasks/${t.id}`} className="text-sm text-indigo-600 hover:underline">Open</Link>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <Card>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
              <h3 className="text-lg font-semibold">Quick actions</h3>
              <div className="text-sm text-gray-500">Manage fast</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white shadow-sm hover:shadow-md">Create project</button>
              <button className="px-4 py-2 rounded-xl bg-white border hover:bg-slate-50">Import CSV</button>
              <button className="px-4 py-2 rounded-xl bg-white border hover:bg-slate-50">Generate report</button>
            </div>
          </Card>
        </div>
      </div>

      {/* Create project modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create project">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 p-2 bg-slate-50 focus:outline-none"
            />
            {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Short description</label>
            <textarea
              value={form.desc}
              onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 p-2 bg-slate-50 focus:outline-none"
              rows={3}
            />
            {errors.desc && <div className="text-xs text-red-500 mt-1">{errors.desc}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Members</label>
            <input
              type="number"
              value={form.members}
              onChange={(e) => setForm((f) => ({ ...f, members: Number(e.target.value) }))}
              min={1}
              className="w-32 rounded-lg border border-slate-200 p-2 bg-slate-50 focus:outline-none"
            />
            {errors.members && <div className="text-xs text-red-500 mt-1">{errors.members}</div>}
          </div>
          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => setCreateOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Create</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
