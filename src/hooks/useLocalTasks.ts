'use client' 

import { useEffect, useState } from 'react'
import { Task } from '@/types/task'

const STORAGE_KEY = 'local_tasks'

export function useLocalTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setTasks(JSON.parse(stored))
    }
  }, [])

  function save(newTasks: Task[]) {
    setTasks(newTasks)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
  }

  function addTask(task: Task) {
    save([...tasks, task])
  }

  function updateTask(id: string, data: Partial<Task>) {
    const updated = tasks.map(t => (t.id === id ? { ...t, ...data } : t))
    save(updated)
  }

  function removeTask(id: string) {
    save(tasks.filter(t => t.id !== id))
  }

  return { tasks, addTask, updateTask, removeTask }
}
