import axios from "axios";

export const login = data => axios.post("/api/sign_in", data);
export const signup = data => axios.post("/api/sign_up", data);
export const posting = data => axios.post("/api/post", data);
export const posts = () => axios.get("/api/posts");
export const userPublicPosts = nickname => axios.get("/api/posts/public/" + nickname);
export const userPrivatePosts = nickname => axios.get("/api/posts/private/" + nickname);
export const allPosts = nickname => axios.get('/api/allposts/' + nickname);
export const getPublicNotifications = () => axios.get('/api/getpublicnotifications/');