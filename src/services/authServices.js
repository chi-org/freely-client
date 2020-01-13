import api from "../config/api"


export async function registerUser(userData) {
  // const {username, password} = userData
  try {
      const response = await api.post("/auth/register", userData)
      console.log(userData.username, " back from server", response)
      return response.data
  }
  catch (error) {
      console.log("Error registering user:", error)
      throw(error)

  }
  return true
}

export async function loginUser(userData) {
  const {username, password} = userData
  try {
    const response = await api.post("auth/login", userData)
    console.log(userData.username, " back from server")
    return response.data
  }
  catch (error) {
    console.log("Login Error: ", error)
    throw(error)
  }
  return true
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

// Store loggedInUser username in local storage
export function setLoggedInUser(user) {
  user ? localStorage.setItem("loggedInUser", user) : localStorage.removeItem("loggedInUser")
}
