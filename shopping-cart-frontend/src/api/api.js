import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const loginUser = (data) =>
  API.post("/users/login", data);

export const registerUser = (data) =>
  API.post("/users", data);

export const getItems = (token) =>
  API.get("/items", {
    headers: { Authorization: token },
  });

export const addToCart = (item_id, token) =>
  API.post("/carts", { item_id }, {
    headers: { Authorization: token },
  });

export const placeOrder = (token) =>
  API.post("/orders", {}, {
    headers: { Authorization: token },
  });

export const getOrders = (token) =>
  API.get("/orders", {
    headers: { Authorization: token },
  });

export const getCart = (token) =>
  API.get("/carts", {
    headers: { Authorization: token },
  });
