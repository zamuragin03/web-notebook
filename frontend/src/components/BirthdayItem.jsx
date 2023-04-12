import React from 'react'
import { Link } from 'react-router-dom'

export const BirthdayItem = ({ birthday }) => {
    return (
        <Link className='BirthdayItem' to={`/birthday/${birthday.id}`}>
            {/* <h4 className='birthtitle'>description</h4> */}
            <h3 className='birthdayDate'>{birthday.birthday}</h3>

            <h3 className='birthdayDesc'>{birthday.description}</h3>
            {/* <h4 className='birthtitle'>date</h4> */}

        </Link>
    )
}
