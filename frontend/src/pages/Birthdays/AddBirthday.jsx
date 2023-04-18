import React, { useEffect, useState, } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import CreateButton from '../../UI/CreateButton/CreateButton';



export const AddBirthday = () => {
    const [description, setDescription] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const navigate = useNavigate();

    function ChangeDescription(event) {
        setDescription(event.target.value)
    }
    function ChangeBirthday(event) {
        setBirthday(event.target.value)
    }
    async function Add_Birthday() {
        let response = await fetch(`/api/create_birthday/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'description': description, 'birthday': birthday })
        })
        if (response.status === 200) {
            navigate('/birthdays')
        }

        document.getElementsByName('birthday_body')[0].placeholder = "shouldn't be empty";

    }
    return (
        <div>
            <textarea name='birthday_body' placeholder='type description here' className='change_text_area' defaultValue={description ?? ''} onChange={(event) => ChangeDescription(event)}></textarea>
            <input type="date" defaultValue={birthday} onChange={(event) => ChangeBirthday(event)}></input>
            <CreateButton className='add_note' onClick={Add_Birthday} >create </CreateButton>
        </div>
    )
}
