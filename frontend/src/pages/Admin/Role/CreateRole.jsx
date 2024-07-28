import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { toast } from 'react-toastify';


export default function CreateRole() {
    const [name, setName] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const roleData = {
            name
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/roles/new`, roleData);
            navigate('/admin/roles');
            toast.success("L'ajout a bien été effectué !");
        } catch (error) {
            console.error(error);
            toast.error("L'ajout n'a pas pu être effectué...");
        }
    }

    function retour() {
        navigate('/admin/roles');
    }

    return (
        <div className='mt-8 max-w-md mx-auto'>
            <button onClick={retour} className='bg-black rounded-md p-2 cursor-pointer mb-4'>
                <IconArrowNarrowLeft stroke={2} color={"#fff"} />
            </button>
            <h1 className='text-3xl font-black'>Créer un nouveau rôle</h1>
            <div className='relative z-0 w-full mt-10 group'>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="name">Nom du rôle</label>
                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" name="name" id="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <button className='mt-5 text-white bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleSubmit}>Créer le rôle</button>
        </div>
    )
}