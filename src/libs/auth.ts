import { User } from "@/types";
import { BACKEND_API_URL } from "@/libs/env";
import { accessToken } from "@/libs/access-token";
import { UserLogin, UserRegister } from "@/schemas/user";

export type AuthProvider = {
  isAuthenticated: boolean;
  user: User | null;
  getToken: () => string;
  register(userRegister: UserRegister): Promise<void | null>;
  login(userLogin: UserLogin): Promise<void | null>;
  checkUser(): Promise<User | undefined>;
  logout(): void;
};

export const authProvider: AuthProvider = {
  isAuthenticated: false,
  user: null,

  getToken() {
    return accessToken.get();
  },

  async register(userRegister: UserRegister) {
    const response = await fetch(`${BACKEND_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(userRegister),
      headers: { "Content-Type": "application/json" },
    });

    const user: User = await response.json();
    if (!user) return null;
  },

  async login(userLogin: UserLogin) {
    const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: { "Content-Type": "application/json" },
    });

    const data: { token: string; user: User } = await response.json();
    if (!data) return null;

    authProvider.isAuthenticated = true;
    accessToken.set(data.token);
  },

  async checkUser() {
    const token = accessToken.get();

    if (token) {
      try {
        const response = await fetch(`${BACKEND_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user: User = await response.json();

        authProvider.isAuthenticated = true;
        authProvider.user = user;

        return user;
      } catch (error) {
        accessToken.remove();
        authProvider.isAuthenticated = false;
        authProvider.user = null;
      }
    }
  },

  logout() {
    accessToken.remove();
    authProvider.isAuthenticated = false;
    authProvider.user = null;
  },
};
