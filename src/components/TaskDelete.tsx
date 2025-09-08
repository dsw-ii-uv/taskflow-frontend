import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ITaskDeleteProps {
  deleteTaskId: number | null;
  setDeleteTaskId: (id: number | null) => void;
  handleDelete: (id: number) => void;
}

export const TaskDelete = ({ deleteTaskId, setDeleteTaskId, handleDelete }: ITaskDeleteProps) => (
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
);