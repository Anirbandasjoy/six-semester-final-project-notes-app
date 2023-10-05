import React, { useContext, useState } from 'react'
import { authContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const AddTodo = ({ onAddTodo }) => {
    const { user } = useContext(authContext);
    console.log(user)
    const [note, setNote] = useState({ title: "", desc: "" });
    const { title, desc } = note;
    const handleChange = (event) => {
        const name = event.target.name;
        setNote((oldNote) => {
            return { ...oldNote, [name]: event.target.value }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddTodo(note)
        setNote({ title: "", desc: "" })

    }

    return (
        <div>
            {
                user?.emailVerified ? <button onClick={() => document.getElementById('my_modal_5').showModal()} className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-14 h-14 text-white bg-yellow-600  mt-4 rounded-full p-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </button> : <Link to="/login">

                    <button >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-14 h-14 text-white bg-yellow-600  mt-4 rounded-full p-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                    </button>

                </Link>
            }

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className=" text-xl text-center underline">Adding Notes</h3>
                    <form method="dialog">
                        <button className="btn hover:text-white btn-sm hover:bg-red-500  btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="modal-action w-fit mx-auto">
                        <form onSubmit={handleSubmit}>

                            <input id='title' name='title' type="text" placeholder="title here" className="input w-full input-bordered input-success  max-w-xs" value={title} onChange={handleChange} required />
                            <div className='mt-3'>
                                <textarea id='desc' name='desc' className="textarea w-full textarea-warning" placeholder="Desc" value={desc} onChange={handleChange} required></textarea>
                            </div>


                            <button type='submit' className="btn mt-7 mx-auto bg-yellow-600 text-white hover:bg-transparent hover:text-gray-700">Add</button>

                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default AddTodo