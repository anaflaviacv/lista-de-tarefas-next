import { SquarePen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Task } from "@prisma/client";
import { useState } from "react";
import { editTask } from "@/actions/edit-task";
import { toast } from "sonner";

type TaskProps = {
  task: Task;
  handleGetTasks: () => Promise<void>;
};

const EditTask = ({ task, handleGetTasks }: TaskProps) => {
  const [editedTask, setEditedTask] = useState<string>(task.task);

  const handleEditTask = async () => {
    // Lógica para editar a tarefa
    try {
      if (editedTask != task.task) {
        toast.success("Tarefa editada com sucesso!");
      } else {
        toast.error("A tarefa não foi editada, insira um novo valor!");
        return;
      }

      await editTask({ idTask: task.id, newTask: editedTask });
      handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen size={17} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            placeholder="Editar tarefa"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <DialogClose asChild>
            <Button className="cursor-pointer" onClick={handleEditTask}>
              Editar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
