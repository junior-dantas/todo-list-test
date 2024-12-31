# Lista de Tarefas - To-Do 

Este projeto é uma aplicação de lista de tarefas com funcionalidade local e também com integração com uma API fictícia. 

---

## Tecnologias Utilizadas

### **Frontend**
- **TypeScript**: Para tipagem estática e maior segurança no desenvolvimento.
- **Next.js**: Framework para aplicações React com suporte a rotas dinâmicas e renderização no lado do servidor (SSR).
- **React.js**: Biblioteca para criação de interfaces de usuário baseadas em componentes.
- **React Query**: Gerenciamento de estado e chamadas assíncronas à API.
- **React Hook Form**: Manipulação de formulários com validação.
- **Zod**: Biblioteca de validação e tipagem para TypeScript.
- **Tailwind CSS**: Framework de utilitários para estilização de componentes.
- **React Hot Toast**: Feedback visual de sucesso/erro para ações do usuário.
- **React Icons**: Conjunto de ícones para melhorar a interface do usuário.

### **Backend Simulado**
- **JSON Server**: Simulação de uma API REST com endpoints para gerenciamento de tarefas.

---

## Descrição

- **To-Do Local**: Gerencie suas tarefas usando `localStorage`.
- **Tasks API**: Gerencie tarefas interagindo com uma API fictícia criada com JSON Server.

### Funcionalidades
1. **Adicionar tarefas** (título e descrição).
2. **Atualizar tarefas** (somente na lista local).
3. **Remover tarefas** com confirmação.
4. **Busca de tarefas** por título.
5. **Validação dos campos** usando Zod.
6. **Feedback visual** com notificações (via Toast).
7. **Indicador de loading** para operações com a API se necessário.

---

## Como Executar

### Pré-requisitos
- Node.js instalado na máquina.

### Passo 1: Clonar ou configurar o projeto
Se você baixou ou configurou o projeto manualmente, pule este passo. Certifique-se de que todos os arquivos necessários estão disponíveis.

### Passo 2: Instalar dependências
No terminal, execute:

npm install

### Passo 3: Inicializar o JSON Server
npx json-server --watch server.json --port 3001

### Passo 4: Inicializar o projeto Next.js
Em um novo terminal, execute:

npm run dev

### Passo 5: Acessar o projeto

### Frontend (to-do e tasks): http://localhost:3000 

to-do: http://localhost:3000/to-do
tasks: http://localhost:3000/tasks

JSON Server: http://localhost:3001/tasks

---

