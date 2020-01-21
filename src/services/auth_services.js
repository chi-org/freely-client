import api from "../config/api";

export async function registerUser(userData) {
  try {
      const response = await api.post("/auth/register", userData)
      return response.data
  }
  catch (error) {
      console.log("Error registering user:", error)
      throw(error)

  }
}

export async function loginUser(userData) {
  try {
    const response = await api.post("auth/login", userData)
    return response.data
  }
  catch (error) {
    console.log("Login Error: ", error)
    throw(error)
  }
}

export async function logoutUser() {
  try {
      return api.get("/auth/logout")
  }
  catch (error) {
      console.log("Logout Error:", error)
      throw(error)
  }
}

export async function userAuthenticated() {
  try {
      const response =  await api.get("/auth/user")
      return response
  }
  catch(error) {
      console.log("Error checking for authenticated user")
      throw(error)
  }
}

export function getLoggedInUser() {
  return localStorage.getItem("loggedInUser")
}

export function setLoggedInUser(user) {
  user ? localStorage.setItem("loggedInUser", user) : localStorage.removeItem("loggedInUser")
}
