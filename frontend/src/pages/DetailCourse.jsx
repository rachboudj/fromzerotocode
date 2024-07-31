import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../assets/api';

export default function DetailCourse() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [status, setStatus] = useState(null);
    const [userHasCourse, setUserHasCourse] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_API_URL}/api/courses/${id}`);
                setCourse(response.data);

                const progressResponse = await api.get(`${import.meta.env.VITE_API_URL}/api/user-courses/${id}/progress`);
                if (progressResponse.data.status) {
                    setStatus(progressResponse.data.status);
                    setUserHasCourse(true);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching course:', error);
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleStart = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            navigate('/login');
            return;
        }
        if (course && course.tutorials.length > 0) {
            const firstTutorialId = course.tutorials[0].id_tutorial;

            try {
                await api.post(`${import.meta.env.VITE_API_URL}/api/user-courses/${id}/start`);
                navigate(`/courses/${id}/tutorials/${firstTutorialId}`);
            } catch (error) {
                console.error('Error starting the course:', error);
            }
        }
    };

    const handleResume = async () => {
        if (course && course.tutorials.length > 0) {
            const unfinishedTutorial = course.tutorials.find(t => t.progress !== 'finished');
            const tutorialToResume = unfinishedTutorial || course.tutorials[course.tutorials.length - 1];
            const tutorialId = tutorialToResume.id_tutorial;

            try {
                navigate(`/courses/${id}/tutorials/${tutorialId}`);
            } catch (error) {
                console.error('Error resuming the course:', error);
            }
        }
    };

    return (
        <div className='p-10'>
            <div className='mt-10 border-2 border-black bg-white p-10'>
                <h1 className='font-heading font-bold text-2xl'>{course.title}</h1>
                <p>{course.description}</p>
                {userHasCourse ? (
                    status === 'finished' ? (
                        <button
                            className='mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                            onClick={handleResume}
                        >Ce cours est terminé</button>
                    ) : status === 'In Progress' ? (
                        <button
                            className='mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                            onClick={handleResume}
                        >Reprendre</button>
                    ) : (
                        <button
                            className='mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                            onClick={handleStart}
                        >Commencer</button>
                    )
                ) : (
                    <button
                        className='mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                        onClick={handleStart}
                    >Commencer</button>
                )}
            </div>

            <>
                <div className='mt-10'>
                    <div className='border-2 border-black bg-white p-10' >
                        <h2 className='font-heading font-bold text-xl'>Syllabus</h2>
                    </div>
                    {course.tutorials.map((tutorial, index) => (
                        <div className='flex border-2 border-black bg-white p-10' key={tutorial.id_tutorial}>
                            <div>
                                <span className='text-white bg-black rounded-full p-2 mr-6'>{index + 1}</span>
                            </div>
                            <h3>{tutorial.title}</h3>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center'>
                    {userHasCourse ? (
                        status === 'finished' ? (
                            <button
                                className='mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                                onClick={handleResume}
                            >Ce cours est terminé</button>
                        ) : status === 'In Progress' ? (
                            <button
                                className='mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                                onClick={handleResume}
                            >Reprendre</button>
                        ) : (
                            <button
                                className='mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                                onClick={handleStart}
                            >Commencer</button>
                        )
                    ) : (
                        <button
                            className='mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                            onClick={handleStart}
                        >Commencer</button>
                    )}
                </div>
            </>
        </div>
    );
}
