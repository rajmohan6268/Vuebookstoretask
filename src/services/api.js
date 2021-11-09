import axios from "axios";

const instance = axios.create({
  baseURL: "https://rajdev-vuebookstoreapi.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;