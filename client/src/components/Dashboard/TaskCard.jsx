
import React, { useState } from "react";
import axios from "axios";

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setIsUpdating(true);

      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        status: newStatus, // Updating the status
      });

      // Handle the response after updating the task
      if (response.data) {
        onStatusChange(id, newStatus); // Update status in parent component
      }

      window.location.reload();
      setIsUpdating(false);
    } catch (error) {
      console.error("Error updating task:", error);
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "#f8d7da"; // Red
      case "In Progress":
        return "#fff3cd"; // Yellow
      case "Done":
        return "#d4edda"; // Green
      default:
        return "#ffffff";
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: getStatusColor(task.status),
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
      }}
    >
      <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333" }}>{task.title}</h4>
      <p style={{ color: "#555", fontSize: "0.95rem" }}>{task.description}</p>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Assigned to: {task.assignedTo?.username || "Unassigned"}
      </p>

      {/* Progress Bar */}
      <div style={{ marginTop: "12px", marginBottom: "12px" }}>
        <div
          style={{
            height: "8px",
            borderRadius: "4px",
            backgroundColor: "#e0e0e0",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${task.progress || 0}%`,
              backgroundColor: task.progress === 100 ? "#28a745" : "#ffc107",
              borderRadius: "4px",
            }}
          ></div>
        </div>
        <p style={{ fontSize: "0.85rem", textAlign: "right", color: "#555" }}>
          {task.progress || 0}%
        </p>
      </div>

      {/* Dropdown for status */}
      <div style={{ marginTop: "12px" }}>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(task._id, e.target.value)} // Call handleStatusChange to update status
          style={{
            padding: "8px 12px",
            backgroundColor: "#f7f7f7",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Edit and Delete buttons */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onEdit(task)} // Pass the entire task to the onEdit handler
          style={{
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            marginRight: "10px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          style={{
            padding: "6px 12px",
            backgroundColor: "#dc3545",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
