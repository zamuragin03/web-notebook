import React from 'react'
import { Link } from 'react-router-dom'

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
                    <li>
                        <Link className='menu' to='/about' >About us</Link>
                    </li>
                    <li>
                        <Link className='menu' to='/birthdays' >Check birthdays</Link>
                    </li>
                    <li>
                        <Link className='menu' to='/create_note' >Create new note</Link>
                    </li>
                    <li>
                        <Link className='menu' to='/notes' >Check my notes</Link>
                    </li>
                    <li>
                        <Link className='menu' to='/create_birthday' >Create birthday </Link>
                    </li>

                </ul>
                <br />
                <a onClick={change_color}> swith the light</a>

            </div>
            <div className='presentation'></div>
        </header>
    )
}
