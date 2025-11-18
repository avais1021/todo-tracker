import React, { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { useTodoContext } from './context/TodoContext';





const App = () => {

  const {todos,setTodos} =useTodoContext()

  useEffect(() => {
    const getTodosFromLocal =  JSON.parse(localStorage.getItem('mytodos'));
    console.log(getTodosFromLocal,'getTodosFromLocal');

    if(getTodosFromLocal && getTodosFromLocal.length > 0){
    setTodos(getTodosFromLocal)
    console.log(todos,'todos after');
    }
  } , [])

  useEffect(() => {
      localStorage.setItem('mytodos' , JSON.stringify(todos));
  } , [todos])



  return (
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todos) => (
              <div className="w-full" key={todos.id}>
                <TodoItem todos={todos} />

              </div>

            ))}

          </div>
        </div>
      </div>
  )
}

export default App
