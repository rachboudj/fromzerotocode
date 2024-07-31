import React, { useState, useEffect } from 'react'
import axios from 'axios';
import api from '../assets/api';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateComponent';
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

    return (
        <PrivateRoute>

            <div>
                <h1>Profil de l'utilisateur</h1>
                <p>{user.firstName} {user.lastName}</p>

                <h2>Cours en cours</h2>
                <ul>
                    {inProgressCourses.length > 0 ? (
                        <ul>
                            {inProgressCourses.map(course => (
                                <li key={course.id_course}>
                                    <h3>{course.course.title}</h3>
                                    <p>{course.course.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun cours en cours pour le moment.</p>
                    )}
                </ul>

                <h2>Cours terminés</h2>
                {finishedCourses.length > 0 ? (
                    <ul>
                        {finishedCourses.map(course => (
                            <li key={course.id_course}>
                                <h3>{course.course.title}</h3>
                                <p>{course.course.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun cours terminé pour le moment.</p>
                )}

                <button onClick={handleDeleteAccount} className="px-4 py-2 text-sm text-red-500 hover:text-red-700">Supprimer mon compte</button>

            </div>
        </PrivateRoute>
    );
}
