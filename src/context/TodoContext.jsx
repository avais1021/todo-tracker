import { createContext, useContext, useState } from "react";

export const TodoContext = createContext(null);


const TodoContextProvider = ({ children }) => {

    const [todos, setTodos] = useState([]);

    console.log(todos, 'todos');

    const addTodo = (todoText) => {
        setTodos((prev) => {
            return [
                ...prev,
                {
                    id: Date.now(),
                    text: todoText,
                    checked: false,
                },
            ]
        })
    }

    const updateTodo = (id, editTodo) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? editTodo : prevTodo)))
    }


    const todoChecked = (id) => {
        setTodos((prev) => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
    }

    const deteteTodo = (id) => {
        setTodos((prev) => prev.filter(item => item.id !== id))
    }


    return <TodoContext.Provider value={{ todos, setTodos , addTodo, updateTodo, deteteTodo, todoChecked }}>{children}</TodoContext.Provider>
}

export const useTodoContext = () => {
    return useContext(TodoContext);
}





export default TodoContextProvider