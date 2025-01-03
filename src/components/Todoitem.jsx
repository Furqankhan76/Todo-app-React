import React, { useState } from 'react'
import { useTodo } from '../context'

function Todoitem({todo}) {
 const [istodoeditable, setistodoeditable] = useState(false)
 const [todomsg , settodomsg] = useState(todo.todo)

const {updateTodo, deleteTodo, toggleComplete} = useTodo()
 
 const editTodo = () => {
  updateTodo(todo.id, {...todo, todo: todomsg})
  setistodoeditable(false)
 }

 const toggleCompleted = () => {toggleComplete(todo.id)}


  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          istodoeditable ? "border-black/10 px-2" : "border-transparent"
        }`}
        value={todomsg}
        onChange={(e) => settodomsg(e.target.value)}
        readOnly={!istodoeditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
          if (istodoeditable) {
            editTodo();
          } else setistodoeditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {istodoeditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default Todoitem