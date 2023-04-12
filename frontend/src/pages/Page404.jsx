import React from 'react'
import { Link } from 'react-router-dom'
export const Page404 = () => {
    return (
        <div className='page404'>
            <h1>Oops! You seem to be lost.</h1>
            <Link className='home_link' to='/about'>
                Home
            </Link>
        </div>
    )
}
