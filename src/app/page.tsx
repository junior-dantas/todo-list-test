import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-500 via-gray-400 to-gray-400 text-white space-y-6 text-center">
      <h1 className="text-2xl font-extrabold">
        BEM-VINDO AO SISTEMA DE LISTA DE TAREFAS DO GABRIELZINHO DA HINODE!
      </h1>
      <p className="text-xl ">
        Organize suas tarefas de forma simples e eficiente.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <Link href="/to-do">
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105">
            Ir para lista de tarefas (LOCAL) 
          </button>
        </Link>

        <Link href="/tasks">
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105">
            Ir para lista de tarefas (API)
          </button>
        </Link>
      </div>
    </main>
  );
}
