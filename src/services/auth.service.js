import axios from 'axios';

export async function authLogin(email, password) {
  const response = await axios.post('/Auth/Login', { email, password }, {
    baseURL: import.meta.env.VITE__BASE_URL_API
  });
  return response.data;
}