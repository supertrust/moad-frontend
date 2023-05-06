import Axios from 'axios';

const api = Axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en'
  },
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const errorCode = error?.response?.status;
//     if (errorCode === 401) {
//       localStorage.clear();
//       window.location.href = '/authentication/sign-in/';
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
