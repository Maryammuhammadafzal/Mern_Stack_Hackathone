import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import TaskCard from "./TaskCard";
import Navbar from "../Navbar/Nvabar.jsx";
import { useNavigate } from "react-router";
import axios from "axios";
import TaskBoard from "./TaskBoard.jsx";
const baseUrl = import.meta.env.VITE_API_URL;
export default function Board() {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", assignedTo: "", _id: "" });
  const [mode, setMode] = useState('add'); // 'add' for adding new task, 'edit' for editing existing task

  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await fetch(`${baseUrl}/api/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setForm({ ...task });
    setMode('edit'); // Set mode to 'edit' when editing a task
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === 'edit') {
        // Update existing task
        await axios.put(`${baseUrl}/api/tasks/${form._id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new task
        await axios.post(`${baseUrl}/api/tasks`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setShowModal(false);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      {token == null ? navigate('/') : (
        <div className="flex w-full h-auto min-h-screen flex-col ">
          <Navbar openModal={() => { setMode('add'); setShowModal(true); }} />
          {showModal && (
            <div className="fixed inset-0 bg-blue-100 bg-opacity-30 flex justify-center items-center">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg flex flex-col gap-4 w-[400px]"
              >
                <h2 className="text-2xl font-bold text-blue-400">
                  {mode === 'edit' ? 'Edit Task' : 'Add Task'}
                </h2>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="border p-2 rounded-md focus:outline-none focus:border-blue-400"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="border p-2 rounded-md focus:outline-none focus:border-blue-400"
                  required
                />
                <input
                  type="text"
                  name="assignedTo"
                  placeholder="Assign To"
                  value={form.assignedTo}
                  onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                  className="border p-2 rounded-md focus:outline-none focus:border-blue-400"
                  required
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md"
                  >
                    {mode === 'edit' ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          )}
          <TaskBoard tasks={tasks} openModal={handleEdit} />
        </div>
      )}
    </>
  );
}
