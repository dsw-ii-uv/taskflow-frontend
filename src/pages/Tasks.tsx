import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import type { Task } from "@/types/Task"
import { TaskForm } from "@/components/TaskForm"
import { TaskCard } from "@/components/TaskCard"
import { useApi } from "@/hooks/useApi"
import { useReload } from "@/context/ReloadContext"

export default function Tasks() {
  const { request } = useApi()
  const { reloadKey } = useReload()
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await request("tasks/", "GET")
        setTasks(response.results)
      } catch (error) {
        console.error("Error al cargar tareas:", error)
      }
    }
    fetchTasks()
  }, [reloadKey])

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Tareas</h1>
        <Button onClick={() => {
          setOpen(true)
          setEditingTask(null)
        }}>+ Nueva tarea</Button>
      </div>

      {/* Dialog Crear/Editar */}
      <TaskForm
        open={open}
        setOpen={setOpen}
        editingTask={editingTask}
        onClose={() => { setOpen(false); setEditingTask(null) }}
      />

      {/* Lista de tareas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} setEditingTask={(id) => { setOpen(true); setEditingTask(id) }} />
        ))}
      </div>
    </div>
  )
}
