"use client";

import DeleteTasks from "@/components/delete-tasks";
import EditTask from "@/components/edit-task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Delete,
  ListCheck,
  PlusCircle,
  SquareSigma,
  Loader,
} from "lucide-react";
import Filter from "@/components/filter-badges";
import { useTasks } from "@/hooks/useTasks";

const Home = () => {
  // retorno dos hooks e lógica
  const {
    task,
    setTask,
    loading,
    taskList,
    filteredTasks,
    currentFilter,
    setCurrentFilter,
    completedCount,
    handleAddTask,
    handleDeleteTask,
    handleToggleTask,
    handleDeleteCompleted,
    handleGetTasks,
  } = useTasks();

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicionar Tarefa..."
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button className="cursor-pointer" onClick={handleAddTask}>
            {loading ? <Loader className="animate-spin" /> : <PlusCircle />}
            Adicionar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <div className="mt-4 border-b">
            {taskList.length === 0 && (
              <p className="text-sm border-t py-4">
                Você não possui atividades cadastradas
              </p>
            )}

            {filteredTasks.map((task) => (
              <div
                className="h-14 flex justify-between items-center border-t"
                key={task.id}
              >
                <div
                  className={`${
                    task.done
                      ? "w-1 h-full bg-green-700"
                      : "w-1 h-full bg-rose-800"
                  }`}
                ></div>

                <p
                  className="flex-1 px-2 cursor-pointer hover:text-gray-600"
                  onClick={() => handleToggleTask(task.id)}
                >
                  {task.task}
                </p>

                <div className="flex items-center gap-2">
                  <EditTask task={task} handleGetTasks={handleGetTasks} />
                  <Delete
                    size={17}
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={17} />
              <p className="text-xs">
                Tarefas Concluídas ({completedCount} / {taskList.length})
              </p>
            </div>

            <DeleteTasks
              onDelete={handleDeleteCompleted}
              completedCount={completedCount}
            />
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-rose-600 rounded-md"
              style={{
                width: `${
                  taskList.length > 0
                    ? (completedCount / taskList.length) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>

          <div className="flex justify-end items-center gap-2 mt-2">
            <SquareSigma size={17} />
            <p className="text-xs">{taskList.length} tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
