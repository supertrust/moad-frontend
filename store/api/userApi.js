import api from "@/services/api";

export async function getUserDetailsApi() {
  const res = await api.get("get-user-details");
  return res.data;
}
