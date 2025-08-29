// src/services/api.js
import axios from "axios";

// Base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* -------------------- USER APIs -------------------- */
export const signUp = (data) => API.post("/user/signUp", data);
export const logIn = (data) => API.post("/user/logIn", data);
export const addUser = (data) => API.post("/user/addUser", data);
export const getUsers = (data) => API.post("/user/getUsers", data);
export const searchUsers = (query) => API.get(`/user/search?${query}`);
export const updateUser = (id, data) => API.put(`/user/update/${id}`, data);
export const deleteUser = (id) => API.delete(`/user/delete/${id}`);
export const getStudents = () => API.get("/user/getStudents");
export const getStudentById = (id) => API.get(`/user/getStudentById/${id}`);

/* -------------------- COURSE APIs -------------------- */
export const addCourse = (data) => API.post("/course/addCourse", data);
export const getCourses = () => API.get("/course/getCourses");
export const getCourseById = (id) => API.get(`/course/getCourse/${id}`);
export const updateCourse = (id, data) => API.put(`/course/updateCourse/${id}`, data);
export const deleteCourse = (id) => API.delete(`/course/deleteCourse/${id}`);
export const getCoursesAmount = () => API.get("/user/amountcourses");

/* -------------------- PAYMENT APIs -------------------- */
export const createStripeSession = (data) => API.post("/payment/stripe", data);
export const myPayments = () => API.get("/payment/my-payments");
export const myEnrollments = () => API.get("/payment/my-enrollments");
export const secureEnroll = (data) => API.post("/payment/secure-enroll", data);

// Admin payments
export const createPayment = (data) => API.post("/payment/createPay", data);
export const getPayments = () => API.get("/payment/getPayments");
export const getPaymentById = (id) => API.get(`/payment/getPayment/${id}`);
export const updatePayment = (id, data) => API.put(`/payment/updatePayment/${id}`, data);
export const deletePayment = (id) => API.delete(`/payment/deletePayment/${id}`);

/* -------------------- ENROLLMENT APIs -------------------- */
export const createEnrollment = (data) => API.post("/enrollment/createEnrollment", data);
export const getEnrollments = () => API.get("/enrollment/getEnrollments");
export const getEnrollmentById = (id) => API.get(`/enrollment/getEnrollment/${id}`);
export const updateEnrollment = (id, data) => API.put(`/enrollment/updateEnrollment/${id}`, data);
export const deleteEnrollment = (id) => API.delete(`/enrollment/deleteEnrollment/${id}`);

export default API;
