import api from "@/services/api";

export async function ChangePasswordApi(data) {
  const res = await api.post("change-password", data);
  return res.data;
}

export async function updateMyInfoApi(data) {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const res = await api.post("update-myinfo", data, config);
  return res.data;
}
