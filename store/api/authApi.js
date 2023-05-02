import api from 'services/api';

export async function loginApi(data) {
  const res = await api.post('login', data);
  localStorage.setItem('token', res.data.accessToken);
  api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
  return res.data.data;
}

export async function signupApi(data) {
  const res = await api.post('user/signup', data);
  return res.data.data;
}
