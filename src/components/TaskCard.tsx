import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Task } from "../types/Task";
import dayjs from "dayjs";
import { TaskDelete } from "./TaskDelete";
import { toast } from "sonner";
import { useApi } from "../hooks/useApi";
import { useReload } from "../context/ReloadContext";

interface TaskCardProps {
  task: Task,
  setEditingTask: (id: Task | null) => void,
}

export function TaskCard({ task, setEditingTask }: TaskCardProps) {
  const { request } = useApi()
  const { triggerReload } = useReload()
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null)

  const handleDelete = async () => {
    try {
      await request(`tasks/${task.id}/`, "DELETE")
      setDeleteTaskId(null)
      triggerReload()
      toast.success("Tarea eliminada correctamente")
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        toast.error(`❌ Error eliminando tarea: ${error.message}`)
      }
    }
  }

  return (
    <>
      <Card key={task.id} className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </CardHeader>
        <CardContent>
          <p><strong>Estado:</strong> {task.state}</p>
          <p><strong>Prioridad:</strong> {task.priority}</p>
          <p><strong>Fecha límite:</strong> {dayjs(task.due_date).format("DD/MM/YYYY")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { name: "Hogar", tag: task.home_tag },
              { name: "Trabajo", tag: task.work_tag },
              { name: "Universidad", tag: task.university_tag },
              { name: "Social", tag: task.social_tag },
            ].map((tag, index) =>
              tag.tag && (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tag.name}
                </span>
              )
            )}
          </div>
          <div className="flex gap-2 mt-3">
            <Button variant="outline" onClick={() => {
              setEditingTask(task)
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
      <TaskDelete deleteTaskId={deleteTaskId} setDeleteTaskId={setDeleteTaskId} handleDelete={handleDelete} />
    </>
  )
}