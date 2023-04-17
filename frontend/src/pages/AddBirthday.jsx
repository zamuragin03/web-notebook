import React, { useEffect, useState, } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';



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
        let response  = await fetch(`/api/create_birthday/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'description':description,'birthday':birthday})
        })
        console.log(response.json())
        navigate('/about')
    }
    return (
        <div>
            <textarea placeholder='type description here' className='change_text_area' defaultValue={description ?? ''} onChange={(event) => ChangeDescription(event)}></textarea>
            <input type="date" defaultValue={birthday} onChange={(event) => ChangeBirthday(event)}></input>
            <Link className='add_note' onClick={Add_Birthday} to={'/birthdays'}>
                create
            </Link>
        </div>
    )
}
