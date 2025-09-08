import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Task } from "@/types/Task"
import { TaskForm } from "@/components/TaskForm"


export default function Tasks() {
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<number | null>(null)

  // Estado para confirmar eliminación
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    setDeleteTaskId(null)
  }

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

      {/* Dialog Confirmar eliminación */}
      <Dialog open={deleteTaskId !== null} onOpenChange={() => setDeleteTaskId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Seguro que quieres eliminar esta tarea?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteTaskId(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteTaskId !== null && handleDelete(deleteTaskId)}
            >
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lista de tareas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </CardHeader>
            <CardContent>
              <p><strong>Estado:</strong> {task.status}</p>
              <p><strong>Prioridad:</strong> {task.priority}</p>
              <p><strong>Fecha límite:</strong> {task.deadline}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" onClick={() => {
                  setOpen(true)
                  setEditingTask(task.id)
                }}>
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteTaskId(task.id)}
                >
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
