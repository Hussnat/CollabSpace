import React, { useState } from "react";
import {
  ArrowLeft,
  Upload,
  MessageCircle,
  Calendar,
  User,
  PieChart,
} from "lucide-react";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProjectDetails() {
  // ------------------ STATES ------------------
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [username] = useState("Amina");
  const [files, setFiles] = useState([]);

  const team = [
    { name: "Amina", role: "Frontend", percent: 80 },
    { name: "Hussnat", role: "Backend", percent: 60 },
    { name: "Rubi", role: "UI/UX", percent: 70 },
    { name: "Fareeha", role: "QA", percent: 50 },
  ];

  const [tasks, setTasks] = useState([
    { id: 1, text: "Frontend Landing Page", done: false, assigned: "Amina" },
    { id: 2, text: "Create Project API", done: true, assigned: "Hussnat" },
    { id: 3, text: "Team Dashboard UI", done: false, assigned: "Rubi" },
  ]);

  // Add Task Modal States
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  // ------------------ PIE CHART ------------------
  const completed = 65;
  const remaining = 100 - completed;

  const pieData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, remaining],
        backgroundColor: ["#4f46e5", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  // ------------------ DEADLINE ------------------
  const startDate = new Date("2025-01-01");
  const endDate = new Date("2025-02-10");
  const today = new Date();

  const totalDays = Math.ceil((endDate - startDate) / 86400000);
  const passedDays = Math.ceil((today - startDate) / 86400000);
  const remainingDays = totalDays - passedDays;

  const deadlinePercent = Math.min(
    Math.round((passedDays / totalDays) * 100),
    100
  );

  // ------------------ FILE UPLOAD ------------------
  const handleFileUpload = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  // ------------------ COMMENT POST ------------------
  const postComment = () => {
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      {
        name: username,
        message: commentInput,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setCommentInput("");
  };

  // ------------------ TASK ACTIONS ------------------
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // ADD NEW TASK (WITH ASSIGN TO FIELD)
  const saveTask = () => {
    if (!newTaskText.trim() || !assignedTo.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTaskText,
        done: false,
        assigned: assignedTo,
      },
    ]);

    setNewTaskText("");
    setAssignedTo("");
    setShowTaskPopup(false);
  };

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => window.history.back()}
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-3 py-2 rounded-full"
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">
          Project Details
        </h1>
      </div>

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart size={20} /> Project Progress
          </h2>

          <div className="w-40 h-40 mx-auto">
            <Pie data={pieData} />
          </div>

          <p className="mt-3 text-center font-medium text-gray-800">
            Completed: <span className="text-indigo-600">{completed}%</span>
          </p>

          <p className="text-center font-medium text-gray-800">
            Remaining: <span className="text-red-600">{remaining}%</span>
          </p>
        </div>

        {/* TEAM */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User size={20} /> Team Collaboration
          </h2>

          {team.map((m, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <p>
                  {m.name} - <span className="text-indigo-600">{m.role}</span>
                </p>
                <p className="font-semibold">{m.percent}%</p>
              </div>

              <div className="h-3 bg-gray-200 rounded-full mt-1">
                <div
                  className="h-3 bg-indigo-600 rounded-full"
                  style={{ width: `${m.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* DEADLINE */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} /> Deadline Overview
          </h2>

          <p className="font-medium text-gray-800">
            Total Duration: <span className="text-indigo-600">{totalDays} days</span>
          </p>

          <p className="font-medium text-gray-800">
            Days Passed: <span className="text-blue-600">{passedDays}</span>
          </p>

          <p className="font-medium text-gray-800">
            Remaining:{" "}
            <span className={remainingDays <= 0 ? "text-red-600" : "text-green-600"}>
              {remainingDays > 0 ? remainingDays : 0} days
            </span>
          </p>

          <div className="h-4 bg-gray-200 rounded-full mt-3">
            <div
              className={`h-4 rounded-full ${
                deadlinePercent >= 80 ? "bg-red-500" : "bg-indigo-600"
              }`}
              style={{ width: `${deadlinePercent}%` }}
            ></div>
          </div>

          <p className="text-center mt-2 font-semibold text-gray-800">
            {deadlinePercent}% time elapsed
          </p>
        </div>
      </div>

      {/* TASK SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow border mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>

          <button
            onClick={() => setShowTaskPopup(true)}
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Add Task
          </button>
        </div>

        {/* TASK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="p-4 bg-gray-50 rounded-xl border text-center">
            <p className="text-xl font-bold">{totalTasks}</p>
            <p>Total Tasks</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border text-center">
            <p className="text-xl font-bold text-green-600">{completedTasks}</p>
            <p>Completed</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border text-center">
            <p className="text-xl font-bold text-red-600">{pendingTasks}</p>
            <p>Pending</p>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="mt-4 space-y-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTask(t.id)}
                  className="w-5 h-5"
                />
                <div>
                  <p className={`text-gray-800 ${t.done ? "line-through opacity-60" : ""}`}>
                    {t.text}
                  </p>
                  <p className="text-sm text-indigo-600">
                    Assigned to: {t.assigned}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UPLOAD FILES */}
      <div className="bg-white p-6 rounded-2xl shadow border mt-8">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Upload size={20} /> Uploaded Files
        </h2>

        <input type="file" multiple onChange={handleFileUpload} />

        <ul className="mt-4 space-y-2">
          {files.map((file, i) => (
            <li
              key={i}
              className="bg-gray-50 p-3 rounded-xl border flex items-center gap-2"
            >
              <Upload size={18} className="text-indigo-600" />
              {file.name}
            </li>
          ))}
        </ul>
      </div>

      {/* COMMENTS */}
      <div className="bg-white p-6 rounded-2xl shadow border mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle size={20} /> Comments
        </h2>

        <div className="space-y-4">
          {comments.map((c, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-xl border">
              <p className="text-indigo-600 font-semibold">{c.name}</p>
              <p>{c.message}</p>
              <p className="text-xs text-gray-500">{c.time}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <input
            type="text"
            className="flex-1 p-3 border rounded-xl"
            placeholder="Write a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />

          <button
            onClick={postComment}
            className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-xl"
          >
            Post
          </button>
        </div>
      </div>

      {/* ADD TASK POPUP */}
      {showTaskPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>

            <input
              type="text"
              className="w-full p-3 border rounded-xl mb-3"
              placeholder="Enter task name..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />

            {/* Assigned To Dropdown */}
            <select
              className="w-full p-3 border rounded-xl"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Assign to...</option>
              {team.map((member, i) => (
                <option key={i} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowTaskPopup(false)}
                className="px-4 py-2 bg-gray-200 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={saveTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
