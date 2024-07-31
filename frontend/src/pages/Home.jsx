import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`);
        const sortedCourses = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const latestCourses = sortedCourses.slice(0, 3);
        setCourses(latestCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
          {courses.length > 0 ? (
            <ul>
              {courses.map((course) => (
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
