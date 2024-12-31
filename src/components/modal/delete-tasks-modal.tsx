interface DeleteTaskModalProps {
    onClose: () => void;
    onConfirm: () => void;
  }
  
  export default function DeleteTaskModal({ onClose, onConfirm }: DeleteTaskModalProps) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
          <p className="text-sm text-gray-700 mb-6">
            Tem certeza de que deseja excluir esta tarefa? Essa ação não pode ser desfeita.
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Apagar
            </button>
          </div>
        </div>
      </div>
    );
  }
  