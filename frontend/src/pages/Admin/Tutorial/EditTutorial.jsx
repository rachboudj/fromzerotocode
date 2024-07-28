import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { toast } from 'react-toastify';

export default function EditTutorial() {
  const { id } = useParams();
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

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/tutorials/${id}`)
            .then(response => {
                const tutorial = response.data;
                setTitle(tutorial.title);
                setContent(tutorial.content);
                setSelectedCourse(tutorial.course.id_course);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du tutoriel :', error);
            });
    }, [id]);

    const handleCourseChange = event => {
        setSelectedCourse(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/tutorials/${id}/edit`, tutorialData);
            navigate('/admin/tutorial');
            toast.success("Le changement a bien été effectué !");
        } catch (error) {
            console.error(error);
            toast.error("Le changement n'a pas pu être effectué...");
        }
    };

    function retour() {
        navigate('/admin/tutorial');
    }

    return (
        <div className='mt-8 max-w-md mx-auto'>
            <button onClick={retour} className='bg-black rounded-md p-2 cursor-pointer mb-4'>
                <IconArrowNarrowLeft stroke={2} color={"#fff"} />
            </button>

            <h1 className='text-3xl font-black'>Modifier le tutoriel</h1>
            <div className='relative z-0 w-full mt-10 group'>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="title">Titre du tutoriel</label>
                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className='relative z-0 w-full mt-10 group'>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="content">Contenu</label>
                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" id="content" value={content} onChange={(event) => setContent(event.target.value)} />
            </div>
            <div className='relative z-0 w-full mt-10 group'>
                <label className='peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="course">Cours</label>
                <select className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="course" value={selectedCourse} onChange={handleCourseChange}>
                    <option value="">-- Sélectionner un cours --</option>
                    {courses.map(course => (
                        <option key={course.id_course} value={course.id_course}>
                            {course.title}
                        </option>
                    ))}
                </select>
            </div>
            <button className='mt-5 text-white bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleSubmit}>Modifier le tutoriel</button>
        </div>
    )
}
