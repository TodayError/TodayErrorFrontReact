import axios from "axios";

const api = axios.create({
  baseURL: "http://3.38.116.203",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.Athorization;
  config.headers.common["Athorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  // post
  add: (contents) => api.post("/api/articles", contents),
  edit: (id, contents) => api.put(`api/articles/${id}`, contents),
  del: (id) => api.delete(`api/articles/${id}`),
  articles: () => api.get("/api/articles"),
  article: (id) => api.get(`/api/articles/${id}`),
  search: (value) => api.get(`/api/articles/search?query=${value}`),

  // comment
  addComment: (post_id, comment) =>
    api.post("/comment", { post_id: post_id, comment: comment }),
  comments: (id) => api.get(`/api/articles/${id}/comments`),
  delComment: (id, coId) => api.delete(`/api/articles/${id}/comments/${coId}`),
  editComment: (id, coId, content) =>
    api.put(`/api/articles/${id}/comments/${coId}`, { content }),

  // user
  login: (id, pwd) => api.post("/user/login", { nickname: id, password: pwd }),
  userinfo: () => api.get(`/userinfo`),
};
