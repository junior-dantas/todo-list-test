import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
  title: z.string().nonempty("O título é obrigatório").max(50, "O título deve ter no máximo 50 caracteres"),
  description: z.string().max(200, "A descrição deve ter no máximo 200 caracteres").optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface CreateTasksModalProps {
  onClose: () => void;
  onSubmit: (data: Omit<TaskFormData, "id">) => void;
}

export default function CreateTasksModal({
  onClose,
  onSubmit,
}: CreateTasksModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Adicionar Nova Tarefa</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full rounded"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Descrição</label>
            <textarea
              className="border border-gray-300 p-2 w-full rounded"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
