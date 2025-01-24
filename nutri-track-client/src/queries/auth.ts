import axiosInstance from "../axiosInstance";
import { RegistrationData } from "../views/Registration/types";

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const AUTH_ROUTE = "/auth";
// Login function
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post(`${AUTH_ROUTE}/login`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Register function
export const register = async (
  payload: RegistrationData
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post(
      `${AUTH_ROUTE}/register`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Logout function
export const logout = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.get(
      `${AUTH_ROUTE}/logout`, { headers: {"authorization" : `Bearer ${refreshToken}`} }
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
