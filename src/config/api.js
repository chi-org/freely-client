import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3030/API/",
    // baseURL: "https://freely--server.herokuapp.com",
    withCredentials: true,
    timeout: 4000
});
