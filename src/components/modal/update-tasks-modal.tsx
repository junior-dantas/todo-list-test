import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Task } from "@/types/task";

const taskSchema = z.object({
  title: z
    .string()
    .nonempty("O título é obrigatório")
    .max(50, "Máximo de 50 caracteres"),
  description: z.string().max(200, "Máximo de 200 caracteres").optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface UpdateTasksModalProps {
  onClose: () => void;
  onSubmit: (data: Task) => void;
  initialData: Task; 
}

export default function UpdateTasksModal({
  onClose,
  onSubmit,
  initialData,
}: UpdateTasksModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData, 
  });

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit({ ...initialData, ...data }); 
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Atualizar Tarefa</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              {...register("title")}
              className="border rounded w-full px-3 py-2 mt-1"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              {...register("description")}
              className="border rounded w-full px-3 py-2 mt-1"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
