import { useAuthStore } from "@/store/user/userAuthStore";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // penting untuk kirim cookie (refresh token)
});

// Request Interceptor → Inject accessToken dari Zustand
instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Jika config memiliki data berupa FormData, ubah Content-Type menjadi multipart/form-data
  if (config.data instanceof FormData) {
    config.headers = config.headers || {};
    config.headers["Content-Type"] = "multipart/form-data";
  }

  return config;
});

// Response Interceptor → Refresh token jika 401
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, setAccessToken, reset } = useAuthStore.getState();

      if (!refreshToken) {
        reset();
        return Promise.reject("No refresh token");
      }

      try {
        interface RefreshTokenResponse {
          success: boolean;
          message: string;
          data: {
            access_token: string;
          };
        }

        const response = await axios.post<RefreshTokenResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
          refreshToken, // dikirim via body
        });

        const newAccessToken = response.data.data.access_token;
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest); // retry original request
      } catch (refreshError) {
        useAuthStore.getState().reset();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
