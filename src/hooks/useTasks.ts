"use client";

import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma";
import { getTasks } from "@/actions/get-tasks-from-bd";
import { NewTask } from "@/actions/add-tasks";
import { DeleteTask } from "@/actions/delete-tasks";
import { updateTaskStatus } from "@/actions/toggle-done";
import { deleteCompletedTasks } from "@/actions/clear-completed-tasks";
import { toast } from "sonner";
import { FilterType } from "@/components/filter-badges";

export const useTasks = () => {
  const [taskList, setTasklist] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);

  const handleGetTasks = async () => {
    const tasks = await getTasks();
    if (tasks) setTasklist(tasks);
  };

  const handleAddTask = async () => {
    setLoading(true);

    if (!task) {
      toast.error("Insira uma tarefa!");
      setLoading(false);
      return;
    }

    await NewTask(task);
    setTask("");
    await handleGetTasks();
    toast.success("Tarefa adicionada!");
    setLoading(false);
  };

  const handleDeleteTask = async (id: string) => {
    await DeleteTask(id);
    await handleGetTasks();
    toast.success("Tarefa deletada!");
  };

  const handleToggleTask = async (taskId: string) => {
    const previous = [...taskList];

    setTasklist((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
    );

    try {
      await updateTaskStatus(taskId);
    } catch {
      setTasklist(previous);
    }
  };

  const handleDeleteCompleted = async () => {
    const data = await deleteCompletedTasks();
    if (data) setTasklist(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleGetTasks();
  }, []);

  useEffect(() => {
    if (currentFilter === "all") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredTasks(taskList);
    } else if (currentFilter === "pending") {
      setFilteredTasks(taskList.filter((t) => !t.done));
    } else {
      setFilteredTasks(taskList.filter((t) => t.done));
    }
  }, [taskList, currentFilter]);

  const completedCount = taskList.filter((t) => t.done).length;

  return {
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
  };
};
