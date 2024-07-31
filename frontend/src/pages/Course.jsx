import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Course() {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`);
                setCourses(response.data);

                const categoriesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/category`);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredCourses = selectedCategory
        ? courses.filter(course => course.category.title === selectedCategory)
        : courses;

    return (
        <div>
            <div>
                <label htmlFor="category-select">Filtrer par catégorie:</label>
                <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Toutes les catégories</option>
                    {categories.map(category => (
                        <option key={category.id_category} value={category.title}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>

            {filteredCourses.length > 0 ? (
                <ul>
                    {filteredCourses.map((course) => (
                        <div key={course.id_course}>
                            <span>{course.category.title}</span>
                            <h2>{course.title}</h2>
                            <h2>{course.description}</h2>
                            <Link className='font-medium text-cyan-500 dark:text-blue-500 hover:underline mr-2' to={`/detail-course/${course.id_course}`}>Voir le tuto</Link>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>Pas de cours de disponible.</p>
            )}
        </div>
    )
}
