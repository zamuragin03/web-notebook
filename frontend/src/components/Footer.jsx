import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <Link className='link_to_git' to={'https://github.com/zamuragin03'} target='_blank'>GitHub </Link>
            <span>2023-2023 Все права защищены &copy;</span>

        </footer>
    )
}
