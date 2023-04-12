import React, {  useState } from 'react'
import { Link } from 'react-router-dom';

export const AddPage = () => {
    const [note, setNote] = useState('');

    function ChangeNote(event) {
        setNote({ ...note, 'body': event.target.value })
    }
    async function Add_Note() {
        let response  = await fetch(`/api/create_note/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        
    }
    return (
        <div>
            <textarea className='change_text_area' placeholder='type your note here' onChange={(event) => ChangeNote(event)} ></textarea>
            <Link className='add_note' onClick={Add_Note} to={'/all'}>
                create
            </Link>
        </div>
    )
}

export default AddPage