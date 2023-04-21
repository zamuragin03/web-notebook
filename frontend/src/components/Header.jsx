import React from 'react'
import { Link } from 'react-router-dom'
import ListElement from '../UI/ListElement/ListElement';
import DeleteButton from '../UI/DeleteButton/DeletteButton';

export default function Header() {
    function change_color() {
        var el = document.querySelector('*');
        if (el.style['filter'] == 'invert(1)') {
            el.style = 'filter:invert(0)'
        }
        else
            el.style = 'filter:invert(1)'
    }
    return (
        <header>
            <div>
                <Link className='logotype' to={'/about'} />
                <span className='logo'>Note web service</span>
                <ul className='nav'>
                    <ListElement link={'/about'} >About</ListElement>
                    <ListElement link={'/birthdays'} >Check birthdays</ListElement>
                    <ListElement link={'/notes'} >Check my notes</ListElement>

                </ul>
            </div>
            <DeleteButton onClick={change_color} >
                switch the light
            </DeleteButton>
            <div className='presentation'>

            </div>

        </header>
    )
}
