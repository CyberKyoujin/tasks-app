import { render, screen, fireEvent, act } from '@testing-library/react';
import ProfileDropdown from '../components/ProfileDropdown';
import useAuthStore from '../zustand/authStore';

jest.mock('../zustand/authStore');

describe('ProfileDropdown Component', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  })

  const mockSetIsDropdownOpen = jest.fn();

  test('should display user info when authenticated and call logout if the button is clicked', () => {

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { username: 'testuser', date_joined: '01-01-2023', tasks: '5' },
      logoutUser: jest.fn(),
    });

    render(
      <ProfileDropdown isOpen={true} setIsDropdownOpen={mockSetIsDropdownOpen} />
    );

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('Joined 01-01-2023')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);

    expect(useAuthStore().logoutUser).toHaveBeenCalled();
  });

  test('should display login and register tabs when not authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      registerUser: jest.fn(),
      loginUser: jest.fn(),
    });

    render(
      <ProfileDropdown isOpen={true} setIsDropdownOpen={mockSetIsDropdownOpen} />
    );

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  test('should call loginUser if the login tab is active', async () => {
    const mockLoginUser = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      registerUser: jest.fn(),
      loginUser: mockLoginUser,
    });
  
    render(<ProfileDropdown isOpen={true} setIsDropdownOpen={() => {}} />);
  
    fireEvent.click(screen.getByRole('tab', { name: 'Log In' }));
  
    fireEvent.change(screen.getByLabelText('username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: 'password123' } });
  
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
  
    expect(mockLoginUser).toHaveBeenCalledWith('testuser', 'password123');
  });

  test('should call registerUser if the register tab is active', async () => {
    const mockRegisterUser = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      registerUser: mockRegisterUser,
      loginUser: jest.fn(),
    });
  
    render(<ProfileDropdown isOpen={true} setIsDropdownOpen={() => {}} />);
  
    fireEvent.change(screen.getByLabelText('username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@example.net' } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: 'password123' } });
  
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
  
    expect(mockRegisterUser).toHaveBeenCalledWith('testuser', 'test@example.net', 'password123');
  });


});