"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaTrashAlt, FaPlus, FaEdit, FaSearch } from "react-icons/fa";
import { Task } from "@/types/task";
import CreateTasksModal from "@/components/modal/create-tasks-modal";
import UpdateTasksModal from "@/components/modal/update-tasks-modal";

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      setFilteredTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(results);
  }, [searchQuery, tasks]);

  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTasks(tasks);
  };

  const handleAddTask = (task: Omit<Task, "id">) => {
    const newTask: Task = { id: Date.now().toString(), ...task };
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    setIsCreateModalOpen(false);
    toast.success("Tarefa adicionada com sucesso!");
  };

  const handleEditTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(updatedTasks);
    setIsUpdateModalOpen(false);
    setTaskToEdit(null);
    toast.success("Tarefa atualizada com sucesso!");
  };

  const handleRemoveTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);
    toast.success("Tarefa removida com sucesso!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-400 via-gray-300 to-gray-200 flex items-center justify-center text-gray-800">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-2xl p-6 bg-gray-100 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-700">
          LISTA DE TAREFAS (LOCAL)
        </h1>

        {/* Campo de Busca */}
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
          className="flex items-center justify-center w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-5 rounded-lg shadow-md mb-6 transition-transform transform hover:scale-105"
        >
          <FaPlus className="mr-2" />
          Adicionar Tarefa
        </button>
        {isCreateModalOpen && (
          <CreateTasksModal
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleAddTask}
          />
        )}
        {isUpdateModalOpen && taskToEdit && (
          <UpdateTasksModal
            onClose={() => setIsUpdateModalOpen(false)}
            onSubmit={handleEditTask}
            initialData={taskToEdit}
          />
        )}
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhuma tarefa encontrada.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col bg-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-600 break-words">
                    {task.description}
                  </p>
                </div>
                <div className="flex justify-end space-x-4 mt-2">
                  <button
                    onClick={() => {
                      setTaskToEdit(task);
                      setIsUpdateModalOpen(true);
                    }}
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
