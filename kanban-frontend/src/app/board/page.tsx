'use client';

import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '@/services/api';
import { Task } from '@/types/types';

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editTaskId) {
      const updated = await updateTask(editTaskId, newTask);
      setTasks(tasks.map(t => (t.id === editTaskId ? updated : t)));
      setEditTaskId(null);
    } else {
      const created = await createTask(newTask);
      setTasks([...tasks, created]);
    }

    setNewTask({ title: '', description: '' });
  };

  const handleEdit = (task: Task) => {
    setNewTask({ title: task.title, description: task.description });
    setEditTaskId(task.id);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editTaskId ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <div className="grid gap-4">
        {tasks.map(task => (
          <div key={task.id} className="p-4 bg-white rounded shadow border">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="flex gap-3 mt-2">
              <button onClick={() => handleEdit(task)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
