import { useEffect, useState } from "react";

import { Plus } from "lucide-react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";

import { getTasks, createTask, updateTask, deleteTask } from "./api/taskApi";
import type { Task } from "./types/task";

import { getWeather } from "./api/weatherApi";
import type { Weather } from "./api/weatherApi";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (title: string, description: string) => {
    try {
      const newTask = await createTask({
        title,
        description: description || undefined,
      });

      setTasks((currentTasks) => [newTask, ...currentTasks]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create task");
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      const updatedTask = await updateTask(task.id, !task.completed);

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === updatedTask.id ? updatedTask : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete task");
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeather(await getWeather("Rawalpindi"));
      } catch (err) {
        setWeatherError(
          err instanceof Error ? err.message : "Could not load weather",
        );
      }
    };

    fetchWeather();
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-full">
        <Sidebar />

        <main className="flex-1">
          <Header />

          <div className="px-5 py-7 sm:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold"> Overview</h2>
              </div>

              <button
                type="button"
                className="flex items-center gap-3 bg-indigo-600 px-3 py-2.5 rounded-lg text-white hover:bg-indigo-700 hover:cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={18} />
                Add Task
              </button>
            </div>

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Weather in Rawalpindi</h3>

              {weather && (
                <p className="mt-2 text-sm text-slate-600">
                  {weather.temperature}°C · {weather.description} · Humidity{" "}
                  {weather.humidity}%
                </p>
              )}

              {weatherError && (
                <p role="alert" className="mt-2 text-sm text-red-700">
                  {weatherError}
                </p>
              )}

              {!weather && !weatherError && (
                <p className="mt-2 text-sm text-slate-500">
                  Loading weather...
                </p>
              )}
            </section>

            {loading && (
              <p className="mt-6 text-sm text-slate-500">Loading tasks...</p>
            )}

            {error && (
              <p
                role="alert"
                className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {!loading && !error && (
              <>
                <TaskList
                  tasks={tasks}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              </>
            )}
          </div>
        </main>
      </div>
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </div>
  );
}

export default App;
