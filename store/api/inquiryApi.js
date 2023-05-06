import api from "@/services/api";

export async function getInquiryData(page) {
  try {
    const res = await api.get(`get-inquiry?page=${page}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getInquiryDetail(id) {
  try {
    const res = await api.get(`inquiry/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function saveInquiry(data) {
  try {
    const res = await api.post(`save-inquiry`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
export async function updateInquiry(data) {
  try {
    const res = await api.post(`update-inquiry`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteInquiry(id) {
  try {
    const res = await api.get(`delete-inquiry/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}