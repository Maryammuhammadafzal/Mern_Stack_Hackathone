import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar({ openModal }) {
  const { logout } = useContext(AuthContext);
  

  return (
    <div className="w-full flex justify-between items-center p-4 shadow-md">
      <h1 className="text-2xl font-bold text-blue-400">Task Manager</h1>
      <div className="flex gap-4">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
        <button
          onClick={logout}
          className="px-4 py-2 border-2 cursor-pointer border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
