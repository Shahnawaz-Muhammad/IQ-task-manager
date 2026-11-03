import {ClipboardList} from "lucide-react"

export default function Sidebar () {
    return (
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-6 md:flex md:flex-col">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white">
              <ClipboardList size={21} />
            </div>
            <div>
              <p className="font-semibold">TaskFlow</p>
              <p className="text-xs text-slate-500">Personal workspace</p>
            </div>
          </div>

          <nav className="mt-10 space-y-2">
            <a
              href="#tasks"
              className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700"
            >
              <ClipboardList size={18} />
              All tasks
            </a>
          </nav>

          
        </aside>
    )
}