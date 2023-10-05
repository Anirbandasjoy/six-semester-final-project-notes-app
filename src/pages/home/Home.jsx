import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import Todos from '../../components/Todos'
import AddTodo from '../../components/AddTodo'
import toast from 'react-hot-toast';
const Home = () => {
    const [notes, setNotes] = useState([])
    const handelAddTodo = (note) => {
        setNotes((prevNotes) => {
            const newNote = { id: uuidv4(), note };
            const updatedNotes = [...prevNotes, newNote];
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        });
        toast.success("Added Successfully");
    }

    const removeNotes = (id) => {
        const filterNotes = notes.filter((note) => note.id !== id);
        setNotes(filterNotes);
        localStorage.setItem('notes', JSON.stringify(filterNotes));
        toast.success("Deleted Successfully");
    }

    useEffect(() => {
        const storedNotes = localStorage.getItem('notes');
        if (storedNotes) {
            setNotes(JSON.parse(storedNotes));
        }
    }, []);

    return (
        <div className='bg-[#1d232a] z-[40] h-screen   w-screen flex items-center justify-center'>
            <div className='flex flex-col  justify-center items-center bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-sky-200 to-90% lg:max-w-[45rem] p-5  mx-auto w-screen h-screen rounded-sm sm:h-[36rem] '>

                {/* <h1 className='text-base-100 mb-4 text-2xl font-bold  underline'>Notes App</h1> */}
                <Todos todos={notes} removeTodo={removeNotes} />
                <AddTodo onAddTodo={handelAddTodo} />
            </div>
        </div>
    )
}

export default Home