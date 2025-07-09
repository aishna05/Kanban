"use client";

import axios from "axios";
import { useState } from "react";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: any) => void;
}

export default function TaskCard({ id, title, description, onDelete, onUpdate }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskData, setTaskData] = useState({ title, description });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/tasks/${id}/`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate(id, res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(id);
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  return (
    <div className="bg-white p-3 shadow-md rounded mb-2">
      {isEditing ? (
        <>
          <input
            className="w-full mb-2 border px-2 py-1 rounded"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          />
          <textarea
            className="w-full mb-2 border px-2 py-1 rounded"
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          />
          <div className="flex justify-end space-x-2">
            <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-3 py-1 rounded">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
          <div className="flex justify-end space-x-2 mt-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-600">Edit</button>
            <button onClick={handleDelete} className="text-red-600">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
