import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

type Props = {
  onDelete: () => Promise<void> | void;
  completedCount: number;
};

const DeleteTasks = ({ onDelete, completedCount }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-xs h-7 cursor-pointer" variant="outline">
          <Trash2 size={17} />
          Limpar tarefas concluídas
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir {completedCount}{" "}
            {completedCount === 1 ? "item" : "itens"}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="cursor-pointer" onClick={onDelete}>
            Sim
          </AlertDialogAction>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTasks;
