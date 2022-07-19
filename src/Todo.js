import React from 'react'

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  return (
    <div>
        <label>
            <div className=''>
            <b>Task:</b> {todo.name}{' '}<input type="checkbox" checked={todo.complete} onChange={handleTodoClick}></input>
            </div>
            <div className='mb-2'>
              <b>Added:</b> {todo.time}
            </div>
        </label>

    </div>
  )
}
