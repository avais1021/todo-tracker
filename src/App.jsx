import React, { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { useTodoContext } from './context/TodoContext';

const App = () => {
  const { todos, setTodos } = useTodoContext();

  useEffect(() => {
    const getTodosFromLocal = JSON.parse(localStorage.getItem('mytodos'));
    if (getTodosFromLocal && getTodosFromLocal.length > 0) {
      setTodos(getTodosFromLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mytodos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-10">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-sky-300 border border-sky-500/30 shadow-sm shadow-sky-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Stay organised · Stay focused
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            Manage Your <span className="text-sky-400">Todos</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Add, edit, check and delete your daily tasks. All changes are saved automatically.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-2xl shadow-sky-500/20 backdrop-blur-xl px-4 py-5 sm:px-6 sm:py-6">
          {/* Form */}
          <div className="mb-5">
            <TodoForm />
          </div>

          {/* List */}
          <div className="flex flex-col gap-3">
            {todos.map((todos) => (
              <div className="w-full" key={todos.id}>
                <TodoItem todos={todos} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
