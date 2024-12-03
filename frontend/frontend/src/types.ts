import { IconType } from "react-icons";

export interface Task {
    id: string;
    title: string;
    description: string;
    is_completed: boolean;
    priority: string;
    due_date: string;
    is_missed: boolean;
    completed_at: string;
}

export interface MainState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    setTasks: (tasks: Task[]) => void;
    fetchTasks: () => Promise<void>;
    createTask: (formData: FormData) => Promise<void>;
    markCompleted: (taskId: string) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    date_joined: string;
    tasks: string;
}

export interface AuthState {
    authTokens: AuthTokens | null;
    isAuthenticated: boolean;
    user: User | null;
    setTokens: (tokens: AuthTokens) => void;
    setUser: (user: User) => void;
    registerUser: (username: string, email: string, password: string) => Promise<void>;
    loginUser: (username: string, password: string) => Promise<void>;
    refreshToken: () => Promise<void>;
    logoutUser: () => void;
}

export interface TaskObject {
    id: string;
    title: string;
    description: string;
    is_completed: boolean;
    priority: string;
    due_date: string;
    is_missed: boolean;
    completed_at: string;
}

export interface TasksSectionProps {
    tasks: TaskObject[];
    title: string;
    IconComponent: IconType;
    setCreateMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProfileDropdwnProps {
    isOpen: boolean;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface OverlayProps {
    createMenuOpen: boolean;
    setCreateMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface NavbarProps {
    isDropdownOpen: boolean;
    setIsDropdownOpen: (open: boolean) => void;
}

export interface CreateTaskProps {
    createMenuOpen: boolean;
    setCreateMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskUpdated: React.Dispatch<React.SetStateAction<boolean>>; // New prop
  }