import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { toast } from 'react-toastify';

export default function EditCourses() {
    const [course, setCourse] = useState();
    const [category, setCategory] = useState([]);
    const [file, setFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/${id}`)
                setCourse(response.data)
                setSelectedCategory(response.data.id_category);
            } catch (error) {
                console.error(error)
            }
        }
        fetchCourse();
    }, [id])

    const handleInputChange = (event) => {
        setCourse({
            ...course,
            [event.target.name]: event.target.value
        });
    };

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
        const newCategoryId = event.target.value;
        setSelectedCategory(parseInt(newCategoryId));
        setCourse({
            ...course,
            id_category: parseInt(newCategoryId)
        });
    };

    function retour() {
        navigate('/admin/courses');
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const categoryId = parseInt(selectedCategory);

        const formData = new FormData();
        formData.append('title', course.title);
        if (file) {
            formData.append('thumbnail', file);
        }
        formData.append('description', course.description);
        formData.append('date', course.date);
        formData.append('id_category', categoryId);

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/courses/${id}/edit`, formData);
            navigate('/admin/courses');
            toast.success("Le changement a bien été effectué !");
        } catch (error) {
            toast.success("Le changement n'a pu être effectué...");
            console.error(error);
        }
    };

    return (
                <div className='mt-8 max-w-md mx-auto'>
                    <button onClick={retour} className='bg-black rounded-md p-2 cursor-pointer mb-4'>
                        <IconArrowNarrowLeft stroke={2} color={"#fff"} />
                    </button>

                    {course && (
                        <div>
                            <h1 className='text-3xl font-black'>Modifier la date {course.title}</h1>
                            <div className='relative z-0 w-full mt-10 group'>
                                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="title">Titre</label>
                                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" name="title" id="title" value={course.title} onChange={handleInputChange} />
                            </div>

                            <div className='relative z-0 w-full mt-10 group'>
                                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="description">Description</label>
                                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" name="description" id="description" value={course.description} onChange={handleInputChange} />
                            </div>

                            <div className='relative z-0 w-full mt-10 group'>
                                <label className='peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="category">Catégorie</label>
                                <select className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="category" value={selectedCategory} onChange={handleCategoryChange}>
                                    <option value=""></option>
                                    {category.map(category => (
                                        <option key={category.id_category} value={category.id_category}>
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button className='mt-5 text-white bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleSubmit}>Enregistrer les modifications</button>
                        </div>
                    )}
                </div>
    )
}
