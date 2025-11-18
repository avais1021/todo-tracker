import React, { useRef, useState } from 'react';
import { useTodoContext } from '../context/TodoContext.jsx';

const TodoItem = ({ todos }) => {
  const { updateTodo, deteteTodo, todoChecked } = useTodoContext();

  const [isEditable, setIsEditable] = useState(false);
  const [editText, setEditText] = useState(todos.text);
  const inputRef = useRef(null);

  const editTodo = () => {
    updateTodo(todos.id, { ...todos, text: editText });
  };

  const toggleCompleted = () => {
    todoChecked(todos.id);
  };

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-slate-700/70 px-3 py-2 sm:px-4 sm:py-3 shadow-sm shadow-black/30 transition-all duration-200
      ${todos.checked
          ? "bg-emerald-500/10 border-emerald-500/40"
          : "bg-slate-900/80 hover:border-sky-500/40 hover:shadow-sky-500/20"
        }`}
    >
      {/* Checkbox */}
      <button
        type="button"
        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-md border text-xs transition 
        ${todos.checked
            ? "bg-emerald-500 border-emerald-400 text-slate-950"
            : "border-slate-500 bg-slate-900 text-slate-400 hover:border-sky-400"
          }`}
        onClick={toggleCompleted}
        disabled={isEditable}
      >
        {todos.checked && "✓"}
      </button>

      {/* Textarea */}
      <div className="flex-1 flex flex-col gap-1">
        <textarea
          className={`w-full text-sm sm:text-base leading-relaxed rounded-lg px-2 py-1.5 bg-transparent focus-visible:outline-none outline-none
          ${isEditable
              ? "bg-slate-900/80 border border-amber-400/70 shadow-inner shadow-amber-500/20"
              : "border border-transparent"
            }
          ${todos.checked ? "line-through text-slate-400" : "text-slate-100"}`}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          readOnly={!isEditable}
          ref={inputRef}
          style={{ resize: 'none' }}
          rows={1}
        />

        {/* Small status */}
        <span className="text-[11px] text-slate-500">
          {todos.checked ? "Completed" : isEditable ? "Editing..." : "Pending"}
        </span>
      </div>

      {/* Edit / Save */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-slate-600/80 justify-center items-center bg-slate-900/80 hover:bg-slate-800 shrink-0 disabled:opacity-40"
        onClick={() => {
          if (isEditable) {
            editTodo();
            setIsEditable(false);
          } else {
            setIsEditable(true);
          }
          if (inputRef.current) {
            inputRef.current.focus();
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
          }
        }}
        disabled={todos.checked}
      >
        {isEditable ? "✅" : "✏️"}
      </button>

      {/* Delete */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-rose-600/40 justify-center items-center bg-rose-900/30 hover:bg-rose-700/60 hover:border-rose-500/80 shrink-0"
        onClick={() => deteteTodo(todos.id)}
      >
        ❌
      </button>
    </div>
  )
}

export default TodoItem
