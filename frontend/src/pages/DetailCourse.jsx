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
        <div>
            <h1>Détail du cours: {course.title}</h1>
            <p>Description: {course.description}</p>
            {userHasCourse ? (
                status === 'finished' ? (
                    <button onClick={handleResume}>Ce cours est terminé</button>
                ) : status === 'In Progress' ? (
                    <button onClick={handleResume}>Reprendre</button>
                ) : (
                    <button onClick={handleStart}>Commencer</button>
                )
            ) : (
                <button onClick={handleStart}>Commencer</button>
            )}
            <>
                <ul>
                    {course.tutorials.map((tutorial) => (
                        <li key={tutorial.id_tutorial}>
                            <h3>{tutorial.title}</h3>
                        </li>
                    ))}
                </ul>
            </>
        </div>
    );
}
