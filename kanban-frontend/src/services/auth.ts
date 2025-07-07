import api from './api';

export const login = async (username: string, password: string) => {
  const res = await api.post('auth/login/', { username, password });
  localStorage.setItem('token', res.data.access);
};

export const register = async (username: string, password: string) => {
  await api.post('auth/register/', { username, password });
};
