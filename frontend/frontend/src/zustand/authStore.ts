import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axiosInstance";

interface AuthTokens {
    access: string;
    refresh: string;
}

interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    date_joined: string;
    tasks: string;
}

interface AuthState {
    authTokens: AuthTokens | null;
    isAuthenticated: boolean;
    user: User | null;
    setTokens: (tokens: AuthTokens) => void;
    setUser: (user: User) => void;
    registerUser: (username: string, email: string, password: string) => Promise<void>;
    loginUser: (username: string, password: string) => Promise<void>;
    refreshToken: () => Promise<void>;
    logoutUser: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
    authTokens: localStorage.getItem('access') && localStorage.getItem('refresh') 
    ? { access: localStorage.getItem('access') as string, 
        refresh: localStorage.getItem('refresh') as string } 
    : null,
    isAuthenticated: !!localStorage.getItem('access') && !!localStorage.getItem('refresh'),
    user: localStorage.getItem('access') ? (jwtDecode(localStorage.getItem('access') as string) as User) : null,

    setTokens: (tokens: AuthTokens) => {
        if (tokens) {
            set({
                authTokens: tokens,
                isAuthenticated: true,
                user: jwtDecode(tokens.access) as User,
            })
        } else {
            set({ authTokens: null, isAuthenticated: false, user: null });
        }
    },

    setUser: (user: User) => {set({ user });},

    registerUser: async (username: string, email: string, password: string) => {
        try{
            const response = await axiosInstance.post("/users/register/", {username, email, password});
            if (response.status === 201) {
                console.log("User created successfully!");
                window.location.href = "/";
            }
        } catch (error: any) {
            console.error("Error creating user:", error.message);
            throw error;
        }
    },

    loginUser: async (username: string, password: string) => {
        try{
            const response = await axiosInstance.post("/users/login/", {username, password});
            if (response.status === 200) {
                const { access, refresh } = response.data;
                const tokens: AuthTokens = { access, refresh };
                localStorage.setItem("access", tokens.access);
                localStorage.setItem("refresh", tokens.refresh);
                set({authTokens: tokens});
                set({user: jwtDecode(access) as User});
                window.location.href = "/";
            }
        } catch (error: any) {
            console.error("Error logging in:", error.message);
            throw error;
        }
    },

    refreshToken: async () => {
        try{
            const refreshToken = localStorage.getItem("refresh");
            if (refreshToken) {
                const response = await axiosInstance.post("/users/token-refresh/", {refresh: refreshToken});
                const { access, refresh } = response.data;
                localStorage.setItem("refresh", refresh);
                localStorage.setItem("access", access);
                set({authTokens: { access, refresh }});
            } else {
                get().logoutUser();
                throw new Error('Refresh token not found');
            }
        } catch (error: any) {
            console.error("Error refreshing token:", error.message);
            throw error;
        }
    },

    logoutUser: () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        set({ authTokens: null, isAuthenticated: false, user: null });
    },

}))

export default useAuthStore;