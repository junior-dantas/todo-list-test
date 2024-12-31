"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast, Toaster } from "react-hot-toast";
import { z } from "zod";
import { useState, useEffect } from "react";
import { FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";

import { fetchTasks, createTask, deleteTask } from "@/services/tasksApi";
import CreateTasksModal from "@/components/modal/create-tasks-modal";
import DeleteTaskModal from "@/components/modal/delete-tasks-modal";
import { Task } from "@/types/task";

const taskSchema = z.object({
  title: z.string().nonempty("O título é obrigatório").max(50, "Máximo de 50 caracteres"),
  description: z.string().max(200, "Máximo de 200 caracteres").optional(),
});

export default function TasksPage() {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const { data: tasks = [], isLoading, isError } = useQuery("tasks", fetchTasks);

  const { mutate: addTask } = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setIsCreateModalOpen(false);
      toast.success("Tarefa adicionada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao adicionar a tarefa.");
    },
  });

  const { mutate: removeTask } = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
      toast.success("Tarefa deletada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao deletar a tarefa.");
    },
  });

  useEffect(() => {
    const results = tasks.filter((task: Task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(results);
  }, [tasks, searchQuery]);

  const handleAddTask = (task: z.infer<typeof taskSchema>) => {
    const newTask: Task = { id: Date.now().toString(), ...task };
    addTask(newTask);
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      removeTask(taskToDelete.id);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center text-gray-800">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-2xl p-6 bg-gray-100 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-700">
          LISTA DE TAREFAS (API)
        </h1>
        <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg mb-4">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar tarefas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-800"
          />
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-5 rounded-lg shadow-md mb-6 transition-transform transform hover:scale-105">
          <FaPlus className="mr-2" />
          Adicionar Tarefa
        </button>

        {isCreateModalOpen && (
          <CreateTasksModal
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleAddTask}
          />
        )}
        {isDeleteModalOpen && taskToDelete && (
          <DeleteTaskModal
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteTask}
          />
        )}
        {isLoading ? (
          <p className="text-center text-gray-500">Carregando tarefas...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Erro ao carregar tarefas.</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma tarefa encontrada.</p>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task: Task) => (
                <div
                key={task.id}
                    className="flex flex-col bg-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                    >
                    <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                    <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap break-words">
                        {task.description}
                    </p>
                    <button
                        onClick={() => {
                        setTaskToDelete(task);
                        setIsDeleteModalOpen(true);
                        }}
                        className="mt-2 self-end text-gray-500 hover:text-red-500 transition-colors">
                        <FaTrashAlt size={20} />
                    </button>
                </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
