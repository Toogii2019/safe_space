import axios from "axios";

export const login = data => axios.post("/api/sign_in", data);
export const signup = data => axios.post("/api/sign_up", data);
export const post = data => axios.post("./api/post", data);
export const posts = data => axios.post("./api/posts", data);