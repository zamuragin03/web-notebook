import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

export const NotePage = () => {
    let { id } = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        get_note()
    }, [id])
    useEffect(() => {
        update_note()
    }, [note]);
    let get_note = async () => {
        let response = await fetch(`/api/get_note/${id}`)
        if (response.status === 200) {
            setNote(await response.json())
            return
        }
        navigate('/all')
    }
    let update_note = async () => {
        fetch(`/api/update_note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)


        })
    }
    function ChangeNote(event) {
        setNote({ ...note, 'body': event.target.value })

        update_note()
    }
    async function delete_note() {
        fetch(`/api/delete_note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }

    return (
        <div>
            <Link onClick={(event) => ChangeNote(event)} className='backarrow' to={'/notes'}>
                <h1 >←</h1>
            </Link>
            <Link onClick={delete_note} className='delete' to={'/notes'}>
                <h1 >delete</h1>
            </Link>
            <br />
            <textarea className='change_text_area' defaultValue={note?.body} onChange={(event) => ChangeNote(event)}></textarea>
        </div>
    )
}
