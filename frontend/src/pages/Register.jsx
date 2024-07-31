import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';

export default function Register() {
    const [values, setValues] = useState({
        name: '',
        surname: '',
        password: '',
        email: '',
    })


    const navigate = useNavigate()
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
            .catch(err => 
                {
                    if (err.response && err.response.status === 400) {
                        toast.error("Cette adresse mail existe déjà... Veuillez en rentrer une autre");
                    } else {
                        toast.error("Une erreur s'est produite. Veuillez réessayer.");
                    }
                }
            );
    }


    return (
        <div className='flex'>
            <div className='mt-8 max-w-md mx-auto w-2/4 flex-row self-center'>
                <h2 className='text-3xl font-black'>
                    S'inscrire
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mt-10 group">
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' for="name">Nom</label>
                        <input
                            type="text"
                            onChange={e => setValues({ ...values, name: e.target.value })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="relative z-0 w-full mt-10 group">
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' for="surname">Prénom</label>
                        <input
                            type="text"
                            onChange={e => setValues({ ...values, surname: e.target.value })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="relative z-0 w-full mt-10 group">
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' for="email">Email</label>
                        <input
                            type="email"
                            onChange={e => setValues({ ...values, email: e.target.value })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="relative z-0 w-full mt-10 group">
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' for="password">Mots de passe</label>
                        <input
                            type="password"
                            onChange={e => setValues({ ...values, password: e.target.value })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <button type="submit" 
                    className="mt-5 border-2 border-black text-white shadow-black bg-bleu-elec hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >S'inscrire</button>
                </form>
                <p className='mt-4 text-sm font-medium text-gray-900 dark:text-gray-300'>Vous avez déjà un compte ? <Link className="text-bleu-elec hover:underline dark:text-blue-500" to="/login">Se connecter</Link></p>
            </div>
        </div>
    )
}
