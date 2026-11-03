import {prisma} from "../../config/prisma.js";

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
       ...(data.description !== undefined && {
        description: data.description,
      }),
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


export const deleteTask = async (id: string) => {
    const task = await prisma.task.findUnique({
        where: { id }
    });

    if (!task) {
        return null;
    }

    return prisma.task.delete({
        where: { id }
    });
};