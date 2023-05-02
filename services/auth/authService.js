import { HttpService } from '@/utils/HttpService';

class AuthService extends HttpService {
  async login(data) {
    try {
    const response = await this.post('login', data);
    localStorage.setItem('token', res.data.accessToken);
    HttpService.setToken(response.data?.data?.token);
    return response.data;
    } catch (error) {
      const err = error.data.data;
    }
  }

  async register(data) {
    const response = await this.post('register', data);
    return response.data;
  }

  logout() {
    return this.post(`logout`, {});
  }
  // Other authentication-related methods go here
}

const authService = new AuthService();

export default authService;
