import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BirthdayItem } from '../../components/BirthdayItem';

export const BirthdayList = () => {
    const [birthdays, setBirthdays] = useState([
    ]);

    useEffect(() => {
        getBirthdays()
    }, []);

    let getBirthdays = async () => {

        let response = await fetch('api/get_birthdays')
        let data = await response.json()
        setBirthdays(data)
    }
    return (

        <div className='birth_list' >
            <h2 className='NotesTitle' >Birthday List</h2>

            <Link className='add_from_list' to={'/create_birthday'} >
                create new birthday
            </Link>
            <div className='birthdayContainer'>
                {birthdays.map(birthday => (
                    <BirthdayItem className='bitem' key={birthday.id} birthday={birthday} />
                ))}
            </div>

        </div>
    )
}