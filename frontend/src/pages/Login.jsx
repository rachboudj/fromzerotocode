import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import api from "../../assets/api";
// import imgAuth from "../assets/img/tefilin-siddour.png";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        api.post(`${import.meta.env.VITE_API_URL}/login`, { email, password })
        .then(res => {
            if(res.data.Status === "Success") {
                localStorage.setItem("accessToken", res.data.accessToken);
                navigate('/')
            } else {
                alert("Error");
            }
        })
        .then(err => console.log(err));
    }

    return (
        <div className='flex'>
            <div className='mt-8 max-w-md mx-auto w-2/4 flex-row self-center'>
                <h2 className='text-3xl font-black'>
                    Se connecter
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mt-10 group">
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="exampleInputEmail1">Email</label>
                        <input
                            type="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            onChange={e => setEmail(e.target.value)}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="relative z-0 w-full mt-10 group">
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="exampleInputPassword1">Mots de passe</label>
                        <input
                            type="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            onChange={e => setPassword(e.target.value)}
                            id="exampleInputPassword1"
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="mt-5 text-white bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Se connecter</button>
                </form>
                <p className='mt-4 text-sm font-medium text-gray-900 dark:text-gray-300'>Vous n'avez pas de compte ? <Link className="text-cyan-500 hover:underline dark:text-blue-500" to="/register">S'inscrire</Link></p>
            </div>
        </div>
    )
}