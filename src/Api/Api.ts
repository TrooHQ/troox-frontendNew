import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { generateHandoffState } from "../utils/handoff";

export const SERVER_DOMAIN =
  import.meta.env.VITE_APP_SERVER_DOMAIN || "https://core-staging.trootab.com";
export const PAYMENT_DOMAIN = import.meta.env.VITE_APP_PAYMENT_DOMAIN;
export const AUTH_UI_URL =
  import.meta.env.VITE_AUTH_UI_URL || "https://troo-phoenix-core.netlify.app";

type TokenUpdateCallback = (token: string | null) => void;
let tokenUpdateCallback: TokenUpdateCallback | null = null;

export function setTokenUpdateCallback(callback: TokenUpdateCallback) {
  tokenUpdateCallback = callback;
}

function getToken(): string | null {
  return (
    localStorage.getItem("token") || sessionStorage.getItem("access_token")
  );
}

function updateTokenStorage(token: string) {
  localStorage.setItem("token", token);
  sessionStorage.setItem("access_token", token);
  tokenUpdateCallback?.(token);
}

function clearTokenStorage() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("access_token");
  tokenUpdateCallback?.(null);
}

function redirectToAuthUI() {
  clearTokenStorage();
  // Merchant-initiated flow: pass redirect_uri and state so user returns to our callback after login
  const state = generateHandoffState();
  sessionStorage.setItem("auth_state", state);
  const redirectUri = `${window.location.origin}/auth/callback`;
  const params = new URLSearchParams({ redirect_uri: redirectUri, state });
  window.location.href = `${AUTH_UI_URL}/login?${params}`;
}

export const api: AxiosInstance = axios.create({
  baseURL: SERVER_DOMAIN.replace(/\/+$/, ""),
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh/");
    if (isRefreshRequest || originalRequest?._retry) {
      redirectToAuthUI();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await axios.post<{
        access_token?: string;
        access?: string;
      }>(`${SERVER_DOMAIN}/auth/refresh/`, {}, { withCredentials: true });

      const newToken =
        response.data.access_token || response.data.access || "";
      if (!newToken) {
        redirectToAuthUI();
        return Promise.reject(error);
      }

      updateTokenStorage(newToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return api(originalRequest);
    } catch {
      redirectToAuthUI();
      return Promise.reject(error);
    }
  }
);
