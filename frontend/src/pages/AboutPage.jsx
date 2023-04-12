import React from 'react'
import { Link } from 'react-router-dom'

export const AboutPage = () => {
    return (
        <div>
            <h1>Notes application</h1>
            <p className='about_description'>
                This web application were made in order to complete 2nd and 3rd laboratory work by RKSP
            </p>
            <h3>List of techonologies that were used:</h3>
            <ul className='tech_list' >
                <li>React</li>
                <li>Django</li>
                <li>Django Rest Framework</li>
                <li>
                    <Link to={'http://localhost:8000/swagger'} target='_blank'>endpoint link</Link>
                </li>

            </ul>
        </div>
    )
}