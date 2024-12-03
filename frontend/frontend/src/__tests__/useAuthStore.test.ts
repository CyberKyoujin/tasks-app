
import useAuthStore from '../zustand/authStore';
import axiosInstance from '../zustand/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { act } from '@testing-library/react';

// Mock axiosInstance
jest.mock('../zustand/axiosInstance');

// Mock jwtDecode
jest.mock('jwt-decode');

describe('useAuthStore', () => {
    
    beforeEach(() => {
      jest.resetAllMocks();
      useAuthStore.setState(useAuthStore.getState());
      localStorage.clear();
    });
  
    test('should update state on setTokens', () => {
      const tokens = {
        access: 'access_token',
        refresh: 'refresh_token',
      };
  
      const decodedUser = { id: '1', username: 'testuser' };
  
      const mockedJwtDecode = jwtDecode as jest.Mock;
      mockedJwtDecode.mockReturnValue(decodedUser);
  
      act(() => {
        useAuthStore.getState().setTokens(tokens);
      });
  
      const state = useAuthStore.getState();
      expect(state.user).toEqual(decodedUser);
      expect(state.authTokens).toEqual(tokens);
    });

    test('should update the user state on setUser', () => {
        const user = { id: '1', username: 'testuser',  email: "test@example.net", date_joined: "01-01-2024", tasks: "1" };
      
        act(() => {
          useAuthStore.getState().setUser(user);
        });
      
        const state = useAuthStore.getState();
        expect(state.user).toEqual(user);
      });

    test('should call API and handle success on registerUser ', async () => {
        const mockedAxiosPost = axiosInstance.post as jest.Mock;
        mockedAxiosPost.mockResolvedValue({ status: 201 });
      
        await act(async () => {
          await useAuthStore.getState().registerUser('testuser', 'test@example.com', 'password123');
        });
      
        expect(mockedAxiosPost).toHaveBeenCalledWith('/users/register/', {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });
        
    });
  
    test('should cals API and update state on loginUser', async () => {

      const tokens = {
        access: 'access_token',
        refresh: 'refresh_token',
      };

      const decodedUser = { id: '1', username: 'testuser' };
  
      const mockedAxiosPost = axiosInstance.post as jest.Mock;
      mockedAxiosPost.mockResolvedValue({ status: 200, data: tokens });
  
      const mockedJwtDecode = jwtDecode as jest.Mock;
      mockedJwtDecode.mockReturnValue(decodedUser);
  
      await act(async () => {
        await useAuthStore.getState().loginUser('testuser', 'password123');
      });
  
      const state = useAuthStore.getState();
      expect(state.user).toEqual(decodedUser);
      expect(state.authTokens).toEqual(tokens);
      expect(mockedAxiosPost).toHaveBeenCalledWith('/users/login/', {
        username: 'testuser',
        password: 'password123',
      });

    });

    test('should update token on refreshToken', async () => {
        localStorage.setItem('refresh', 'refresh_token');
        const newTokens = { access: 'new_access_token', refresh: 'new_refresh_token' };
        const mockedAxiosPost = axiosInstance.post as jest.Mock;
        mockedAxiosPost.mockResolvedValue({ status: 200, data: newTokens });
      
        await act(async () => {
          await useAuthStore.getState().refreshToken();
        });
      
        const state = useAuthStore.getState();
        expect(state.authTokens).toEqual(newTokens);
        expect(localStorage.getItem('access')).toBe('new_access_token');
        expect(localStorage.getItem('refresh')).toBe('new_refresh_token');
    });

    test('should handle API errors on refreshToken', async () => {
        localStorage.setItem('refresh', 'invalid_refresh_token');
        const mockedAxiosPost = axiosInstance.post as jest.Mock;
        const error = new Error('Invalid token');
        mockedAxiosPost.mockRejectedValue(error);
      
        await expect(useAuthStore.getState().refreshToken()).rejects.toThrow('Invalid token');
      
    });

    test('should clear tokens and update state on logoutUser', () => {

        localStorage.setItem('access', 'access_token');
        localStorage.setItem('refresh', 'refresh_token');

        useAuthStore.setState({
          authTokens: { access: 'access_token', refresh: 'refresh_token' },
          isAuthenticated: true,
          user: { id: '1', username: 'testuser',  email: "test@example.net", date_joined: "01-01-2024", tasks: "1" },
        });
      
        act(() => {
          useAuthStore.getState().logoutUser();
        });
      
        const state = useAuthStore.getState();
        expect(state.authTokens).toBeNull();
        expect(state.isAuthenticated).toBe(false);
        expect(state.user).toBeNull();
        expect(localStorage.getItem('access')).toBeNull();
        expect(localStorage.getItem('refresh')).toBeNull();
    });

    

  });