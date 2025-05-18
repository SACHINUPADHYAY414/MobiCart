import axios from "axios";
import { urls } from "./Webservices";
let url = urls[import.meta.env.VITE_REACT_APP_CURRENT_ENV];

const apiClient = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// GET request
export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response;
  } catch (error) {
    // console.error("GET request error:", error);
    throw error;
  }
};

// GET request with parameters
export const fetchDataWithParams = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response;
  } catch (error) {
    // console.error("GET request with params error:", error);
    throw error;
  }
};

// POST request
export const postData = async (endpoint, data, params = {}) => {
  try {
    // Check if data is FormData
    const config = {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
      params,
    };

    const response = await apiClient.post(endpoint, data, config);
    return response;
  } catch (error) {
    // console.error("POST request error:", error);
    throw error;
  }
};

// PUT request
export const putData = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response;
  } catch (error) {
    console.error("PUT request error:", error);
    throw error;
  }
};

// DELETE request
export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response;
  } catch (error) {
    console.error("DELETE request error:", error);
    throw error;
  }
};

export default apiClient;
