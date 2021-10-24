import type { SerializedError } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export const httpClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

const isAxiosError = (value: unknown): value is AxiosError<{ message: string }, unknown> => axios.isAxiosError(value);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
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
