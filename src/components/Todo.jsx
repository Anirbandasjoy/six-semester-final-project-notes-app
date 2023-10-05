import React from 'react'

const Todo = ({ todo, id, removeTodo }) => {
    const style = {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    };

    const handelRemoveTodo = (id) => {
        removeTodo(id)
    }
    return (
        <div className='bg-base-100 p-5 sm:p-5 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl rounded-md text-gray-500'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-xl font-bold underline '>{todo.title}</h1>
                    <h1 className='mt-3' style={style}>{todo.desc}</h1>
                </div>
                <div>
                    <button onClick={() => {
                        handelRemoveTodo(id)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                        </svg>
                    </button>
                </div>
            </div>





        </div>

    )
}

export default Todo