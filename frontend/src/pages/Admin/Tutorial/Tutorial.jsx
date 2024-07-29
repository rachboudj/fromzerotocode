import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminRoute from '../../../components/AdminComponent';
import PrivateRoute from '../../../components/PrivateComponent';

export default function Tutorial() {
    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tutorials`);
                setTutorials(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        console.log(tutorials)
        fetchTutorials();
    }, []);

    const handleDeleteCourse = async (tutorialId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/tutorials/${tutorialId}`)
                setTutorials(tutorials.filter(tutorials => tutorials.id_tutorial !== tutorialId));
                navigate('/admin/tutorial');
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <PrivateRoute>
            <AdminRoute>
                <div className='p-6'>
                    <div className='bg-white p-6 rounded-lg relative overflow-x-auto mt-2'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-3xl font-black'>Tutoriel</h1>
                            <a className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' href="/admin/tutorial/new">Créer un tutoriel</a>
                        </div>

                        <div className="relative overflow-x-auto mt-10">
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs border-b text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Titre</th>
                                        <th scope="col" className="px-6 py-3">Contenu</th>
                                        <th scope="col" className="px-6 py-3">Cours</th>
                                        <th scope="col" className="px-6 py-3" colSpan={2}>Opération</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tutorials.map(tutorial => (
                                        <tr className='bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' key={tutorial.id_courses}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{tutorial.title}</th>
                                            <td className="px-6 py-4">{tutorial.content}</td>
                                            <td className="px-6 py-4">{tutorial.course.title}</td>
                                            <td className="px-6 py-4">
                                                <Link className='font-medium text-cyan-500 dark:text-blue-500 hover:underline mr-2' to={`/admin/tutorial/${tutorial.id_tutorial}/edit`}>Modifier</Link>
                                                <button className='font-medium text-red-500 dark:text-red-500 hover:underline' onClick={() => handleDeleteCourse(tutorial.id_tutorial)}>Supprimer</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminRoute>
        </PrivateRoute>
    )
}
