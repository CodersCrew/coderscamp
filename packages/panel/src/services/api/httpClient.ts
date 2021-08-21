import type { SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const serializedError: SerializedError = {
        name: error.response?.statusText,
        code: String(error.response?.status),
        message: error.response?.data.message,
      };

      return Promise.reject(serializedError);
    }

    return Promise.reject(error);
  },
);
