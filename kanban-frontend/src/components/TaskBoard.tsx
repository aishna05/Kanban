'use client';

import React, { useEffect, useState } from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  column: number;
  created_at: string;
};

type Column = {
  id: number;
  name: string;
};

export default function TaskBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', column: '' });

  const fetchColumns = async () => {
    const res = await fetch('http://localhost:8000/columns/');
    const data = await res.json();
    setColumns(data);
  };

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/tasks/');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchColumns();
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/tasks/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTask.title,
        description: newTask.description,
        column: parseInt(newTask.column),
      }),
    });
    const created = await res.json();
    setTasks([created, ...tasks]);
    setNewTask({ title: '', description: '', column: '' });
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/tasks/${id}/`, { method: 'DELETE' });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2 max-w-md">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <select
          value={newTask.column}
          onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Select Column</option>
          {columns.map((col) => (
            <option key={col.id} value={col.id}>
              {col.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">{column.name}</h2>
            {tasks
              .filter((task) => task.column === column.id)
              .map((task) => (
                <div key={task.id} className="bg-white p-3 mb-2 rounded border">
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 mt-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
