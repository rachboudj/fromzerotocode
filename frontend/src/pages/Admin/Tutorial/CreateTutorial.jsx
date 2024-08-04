import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import AdminRoute from '../../../components/AdminComponent';
import PrivateRoute from '../../../components/PrivateComponent';

export default function CreateTutorial() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/courses`)
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories :', error);
            });
    }, []);

    const handleCourseChange = event => {
        setSelectedCourse(event.target.value);
    };

    const isValidYouTubeURL = (url) => {
        const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        return regex.test(url);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValidYouTubeURL(content)) {
            toast.error('Veuillez entrer une URL YouTube valide.');
            return;
        }

        const courseId = parseInt(selectedCourse);

        const tutorialData = {
            title,
            content,
            course: courseId
        }


        if (typeof courseId !== 'number') {
            console.log("Erreur : selectedCourse n'est pas un nombre");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tutorials/new`, tutorialData);
            navigate('/admin/tutorial');
            toast.success("L'ajout a bien été effectué !");
        } catch (error) {
            console.error(error);
            toast.error("L'ajout n'a pas pu être effectué...");
        }
    };

    function retour() {
        navigate('/admin/tutorial');
    }

    return (
        <PrivateRoute>
            <AdminRoute>
                <div className='mt-8 max-w-md mx-auto'>
                    <button onClick={retour} className='bg-black rounded-md p-2 cursor-pointer mb-4'>
                        <IconArrowNarrowLeft stroke={2} color={"#fff"} />
                    </button>

                    <h1 className='text-3xl font-black'>Créer un nouveau tutoriel</h1>
                    <div className='relative z-0 w-full mt-10 group'>
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="title">Titre du tutoriel</label>
                        <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div className='relative z-0 w-full mt-10 group'>
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="content">URL Youtube</label>
                        <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" id="content" value={content} onChange={(event) => setContent(event.target.value)} />
                    </div>
                    <div className='relative z-0 w-full mt-10 group'>
                        <label className='peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="course">Cours</label>
                        <select className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="course" value={selectedCourse} onChange={handleCourseChange}>
                            <option value="">-- Sélectionner un cours --</option>
                            {courses.map(course => (
                                <option key={course.id_course} value={course.id_course}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className='mt-5 text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleSubmit}>Créer le tutoriel</button>
                </div>
            </AdminRoute>
        </PrivateRoute>
    )
}
