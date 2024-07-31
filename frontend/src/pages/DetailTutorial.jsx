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
        <div>
            <h1>{tutorial.title}</h1>
            <iframe id="ytplayer" type="text/html" width="640" height="360"
                src={getEmbedUrl(tutorial.content)}
                frameborder="0" />

            <div>
                {currentIndex > 0 && (
                    <button onClick={handlePrevious}>Précédent</button>
                )}
                {!isLastTutorial && (
                    <button onClick={handleNext}>Suivant</button>
                )}
                {isLastTutorial && (
                    <button onClick={handleFinish}>Terminé</button>
                )}
            </div>
        </div>
        </PrivateRoute>
    );
}
