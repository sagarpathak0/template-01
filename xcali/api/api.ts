import axios from "axios";

const getToken = () => {
  const data =  localStorage.getItem("auth");
  console.log("Data in api.ts",data)
  return data ? JSON.parse(data).token : null;
};

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;