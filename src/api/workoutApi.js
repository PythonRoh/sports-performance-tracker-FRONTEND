import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/workouts`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getWorkouts = async () => {
  const res = await API.get("/");
  return res.data;
};

export const createWorkout = async (data) => {
  const res = await API.post("/", data);
  return res.data;
};
