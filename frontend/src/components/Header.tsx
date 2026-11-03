export default function Header () {
    return (
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                My tasks
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                S
              </div>
            </div>
          </header>
    )
}