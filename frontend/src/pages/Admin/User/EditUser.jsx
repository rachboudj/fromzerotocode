import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function EditUserPage() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        roles: []
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
                params: {
                    include: {
                        roles: {
                            include: {
                                role: true
                            }
                        }
                    }
                }
            });

            setUser(response.data);

            setFormData({
                name: response.data.name,
                surname: response.data.surname,
                email: response.data.email,
                roles: response.data.roles.map((role) => role.name)
            });
            setRoles(response.data.roles);

        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleDeleteRole = async (roleId) => {
        try {
            const roleIndex = roles.findIndex((role) => role.id_role === roleId);

            if (roleIndex === -1) {
                console.error(`Le rôle avec l'ID ${roleId} n'existe pas`);
                return;
            }
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${user.id_user}/roles/${roleId}`);
            const { accessToken } = response.data;
            console.log("c'est supprimé")
            console.log(accessToken)

            if (accessToken) {
                console.log("local storaaage suppr")
                localStorage.setItem('accessToken', accessToken);
                const updatedUser = jwtDecode(accessToken);

                setUsers(user.map(user =>
                    user.id_user === updatedUser.id_user ? { ...user, roles: updatedUser.roles } : user
                ));
                console.log("jeton actualisé")
            }

            setRoles((prevRoles) => prevRoles.filter((role) => role.id_role !== roleId));

            setFormData((prevFormData) => ({
                ...prevFormData,
                roles: prevFormData.roles.filter((roleId) => roleId !== roleId)
            }));

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`);
                setRoles(response.data);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchRoles();
    }, []);


    const handleSubmit = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${id}/edit`, formData);
            navigate('/admin/user');
            toast.success("Le changement a bien été effectué !");
        } catch (error) {
            console.error(error);
        }
    };

    function retour() {
        navigate('/admin/user');
    }

    if (!user) {
        return <div>Chargement...</div>;
    }

    return (
        <div className='mt-8 max-w-md mx-auto'>
            <button onClick={retour} className='bg-black rounded-md p-2 cursor-pointer mb-4'>
                <IconArrowNarrowLeft stroke={2} color={"#fff"} />
            </button>
            <h1 className='text-3xl font-black'>Modifier {user.surname} {user.name}</h1>

            <div className='relative z-0 w-full mt-10 group'>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="name">Nom :</label>
                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>

            <div className='relative z-0 w-full mt-10 group'>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="surname">Prénom :</label>
                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" id="surname" name="surname" value={formData.surname} onChange={handleInputChange} />
            </div>

            <div className='relative z-0 w-full mt-10 group'>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="email">Email :</label>
                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>

            <div className='relative z-0 w-full mt-10 group'>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="roles">Rôles :</label>
                <ul>
                    {user.roles.map((role) => (
                        <div className='flex' key={role.id_role}>
                            <p className='block py-2.5 px-0 w-full text-sm text-gray-900 appearance-none dark:text-white'>{role.role.name}</p>
                            <button className='font-medium text-red-600 dark:text-red-500 hover:underline' onClick={() => handleDeleteRole(role.id_role)}>Supprimer</button>
                        </div>

                    ))}
                </ul>
            </div>

            {/* <button className='mt-5 text-white bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleSubmit}> Enregistrer les modifications</button> */}
        </div>
    );
}

export default EditUserPage;