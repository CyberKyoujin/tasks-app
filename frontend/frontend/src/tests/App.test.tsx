import { render, screen } from '@testing-library/react';
import App from '../App';
import  useMainStore  from '../zustand/mainStore';
import  useAuthStore  from '../zustand/authStore';
import { jest } from '@jest/globals';


jest.mock('../zustand/mainStore');
jest.mock('../zustand/authStore');

describe('App Component', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should render loading state', () => {
  
    const mockedUseMainStore = useMainStore as unknown as jest.Mock;
    mockedUseMainStore.mockReturnValue({
      isLoading: true,
      tasks: [],
      error: null,
      fetchTasks: jest.fn(),
    });

    const mockedUseAuthStore = useAuthStore as unknown as jest.Mock;
    mockedUseAuthStore.mockReturnValue({
      user: { username: 'testuser' },
      refreshToken: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
  });

  
});
