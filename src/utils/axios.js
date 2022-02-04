import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
});

export default instance;
