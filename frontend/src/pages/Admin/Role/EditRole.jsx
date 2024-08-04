import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminRoute from '../../../components/AdminComponent';
import PrivateRoute from '../../../components/PrivateComponent';

export default function EditRole() {
    const [role, setRole] = useState();
    const [formData, setFormData] = useState({
        name: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles/${id}`, role)
                setRole(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchRole();
    }, [id])

    const handleInputChange = (event) => {
        setRole({
            ...role,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/roles/${id}/edit`, role)
            navigate('/admin/roles');
            toast.success("Le changement a bien été effectué !");
        } catch (error) {
            console.error(error);
            toast.error("Le changement n'a pas pu être effectué...");
        }
    };

    function retour() {
        navigate('/admin/roles');
    }

    return (
        <PrivateRoute>
            <AdminRoute>
                <div className='mt-8 max-w-md mx-auto'>
                    <button onClick={retour} className='bg-black rounded-md p-2 cursor-pointer mb-4'>
                        <IconArrowNarrowLeft stroke={2} color={"#fff"} />
                    </button>
                    {role && (
                        <div>
                            <h1 className='text-3xl font-black'>Modifier le rôle {role.name}</h1>
                            <div className='relative z-0 w-full mt-10 group'>
                                <label className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="name">Nom</label>
                                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" name="name" id="name" value={role.name} onChange={handleInputChange} />
                            </div>
                            <button className='mt-5 text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' onClick={handleSubmit}>Enregistrer les modifications</button>
                        </div>
                    )}
                </div>
            </AdminRoute>
        </PrivateRoute>
    )
}
