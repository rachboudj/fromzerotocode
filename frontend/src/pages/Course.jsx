import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import play from '../assets/img/play.png';

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
            <div className='mt-12 px-4 phone:mt-20'>
                <h2 className='font-heading font-bold text-3xl text-center'>Tous nos cours</h2>
                <div>
                    <select id="category-select" 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                    className='text-black bg-white border-2 border-black font-medium text-sm px-4 py-2.5 text-center inline-flex items-center'
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map(category => (
                            <option key={category.id_category} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
                {filteredCourses.length > 0 ? (
                    <div className='flex flex-wrap justify-between w-full mt-12 phone:flex-col'>
                        {filteredCourses.map((course) => (
                            <div className='w-30 mt-5 border-2 border-black bg-white shadow-grey phone:w-full phone:mt-4' key={course.id_course}>
                                <div className='category border-b-2 border-black bg-violet-100 p-4'>
                                    <span>{course.category.title}</span>
                                </div>
                                <div className='p-4 '>
                                    <h3 className='font-heading font-bold text-xl'>{course.title}</h3>
                                    <p className='mt-2'>{course.description}</p>
                                    <div className='flex items-center mt-16'>
                                        <img className='w-5 mr-2' src={play} alt="" />
                                        <Link className='font-bold uppercase text-bleu-elec mr-2' to={`/detail-course/${course.id_course}`}>Voir le tuto</Link>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Pas de cours de disponible.</p>
                )}
            </div>
        </div>
    )
}
