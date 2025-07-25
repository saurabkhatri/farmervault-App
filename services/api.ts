import axios from "axios";
import * as SecureStore from "expo-secure-store";

const userApi = axios.create({
  baseURL: "http://:3000/api",
});
userApi.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("user-access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const farmerApi = axios.create({
  baseURL: "http://192.168.1.66:8080/api",
});
farmerApi.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("farmer-access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userSignUp = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await userApi.post("/users/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const userSignIn = async (email: string, password: string) => {
  const response = await userApi.post("/users/signin", { email, password });
  return response.data;
};

export const getProducts = async () => {
  const response = await userApi.get("/products");
  return response.data;
};

export const farmerSignUp = async (
  fullName: string,
  email: string,
  phone: string,
  gender: string,
  address: string,
  password: string,
  termsnCondition: boolean
) => {
  const response = await farmerApi.post("/sellers/register", {
    fullName,
    email,
    phone,
    gender,
    address,
    password,
    termsnCondition,
  });
  return response.data;
};

export const farmerSignIn = async (email: string, password: string) => {
  const response = await farmerApi.post("/sellers/signin", { email, password });
  return response.data;
};
export const addProduct = async (data: FormData) => {
  const response = await farmerApi.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const getProductsBySeller = async () => {
  const response = await farmerApi.get("/products/seller");
  return response.data;
};
export const getProductById = async (id: string) => {
  const response = await farmerApi.get(`/products/${id}`);
  return response.data;
};
export const getOrdersBySeller = async () => {
  const response = await farmerApi.get("/orders/seller");
  return response.data;
};
