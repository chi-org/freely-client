import axios from "axios";

export default axios.create({
    baseURL: process.env.SERVER_URI || "http://localhost:3030/API/",
    // baseURL: "https://freely--server.herokuapp.com",
    withCredentials: true,
    timeout: 4000
});
