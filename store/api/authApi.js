import api from "@/services/api";

export async function loginApi(data) {
  const res = await api.post("login", data);
  localStorage.setItem("token", res.data.data.token);
  api.defaults.headers.Authorization = `Bearer ${res.data.data.token}`;
  return res.data.data;
}

export async function signupApi(data) {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const res = await api.post("register", data, config);
  return res?.data?.data;
}

export async function verifyInputApi(data) {
  const res = await api.post("verify-input", data);
  return res?.data;
}

export async function logoutApi() {
  const res = await api.post("logout");
  return res.data;
}
