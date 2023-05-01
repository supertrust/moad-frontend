import axios from 'axios';
import { baseURL } from '@/enviroment/env';

class HttpService {
  constructor() {
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  /**
   * Set Token On Header
   * @param token
   */
  static setToken(token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  static removeToken() {
    axios.defaults.headers['Authorization'] = ``;
  }

  /**
   * Fetch data from server
   * @param url Endpoint link
   * @return Promise
   */
  get(url, params) {
    return axios.get(`${baseURL}/${url}`, {
      params,
      cancelToken: this.source.token,
    });
  }

  /**
   * Write data over server
   * @param url Endpoint link
   * @param body Data to send over server
   * @return Promise
   */
  post(url, body, options = {}) {
    return axios.post(`${baseURL}/${url}`, body, {
      ...options,
      cancelToken: this.source.token,
    });
  }

  /**
   * Delete Data From Server
   * @param url Endpoint link
   * @param params Embed as query params
   * @return Promise
   */
  delete(url, params, data) {
    return axios.delete(`${baseURL}/${url}`, { params, data });
  }

  /**
   * Update data on server
   * @param url Endpoint link
   * @param body Data to send over server
   * @param params Embed as query params
   * @return Promise
   */
  put(url, body, params) {
    return axios.put(`${baseURL}/${url}`, body, {
      ...params,
      cancelToken: this.source.token,
    });
  }

  updateCancelToken() {
    this.source = this.CancelToken.source();
  }

  cancel() {
    this.source.cancel('Explicitly cancelled HTTP request');
    this.updateCancelToken();
  }
}

export { HttpService };