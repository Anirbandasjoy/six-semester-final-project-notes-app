import React from 'react'
import Todo from './Todo'

const Todos = ({ todos, removeTodo }) => {
    return (
        <div className='bg-base-300 mt-16 sm:mt-14  h-screen  overflow-y-auto min-w-full p-8 rounded-md flex-col flex gap-4'>
            {
                todos.map((todo) => <Todo removeTodo={removeTodo} key={todo.id} id={todo.id} todo={todo.note} />)
            }
        </div>
    )
}

export default Todos