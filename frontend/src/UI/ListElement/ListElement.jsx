import React from 'react'
import classes from './ListElement.module.css'
import { Link, } from 'react-router-dom'

const ListElement = ({link, children, ...props }) => {
    return (
        <li {...props} className={classes.myLi}>
            <Link className='menu' to={link} >{children}</Link>
        </li>
    )
}

export default ListElement