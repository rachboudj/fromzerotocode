import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import imgApropos from '../assets/img/img-1.jpg';
import imgTuto from '../assets/img/img-2.jpg';
import play from '../assets/img/play.png';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [values, setValues] = useState({
    name: '',
    surname: '',
    password: '',
    email: '',
  })
  const navigate = useNavigate()

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


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${import.meta.env.VITE_API_URL}/register`, values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/login')
        } else {
          alert("Error");
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          toast.error("Cette adresse mail existe déjà... Veuillez en rentrer une autre");
        } else {
          toast.error("Une erreur s'est produite. Veuillez réessayer.");
        }
      }
      );
  }

  return (
    <div>
      <div className='header flex items-center mt-10 px-8 phone:flex-col phone:px-2'>
        <div className='w-2/4 phone:w-full phone:flex phone:justify-center'>
          <h1 className='font-heading font-extrabold text-8xl phone:text-6xl'>From <br></br>Zero<br></br> to<br></br> Code</h1>
        </div>

        <div className='w-2/4 p-4 phone:w-full'>
          <h2 className='font-extrabold text-lg'>Rejoignez la team !</h2>
          <form onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mt-10 group">
              <label className='peer-focus:font-medium absolute text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' for="name">Nom</label>
              <input
                type="text"
                onChange={e => setValues({ ...values, name: e.target.value })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="relative z-0 w-full mt-10 group">
              <label className='peer-focus:font-medium absolute text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' for="surname">Prénom</label>
              <input
                type="text"
                onChange={e => setValues({ ...values, surname: e.target.value })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="relative z-0 w-full mt-10 group">
              <label className='peer-focus:font-medium absolute text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' for="email">Email</label>
              <input
                type="email"
                onChange={e => setValues({ ...values, email: e.target.value })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="relative z-0 w-full mt-10 group">
              <label className='peer-focus:font-medium absolute text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' for="password">Mots de passe</label>
              <input
                type="password"
                onChange={e => setValues({ ...values, password: e.target.value })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" 
            className="mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >S'inscrire</button>
          </form>
        </div>
      </div>

      <div className='flex justify-center items-center mt-16 px-8 phone:flex-col-reverse sm:px-6'>
        <div className='text w-2/4 phone:w-full'>
          <h2 className='font-heading font-bold text-3xl'>À propos</h2>
          <p className='mt-4'>Le site web FromZeroToCode a pour objectif principal de devenir une ressource incontournable pour les développeurs web débutants et intermédiaires, ainsi que pour les étudiants en développement web.</p>
          <button type="submit" className="mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"><Link to="/a-propos">En savoir plus</Link></button>
        </div>
        <div className='img w-2/4 flex justify-end phone:justify-center phone:w-full phone:mt-8 phone:mb-4'>
          <img className='w-3/4 phone:w-full' src={imgApropos} alt="" />
        </div>
      </div>

      <div className='flex justify-center items-center mt-16 px-8 phone:flex-col sm:px-6'>
      <div className='img w-2/4 flex justify-start phone:justify-center phone:w-full phone:mt-8 phone:mb-4'>
          <img className='w-3/4 phone:w-full' src={imgTuto} alt="" />
        </div>
        <div className='text w-2/4 phone:w-full'>
          <h2 className='font-heading font-bold text-3xl'>Les tutos</h2>
          <p className='mt-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <button type="submit" className="mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"><Link to="/les-tutos">Voir les tutos</Link></button>
        </div>
      </div>

      <div className='mt-12 phone:px-4 phone:mt-20'>
      <h2 className='font-heading font-bold text-3xl text-center'>Nos derniers cours</h2>
        {courses.length > 0 ? (
          <div className='flex justify-between w-full mt-12 phone:flex-col'>
            {courses.map((course) => (
              <div className='w-30 border-2 border-black bg-white shadow-grey phone:w-full phone:mt-4' key={course.id_course}>
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
