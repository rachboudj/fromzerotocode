import React, { useState, useEffect } from 'react'
import api from '../assets/api';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateComponent';
import arrow from '../assets/img/arrow-right.png';
import { toast } from 'react-toastify';

export default function UserProfil() {
    const [inProgressCourses, setInProgressCourses] = useState([]);
    const [finishedCourses, setFinishedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ id_user: '', firstName: '', lastName: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserCourses = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_API_URL}/api/user-courses`);
                setInProgressCourses(response.data.inProgressCourses);
                setFinishedCourses(response.data.finishedCourses);
                setUser(response.data.user);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user courses:', error);
                setLoading(false);
            }
        };
        fetchUserCourses();
    }, []);

    const handleDeleteAccount = async () => {
        const userId = user.id_user;
        if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
            try {
                await api.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);
                localStorage.removeItem('accessToken');
                toast.success("Votre compte a bien été supprimé. À une prochaine ;)");
                navigate('/register');
            } catch (error) {
                console.error('Error deleting account:', error);
                toast.error("Votre compte n'a pas pu être supprimé");
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleCourseClick = (courseId) => {
        navigate(`/detail-course/${courseId}`);
    };

    return (
        <PrivateRoute>

            <div className='p-12'>
                <h1 className='font-heading font-bold text-3xl'>{user.firstName} {user.lastName}</h1>

                <div>
                    <h2 className='mt-10 font-bold'>Cours en cours</h2>
                    <ul>
                        {inProgressCourses.length > 0 ? (
                            <div className='mt-5'>
                                {inProgressCourses.map(course => (
                                    <div className='flex items-center justify-between border-2 border-black bg-white p-10' key={course.id_course}>
                                        <div>
                                            <h3>{course.course.title}</h3>
                                            <span className='text-white bg-black p-2'>{progress} %</span>
                                        </div>
                                        <button onClick={() => handleCourseClick(course.id_course)}>
                                            <img className='w-5' src={arrow} alt="" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Aucun cours en cours pour le moment.</p>
                        )}
                    </ul>

                    <h2 className='mt-10 font-bold'>Cours terminés</h2>
                    {finishedCourses.length > 0 ? (
                        <div className='mt-5'>
                            {finishedCourses.map(course => (
                                <div className='flex items-center justify-between border-2 border-black bg-white p-10' key={course.id_course}>
                                    <div>
                                        <h3 className='mb-6'>{course.course.title}</h3>
                                        <span className='text-white bg-black p-2'>{course.progress} %</span>

                                    </div>
                                    <button onClick={() => handleCourseClick(course.id_course)}>
                                        <img className='w-5' src={arrow} alt="" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Aucun cours terminé pour le moment.</p>
                    )}

                </div>
                <button
                    onClick={handleDeleteAccount}
                    className="mt-20 px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white"
                >Supprimer mon compte</button>
            </div>
        </PrivateRoute>
    );
}
