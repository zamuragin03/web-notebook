import React, { useEffect, useState, } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import CreateButton from '../../UI/CreateButton/CreateButton';



export const AddBirthday = () => {
    const [birthday, setBirthday] = useState({ birthday: '', description: '' });
    const navigate = useNavigate();
    async function Add_Birthday() {
        let response = await fetch(`/api/create_birthday/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(birthday)
        })
        if (response.status === 201) {
            navigate('/birthdays')
        }

        document.getElementsByName('birthday_body')[0].placeholder = "shouldn't be empty";

    }
    return (
        <div>
            <textarea name='birthday_body' placeholder='type description here' className='change_text_area' defaultValue={birthday.description ?? ''} onChange={e => setBirthday({ ...birthday, description: e.target.value })}></textarea>
            <input type="date" defaultValue={birthday.birthday} onChange={e => setBirthday({ ...birthday, birthday: e.target.value })}></input>
            <CreateButton className='add_note' onClick={Add_Birthday} >create </CreateButton>
        </div>
    )
}
