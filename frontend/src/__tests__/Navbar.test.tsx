import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import useAuthStore from '../zustand/authStore';

jest.mock('../zustand/authStore');

describe('Navbar Component', () => {

  const mockSetIsDropdownOpen = jest.fn();

  test('should render with user information when authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { username: 'testuser' },
      isAuthenticated: true,
    });

    render(<Navbar isDropdownOpen={false} setIsDropdownOpen={mockSetIsDropdownOpen} />);

    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  test('should render placeholder when not authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
    });

    render(<Navbar isDropdownOpen={false} setIsDropdownOpen={mockSetIsDropdownOpen} />);

    expect(screen.getByText('Please, log in!')).toBeInTheDocument();
  });

  test('should toggle dropdown when avatar is clicked', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { username: 'testuser' },
      isAuthenticated: true,
    });

    render(<Navbar isDropdownOpen={false} setIsDropdownOpen={mockSetIsDropdownOpen} />);

    const container = screen.getByTestId('navbar'); 
    fireEvent.click(container);

    expect(mockSetIsDropdownOpen).toHaveBeenCalledWith(true);
  });
});