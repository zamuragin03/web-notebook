import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
export const BirthdayPage = () => {
    let { id } = useParams();
    const [description, setDescription] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        get_item()
    }, [id])
    useEffect(() => {
        if (birthday != null && description != null) {
            update_item()

        }

    }, [description, birthday]);
    let get_item = async () => {
        let response = await fetch(`/api/get_birthday/${id}`)
        if (response.status === 200) {
            let item = await response.json()
            setDescription(item['description'])
            setBirthday(item['birthday'])
            return
        }
        navigate('/about')
    }

    function ChangeDescription(event) {
        setDescription(event.target.value)
    }
    function ChangeBirthday(event) {
        setBirthday(event.target.value)
    }
    let update_item = async () => {
        fetch(`/api/update_birthday/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'birthday': birthday, 'description': description })
        })
    }

    return (
        <div>
            <textarea className='change_text_area' defaultValue={description ?? ''} onChange={(event) => ChangeDescription(event)}></textarea>
            <input type="date" defaultValue={birthday} onChange={(event) => ChangeBirthday(event)}></input>
        </div>
    )
}
