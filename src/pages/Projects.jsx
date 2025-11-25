import React, { useState } from "react";
import { FolderOpen, Search, PlusCircle, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Projects() {
  const initialProjects = [
    { id: 1, name: "Website Redesign", status: "In Progress", due: "12 Feb 2025", description: "Redesign website UI/UX.", team: ["Amna","Ali"] },
    { id: 2, name: "Mobile App UI", status: "Completed", due: "03 Jan 2025", description: "Design mobile app screens.", team: ["Sara","Hussnat"] },
    { id: 3, name: "Marketing Dashboard", status: "Pending", due: "20 Feb 2025", description: "Create dashboard for marketing.", team: ["Ali","Hussnat"] }
  ];

  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDue, setNewDue] = useState("");

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProject = () => {
    if (!newName || !newDue) return alert("Please fill all fields");
    const newProject = {
      id: projects.length + 1,
      name: newName,
      status: "Pending",
      due: newDue,
      description: "No description yet.",
      team: []
    };
    setProjects([...projects, newProject]);
    setShowModal(false);
    setNewName("");
    setNewDue("");
  };

  return (
    <div className="p-4 md:p-6 w-full min-h-screen bg-gray-50">

      {/* Back to Dashboard */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-indigo-800 transition mb-4"
      >
        <ArrowLeft size={20} /> 
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Projects</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition text-sm md:text-base"
        >
          <PlusCircle size={20} /> New Project
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border">
        <Search size={20} className="text-gray-500 shrink-0" />
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full text-gray-700 outline-none text-sm md:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredProjects.length > 0 ? filteredProjects.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <FolderOpen size={28} className="text-indigo-600" />
              <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                p.status === "Completed" ? "bg-green-100 text-green-700" :
                p.status === "In Progress" ? "bg-indigo-100 text-indigo-700" :
                "bg-yellow-100 text-yellow-700"
              }`}>
                {p.status}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">{p.name}</h2>
            <p className="text-sm text-gray-500">Due Date: {p.due}</p>

            <Link
              to={`/project/${p.id}`}
              state={{ project: p }} // pass project data
              className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-indigo-800 transition"
            >
              View Details
            </Link>
          </div>
        )) : (
          <p className="text-center text-gray-500 col-span-3">No project found</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={22} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Create New Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              className="w-full border p-2 rounded-lg mb-3 outline-indigo-600 text-sm"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="date"
              className="w-full border p-2 rounded-lg mb-4 outline-indigo-600 text-sm"
              value={newDue}
              onChange={(e) => setNewDue(e.target.value)}
            />
            <button
              onClick={addProject}
              className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition text-sm"
            >
              Add Project
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
