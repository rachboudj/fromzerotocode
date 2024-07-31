import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../assets/api';
import PrivateRoute from '../components/PrivateComponent';

export default function DetailTutorial() {
    const { courseId, tutorialId } = useParams();
    const [tutorial, setTutorial] = useState(null);
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courseStatus, setCourseStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTutorial = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/${courseId}/tutorials/${tutorialId}`);
                setTutorial(response.data);

                const tutorialsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/${courseId}/tutorials`);
                setTutorials(tutorialsResponse.data);

                const statusResponse = await api.get(`${import.meta.env.VITE_API_URL}/api/user-courses/${courseId}/progress`);
                setCourseStatus(statusResponse.data.status);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching tutorial:', error);
                setLoading(false);
            }
        };
        fetchTutorial();
    }, [courseId, tutorialId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!tutorial) {
        return <div>Tutorial not found</div>;
    }

    const handleNext = async () => {
        const currentIndex = tutorials.findIndex(t => t.id_tutorial === parseInt(tutorialId));
        if (currentIndex >= 0 && currentIndex < tutorials.length - 1) {
            const nextTutorialId = tutorials[currentIndex + 1].id_tutorial;
            navigate(`/courses/${courseId}/tutorials/${nextTutorialId}`);

            console.log(courseStatus)
            if (courseStatus !== 'finished') {
                const progress = Math.round(((currentIndex + 1) / tutorials.length) * 100);
                try {
                    await api.put(`${import.meta.env.VITE_API_URL}/api/user-courses/${courseId}/progress/${progress}`);
                } catch (error) {
                    console.error('Erreur lors de la mise à jour de la progression du cours :', error);
                }
            }
        } else {
            console.log('This is the last tutorial.');
        }
    };

    const handlePrevious = () => {
        const currentIndex = tutorials.findIndex(t => t.id_tutorial === parseInt(tutorialId));
        if (currentIndex > 0) {
            const previousTutorialId = tutorials[currentIndex - 1].id_tutorial;
            navigate(`/courses/${courseId}/tutorials/${previousTutorialId}`);
        } else {
            console.log('This is the first tutorial.');
        }
    };

    const handleFinish = async () => {
        try {
            await api.put(`${import.meta.env.VITE_API_URL}/api/user-courses/${courseId}/finish`);
            navigate(`/detail-course/${courseId}`);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut du cours :', error);
        }
    };

    const currentIndex = tutorials.findIndex(t => t.id_tutorial === parseInt(tutorialId));
    const isLastTutorial = currentIndex === tutorials.length - 1;

    const getEmbedUrl = (url) => {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname === '/watch') {
            const videoId = urlObj.searchParams.get('v');
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };

    return (
        <PrivateRoute>
            <div className='p-10'>
                <div className='mt-10 border-2 border-black bg-white p-10'>
                    <h1 className='font-heading font-bold text-3xl'>{tutorial.title}</h1>
                    <iframe className='mt-10 w-full h-screen' id="ytplayer" type="text/html"
                        src={getEmbedUrl(tutorial.content)}
                        frameborder="0" />
                </div>
                <div className='flex justify-center mt-10'>
                        {currentIndex > 0 && (
                            <button 
                            className="mt-5 mr-10 border-2 border-black text-black shadow-black bg-white hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            onClick={handlePrevious}
                            >Précédent</button>
                        )}
                        {!isLastTutorial && (
                            <button 
                            className="mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            onClick={handleNext}
                            >Suivant</button>
                        )}
                        {isLastTutorial && (
                            <button 
                            className="mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            onClick={handleFinish}
                            >Terminé</button>
                        )}
                    </div>
            </div>
        </PrivateRoute>
    );
}
