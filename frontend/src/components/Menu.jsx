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
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUserRole(decodedToken.roles);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const hasAccess = userRole.includes('Admin') || userRole.includes('SuperAdmin');
    const hasSuperAdminAccess = userRole.includes('SuperAdmin');

    const handleMouseEnter = (event) => {
        setSubmenuVisible(!submenuVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className='bg-beige-clair'>
            <div className='flex justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-16'>
                <div className='flex items-center'>
                    <img className="h-6 w-auto" src={logo} alt="Logo From Zero To Code" />
                    <span className='font-medium ml-3'>From Zero To Code</span>
                </div>

                <div className='flex items-center'>
                    <ul className='flex items-center '>
                        <li><a href="/" className="" role="menuitem">Accueil</a></li>
                        <li><a href="/a-propos" className="" role="menuitem">À propos</a></li>
                        <li><a href="/les-tutos" className="" role="menuitem">Les tutos</a></li>
                    </ul>
                </div>

                <div className="flex space-x-4 items-center">
                    {isLoggedIn ? (
                        <div className='relative'>
                            <button onClick={handleMouseEnter}><img className="w-8 h-8 rounded-full shadow-lg" src={logo} alt="Bonnie image" /></button>
                            <div
                                ref={submenuRef}
                                className={`${submenuVisible ? '' : 'hidden'} absolute submenu right-1 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <a href="/profil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profil</a>

                                    {hasAccess && (
                                        <>
                                            <span className="block mt-4 uppercase px-4 py-2 font-medium text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900">Administrateur</span>
                                            {userRole.includes('SuperAdmin') && (
                                                <>
                                            <a href="/admin/user" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Utilisateurs</a>
                                            <a href="/admin/roles" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Rôles</a>
                                            </>
                                            )}
                                            <a href="/admin/category" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Catégorie</a>
                                            <a href="/admin/courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Cours</a>
                                            <a href="/admin/tutorial" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Tutoriels</a>
                                        </>
                                    )}
                                    <hr />
                                    <button className="block px-4 py-2 text-sm text-red-500  hover:bg-gray-100 hover:text-red-700" role="menuitem" onClick={handleLogout}>Se déconnecter</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button className="px-4 py-2 text-sm text-blue-500 hover:text-blue-700" onClick={() => navigate('/login')}>Se connecter</button>
                            <button className="px-4 py-2 text-sm text-blue-500 hover:text-blue-700" onClick={() => navigate('/register')}>S'inscrire</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
