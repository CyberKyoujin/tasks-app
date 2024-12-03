import { act } from '@testing-library/react';
import useMainStore from '../zustand/mainStore';
import axiosInstance from '../zustand/axiosInstance';
import { Task } from '../types';


jest.mock('../zustand/axiosInstance');


describe("useMainStore", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        useMainStore.setState({
          tasks: [],
          isLoading: false,
          error: null,
        });
    });

    test('should render initial state correct', () => {
        const state = useMainStore.getState();
        expect(state.tasks).toEqual([]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
    });

    test('setTasks updates the tasks state', () => {
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Task 1',
            description: 'Description 1',
            is_completed: false,
            is_missed: false,
            due_date: '2023-12-31',
            priority: "1",
            completed_at: '',
          },
        ];
      
        act(() => {
          useMainStore.getState().setTasks(mockTasks);
        });
      
        const state = useMainStore.getState();
        expect(state.tasks).toEqual(mockTasks);
    });

    test('should update tasks on success of fetchTasks', async () => {
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Task 1',
            description: 'Description 1',
            is_completed: false,
            is_missed: false,
            due_date: '2023-12-31',
            priority: "1",
            completed_at: '',
          },
        ];
      
        const mockedAxiosGet = axiosInstance.get as jest.Mock;
        mockedAxiosGet.mockResolvedValue({ status: 200, data: mockTasks });
      
        await act(async () => {
          await useMainStore.getState().fetchTasks();
        });
      
        const state = useMainStore.getState();
        expect(state.tasks).toEqual(mockTasks);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
    });

    test('should handle fetchTasks errors', async () => {
        const errorMessage = 'Network Error';
        const error = new Error(errorMessage);
        (error as any).status = 400;
      
        const mockedAxiosGet = axiosInstance.get as jest.Mock;
        mockedAxiosGet.mockRejectedValue(error);
      
        await act(async () => {
          await useMainStore.getState().fetchTasks();
        });
      
        const state = useMainStore.getState();
        expect(state.tasks).toEqual([]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(errorMessage);
    });

    test('createTask should update the state', async () => {
        const formData = new FormData();
        formData.append('title', 'New Task');
      
        const mockedAxiosPost = axiosInstance.post as jest.Mock;
        mockedAxiosPost.mockResolvedValue({ status: 201 });
      
        await act(async () => {
          await useMainStore.getState().createTask(formData);
        });
      
        const state = useMainStore.getState();
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
    });

    test('createTask should handle errors', async () => {
        const formData = new FormData();
        formData.append('title', 'New Task');
      
        const errorMessage = 'Failed to create task';
        const error = new Error(errorMessage);
      
        const mockedAxiosPost = axiosInstance.post as jest.Mock;
        mockedAxiosPost.mockRejectedValue(error);
      
        await act(async () => {
          await useMainStore.getState().createTask(formData);
        });
      
        const state = useMainStore.getState();
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(error);
    });

    test('markCompleted should update the state', async () => {
        const taskId = '1';
      
        const mockedAxiosPost = axiosInstance.post as jest.Mock;
        mockedAxiosPost.mockResolvedValue({ status: 200 });
      
        await act(async () => {
          await useMainStore.getState().markCompleted(taskId);
        });
      
        const state = useMainStore.getState();
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
    });

    test('markCompleted should handle errors', async () => {
        const taskId = '1';
      
        const errorMessage = 'Failed to mark task as completed';
        const error = new Error(errorMessage);
      
        const mockedAxiosPost = axiosInstance.post as jest.Mock;
        mockedAxiosPost.mockRejectedValue(error);
      
        await act(async () => {
          await useMainStore.getState().markCompleted(taskId);
        });
      
        const state = useMainStore.getState();
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(error);
    });

    test('deleteTask should update the state', async () => {
        const taskId = '1';
      
        const mockedAxiosDelete = axiosInstance.delete as jest.Mock;
        mockedAxiosDelete.mockResolvedValue({ status: 204 });
      
        await act(async () => {
          await useMainStore.getState().deleteTask(taskId);
        });
      
        const state = useMainStore.getState();
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
    });

    test('deleteTask should handle errors', async () => {
        const taskId = '1';
      
        const errorMessage = 'Failed to delete task';
        const error = new Error(errorMessage);
      
        const mockedAxiosDelete = axiosInstance.delete as jest.Mock;
        mockedAxiosDelete.mockRejectedValue(error);
      
        await act(async () => {
          await useMainStore.getState().deleteTask(taskId);
        });
      
        const state = useMainStore.getState();
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(error);
    });
    
})