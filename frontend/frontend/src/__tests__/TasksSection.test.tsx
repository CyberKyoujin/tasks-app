import { render, screen, fireEvent } from '@testing-library/react';
import TasksSection from '../components/TasksSection';
import { CiBoxList } from 'react-icons/ci';
import  useAuthStore from '../zustand/authStore';

jest.mock('../zustand/authStore');

describe('TasksSection Component', () => {
    const mockSetCreateMenuOpen = jest.fn();
    const mockSetTaskUpdated = jest.fn();
    const mockSetDropdownOpen = jest.fn();
  
    const tasks = [
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
  
    beforeEach(() => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: true,
      });
    });
  
    test('should render title and icon', () => {
      render(
        <TasksSection
          tasks={tasks}
          title="Active Tasks"
          IconComponent={CiBoxList}
          setCreateMenuOpen={mockSetCreateMenuOpen}
          setTaskUpdated={mockSetTaskUpdated}
          setDropdownOpen={mockSetDropdownOpen}
        />
      );
  
      expect(screen.getByText(/Active Tasks/i)).toBeInTheDocument();
    });
  
    test('should render tasks', () => {
      render(
        <TasksSection
          tasks={tasks}
          title="Active Tasks"
          IconComponent={CiBoxList}
          setCreateMenuOpen={mockSetCreateMenuOpen}
          setTaskUpdated={mockSetTaskUpdated}
          setDropdownOpen={mockSetDropdownOpen}
        />
      );
  
      expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    });
  
    test('should display "No tasks found" when task list is empty', () => {
      render(
        <TasksSection
          tasks={[]}
          title="Active Tasks"
          IconComponent={CiBoxList}
          setCreateMenuOpen={mockSetCreateMenuOpen}
          setTaskUpdated={mockSetTaskUpdated}
          setDropdownOpen={mockSetDropdownOpen}
        />
      );
  
      expect(screen.getByText('No tasks found.')).toBeInTheDocument();
    });
  
    test('should call setCreateMenuOpen when the button is clicked', () => {
      render(
        <TasksSection
          tasks={[]}
          title="Active Tasks"
          IconComponent={CiBoxList}
          setCreateMenuOpen={mockSetCreateMenuOpen}
          setTaskUpdated={mockSetTaskUpdated}
          setDropdownOpen={mockSetDropdownOpen}
        />
      );
  
      const addButton = screen.getByRole('button');
      fireEvent.click(addButton);
  
      expect(mockSetCreateMenuOpen).toHaveBeenCalledWith(true);
    });

    test('should call setDropdownOpen if the user is not authenticated when the button is clicked', () => {

        (useAuthStore as unknown as jest.Mock).mockReturnValue({
            isAuthenticated: false,
        });

        render(
          <TasksSection
            tasks={[]}
            title="Active Tasks"
            IconComponent={CiBoxList}
            setCreateMenuOpen={mockSetCreateMenuOpen}
            setTaskUpdated={mockSetTaskUpdated}
            setDropdownOpen={mockSetDropdownOpen}
          />
        );
    
        const addButton = screen.getByRole('button');
        fireEvent.click(addButton);
    
        expect(mockSetDropdownOpen).toHaveBeenCalledWith(true);
    });

  });