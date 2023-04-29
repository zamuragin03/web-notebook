import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import ColorPicker from '../CreateCategory/CreateCategory';

import CatSelector from '../../UI/Selector/CatSelector';
import AuthContext from '../../components/Context/AuthContext';

export const NotePage = () => {
    const { user, authTokens } = useContext(AuthContext)
    const [hasError, sethasError] = useState(false);
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
        let response = await fetch(`/api/get_note/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`
                }
            })
        if (response.status > 400) {
            sethasError(true)
        }
        if (response.status === 200) {
            setNote(await response.json())
            return
        }
    }
    let update_note = async () => {
        if (note != null) {
            fetch(`/api/update_note/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                },
                body: JSON.stringify({ 'body': note.body })
            })
        }
    }
    function ChangeNote(event) {
        setNote({ ...note, 'body': event.target.value })
        update_note()
    }
    async function delete_note() {
        fetch(`/api/delete_note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
    }


    return (
        <div>
            {!hasError ?
                <div>
                    <Link className='backarrow' to={'/notes'}>
                        <h1 >←</h1>
                    </Link>
                    <Link onClick={delete_note} className='delete' to={'/notes'}>
                        <h1 >delete</h1>
                    </Link>
                    <textarea className='change_text_area' defaultValue={note?.body} onChange={(event) => ChangeNote(event)}></textarea>
                    <hr />
                    <CatSelector note={note} className='color_picker' />
                </div>
                :
                <h2 className='error_field' >sorry you don't have acces</h2>
            }

        </div>
    )
}
