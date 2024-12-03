import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateTask from '../components/CreateTask';
import  useMainStore  from '../zustand/mainStore';

jest.mock('../zustand/mainStore');

describe('CreateTask Component', () => {

  const mockSetCreateMenuOpen = jest.fn();
  const mockSetTaskUpdated = jest.fn();
  const mockCreateTask = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    (useMainStore as unknown as jest.Mock).mockReturnValue({
      createTask: mockCreateTask,
    });
  });

  test('should render when createMenuOpen is true', () => {
    render(
      <CreateTask
        createMenuOpen={true}
        setCreateMenuOpen={mockSetCreateMenuOpen}
        setTaskUpdated={mockSetTaskUpdated}
      />
    );

    expect(screen.getByText('Create New Task')).toBeInTheDocument();
  });

  test('should submit form and call createTask', async () => {
    render(
      <CreateTask
        createMenuOpen={true}
        setCreateMenuOpen={mockSetCreateMenuOpen}
        setTaskUpdated={mockSetTaskUpdated}
      />
    );

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Task Description' } });
    fireEvent.click(screen.getByLabelText('2'));

    fireEvent.click(screen.getByText('SUBMIT'));

    await waitFor(() => expect(mockCreateTask).toHaveBeenCalled());

    expect(mockSetTaskUpdated).toHaveBeenCalled();
    expect(mockSetCreateMenuOpen).toHaveBeenCalledWith(false);
  });
});