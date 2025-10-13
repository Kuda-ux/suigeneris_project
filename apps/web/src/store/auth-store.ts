import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiClient } from '@/lib/api';
import type { User, LoginForm, RegisterForm } from '@/types';

interface AuthStore {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginForm) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.login(credentials.email, credentials.password);
          
          if (response.success) {
            const { user, accessToken, refreshToken } = response.data;
            
            // Store token in localStorage for API client
            localStorage.setItem('auth_token', accessToken);
            
            set({
              user,
              token: accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.register(userData);
          
          if (response.success) {
            const { user, accessToken, refreshToken } = response.data;
            
            // Store token in localStorage for API client
            localStorage.setItem('auth_token', accessToken);
            
            set({
              user,
              token: accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        // Clear token from localStorage
        localStorage.removeItem('auth_token');
        
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      refreshAuth: async () => {
        const { refreshToken } = get();
        
        if (!refreshToken) {
          get().logout();
          return;
        }

        try {
          const response = await apiClient.refreshToken(refreshToken);
          
          if (response.success) {
            const { accessToken, refreshToken: newRefreshToken } = response.data;
            
            // Store new token in localStorage
            localStorage.setItem('auth_token', accessToken);
            
            set({
              token: accessToken,
              refreshToken: newRefreshToken,
              error: null,
            });
          } else {
            get().logout();
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().logout();
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Auto-refresh token on store initialization
if (typeof window !== 'undefined') {
  const store = useAuthStore.getState();
  if (store.token && store.refreshToken) {
    // Set token in localStorage for immediate use
    localStorage.setItem('auth_token', store.token);
    
    // Check if token needs refresh (you might want to decode JWT to check expiry)
    // For now, we'll just attempt refresh on app load
    store.refreshAuth().catch(() => {
      console.log('Token refresh failed on app load');
    });
  }
}
