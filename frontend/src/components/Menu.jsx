import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


import logo from "../assets/img/logo-mobile.png";

export default function Menu() {
    const location = useLocation();
    const navigate = useNavigate();
    const submenuRef = useRef(null);
    const [submenuVisible, setSubmenuVisible] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUserRole(decodedToken.roles);
        }
    }, []);

    const hasAccess = userRole.includes('Admin');

    const handleMouseEnter = (event) => {
        setSubmenuVisible(!submenuVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate('/login');
    };

    return (
        <nav className='bg-beige-clair'>
            <div className='flex justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-16'>
                <div className='flex items-center'>
                    <img className="h-6 w-auto" src={logo} alt="Logo From Zero To Code" />
                    <span className='font-medium ml-3'>From Zero To Code</span>
                </div>

                <div className="flex space-x-4 items-center">
                    <div className='relative'>
                        <button onClick={handleMouseEnter}><img className="w-8 h-8 rounded-full shadow-lg" src={logo} alt="Bonnie image" /></button>
                        <div
                            ref={submenuRef}
                            className={`${submenuVisible ? '' : 'hidden'} absolute submenu right-1 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {hasAccess && (
                                    <>

                                        <a href="/admin/user" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Utilisateurs</a>
                                        <a href="/admin/courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Cours</a>
                                        <a href="/admin/tutorial" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Tutoriels</a>
                                        <a href="/admin/category" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Catégorie</a>
                                        <a href="/admin/roles" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Rôles</a>
                                        <hr />
                                        </>
                                )}
                                        <button className="block px-4 py-2 text-sm text-red-500  hover:bg-gray-100 hover:text-red-700" role="menuitem" onClick={handleLogout}>Se déconnecter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
