import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

export default function TaskBoard({ tasks, openModal }) {
  const [tasksState, setTasksState] = useState(tasks);

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasksState.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasksState(updatedTasks);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasksState.filter((task) => task._id !== taskId);
    setTasksState(updatedTasks);
  };

  
  
  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="flex justify-evenly mt-10 w-full h-auto space-x-6">
      {columns.map((col) => (
        <div
          key={col}
          style={{
            background: "#fff",
            padding: "20px",
            width: "300px",
            minHeight: "500px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
              color: "#333",
              marginBottom: "15px",
              textTransform: "uppercase",
            }}
          >
            {col}
          </h2>
          <div>
            {tasks
              .filter((task) => task.status === col)
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onEdit={openModal} // Pass openModal here
                  onDelete={handleDelete}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
