import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createSession = (data) => API.post('/sessions', data);
export const getSession = (roomId) => API.get(`/sessions/${roomId}`);
