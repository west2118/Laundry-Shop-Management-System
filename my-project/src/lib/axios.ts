import axios from 'axios';

// Get token from localStorage
export const getAccessToken = () => localStorage.getItem('accessToken');
export const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);
export const removeAccessToken = () => localStorage.removeItem('accessToken');

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true, // Send cookies with request
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401s and refresh tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          'http://localhost:8080/api/v1/auth/refresh-token',
          {},
          { withCredentials: true }
        );

        setAccessToken(data.accessToken);

        // Update the authorization header and retry original request
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        removeAccessToken();
        if (
          window.location.pathname !== '/login'
        ) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
