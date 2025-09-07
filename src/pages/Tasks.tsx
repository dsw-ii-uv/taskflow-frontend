import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type Task = {
  id: number
  title: string
  description: string
  status: string
  priority: string
  deadline: string
  tags: string[]
}

const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Diseñar la base de datos",
    description: "Crear el modelo ER y normalizar tablas.",
    status: "In Progress",
    priority: "Alta",
    deadline: "2025-09-15",
    tags: ["Trabajo", "Universidad"],
  },
  {
    id: 2,
    title: "Configurar Tailwind",
    description: "Integrar Tailwind con el proyecto Vite + React.",
    status: "To Do",
    priority: "Media",
    deadline: "2025-09-10",
    tags: ["Trabajo", "Universidad"],
  },
]

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks)

  // estado para el modal principal
  const [showForm, setShowForm] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

  // estado para confirmar eliminación
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)

  // formulario controlado
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [priority, setPriority] = useState("Media")
  const [status, setStatus] = useState("To Do")
  const [tags, setTags] = useState<string[]>([])

  const clearForm = () => {
    setTitle("")
    setDescription("")
    setDeadline("")
    setPriority("Media")
    setStatus("To Do")
    setTags([])
  }

  const startCreateTask = () => {
    setTaskToEdit(null)
    clearForm()
    setShowForm(true)
  }

  const editTask = (task: Task) => {
    setTaskToEdit(task)
    setTitle(task.title)
    setDescription(task.description)
    setDeadline(task.deadline)
    setPriority(task.priority)
    setStatus(task.status)
    setTags(task.tags)
    setShowForm(true)
  }

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const saveTask = (e: React.FormEvent) => {
    e.preventDefault()

    if (taskToEdit) {
      // actualizar existente
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskToEdit.id
            ? { ...t, title, description, deadline, priority, status, tags }
            : t
        )
      )
    } else {
      // crear nueva
      const newTask: Task = {
        id: Date.now(),
        title,
        description,
        deadline,
        priority,
        status,
        tags,
      }
      setTasks((prev) => [...prev, newTask])
    }

    setShowForm(false)
    setTaskToEdit(null)
    clearForm()
  }

  const confirmDelete = (id: number) => {
    setPendingDeleteId(id)
  }

  const deleteTask = () => {
    if (pendingDeleteId !== null) {
      setTasks((prev) => prev.filter((t) => t.id !== pendingDeleteId))
      setPendingDeleteId(null)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Tareas</h1>
        <Button onClick={startCreateTask}>+ Nueva tarea</Button>
      </div>

      {/* Modal Crear/Editar */}
      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open)
          if (!open) {
            setTaskToEdit(null)
            clearForm()
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {taskToEdit ? "Editar tarea" : "Nueva tarea"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={saveTask} className="grid gap-4 mt-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribe el título"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe la descripción"
                required
              />
            </div>

            <div>
              <Label htmlFor="deadline">Fecha límite</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Prioridad</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baja">Baja</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Estado</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Etiquetas</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                {["Hogar", "Trabajo", "Universidad", "Social"].map((tag) => (
                  <label key={tag} className="flex items-center gap-2">
                    <Checkbox
                      checked={tags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="submit">
                {taskToEdit ? "Guardar cambios" : "Crear tarea"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmar eliminación */}
      <Dialog
        open={pendingDeleteId !== null}
        onOpenChange={() => setPendingDeleteId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar esta tarea?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setPendingDeleteId(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={deleteTask}>
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
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            </CardHeader>
            <CardContent>
              <p><strong>Estado:</strong> {task.status}</p>
              <p><strong>Prioridad:</strong> {task.priority}</p>
              <p><strong>Fecha límite:</strong> {task.deadline}</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {task.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-3">
                <Button variant="outline" onClick={() => editTask(task)}>
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => confirmDelete(task.id)}
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
