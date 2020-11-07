import axios from "axios";

export const login = data => axios.post("/api/sign_in", data);
export const signup = data => axios.post("/api/sign_up", data);
export const posting = data => axios.post("/api/post", data);
export const posts = () => axios.get("/api/posts");
export const userPublicPosts = (userEmail) => axios.get("/api/posts/public/:userEmail" + userEmail);
export const userPrivatePosts = (userEmail) => axios.get("/api/posts/private/:userEmail" + userEmail);