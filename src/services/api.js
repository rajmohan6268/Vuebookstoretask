import axios from "axios";

const instance = axios.create({
 // baseURL: "https://rajdev-vuebookstoreapi.herokuapp.com/api",
 baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;