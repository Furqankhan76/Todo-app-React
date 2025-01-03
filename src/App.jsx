import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './context'
import { Todoform, Todoitem } from './components'

function App() {
  const [todos, settodos] = useState([])

  const addTodo = (todo) => {
      console.log("Adding todo:", todo);

settodos((prev) => [{id: Date.now(),...todo},...prev]);
  }

  // to explain

const updateTodo = (id, todo) => {
  settodos((prev) => prev.map((prevtodo) => (prevtodo.id === todo.id ? todo : prevtodo)))
}

const deleteTodo = (id) => {
  settodos((prev) => prev.filter((todo) => todo.id !== id));
}

const toggleComplete = (id) => {
  settodos((prev) => 
    prev.map((prevtodo) =>
   prevtodo.id === id ? {...prevtodo, completed: !prevtodo.completed} : prevtodo
)
  )
}

// sets todos based on whats there in localstorage

useEffect(() => {
  console.log(localStorage.getItem("todos"));
     const todos = JSON.parse(localStorage.getItem("todos"));
     if (todos && todos.length > 0) {
      settodos(todos)
     }
}, [])

console.log(todos);


// come back later

useEffect(() => {localStorage.setItem("todos", JSON.stringify(todos))}, [todos])
 

  return (
  <TodoProvider  value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <Todoform />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <Todoitem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
