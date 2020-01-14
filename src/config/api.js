import axios from "axios";

export default axios.create({
    baseURL: process.env.SERVER_URI || "https://freely--server.herokuapp.com/API/",
    // baseURL: process.env.SERVER_URI || "http://localhost:3030/API/",
    withCredentials: true,
    timeout: 4000
});
