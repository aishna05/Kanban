import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/', // Update if different
});
API.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});


export const getTasks = async () => {
  const res = await API.get('tasks/');
  return res.data;
};

export const createTask = async (task: { title: string; description: string }) => {
  const res = await API.post('tasks/', task);
  return res.data;
};

export const updateTask = async (id: number, task: { title: string; description: string }) => {
  const res = await API.put(`tasks/${id}/`, task);
  return res.data;
};

export const deleteTask = async (id: number) => {
  await API.delete(`tasks/${id}/`);
};
