import React from 'react'
import { Link } from 'react-router-dom'
import ListElement from '../../UI/ListElement/ListElement'

export const AboutPage = () => {
    return (
        <div>
            <h1>Notes application</h1>
            <p className='about_description'>
                This web application were made in order to complete 2nd and 3rd laboratory work by RKSP
            </p>
            <h3>List of techonologies that were used:</h3>
            <ul className='tech_list' >
                <ListElement>React</ListElement>
                <ListElement>Django REST Framework</ListElement>
                <ListElement>React</ListElement>
                <ListElement link={'http://localhost:8000/api/swagger'} target='_blank'>Endpoints link</ListElement>
            </ul>
        </div>
    )
}