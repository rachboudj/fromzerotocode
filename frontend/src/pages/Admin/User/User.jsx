import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

export default function User() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRoleId, setSelectedRoleId] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`);
                setRoles(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
        fetchRoles();
    }, []);

    const handleAddRole = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/${selectedUserId}/roles/${selectedRoleId}`);
            alert('Rôle ajouté avec succès');
            const { accessToken } = response.data;
            console.log(accessToken)

            if (accessToken) {
                console.log("local storaaage")
                localStorage.setItem('accessToken', accessToken);
                const updatedUser = jwtDecode(accessToken);

                setUsers(users.map(user =>
                    user.id_user === updatedUser.id_user ? { ...user, roles: updatedUser.roles } : user
                ));
                console.log("c'est bon frérot")
            }
            setSelectedUserId('');
            setSelectedRoleId('');
        } catch (error) {
            console.error(error);
            alert('Erreur lors de l\'ajout du rôle');
        }
    };

    return (
                <div className='p-6'>

                    <div className='bg-white p-6 rounded-lg relative overflow-x-auto mt-2'>
                        <h1 className='text-3xl font-black'>Utilisateurs</h1>

                        <div className="relative overflow-x-auto mt-10">
                            <table className='w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs border-b text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nom</th>
                                        <th scope="col" className="px-6 py-3">Prénom</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Rôles</th>
                                        <th scope="col" className="px-6 py-3">Opérations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr className='bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' key={user.id_user}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                                            <td className="px-6 py-4">{user.surname}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.roles.map(userRole => userRole.role.name).join(', ')}</td>
                                            <td>
                                                <Link className='font-medium text-cyan-500 dark:text-blue-500 hover:underline mr-2' to={`/admin/users/${user.id_user}/edit`}>Modifier</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </div>

                    <div className="mt-4">
                        <h2 className="text-xl font-black">Ajouter un rôle</h2>
                        <div className='relative z-0 w-full mt-10 group'>
                            <label className='peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="user">Utilisateur</label>
                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">-- Sélectionner un utilisateur --</option>
                                {users.map(user => (
                                    <option key={user.id_user} value={user.id_user}>{user.surname} {user.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='relative z-0 w-full mt-2 group'>
                            <label className='peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' htmlFor="user">Rôles</label>
                            <select
                                value={selectedRoleId}
                                onChange={(e) => setSelectedRoleId(e.target.value)}
                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">-- Sélectionner un rôle --</option>
                                {roles.map(role => (
                                    <option key={role.id_role} value={role.id_role}>{role.name}</option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddRole}
                                className="mt-5 text-white bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
    )
}
