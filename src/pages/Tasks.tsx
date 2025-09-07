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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type Task = {
  id: number
  title: string
  description: string
  status: string
  priority: string
  deadline: string
  department: string
  tags: string[]
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Diseñar la base de datos",
    description: "Crear el modelo ER y normalizar tablas.",
    status: "In Progress",
    priority: "Alta",
    deadline: "2025-09-15",
    department: "IT",
    tags: ["Trabajo", "Universidad"],
  },
  {
    id: 2,
    title: "Configurar Tailwind",
    description: "Integrar Tailwind con el proyecto Vite + React.",
    status: "To Do",
    priority: "Media",
    deadline: "2025-09-10",
    department: "HR",
    tags: ["Trabajo", "Universidad"],
  },
]

const departments = [
  { value: "HR", label: "Recursos Humanos" },
  { value: "IT", label: "Tecnología" },
  { value: "SALES", label: "Ventas" },
  { value: "MARKETING", label: "Marketing" },
  { value: "FINANCE", label: "Finanzas" },
  { value: "OPERATIONS", label: "Operaciones" },
]

export default function Tasks() {
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Estado para confirmar eliminación
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null)

  // Estados formulario
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [priority, setPriority] = useState("Media")
  const [status, setStatus] = useState("To Do")
  const [department, setDepartment] = useState("HR")
  const [tags, setTags] = useState<string[]>([])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setDeadline("")
    setPriority("Media")
    setStatus("To Do")
    setDepartment("HR")
    setTags([])
  }

  const openCreate = () => {
    setEditingTask(null)
    resetForm()
    setOpen(true)
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setTitle(task.title)
    setDescription(task.description)
    setDeadline(task.deadline)
    setPriority(task.priority)
    setStatus(task.status)
    setDepartment(task.department)
    setTags(task.tags)
    setOpen(true)
  }

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación: no permitir fechas anteriores a hoy
    const today = new Date().toISOString().split("T")[0]
    if (deadline < today) {
      alert("La fecha límite no puede ser anterior al día actual.")
      return
    }

    if (editingTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === editingTask.id
          ? { ...t, title, description, deadline, priority, status, department, tags }
          : t
      )
      setTasks(updatedTasks)
    } else {
      const newTask: Task = {
        id: Date.now(),
        title,
        description,
        deadline,
        priority,
        status,
        department,
        tags,
      }
      setTasks((prev) => [...prev, newTask])
    }

    setOpen(false)
    setEditingTask(null)
    resetForm()
  }

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    setDeleteTaskId(null)
  }

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Tareas</h1>
        <Button onClick={openCreate}>+ Nueva tarea</Button>
      </div>

      {/* Dialog Crear/Editar */}
      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val)
          if (!val) {
            setEditingTask(null)
            resetForm()
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTask ? "Editar tarea" : "Crear nueva tarea"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
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

            {/* Fila con Departamento, Prioridad y Estado */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label>Departamento</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dep) => (
                      <SelectItem key={dep.value} value={dep.value}>
                        {dep.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Prioridad</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="w-full">
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
                  <SelectTrigger className="w-full">
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
                {editingTask ? "Guardar cambios" : "Guardar tarea"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
              <p><strong>Departamento:</strong> {departments.find(d => d.value === task.department)?.label}</p>
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
                <Button variant="outline" onClick={() => handleEdit(task)}>
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
