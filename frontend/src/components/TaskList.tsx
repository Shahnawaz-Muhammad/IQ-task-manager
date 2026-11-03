import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import type { Task } from "../types/task";

type TaskListProps = {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <section
      id="tasks"
      className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40"
    >
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-semibold">Task list</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your tasks.
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {tasks.length > 0 ? tasks.map((task) => (
          <article
            key={task.id}
            className="flex items-start gap-3 px-5 py-5 sm:px-6"
          >
            <button
              type="button"
              onClick={() => onToggle(task)}
              aria-label={
                task.completed ? "Mark as pending" : "Mark as completed"
              }
            >
              {task.completed ? (
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-emerald-600"
                  size={20}
                />
              ) : (
                <Circle className="mt-0.5 shrink-0 text-slate-300" size={20} />
              )}
            </button>

            <div className="min-w-0">
              <h3
                className={`font-medium ${
                  task.completed ? "text-slate-500 line-through" : ""
                }`}
              >
                {task.title}
              </h3>

              {task.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {task.description}
                </p>
              )}

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  task.completed
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete ${task.title}`}
              className="ml-auto rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          </article>
        )) : <div className="flex items-start gap-3 px-5 py-5 sm:px-6"> No Tasks Found</div>}
      </div>

      <footer className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:px-6">
        Showing {tasks.length} tasks
      </footer>
    </section>
  );
}
