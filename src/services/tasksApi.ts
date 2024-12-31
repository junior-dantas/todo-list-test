import axios from "axios";
import { Task } from "@/types/task";

const api = axios.create({
  baseURL: "http://localhost:3001", 
});

export async function fetchTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>("/tasks");
  return data;
}

export async function createTask(task: Task): Promise<Task> {
    const { data } = await api.post<Task>("/tasks", task);
    return data;
  }

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
