import React, { useState } from 'react'
import { useTodoContext } from '../context/TodoContext.jsx'

const TodoForm = () => {
  const { addTodo } = useTodoContext();
  const [todoText, setTodoText] = useState("");

  const add = (e) => {
    e.preventDefault();
    if (!todoText) return;
    addTodo(todoText);
    setTodoText("");
  }

  return (
    <form className="flex gap-2 items-center" onSubmit={add}>
      <div className="flex-1 flex items-center gap-2 bg-slate-950/60 border border-slate-700/80 rounded-full px-3 py-1.5 shadow-inner shadow-black/40">
        <span className="text-slate-500 text-lg">✏️</span>
        <input
          type="text"
          placeholder="Write a new task..."
          className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-slate-100 placeholder:text-slate-500"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 hover:brightness-110 active:scale-95 transition-transform duration-150 shadow-md shadow-sky-500/40"
      >
        Add
      </button>
    </form>
  )
}

export default TodoForm
