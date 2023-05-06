// import { HttpService } from '@/utils/HttpService';

// class AuthService extends HttpService {
//   async login(data) {
//     const response = await this.post('login', data);
//     localStorage.setItem('token', response?.data?.data?.token);
//     HttpService.setToken(response.data?.data?.token);
//     return response.data;
//   }

//   async register(data) {
//     const response = await this.post('register', data);
//     return response.data;
//   }

//   logout() {
//     return this.post(`logout`, {});
//   }
// }

// const authService = new AuthService();

// export default authService;
