import React from 'react'
import { Link } from 'react-router-dom'

export const BirthdayItem = ({ birthday }) => {
    const displayBirthday =(item) =>{
        if (item.length >15)
            return item.substring(0, 13)+ '...';
        return item
    }
    return (
        <Link className='BirthdayItem' to={`/birthday/${birthday.id}`}>
            <h3 className='birthdayDate'>{birthday.birthday}</h3>
            <h3 className='birthdayDesc'>{displayBirthday(birthday.description)}</h3>

        </Link>
    )
}
