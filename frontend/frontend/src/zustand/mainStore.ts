import { create } from "zustand";
import axiosInstance from "./axiosInstance";

interface Task {
    id: string;
    title: string;
    description: string;
    is_completed: boolean;
    priority: string;
    due_date: string;
    is_missed: boolean;
    completed_at: string;
}


interface MainState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    setTasks: (tasks: Task[]) => void;
    fetchTasks: () => Promise<void>;
    createTask: (formData: FormData) => Promise<void>;
    markCompleted: (taskId: string) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
}


const useMainStore = create<MainState>((set) => ({
    tasks: [],
    isLoading: false,
    error: null,
    
    setTasks: (tasks: Task[]) => {
        set({ tasks });
    },

    fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/tasks/");
            if (response.status === 200) {
                set({ tasks: response.data, isLoading: false, error: null });
            }
        } catch (error: any) {
            if (error.status === 500) {
                set({ tasks: [], isLoading: false, error: null });
            } else {
                set({ tasks: [], isLoading: false, error: error.message || "An error occurred" });
                console.error("Error while fetching tasks:", error);
            }
        }
    },

    createTask: async (formData: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post("/tasks/create/", formData);
            if (response.status === 201) {
                console.log("Task created successfully!");
                set({isLoading: false, error: null})
            } else {
                set({ isLoading: false, error: "Failed to create task" });
            }
        } catch (error: any) {
            set({isLoading: false, error: error})
        }
    },

    markCompleted: async (taskId: string) => {
        set({ isLoading: true, error: null});
        try {
            const response = await axiosInstance.post(`/tasks/complete/${taskId}/`);
            if (response.status === 200) {
                console.log("Task marked as completed!");
                set({ isLoading: false, error: null })
            } else {
                set({ isLoading: false, error: "Failed to mark task as completed" });
            }
        } catch (error: any) {
            set({isLoading: false, error: error})
            console.error("Error message: " + error.message);
        }
    },

    deleteTask: async (taskId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.delete(`/tasks/delete/${taskId}/`);
            if (response.status === 204) {
                console.log("Task deleted successfully!");
                set({ isLoading: false, error: null })
            } else {
                set({ isLoading: false, error: "Failed to delete task" });
            }
        } catch (error: any) {
            set({isLoading: false, error: error})
            console.error("Error message: " + error.message);
        }
    }


}))


export default useMainStore;