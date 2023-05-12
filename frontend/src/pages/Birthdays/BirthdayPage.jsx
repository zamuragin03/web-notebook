import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import MyButton from '../../UI/CreateButton/CreateButton';
import DeleteButton from '../../UI/DeleteButton/DeletteButton';
import { deleteBirthday, getBirthdyay, updateBirthday } from '../../API/birthdays/BirthdayService';
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
        let response = await getBirthdyay(id)
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
        await updateBirthday(id, birthday, description)
    }
    let delete_item = async () => {
        await deleteBirthday(id)
        navigate('/birthdays')
    }

    return (
        <div>
            <Link onClick={(event) => ChangeBirthday(event)} className='backarrow' to={'/birthdays'}>
                <h1 >←</h1>
            </Link>
            <DeleteButton onClick={delete_item} className='delete'>delete </DeleteButton>
            <textarea className='change_text_area' defaultValue={description ?? ''} onChange={(event) => ChangeDescription(event)}></textarea>
            <input type="date" defaultValue={birthday} onChange={(event) => ChangeBirthday(event)}></input>
        </div>
    )
}
