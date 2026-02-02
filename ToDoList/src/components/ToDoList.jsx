import { useState } from "react"
import { AddToDo } from "./AddToDo"
import { List } from "./List"

export const ToDoList = () => {

    const [todos, setTodos] = useState([
        {id: 101, text: "Go to the gym", completed: false},
        {id: 102, text: "Read a book", completed: false},
        {id: 103, text: "Eat a burger", completed: true},
    ])

    const[error,setError] = useState("");

    const removeItem = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const completeItem = id => {
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {...todo, completed: true} : todo));
    }

    const addItem = (text) => {
        const exists = todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());
        if (exists) return false;
        setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
        return true;
    };

    return <div className="todo-app">
        <AddToDo 
           onAdd={addItem}
           externalError={error}
           clearExternalError={() => setError("")}
        />
        <List 
           items = {todos} // {} NOT AN OBJECT!!!
           onRemove = {removeItem}
           onComplete = {completeItem}
        />
    </div>
}