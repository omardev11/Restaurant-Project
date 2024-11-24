// config.js
import { CustomerDTO } from "./DTO.js";
import { OrderDTO } from "./DTO.js";

// Define your API URL

export let APiUrl = "http://localhost:5127/api/";

// Retrieve the current customer from localStorage or initialize a default value
export function getCurrentCustomer() {
  const storedCustomer = localStorage.getItem("currentCustomer");
  if (storedCustomer) {
    return JSON.parse(storedCustomer); // Return parsed customer if found
  }
  return null; // Return null if no customer is stored
}

// Set the current customer into localStorage
export function setCurrentCustomer(customer) {
  localStorage.setItem("currentCustomer", JSON.stringify(customer));
}

// Initialize CurrentCustomer object
export let CurrentCustomer =
  getCurrentCustomer() || new CustomerDTO(0, "", "", "", ""); // Default empty customer

// Order List Management
export function getOrderList() {
  const storedOrders = localStorage.getItem("orderList");
  if (storedOrders) {
    return JSON.parse(storedOrders);
  }
  return [];
}

export function addToOrderList(order) {
  const currentOrders = getOrderList();
  currentOrders.push(order);
  localStorage.setItem("orderList", JSON.stringify(currentOrders));
}

export function RemoveToOrderList(order) {
  const currentOrders = getOrderList(); // Assuming getOrderList() fetches the current list of orders
  for (let i = 0; i < currentOrders.length; i++) {
    if (currentOrders[i].MenuId === order.MenuId) {
      currentOrders.splice(i, 1); // Removes the element at index i
      break; // Stop once we find the order to remove
    }
  }
  localStorage.setItem("orderList", JSON.stringify(currentOrders)); // Save the updated order list
}

// Initialize OrderList
export let OrderList = getOrderList();
