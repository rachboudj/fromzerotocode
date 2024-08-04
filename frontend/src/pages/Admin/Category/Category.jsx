import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminRoute from '../../../components/AdminComponent';
import PrivateRoute from '../../../components/PrivateComponent';

export default function Categorie() {
    const [categorys, setCategorys] = useState([])

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/category`);
                setCategorys(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchCategory();
    }, [])

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/category/${categoryId}`)
                setCategorys(categorys.filter(category => category.id_category !== categoryId));
                navigate('/admin/category');
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <PrivateRoute>
            <AdminRoute>
                <div className='p-6'>
                    <div className='bg-white p-6 rounded-lg relative overflow-x-auto mt-2'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-3xl font-black'>Catégorie</h1>
                            <a className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' href="/admin/category/new">Créer une catégories</a>
                        </div>

                        <div className="relative overflow-x-auto mt-10">
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
                                <thead className='text-xs text-gray-700 uppercase bg-white'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Titre</th>
                                        <th scope="col" className="px-6 py-3">Description</th>
                                        <th scope="col" className="px-6 py-3">Opération</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorys.map(category => (
                                        <tr className='bg-white border-b hover:bg-gray-50' key={category.id_category}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{category.title}</th>
                                            <td className="px-6 py-4">{category.description}</td>
                                            <td className="px-6 py-4">
                                                <Link className='font-medium text-cyan-500 hover:underline mr-2' to={`/admin/category/${category.id_category}/edit`}>Modifier</Link>
                                                <button className='font-medium text-red-500 hover:underline' onClick={() => handleDeleteCategory(category.id_category)}>Supprimer</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminRoute>
        </PrivateRoute>
    )
}
