import { render, screen, fireEvent } from '@testing-library/react';
import Task from '../components/Task';
import useMainStore  from '../zustand/mainStore';

jest.mock('../zustand/mainStore');

describe('Task Component', () => {

    const taskProps = {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      is_completed: false,
      priority: '1',
      due_date: '2023-12-31',
      is_missed: false,
      completed_at: '',
    };
  
    const mockMarkCompleted = jest.fn();
    const mockDeleteTask = jest.fn();
    const mockSetTasks = jest.fn();
  
    beforeEach(() => {
      (useMainStore as unknown as jest.Mock).mockReturnValue({
        markCompleted: mockMarkCompleted,
        deleteTask: mockDeleteTask,
        setTasks: mockSetTasks,
        tasks: [taskProps],
      });
    });
  
    test('renders task details', () => {
      render(<Task {...taskProps} />);
  
      expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Due to 2023-12-31/i)).toBeInTheDocument();
    });
  
    test('calls handleMarkCompleted when complete button is clicked', () => {
      render(<Task {...taskProps} />);
  
      const completeButton = screen.getByRole('button', { name: "complete_btn" });
      fireEvent.click(completeButton);
  
      expect(mockMarkCompleted).toHaveBeenCalledWith('1');
    });
  
    test('calls handleDelete when delete button is clicked', () => {
      render(<Task {...taskProps} />);
  
      const deleteButton = screen.getByRole('button', { name: "delete_btn" });
      fireEvent.click(deleteButton);
  
      expect(mockDeleteTask).toHaveBeenCalledWith('1');
    });
  });