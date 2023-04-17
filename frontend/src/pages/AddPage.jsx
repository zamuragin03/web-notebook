import React, {  useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

export const AddPage = () => {
    const [note, setNote] = useState(null);
    const navigate = useNavigate();

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
        if (response.status===200){
            navigate('/notes')
        }

        console.log(await response.json());
        document.getElementsByName('note_body')[0].placeholder="shouldn't be empty";
        
    }
    return (
        <div>
            <textarea name='note_body' className='change_text_area' placeholder='type your note here' onChange={(event) => ChangeNote(event)} ></textarea>
            <Link className='add_note' onClick={Add_Note} >
                create
            </Link>
        </div>
    )
}

export default AddPage