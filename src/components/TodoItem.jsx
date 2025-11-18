import React, { useRef, useState } from 'react';

import { useTodoContext } from '../context/TodoContext.jsx';

const TodoItem = ({ todos }) => {

  const { updateTodo, deteteTodo, todoChecked } = useTodoContext();

  const [isEditable, setIsEditable] = useState(false);

  const [editText, setEditText] = useState(todos.text);

  const inputRef = useRef(null);

  console.log(editText, 'editText');

  console.log(isEditable, 'isEditable');

  const editTodo = () => {
    updateTodo(todos.id, { ...todos, text: editText })
  }
  const toggleCompleted = () => {
    todoChecked(todos.id)
  }


  return (
    <div
      className={`flex items-center border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black !py-0  ${todos.checked ? "bg-[#c6e9a7]" : "bg-[#8493a9]"} `}>
      <input
        type="checkbox"
        className="cursor-pointer w-7 h-12"
        checked={todos.checked}
        onChange={toggleCompleted}
        disabled={isEditable}
      />
      <textarea
        type="text"
        className={` ${isEditable ? "bg-lime-100 border border-amber-400" : " bg-[#f7f2bf]  "} focus-visible:outline-none outline-non  w-full text-[20px]  rounded-lg px-2 ${todos.checked ? 'line-through bg-[#c6e9a7] ' : ''}  `}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        readOnly={!isEditable}
        ref={inputRef}
        style={{ resize: 'none' }}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (isEditable) {
            editTodo();
            setIsEditable(false)
          } else {
            setIsEditable(true)
          }
          if (inputRef.current) {
            // debugger
            inputRef.current.focus();
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);

          }
        }}
        disabled={todos.checked}
      >
        {isEditable ? "✅" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deteteTodo(todos.id)}
      >
        ❌
      </button>
    </div>
  )
}

export default TodoItem
