import type { Task } from "../types/task";

const API_URL = import.meta.env.VITE_API_URL;

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}


export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/api/tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const result: ApiResponse<Task[]> = await response.json();

  return result.data;
};

export const createTask = async (
  task: CreateTaskInput
): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const result: ApiResponse<Task> = await response.json();

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to create task" : "Failed to create task"
    );
  }

  return result.data;
};

export const updateTask = async (
  id: string,
  completed: boolean
): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  const result = await response.json();

  return result.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};