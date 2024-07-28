import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function EditCategory() {
    const [category, setCategory] = useState();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        statut: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/${id}`)
                setCategory(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCategory();
    }, [id])

    const handleInputChange = (event) => {
        setCategory({
            ...category,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/category/${id}/edit`, category);
            navigate('/admin/category');
            toast.success("Le changement a bien été effectué !");
        } catch (error) {
            console.error(error);
            toast.error("Le changement n'a pas pu être effectué...");
        }
    };

    function retour() {
        navigate('/admin/category');
    }

    return (
        <div className='mt-8 max-w-md mx-auto'>
            <button onClick={retour} className='bg-black rounded-md p-2 cursor-pointer mb-4'>
                <IconArrowNarrowLeft stroke={2} color={"#fff"} />
            </button>
            {category && (
                <div>
                    <h1 className='text-3xl font-black'>Modifier la catégorie {category.title}</h1>
                    <div className='relative z-0 w-full mt-10 group'>
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="title">Titre</label>
                        <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" name="title" id="title" value={category.title} onChange={handleInputChange} />
                    </div>

                    <div className='relative z-0 w-full mt-10 group'>
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="description">Description</label>
                        <textarea className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" name="description" id="description" value={category.description} onChange={handleInputChange}></textarea>
                    </div>

                    <div className='relative z-0 w-full mt-10 group'>
                        <label className='peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="statut">Status</label>
                        <select className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="statut" id="status" value={category.statut} onChange={handleInputChange}>
                            <option value="">
                                -- Sélectionner un status --
                            </option>
                            <option value="Activé">
                                Activé
                            </option>
                            <option value="Désactivé">
                                Désactivé
                            </option>
                        </select>
                    </div>

                    <button className='mt-5 text-white bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleSubmit}>Enregistrer les modifications</button>
                </div>
            )}
        </div>
    )
}
