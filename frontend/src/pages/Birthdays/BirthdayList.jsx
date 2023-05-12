import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BirthdayItem } from './BirthdayItem';
import CreateButton from '../../UI/CreateButton/CreateButton';
import  { getAllBirthdays } from '../../API/birthdays/BirthdayService';
import { useFetching } from '../../components/hooks/useFetchingNotes';

export const    BirthdayList = () => {
    const [birthdays, setBirthdays] = useState([
    ]);
    const navigate = useNavigate();
    const [fetchBirthdays, isLoading, error] = useFetching(async () =>{
        let birthdays = await getAllBirthdays()
        setBirthdays(birthdays)
    })
    useEffect(() => {
        fetchBirthdays()
    }, []);

    let create_birthday = () => {
        navigate('/create_birthday')
    }
    return (
        <div className='birth_list' >
            <h2 className='NotesTitle' >Birthday List</h2>
            <CreateButton className='add_from_list' onClick={create_birthday}>
                create new birthday
            </CreateButton>
            {error &&
            <h2>Ошибка {error}</h2>
            }
            {isLoading ? <h2>loading...</h2> :

                <div className='birthdayContainer'>
                    {birthdays.map(birthday => (
                        <BirthdayItem className='bitem' key={birthday.id} birthday={birthday} />
                    ))}
                </div>
            }
        </div>
    )
}