import React from 'react'
import { Link } from 'react-router-dom'
import ListElement from '../../UI/ListElement/ListElement'

export const AboutPage = () => {
    return (
        <div>
            <h1>Notes application</h1>
            <p className='about_description'>
                <details>
                    <summary>Project description</summary>
                    This web application were made in order to complete course work by RKSP. Here you can add your birthday block, that u really want to remember.
                    Once you have registered and logged in, a menu with <b>notes</b> and categories will be available to you. you can create your own notes and
                    no one will see it. You are able to create you own category with personal color and everybody will see it, so u can share your category with your friends.
                </details>

            </p>
            <h3>List of techonologies that were used:</h3>
            <ul className='tech_list' >
                <ListElement>React</ListElement>
                <ListElement link={'http://localhost:8000/api/get_notes'} >Django REST Framework</ListElement>
                <ListElement link={'http://localhost:8000/api/swagger'} target='_blank'>Endpoints link</ListElement>
            </ul>
        </div>
    )
}