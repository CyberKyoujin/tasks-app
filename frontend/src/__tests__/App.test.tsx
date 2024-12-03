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
  
    (useMainStore as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      tasks: [],
      error: null,
      fetchTasks: jest.fn(),
    });

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { username: 'testuser' },
      refreshToken: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText(/Loading tasks/i)).toBeInTheDocument();
  });

  test('should render error message', () => {
  
    (useMainStore as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      tasks: [],
      error: "Error message",
      fetchTasks: jest.fn(),
    });

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { username: 'testuser' },
      refreshToken: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText(/Error fetching tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Error message/i)).toBeInTheDocument();
  });

  test ("should render tasks if loaded", () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        is_completed: false,
        priority: '1',
        due_date: '2023-12-31',
        is_missed: false,
        completed_at: '',
      },
    ];

    (useMainStore as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      tasks: mockTasks,
      error: null,
      fetchTasks: jest.fn(),
    });

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { username: 'testuser' },
      refreshToken: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText(/Active tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
  })

  
});
