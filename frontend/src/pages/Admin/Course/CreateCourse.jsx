import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import AdminRoute from '../../../components/AdminComponent';
import PrivateRoute from '../../../components/PrivateComponent';

export default function CreateCourses() {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/category`)
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories :', error);
            });
    }, []);

    const handleCategoryChange = event => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const categoryId = parseInt(selectedCategory);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('thumbnail', thumbnail);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('category', categoryId);

        console.log(formData.title)

        if (typeof categoryId !== 'number') {
            console.log("Erreur : selectedCategory n'est pas un nombre");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/courses/new`, formData);
            navigate('/admin/courses');
            toast.success("L'ajout a bien été effectué !");
        } catch (error) {
            console.error(error);
            toast.error("L'ajout n'a pas pu être effectué...");
        }
    };

    function retour() {
        navigate('/admin/courses');
    }

    return (
        <PrivateRoute>
            <AdminRoute>
                <div className='mt-8 max-w-md mx-auto'>
                    <button onClick={retour} className='bg-black rounded-md p-2 cursor-pointer mb-4'>
                        <IconArrowNarrowLeft stroke={2} color={"#fff"} />
                    </button>

                    <h1 className='text-3xl font-black'>Créer un nouveau cours</h1>
                    <div className='relative z-0 w-full mt-10 group'>
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="title">Titre du cours</label>
                        <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div className='relative z-0 w-full mt-10 group'>
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="description">Description</label>
                        <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                    </div>
                    <div className='relative z-0 w-full mt-10 group'>
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="date">Date</label>
                        <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} />
                    </div>
                    <div className='relative z-0 w-full mt-10 group'>
                        <label className='peer-focus:font-medium text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="category">Catégorie</label>
                        <select className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="category" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">-- Sélectionner une catégorie --</option>
                            {category.map(category => (
                                <option key={category.id_category} value={category.id_category}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className='mt-5 text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' onClick={handleSubmit}>Créer le cours</button>
                </div>
            </AdminRoute>
        </PrivateRoute>
    )
}
