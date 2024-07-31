import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className='flex justify-between mt-20 border-t-2 border-black p-6 phone:flex-col'>
            <div className='flex phone:flex-col'>
                <Link className='mr-6' to="/mentions-legales">Mentions légales</Link>
                <Link to="/conditions-generales">Conditions générales</Link>
            </div>
            <div className='phone:mt-10'>
                <p>Travail pédagogique sans objectifs commerciaux.</p>
            </div>
        </footer>
    )
}
