import {prisma} from "../../config/prisma";

export const getAllTasks = async () => {
    return prisma.task.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}

export const createTask = async (data: {
  title: string;
  description?: string;
}) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
    },
  });
};

export const updateTask = async (
  id: string,
  data: {
    title?: string;
    description?: string | null;
    completed?: boolean;
  },
) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};