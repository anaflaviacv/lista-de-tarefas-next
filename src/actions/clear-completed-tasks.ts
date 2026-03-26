"use server";
import { prisma } from "@/utils/prisma";

export const deleteCompletedTasks = async () => {
  try {
    await prisma.tasks.deleteMany({
      where: { done: true },
    });

    const allTask = await prisma.tasks.findMany();
    if (!allTask) return;
    return allTask;
  } catch (error) {
    throw error;
  }
};
