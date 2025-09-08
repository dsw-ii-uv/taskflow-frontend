"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/hooks/useApi";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

// ✅ Definición de validaciones con Zod
const TaskSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
  due_date: z.string().refine((val) => {
    const today = new Date().toISOString().split("T")[0];
    return val >= today;
  }, {
    message: "La fecha límite no puede ser anterior al día actual",
  }),
  priority: z.enum(["1", "2", "3"]),
  status: z.enum(["To Do", "In Progress", "Done"]),
  tags: z.array(z.string()),
});

type TaskFormData = z.infer<typeof TaskSchema>;

interface TaskFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editingTask: number | null;
  onClose: () => void;
}

export function TaskForm({ open, setOpen, editingTask, onClose }: TaskFormProps) {
  const { request } = useApi()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      due_date: "",
      priority: "1",
      status: "To Do",
      tags: [],
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (editingTask) {
        await request(`tasks/${editingTask}/`, "PUT", data);
      } else {
        await request("tasks/", "POST", data);
      }

      toast.success("Tarea guardada correctamente")
      setOpen(false);
      onClose();
      reset();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`❌ Error guardando tarea: ${err.message}`)
      }
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          onClose();
          reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingTask ? "Editar tarea" : "Crear nueva tarea"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...register("title")} placeholder="Escribe el título" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input id="description" {...register("description")} placeholder="Escribe la descripción" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="due_date">Fecha límite</Label>
            <Input id="due_date" type="date" {...register("due_date")} />
            {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date.message}</p>}
          </div>

          {/* Fila con Prioridad y Estado */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>Prioridad</Label>
              <Select
                defaultValue="2"
                onValueChange={(val) => setValue("priority", val as TaskFormData["priority"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Baja</SelectItem>
                  <SelectItem value="2">Media</SelectItem>
                  <SelectItem value="3">Alta</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
            </div>

            <div>
              <Label>Estado</Label>
              <Select
                defaultValue="To Do"
                onValueChange={(val) => setValue("status", val as TaskFormData["status"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>
          </div>

          <div>
            <Label>Etiquetas</Label>
            <ToggleGroup
              type="multiple"
              className="flex flex-wrap w-full gap-2 mt-2"
              value={getValues("tags")}
              onValueChange={(val) => setValue("tags", val)}
            >
              {["Hogar", "Trabajo", "Universidad", "Social"].map((tag) => (
                <ToggleGroupItem
                  key={tag}
                  value={tag}
                  aria-label={tag}
                  className="px-3 py-1 rounded-md border data-[state=on]:bg-primary data-[state=on]:text-white"
                >
                  {tag}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
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
  );
}
