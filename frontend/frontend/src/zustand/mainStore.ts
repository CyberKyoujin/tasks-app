import { create } from "zustand";
import axiosInstance from "./axiosInstance";

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: string;
    dueDate: string;
    isMissed: boolean;
}


interface MainState {
    tasks: Task[] | null;
    isLoading: boolean;
    error: string | null;
    setTasks: (tasks: Task[]) => void;
    fetchTasks: () => Promise<void>;
    createTask: (formData: FormData) => Promise<void>;
    updateTask: (taskId: string, formData: FormData) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
}


const useMainStore = create<MainState>((set, get) => ({
    tasks: null,
    isLoading: false,
    error: null,
    
    setTasks: (tasks: Task[]) => {
        set({ tasks });
    },

    fetchTasks: async () => {
        set({isLoading: true, error: null});
        try{
            const response = await axiosInstance.get("/tasks");
            if (response.status === 200) {
                set({isLoading: false, error: null });
                get().setTasks(response.data);
            } else {
                set({ tasks: null, isLoading: false, error: "Failed to fetch tasks" });
                throw new Error("Failed to fetch tasks");    
            }
        } catch (error: any) {
            set({ tasks: null, isLoading: false, error: error });
        }
    },

    createTask: async (formData: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post("/tasks/create", formData);
            if (response.status === 200) {
                console.log("Task created successfully!");
                set({isLoading: false, error: null})
            } else {
                throw new Error("Failed to create task");
                set({ isLoading: false, error: "Failed to create task" });
            }
        } catch (error: any) {
            set({isLoading: false, error: error})
        }
    },

    updateTask: async (taskId: string, formData: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.put(`/tasks/${taskId}/update`, formData);
            if (response.status === 200) {
                console.log("Task updated successfully!");
                set({ isLoading: false, error: null })
            } else {
                set({ isLoading: false, error: "Failed to update task" });
                throw new Error("Failed to update task");
            }
        } catch (error: any) {
            set({ isLoading: false, error: error })
        }
    },

    deleteTask: async (taskId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.delete(`/tasks/${taskId}/delete`);
            if (response.status === 200) {
                console.log("Task deleted successfully!");
                set({ isLoading: false, error: null })
            } else {
                set({ isLoading: false, error: "Failed to delete task" });
                throw new Error("Failed to delete task");
            }
        } catch (error: any) {
            set({ isLoading: false, error: error })
        }
    }


}))


export default useMainStore;