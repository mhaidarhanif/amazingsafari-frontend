import { User } from "@/types";
import { BACKEND_API_URL } from "@/libs/env";
import { accessToken } from "@/libs/access-token";
import { UserLogin, UserRegister } from "@/schemas/user";

export type Auth = {
  isAuthenticated: boolean;
  getToken: () => string;
  register(userRegister: UserRegister): Promise<void | null>;
  login(userLogin: UserLogin): Promise<void | null>;
  checkUser(): Promise<User | undefined>;
  logout(): void;
};

export const auth: Auth = {
  isAuthenticated: false,

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
    try {
      const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(userLogin),
        headers: { "Content-Type": "application/json" },
      });

      const data: { token?: string; user?: User } = await response.json();
      if (!data.token) return null;

      accessToken.set(data.token);
      auth.isAuthenticated = true;
    } catch (error) {
      accessToken.remove();
      auth.isAuthenticated = false;
    }
  },

  async checkUser() {
    const token = accessToken.get();

    if (token) {
      try {
        const response = await fetch(`${BACKEND_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user: User = await response.json();

        auth.isAuthenticated = true;
        return user;
      } catch (error) {
        accessToken.remove();
        auth.isAuthenticated = false;
      }
    }
  },

  logout() {
    accessToken.remove();
    auth.isAuthenticated = false;
  },
};
